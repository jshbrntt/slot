import Game from './engine/core/Game';
import SlotAssetManifest from './SlotAssetManifest';
import SlotScene from './SlotScene';
import Scene from './engine/core/Scene';

export default class SlotGame extends Game {
  public constructor() {
    super(new SlotAssetManifest());
  }

  protected init(): void {
    super.init();
    const scene = new SlotScene(this as Game);
    this.setScene(scene as Scene);
  }
}
