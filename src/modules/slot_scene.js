var Scene = require('./core/scene');

function SlotScene(game) {
  Scene.call(this, game);
}
SlotScene.prototype = Object.create(Scene.prototype);
SlotScene.prototype.constructor = SlotScene;
module.exports = SlotScene;
