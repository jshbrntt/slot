import { Engine } from './engine/core/Engine';
import { KeyManager } from './utils/KeyManager';
import { SlotGame } from './SlotGame';
import { Rectangle } from './stubs/Rectangle';
import { Stage } from './stubs/Stage';

export class SlotEngine extends Engine {
  static width = 800;
  static height = 600;
  static frameRate = 60;
  static backgroundColor = 'FFFFFF';
  constructor() {
    super(SlotGame, new Rectangle(), new Stage());

    KeyManager.initialize(window.nativeStage);

    this.start();
  }
}
