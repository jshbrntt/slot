import { Game } from './engine/core/Game';
import { SlotAssets } from './SlotAssets';
import { SlotScene } from './SlotScene';

export class SlotGame extends Game {
  constructor() {
    super(SlotAssets);
  }

  protected init(): void {
    super.init();
    this.scene = new SlotScene(this);
  }
}
