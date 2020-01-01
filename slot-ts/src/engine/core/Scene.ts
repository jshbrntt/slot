import Sprite from 'openfl/lib/openfl/display/Sprite';
import Event from 'openfl/lib/openfl/events/Event';

import Game from './Game';

export default class Scene extends Sprite {
  constructor(protected game: Game) {
    super();
    this.addEventListener(Event.ADDED_TO_STAGE, () => this.onAdded());
  }

  private onAdded(): void {
    this.removeEventListener(Event.ADDED_TO_STAGE, () => this.onAdded());
    this.init();
  }

  protected init(): void {}

  public update(): void {}

  public dispose(): void {}
}
