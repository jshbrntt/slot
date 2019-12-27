import { AssetManifest } from './stubs/AssetManager';

export const SlotAssets: AssetManifest = {
  // Texture Atlases
  atlas01: {
    source: '../../assets/atlases/atlas01.png'
  },
  atlas01_xml: {
    source: '../../assets/atlases/atlas01.xml',
    mimeType: 'application/octet-stream'
  },
  // Fonts
  minecraftia_ttf: {
    source: '../../assets/fonts/minecraftia.ttf',
    embedAsCFF: false,
    fontFamily: 'Minecraftia'
  }
};
