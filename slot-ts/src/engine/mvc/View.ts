import { DisplayObjectContainer } from '../../stubs/DisplayObjectContainer';

import { Model } from '../mvc/Model';

export abstract class View extends DisplayObjectContainer {
  protected _model: Model;
  constructor(model: Model) {
    super();
    this._model = model;
    if (!this._model) {
      throw new Error('Cannot create view from null Model');
    }
    if (this._model.updated) {
      this._model.updated.add(this.onUpdated);
    }
  }

  protected onUpdated(): void {
    // abstract
  }
}
