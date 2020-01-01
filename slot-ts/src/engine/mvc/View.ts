import Model from '../mvc/Model';
import Sprite from 'openfl/display/Sprite';

export default abstract class View extends Sprite {
  constructor(protected model: Model) {
    super();
    this.addEventListener(Model.UPDATED, this.onUpdated);
  }

  protected onUpdated(): void {}
}
