library slot.models.reel_model;

import 'package:slot/src/mvc/model.dart';
import 'icon_model.dart';

class ReelModel extends Model {

  static const String SPINNING = 'spinning';

  List<IconModel> _iconModels;
  int _position;

  ReelModel(List<IconModel> iconModels) : super() {
    _iconModels = iconModels;
    _position = 0;
  }

  indexToReelPosition(int index) {
    return index - _iconModels.length * (index / _iconModels.length).floor();
  }

  IconModel getIconModel(int index) {
    return _iconModels[indexToReelPosition(index)];
  }

  set position(int value) {
    _position = value;
  }

  int get position {
    return _position;
  }

  List<IconModel> get iconModels {
    return _iconModels;
  }

}
