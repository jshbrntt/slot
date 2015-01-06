library slot.views.reel_view;

import 'package:stagexl/stagexl.dart';

import 'package:slot/src/views/icon_view.dart';
import 'package:slot/src/models/reel_model.dart';
import 'package:slot/src/mvc/view.dart';
import 'package:slot/src/core/engine.dart';

class ReelView extends View {

  List<IconView> _iconViews;
  num _tweenCount;
  num _stopPosition;
  Function _onStopped;

  ReelView(Model model) : super(model) {

    _iconViews = new List<IconView>();
    _tweenCount = 0;

    _setupInitialIcons();

  }

  void stop(num position) {
    _stopPosition = model.indexToReelPosition(position);
  }

  void spin() {
    shiftReel();
  }

  void shiftReel() {

    // Removing bottom out of view icon.
    removeChild(_iconViews.removeLast());

    // Moving the position of the reel one forward.
    num position = model.position;
    position++;

    // Reseting the reel position back to the start if new position is out of bounds.
    if (position == model.iconModels.length) {
      position = 0;
    }

    model.position = position;

    IconModel newIconModel = model.getIconModel(-2 + model.position);
    IconView newIconView = new IconView(newIconModel);

    _iconViews.insert(0, newIconView);

    _tweenCount = _iconViews.length - 1;
    for (num i = 1; i < _iconViews.length; i++) {
      IconView iconView = _iconViews[i];
      Tween tween = new Tween(iconView, 0.1, TransitionFunction.linear);
      tween.onComplete = _onShiftedReel;
      tween.animate.y.to(iconView.y + iconView.height);
      Engine.game.stage.juggler.add(tween);
    }

    addChild(newIconView);

  }

  void _onShiftedReel() {
    _tweenCount--;
    if (_tweenCount == 0) {
      // Stop spinning condition.
      if (model.position == _stopPosition) {
        stopReel();
      } else {
        shiftReel();
      }
    }
  }

  void stopReel() {
    _stopPosition = null;
    if (_onStopped) {
      {
        _onStopped.apply(this);
      }
    }
  }

  void _setupInitialIcons() {
    for (var i = -2; i <= 2; ++i) {
      IconView iconView = new IconView(model.getIconModel(i + model.position));
      addChild(iconView);
      iconView.y = (i + 2) * iconView.height;
      _iconViews.add(iconView);
    }
  }

  ReelModel get model {
    return super.model;
  }

  void set onStopped(void function()) {
    _onStopped = function;
  }

}
