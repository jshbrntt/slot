library slot.controller.reels_controller;

import 'package:slot/src/mvc/model.dart';
import 'package:slot/src/mvc/view.dart';
import 'package:slot/src/mvc/controller.dart';

import 'package:slot/src/models/reels_model.dart';
import 'package:slot/src/views/reels_view.dart';
import 'package:slot/src/views/reel_view.dart';

class ReelsController extends Controller {


  static const String STARTING = 'starting';
  static const String STARTED = 'starting';

  static const String STOPPING = 'stopping';
  static const String STOPPED = 'stopped';

  static const START_DURATION = const Duration(milliseconds: 600);
  static const STOP_DURATION = const Duration(seconds: 5);

  Timer _startTimer;
  Timer _stopTimer;

  int _startReelIndex;
  int _stopReelIndex;

  bool _spinning;

  ReelsController(Model model, View view) : super(model, view) {

    _startReelIndex = 0;
    _stopReelIndex = 0;

    _spinning = false;

  }

  void startSpin(Event e) {
    _startTimer.cancel();
    _startReelIndex = 0;

    startNextReel();

    dispatchEvent(ReelsController.STARTING);
  }

  void startNextReel({Timer t}) {

    ReelView = this._startReelIndex++;

    if (!_startTimer.isActive) {
      _startTimer = new Timer.periodic(START_DURATION, startNextReel);
    }

    if (_startReelIndex == view.reelViews.length) {
      spinStarted();
    }

  }

  void spinStarted() {

    if (!_stopTimer.isActive) {
      _stopTimer.cancel();
      _stopTimer = new Timer(STOP_DURATION, stopSpin);
    }

    dispatchEvent(STARTED);

    _spinning = true;

  }

  void stopSpin() {

    _stopTimer.cancel();
    _stopReelIndex = 0;
    stopNextReel();
    dispatchEvent(STOPPING);

  }

  void stopNextReel() {

    if (_stopReelIndex < view.reelViews.length) {

      ReelView reelView = view.reelViews[_stopReelIndex];
//      int stopPosition = reelView.

    }

  }

  void spinFinished() {

  }

  ReelsModel get model {

    return _model as ReelModel;

  }

  ReelsView get view {

    return _view as ReelsView;

  }


}
