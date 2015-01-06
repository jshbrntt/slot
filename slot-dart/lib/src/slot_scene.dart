library slot.slot_scene;

import 'dart:core';
import 'dart:async';
import 'package:stagexl/stagexl.dart';
import 'core/scene.dart';
import 'core/game.dart';
import 'models/icon_model.dart';
import 'views/icon_view.dart';
import 'models/reel_model.dart';
import 'views/reel_view.dart';

class SlotScene extends Scene {

  SlotScene(Game game) : super(game) {

  }

  void addResources() {

    print("SlotScene.addResources");

    game.resourceManager.addTextureAtlas('atlas01', 'assets/atlases/atlas01.json', TextureAtlasFormat.JSONARRAY);

  }

  void init() {

    print("SlotScene.init");

    // draw a red circle
    var shape = new Shape();
    shape.graphics.circle(100, 100, 60);
    shape.graphics.fillColor(Color.Navy);
    stage.addChild(shape);

    IconModel iconModel = new IconModel(2);
    IconView iconView = new IconView(iconModel);

    List<IconModel> iconModels = new List<IconModel>.generate(10, (int index) => new IconModel(index));

    ReelModel reelModel = new ReelModel(iconModels);

    ReelView reelView1 = new ReelView(reelModel);
    ReelView reelView2 = new ReelView(reelModel);
    ReelView reelView3 = new ReelView(reelModel);

    reelView1.scaleX = reelView1.scaleY = 5;
    reelView2.scaleX = reelView2.scaleY = 5;
    reelView3.scaleX = reelView3.scaleY = 5;

    reelView2.x = reelView1.x + reelView1.width;
    reelView3.x = reelView2.x + reelView2.width;

    reelView1.spin();
    reelView2.spin();
    reelView3.spin();

    addChild(reelView1);
    addChild(reelView2);
    addChild(reelView3);

  }

}
