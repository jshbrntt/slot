library slot.mvc.view;

import 'package:stagexl/stagexl.dart';

import 'model.dart';

class View extends DisplayObjectContainer {
  
  Model _model;
  EventStream<Event> updated;
  
  View(Model model) {
    _model = model;
    _model.on(Model.UPDATED).listen(onModelUpdated);
  }
  
  void onModelUpdated();

  Model get model {
    return _model;
  }
  
}
