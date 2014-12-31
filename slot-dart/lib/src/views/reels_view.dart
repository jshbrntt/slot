library slot.views.reels_view;

import 'package:slot/src/mvc/view.dart';

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
      addChild(reelView);
      _reelViews.add(reelView);

    }

  }

  List<ReelView> get reelViews {
    return _reelViews;
  }

  ReelsModel get model {
    return _model as ReelsModel;
  }

}
