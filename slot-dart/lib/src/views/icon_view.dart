library slot.views.icon_view;

import 'package:stagexl/stagexl.dart';

import 'package:slot/src/mvc/view.dart';
import 'package:slot/src/core/engine.dart';
import 'package:slot/src/models/icon_model.dart';

class IconView extends View {

  Bitmap _image;

  IconView(Model model) : super(model) {

    _createIconImage();

  }

  void _createIconImage() {
    TextureAtlas textureAtlas = Engine.game.assets.getTextureAtlas('atlas01');
    BitmapData bitmapData = textureAtlas.getBitmapData(
        textureAtlas.frames
          .where((f) => f.name.startsWith('icon'))
          .toList()[model.id].name
    );
    bitmapData.renderTexture.filtering = RenderTextureFiltering.NEAREST;
    _image = new Bitmap(bitmapData);
    addChild(_image);

  }

  IconModel get model {
    return super.model;
  }

}
