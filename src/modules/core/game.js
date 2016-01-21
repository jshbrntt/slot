var PIXI = require('pixi');

function Game(renderer) {
  PIXI.Container.call(this);
  this._renderer = renderer;
  this._loader = new PIXI.loaders.Loader();
  this._scene = null;
}
Game.prototype = Object.create(PIXI.Container.prototype);
Game.prototype.constructor = Game;
module.exports = Game;

Object.defineProperties(Game.prototype, {
  loader: {
    get: function() {
      return this._loader;
    }
  },
  scene: {
    get: function() {
      return this._scene;
    },
    set: function(value) {
      if (!this._scene) {
        this.removeChild(this._scene);
        this._scene = null;
      }
      this._scene = value;
      if (!this._scene) {
        this.addChild(this._scene);
      }
    }
  }
});
Game.prototype._animate = function() {
  this._update();
  this._render();
  window.requestAnimationFrame(this._animate.bind(this));
};
Game.prototype._update = function() {
  if (this._scene) {
    this._scene.update();
  }
};
Game.prototype._render = function() {
  this._renderer.render(this);
};
