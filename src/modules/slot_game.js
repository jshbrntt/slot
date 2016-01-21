library slot.slot_game;

import 'core/game.dart';
import 'slot_scene.dart';

class SlotGame extends Game {

  SlotGame() : super() {
    print('SlotGame.SlotGame');
  }

  void init() {
    print('SlotGame.init');
    super.init();
    scene = new SlotScene(this);
  }

}
