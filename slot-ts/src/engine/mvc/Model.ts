import { Signal } from '../../stubs/Signal';

export class Model {
  protected _updated: Signal = new Signal();
  get updated(): Signal {
    return this._updated;
  }
}
