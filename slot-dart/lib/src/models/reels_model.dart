library slot.models.reels_model;

import 'package:slot/src/mvc/model.dart';
import 'icon_model.dart';
import 'reel_model.dart';

class ReelsModel extends Model {

  List<List<int>> _reelsConfig;
  List<ReelModel> _reelModels;

  ReelsModel(List<List<int>> reelsConfig) : super() {
    _reelsConfig = reelsConfig;
    _reelModels = new List<ReelModel>();

    _createReelModels();
  }

  void _createReelModels() {
    for (List<int> reelConfig in _reelsConfig) {
      List<IconModel> iconModels = new List<IconModel>();

      for (int iconId in reelConfig) {
        iconModels.add(new IconModel(iconId));
      }

      ReelModel reelModel = new ReelModel(iconModels);

      _reelsModel.add(reelModel);
    }
  }

  List<ReelModel> get reelModels {
    return _reelModels;
  }

}
