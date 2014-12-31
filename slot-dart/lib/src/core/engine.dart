library slot.core.engine;

import 'dart:html';
import 'package:stagexl/stagexl.dart';
import 'game.dart';

class Engine {

  static Game _game = null;
  static CanvasElement _canvas;
  static Stage _stage;
  static RenderLoop _renderLoop;

  static void init(Game game) {

    print('Engine.init');

    if (_game == null) {

      _game = game;
      _canvas = new CanvasElement(width: 800, height: 600);
      _stage = new Stage(_canvas);
      _renderLoop = new RenderLoop();

      _stage.addChild(_game);

      _renderLoop.addStage(_stage);

      document.body.nodes.add(_canvas);


    }
  }

  static Game get game {
    return _game;
  }

}
