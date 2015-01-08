library slot.controller.reels_controller;

import 'dart:async';
import 'dart:math';

import 'package:slot/src/events/reels_event.dart';

import 'package:slot/src/models/reels_model.dart';
import 'package:slot/src/models/icon_model.dart';

import 'package:slot/src/mvc/model.dart';
import 'package:slot/src/mvc/view.dart';
import 'package:slot/src/mvc/controller.dart';

import 'package:slot/src/views/reels_view.dart';
import 'package:slot/src/views/reel_view.dart';

class ReelsController extends Controller {

  static const START_DURATION = const Duration(milliseconds: 600);
  static const STOP_DURATION = const Duration(seconds: 5);

  Timer _startTimer;
  Timer _stopTimer;

  int _startReelIndex;
  int _stopReelIndex;

  bool _spinning;

  Random _random;

  ReelsController(Model model, View view) : super(model, view) {

    _startReelIndex = 0;
    _stopReelIndex = 0;
    _spinning = false;
    _random = new Random();

  }

  void startSpin() {
    print("controllers.ReelsController.startSpin");
    if (_startTimer) {

      _startTimer.cancel();

    }
    _startReelIndex = 0;

    _startNextReel(null);

    dispatchEvent(new ReelsEvent(ReelsEvent.STARTING, false));
  }

  void _startNextReel(Timer timer) {

    if (_startReelIndex < view.reelViews.length) {

      print("controllers.ReelsController._startNextReel " + _startReelIndex.toString());
      ReelView reelView = view.reelViews[_startReelIndex];
      reelView.spin();
      _startReelIndex++;

      if (_startTimer is Null || !_startTimer.isActive) {
        _startTimer = new Timer.periodic(START_DURATION, _startNextReel);

      }

    } else {

      _startTimer.cancel();
      _spinStarted();

    }

  }

  void _spinStarted() {

    print("controllers.ReelsController._spinStarted");

    if (_stopTimer is Null || !_stopTimer.isActive) {
      _stopTimer = new Timer(STOP_DURATION, stopSpin);
    }

    dispatchEvent(new ReelsEvent(ReelsEvent.STARTED, false));

    _spinning = true;

  }

  void stopSpin() {

    print("controllers.ReelsController.stopSpin");

    _stopTimer.cancel();
    _stopReelIndex = 0;
    _stopNextReel();

    dispatchEvent(new ReelsEvent(ReelsEvent.STOPPED, false));

  }

  void _stopNextReel() {

    if (_stopReelIndex < view.reelViews.length) {

      print("controllers.ReelsController._stopNextReel " + _stopReelIndex.toString());

      ReelView reelView = view.reelViews[_stopReelIndex];
      int stopPosition = reelView.model.position + _random.nextInt(reelView.model.iconModels.length);

      reelView.onStopped = _stopNextReel;
      reelView.stop(stopPosition);
      _stopReelIndex++;

    } else {

      _stopTimer.cancel();
      _spinFinished();

    }

  }

  void _spinFinished() {

    print("controllers.ReelsController.spinFinished");

    String spinResult = "";

    for (ReelView reelView in view.reelViews) {

      IconModel iconModel = reelView.iconView(2);
      spinResult += iconModel.id.toString();

    }

    dispatchEvent(new ReelsEvent(ReelsEvent.STOPPED, false));

    _spinning = false;

  }

  ReelsModel get model {

    return super.model as ReelModel;

  }

  ReelsView get view {

    return super.view as ReelsView;

  }


}
