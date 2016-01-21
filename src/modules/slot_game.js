var Game = require('./core/game');
var SlotScene = require('./slot_scene');

function SlotGame(renderer) {
  Game.call(this, renderer);
  this.scene = new SlotScene(this);
}
SlotGame.prototype = Object.create(Game.prototype);
SlotGame.prototype.constructor = SlotGame;
module.exports = SlotGame;
