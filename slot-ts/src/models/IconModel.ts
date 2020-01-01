import Model from '../engine/mvc/Model';

export default class IconModel extends Model {
  private _id: number;

  constructor(id: number) {
    super();
    this._id = id;
  }

  public getId(): number {
    return this._id;
  }

  public setId(value: number): void {
    this._id = value;
    this.updated.dispatch();
  }
}
