library slot.mvc.controller;

import 'model.dart';
import 'view.dart';

class Controller {

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
