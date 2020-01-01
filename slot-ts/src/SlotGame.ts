import Game from './engine/core/Game';
import SlotAssets from './SlotAssets';
import SlotScene from './SlotScene';
import Scene from './engine/core/Scene';

export default class SlotGame extends Game {
  public constructor() {
    const manifest: SlotAssets = new SlotAssets();
    super(manifest);
  }

  protected init(): void {
    super.init();
    (this.manifest as SlotAssets).unpack();
    const scene = new SlotScene(this as Game);
    this.setScene(scene as Scene);
  }
}
