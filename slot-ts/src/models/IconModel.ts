import Model from '../engine/mvc/Model';

export default class IconModel extends Model {
  constructor(private id: number) {
    super();
  }

  public getId(): number {
    return this.id;
  }

  public setId(value: number): void {
    this.id = value;
    this.dispatchEvent(new Event(Model.UPDATED));
  }
}
