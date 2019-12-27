import { Sprite } from '../../stubs/Sprite';
import { StubEvent } from '../../stubs/StubEvent';
import { Game } from './Game';

export class Scene extends Sprite {
  private _game: Game | null = null;
  constructor(game: Game) {
    super();
    this._game = game;
    this.addEventListener(StubEvent.ADDED_TO_STAGE, this.onAdded);
  }

  private onAdded(): void {
    removeEventListener(StubEvent.ADDED_TO_STAGE, this.onAdded);
    this.init();
  }

  protected init(): void {
    // abstract
  }

  public update(): void {
    // abstract
  }

  protected get game(): Game {
    if (this._game) {
      return this._game;
    }
    throw new Error('Missing game reference');
  }

  public dispose(): void {
    this._game = null;
    super.dispose();
  }
}
