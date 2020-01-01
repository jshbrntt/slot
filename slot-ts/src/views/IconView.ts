import Model from '../engine/mvc/Model';
import View from '../engine/mvc/View';
import IconModel from '../models/IconModel';
import Starling from '../stubs/Starling';
import StubImage from '../stubs/StubImage';
import Texture from '../stubs/Texture';
import TextureSmoothing from '../stubs/TextureSmoothing';
import SlotGame from '../SlotGame';

export default class IconView extends View {
  private _iconImage: StubImage | null = null;

  constructor(model: Model) {
    super(model);
    this.createIconImage();
  }

  protected onUpdated(): void {
    super.onUpdated();
    this.removeChildren();
    this.createIconImage();
  }

  protected createIconImage(): void {
    const game: SlotGame = Starling.current.root as SlotGame;
    const iconTextures: Texture[] = game.assets
      .getTextureAtlas('atlas01')
      .getTextures('icon');

    if (this.getModel().getId() < iconTextures.length - 1) {
      const iconTexture: Texture = iconTextures[this.getModel().getId()];
      this._iconImage = new StubImage(iconTexture);
      this._iconImage.smoothing = TextureSmoothing.NONE;
      this.addChild(this._iconImage);
    } else {
      throw new Error('Icon texture not found.');
    }
  }

  public getModel(): IconModel {
    return this._model as IconModel;
  }
}
