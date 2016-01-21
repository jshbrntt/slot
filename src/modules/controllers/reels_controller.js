var Controller = require('../mvc/controller');

var ReelsController = function(model, view) {
  Controller.call(this, model, view);
  this.this._startReelIndex = 0;
  this._stopReelIndex = 0;
  this._spinning = false;
  this._startTimer = new Tock({
    countdown: true,
    interval: 10,
    complete: this._startNextReel
  });
  this._stopTimer = new Tock({
    countdown: true,
    interval: 10,
    complete: this.stopSpin
  });

  this.onStarting = null;
  this.onStarted = null;
  this.onStopping = null;
  this.onStopped = null;
};

ReelsController.START_DURATION = 600;
ReelsController.STOP_DURATION = 5000;
ReelsController.nextInt = function(max) {
  return Math.floor(Math.random() * max);
};

ReelsController.prototype = Object.create(Controller.prototype);
ReelsController.prototype.constructor = Controller;

ReelsController.prototype.startSpin = function() {
  console.log("controllers.ReelsController.startSpin");
  this._startReelIndex = 0;
  this._startNextReel();
  if (this.onStarting === 'function') {
    this.onStarting();
  }
};

ReelsController.prototype._startNextReel = function() {
  this._startTimer.reset();
  if (this._startReelIndex < view.reelViews.length) {
    console.log("_startNextReel " + this._startReelIndex.toString());
    var reelView = this._view.reelViews[this._startReelIndex];
    reelView.spin();
    this._startReelIndex++;
    this._startTimer.start(ReelsController.START_DURATION);
  } else {
    this._spinStarted();
  }
};

ReelsController.prototype._spinStarted = function() {
  console.log("controllers.ReelsController._spinStarted");
  this._stopTimer.start(ReelsController.STOP_DURATION);
  this._spinning = true;
  if (this.onStarted === 'function') {
    this.onStarted();
  }
};

ReelsController.prototype.stopSpin = function() {
  console.log("controllers.ReelsController.stopSpin");
  this._stopTimer.reset();
  this._stopReelIndex = 0;
  this._stopNextReel();
  if (this.onStopping === 'function') {
    this.onStopping();
  }
};

ReelsController.prototype._stopNextReel = function() {
  if (this._stopReelIndex < view.reelViews.length) {
    console.log("controllers.ReelsController._stopNextReel " + this._stopReelIndex.toString());
    var reelView = view.reelViews[this._stopReelIndex];
    var stopPosition = reelView.model.position + ReelsController.nextInt(reelView.model.iconModels.length);
    reelView.onStopped = this._stopNextReel;
    reelView.stop(stopPosition);
    this._stopReelIndex++;
  } else {
    this._stopTimer.reset();
    _spinFinished();
  }
};

ReelsController.prototype._spinFinished = function() {
  console.log("controllers.ReelsController.spinFinished");
  var result = "";
  for (var reelView in view.reelViews) {
    var iconModel = reelView.iconView(2);
    result += iconModel.id.toString();
  }
  this._spinning = false;
  if (this.onStopped === 'function') {
    this.onStopped(result);
  }
};

ReelsController.prototype.spinning = function() {
  return this._spinning;
};
