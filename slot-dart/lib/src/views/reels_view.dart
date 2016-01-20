library slot.views.reels_view;

import 'package:slot/src/mvc/view.dart';
import 'package:slot/src/models/reels_model.dart';
import 'package:slot/src/models/reel_model.dart';
import 'package:slot/src/views/reel_view.dart';

class ReelsView extends View {

  List<ReelView> _reelViews;

  ReelsView(Model model) : super(model) {

    _reelViews = new List<ReelViews>();

    _createReelViews();

  }

  void _createReelViews() {

    List<ReelModel> reelModels = model.reelModels;

    for (ReelModel reelModel in reelModels) {

      ReelView reelView = new ReelView(reelModel);
      reelView.x = reelModels.indexOf(reelModel) * reelView.width;
      addChild(reelView);
      _reelViews.add(reelView);

    }

  }

  List<ReelView> get reelViews {
    return _reelViews;
  }

  ReelsModel get model {
    return super.model as ReelsModel;
  }

}
