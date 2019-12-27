import { Sprite } from './Sprite';
import { TextureSmoothing } from './TextureSmoothing';
import { Texture } from './Texture';

export class StubImage extends Sprite {
  public smoothing: string = TextureSmoothing.NONE;
  constructor(
    public texture: Texture
  ) {
    super();
  }
}
