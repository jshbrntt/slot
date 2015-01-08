library slot.mvc.controller;

import 'package:stagexl/stagexl.dart';

import 'model.dart';
import 'view.dart';

class Controller extends EventDispatcher {

  Model _model;
  View _view;

  Controller(Model model, View view) {
    _model = model;
    _view = view;
  }

  View get view {
    return _view;
  }

  Model get model {
    return _model;
  }

}
