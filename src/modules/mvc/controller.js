var Controller = function(model, view) {
  this._model = model;
  this._model = view;
};
Controller.prototype.view = function() {
 return this._view;
};
Controller.prototype.model = function() {
  return this._model;
};
module.exports = Controller;
