import { DisplayObjectContainer } from './DisplayObjectContainer';
import { Texture } from './Texture';

export class Button extends DisplayObjectContainer {
  public enabled: boolean = true;
  constructor(public up: Texture, public text: string, public down: Texture) {
    super();
  }
}
