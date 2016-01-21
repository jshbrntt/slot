var PIXI = require('pixi');

function Engine(gameClass, width, height) {
  this._gameClass = gameClass;
  this._renderer = new PIXI.autoDetectRenderer(width, height);
  this._renderer.autoResize = true;
  this._game = new this._gameClass(this._renderer);
  document.body.appendChild(this._renderer.view);
}

module.exports = Engine;
