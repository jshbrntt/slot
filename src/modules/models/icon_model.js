library slot.models.icon_model;

import 'package:slot/src/mvc/model.dart';

class IconModel extends Model {
  
  num _id;
  
  IconModel(num id) : super() {
    _id = id;
  }
  
  set id(num value) {
    _id = value;
    super.update();
  }
  
  num get id {
    return _id;
  }
  
}