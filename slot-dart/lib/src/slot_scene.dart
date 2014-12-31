library slot.slot_scene;

import 'package:stagexl/stagexl.dart';
import 'core/scene.dart';
import 'core/game.dart';

class SlotScene extends Scene {
  SlotScene(Game game) : super(game) {
  }
  void init() {
    // draw a red circle
    var shape = new Shape();
    shape.graphics.circle(100, 100, 60);
    shape.graphics.fillColor(Color.Navy);
    stage.addChild(shape);
  }
}
