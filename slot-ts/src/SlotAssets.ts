import AssetManifest from 'openfl/lib/openfl/utils/AssetManifest';
import Assets from 'openfl/lib/openfl/utils/Assets';
import BitmapData from 'openfl/lib/openfl/display/BitmapData';
import Matrix from 'openfl/lib/openfl/geom/Matrix';
import Rectangle from 'openfl/lib/openfl/geom/Rectangle';
import Bitmap from 'openfl/lib/openfl/display/Bitmap';
import Point from 'openfl/lib/openfl/geom/Point';

export default class SlotAssets extends AssetManifest {
  private static BITMAPS: { [name: string]: Bitmap } = {};
  public static setBitmap(name: string, bitmap: Bitmap): void {
    SlotAssets.BITMAPS[name] = bitmap;
  }
  public static getBitmap(name: string): Bitmap | null {
    return SlotAssets.BITMAPS[name] || null;
  }
  public static getBitmaps(partialName: string): Bitmap[] {
    return Object.entries(SlotAssets.BITMAPS).reduce(
      (icons, [name, bitmapData]) => {
        if (name.includes(partialName)) {
          icons.push(bitmapData);
        }
        return icons;
      },
      []
    );
  }
  constructor() {
    super();
    this.addBitmapData('assets/atlas01.png', 'atlas01.png');
    this.addText('assets/atlas01.xml', 'atlas01.xml');
    this.addText('assets/config.json', 'config.json');
    this.addFont('assets/fonts/minecraftia.ttf', 'minecraftia.ttf');
  }
  public unpack(): void {
    const atlasBitmap: BitmapData = Assets.getBitmapData('atlas01.png');
    const atlasConfig: string  = Assets.getText('atlas01.xml');
    const domParser: DOMParser = new DOMParser();
    const dom = domParser.parseFromString(atlasConfig, 'application/xml');;
    const textureAtlas = dom.querySelector('TextureAtlas');
    const subTextureConfigs = Array.from(textureAtlas.children);
    for (const subTextureConfig of subTextureConfigs) {
      const name = subTextureConfig.getAttribute('name');
      const x = Number.parseInt(subTextureConfig.getAttribute('x'));
      const y = Number.parseInt(subTextureConfig.getAttribute('y'));
      const width = Number.parseInt(subTextureConfig.getAttribute('width'));
      const height = Number.parseInt(subTextureConfig.getAttribute('height'));
      const subTextureBitmapData = new BitmapData(width, height, true, 0);
      const matrix = new Matrix();
      matrix.translate(-x, -y);
      subTextureBitmapData.draw(atlasBitmap, matrix, null, null, new Rectangle(0, 0, width, height), false);
      const subTextureBitmap = new Bitmap(subTextureBitmapData);
      SlotAssets.setBitmap(name, subTextureBitmap);
    }
  }
};
