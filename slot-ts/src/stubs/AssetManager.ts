import { Texture } from './Texture';

export type AssetManifest = { [key: string]: any };
export type Asset = Texture | TextureAtlas | Font;
export type Font = string;
export type Assets = { [key: string]: Asset };

export class TextureAtlas {
  public _textures: Texture[] = [];
  public getTextures(partialKey: string): Texture[] {
    return Object.entries(this._textures)
      .filter(([key, asset]) => key.includes(partialKey))
      .map(([key, asset]) => asset) as Texture[];
  }
}

export class AssetManager {
  public _assets: Assets = {};
  public verbose: boolean = false;
  public enqueue(manifest: AssetManifest): void {
    console.log('TODO: Load assets from provided manifest');
  }
  public loadQueue(onLoaded: Function): void {
    onLoaded();
  }
  public getAsset(key: string): Asset {
    return this._assets[key];
  }
  public getTexture(key: string): Texture {
    return this._assets[key] as Texture;
  }
  public getTextureAtlas(key: string): TextureAtlas {
    return this._assets[key] as TextureAtlas;
  }
  public getFont(key: string): Font {
    return this._assets[key] as Font;
  }
}
