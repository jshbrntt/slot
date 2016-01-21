var Engine = require('./core/engine');

function SlotEngine(gameClass, width, height) {
  Engine.call(this, gameClass, width, height);
}
SlotEngine.prototype = Object.create(Engine.prototype);
SlotEngine.prototype.constructor = SlotEngine;
module.exports = SlotEngine;
