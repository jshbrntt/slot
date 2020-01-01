import AssetManifest from 'openfl/utils/AssetManifest';

export default class SlotAssetManifest extends AssetManifest {
  constructor() {
    super();
    this.addBitmapData('../../assets/atlases/atlas01.png', 'atlas01.png');
    this.addText('../../assets/atlases/atlas01.xml', 'atlas01.xml');
    this.addText('../../assets/config.json', 'config.json');
    this.addFont('../../assets/fonts/minecraftia.ttf', 'minecraftia.ttf');
  }
};
