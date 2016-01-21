var PIXI = require('pixi');

function Scene(game) {
  PIXI.Container.call(this);
  this._game = game;
  this._addResources();
  this._loadResources();
}
Scene.prototype = Object.create(PIXI.Container.prototype);
Scene.prototype.constructor = Scene;
module.exports = Scene;

Object.defineProperties(Scene.prototype, {
  game: {
    get: function() {
      return this._game;
    }
  },
});
Scene.prototype._addResources = function() {};
Scene.prototype._loadResources = function() {
  this._game.loader.load(this._init.bind(this));
};
Scene.prototype._init = function() {};
Scene.prototype.update = function() {};
Scene.prototype.dispose = function() {};
