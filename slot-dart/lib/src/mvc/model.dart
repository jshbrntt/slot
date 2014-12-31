library slot.mvc.model;

class Model {

  static const String UPDATED = 'updated';

  Model() {
  }

  void update() {
    dispatchEvent(Model.UPDATED);
  }

}
