import { DisplayObjectContainer } from './DisplayObjectContainer';

export class Tween {
  public onComplete: Function | null = null;
  constructor(
    public child: DisplayObjectContainer,
    public seconds: number,
    public curve: string
  ) {}
  animate(propertyName: string, value: number) {
    console.log('TODO: Animate', propertyName, value);
    if (this.onComplete) {
      this.onComplete();
    }
  }
}
