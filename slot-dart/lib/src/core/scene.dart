library slot.core.scene;

import 'package:stagexl/stagexl.dart';
import 'game.dart';

class Scene extends Sprite {
  Game _game;

  Scene(Game game) {
    _game = game;
    onAddedToStage.listen(_onAddedToStage);
  }

  void _onAddedToStage(Event e) {
    init();
  }

  void init();
  void update();
  void dispose();

}
