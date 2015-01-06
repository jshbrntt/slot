library slot.mvc.model;

import 'package:stagexl/stagexl.dart';

class Model extends EventDispatcher {

  static const String UPDATED = 'updated';

  Model() {
  }

  void update() {
    dispatchEvent(Model.UPDATED);
  }

}
