library slot.slot_scene;

import 'dart:html';
import 'dart:core';
import 'dart:collection';
import 'dart:async';
import 'dart:math';
import 'dart:convert';
import 'package:stagexl/stagexl.dart';
import 'core/scene.dart';
import 'core/game.dart';
import 'models/icon_model.dart';
import 'views/icon_view.dart';
import 'models/reel_model.dart';
import 'models/reels_model.dart';
import 'views/reel_view.dart';
import 'views/reels_view.dart';
import 'events/reels_event.dart';
import 'controllers/reels_controller.dart';
import 'core/engine.dart';
import 'package:intl/intl.dart';

class SlotScene extends Scene {

  LinkedHashMap _config;
  ReelsModel _reelsModel;
  ReelsView _reelsView;
  ReelsController _reelsController;
  Bitmap _overlayBitmap;
  SimpleButton _spinButton;
  TextureAtlas _atlas;
  num _balance;
  TextField _balanceField;
  NumberFormat _currencyFormatter;

  SlotScene(Game game) : super(game);

  void addResources() {

    print("SlotScene.addResources");

    game.assets.addTextureAtlas('atlas01', 'assets/atlases/atlas01.json', TextureAtlasFormat.JSONARRAY);
  }

  void init() {

    print("SlotScene.init");

    _loadConfig('./config.json');

    _atlas = Engine.game.assets.getTextureAtlas('atlas01');

  }

  void _loadConfig(String path) {
    HttpRequest.getString(path).then(_parseConfig).catchError(_handleError);
  }

  void _parseConfig(String config) {
    _config = JSON.decode(config);
    print("Config Loaded:");
    print(_config.toString());
    _setupReels();
    _setupOverlay();
    _setupButtons();
    _setupScore();
  }

  void _handleError(Error error) {
    print(error.toString());
  }

  void _setupReels() {
    _reelsModel = new ReelsModel(_config["reels"]);
    _reelsView = new ReelsView(_reelsModel);
    _reelsController = new ReelsController(_reelsModel, _reelsView);

    _reelsView.scaleX = _reelsView.scaleY = 6;
    _reelsView.x = 40;
    _reelsView.y = -130;

    addChild(_reelsView);
  }

  void _setupOverlay() {
    BitmapData overlayBitmapData = _atlas.getBitmapData('ui_overlay');
    overlayBitmapData.renderTexture.filtering = RenderTextureFiltering.NEAREST;
    _overlayBitmap = new Bitmap(overlayBitmapData);
    _overlayBitmap.scaleX = _overlayBitmap.scaleY = 6;
    addChild(_overlayBitmap);
  }

  void _setupButtons() {
    BitmapData upStateBitmapData = _atlas.getBitmapData('ui_spin_up');
    BitmapData downStateBitmapData = _atlas.getBitmapData('ui_spin_down');
    upStateBitmapData.renderTexture.filtering = RenderTextureFiltering.NEAREST;
    downStateBitmapData.renderTexture.filtering = RenderTextureFiltering.NEAREST;
    Bitmap upStateBitmap = new Bitmap(upStateBitmapData);
    Bitmap downStateBitmap = new Bitmap(downStateBitmapData);
    _spinButton = new SimpleButton(upStateBitmap, upStateBitmap, downStateBitmap, upStateBitmap);
    _spinButton.scaleX = _spinButton.scaleY = 6;
    _spinButton.x = 590;
    _spinButton.y = 54;
    _spinButton.addEventListener(MouseEvent.CLICK, _onSpinButtonTriggered);
    addChild(_spinButton);
  }

  void _setupScore() {

    _currencyFormatter = new NumberFormat.currencyPattern("en_GB", "£");

    _balance = 0;

    _balanceField = new TextField("BALANCE:\n"+_currencyFormatter.format(_balance));
    _balanceField.autoSize = TextFieldAutoSize.CENTER;
    _balanceField.width = 100;
    _balanceField.height = 300;
    _balanceField.x = 626;
    _balanceField.y = 226;

    _balanceField.defaultTextFormat = new TextFormat("Minecraftia", 19, Color.Red);
    _balanceField.defaultTextFormat.align = TextFormatAlign.CENTER;
    _balanceField.defaultTextFormat.topMargin = 15;
    _balanceField.defaultTextFormat.leftMargin = 30;

    addChild(_balanceField);

  }

  void _toggleSpinButton(bool enabled) {
    _spinButton.enabled = enabled;
    if (!_spinButton.enabled) {
      _spinButton.hitTestState = null;
      _spinButton.alpha = 0.6;
    } else {
      _spinButton.hitTestState = _spinButton.upState;
      _spinButton.alpha = 1;
    }
  }

  void _onSpinButtonTriggered(MouseEvent event) {
    print("SlotScene._onSpinButtonTriggered");
    if (_spinButton.enabled) {
      if (_reelsController.spinning) {
        _reelsController.addEventListener(ReelsEvent.STOPPING, _onReelsStopping);
        _reelsController.stopSpin();
      } else {
        _reelsController.addEventListener(ReelsEvent.STARTING, _onReelsStarting);
        _reelsController.startSpin();
      }
    }
  }

  void _onReelsStarting(ReelsEvent event) {
    print("_onReelsStarting");
    _reelsController.removeEventListener(ReelsEvent.STARTING, _onReelsStarting);
    _reelsController.addEventListener(ReelsEvent.STARTED, _onReelsStarted);
    _toggleSpinButton(false);
  }

  void _onReelsStarted(ReelsEvent event) {
    print("_onReelsStarted");
    _reelsController.removeEventListener(ReelsEvent.STARTED, _onReelsStarted);
    _reelsController.addEventListener(ReelsEvent.STOPPING, _onReelsStopping);
    _toggleSpinButton(true);
  }

  void _onReelsStopping(ReelsEvent event) {
    print("_onReelsStopping");
    _reelsController.removeEventListener(ReelsEvent.STOPPING, _onReelsStopping);
    _reelsController.addEventListener(ReelsEvent.STOPPED, _onReelsStopped);
    _toggleSpinButton(false);
  }

  void _onReelsStopped(ReelsEvent event) {
    print("_onReelsStopped");
    _reelsController.removeEventListener(ReelsEvent.STOPPED, _onReelsStopped);
    _toggleSpinButton(true);
    for (var prize in _config["prizes"]) {
      if (prize["line"].join("").toString() == event.result) {
      _balance += prize["payout"];
      _balanceField.text = "BALANCE:\n"+_currencyFormatter.format(_balance);
      }
    }
  }

}
