import Controller from '../engine/mvc/Controller';
import Model from '../engine/mvc/Model';
import View from '../engine/mvc/View';

import TimerEvent from '../stubs/TimerEvent';
import Timer from '../stubs/Timer';
import Signal from '../stubs/Signal';

import IconModel from '../models/IconModel';
import ReelsModel from '../models/ReelsModel';

import ReelView from '../views/ReelView';
import ReelsView from '../views/ReelsView';

export default class ReelsController extends Controller {
  private _startTimer: Timer;
  private _stopTimer: Timer;

  private _startReelIndex: number;
  private _stopReelIndex: number;

  private _starting: Signal;
  private _started: Signal;

  private _stopping: Signal;
  private _stopped: Signal;

  private _spinning: boolean;

  public constructor(model: Model, view: View) {
    super(model, view);

    this._startTimer = new Timer(
      600,
      this.getModel().getReelModels().length - 1
    );
    this._stopTimer = new Timer(5000, 1);

    this._startReelIndex = 0;
    this._stopReelIndex = 0;

    this._starting = new Signal();
    this._started = new Signal();

    this._stopping = new Signal();
    this._stopped = new Signal();

    this._spinning = false;
  }

  public startSpin(event: Event | null = null): void {
    console.log('controllers.ReelsController.startSpin');

    this._startTimer.reset();
    this._startReelIndex = 0;

    this.startNextReel();

    this._starting.dispatch();
  }

  private startNextReel(event: TimerEvent | null = null): void {
    console.log(
      'controllers.ReelsController.startNextReel',
      this._startReelIndex
    );
    const reelView: ReelView = this.getView().getReelViews()[
      this._startReelIndex
    ];
    reelView.spin();
    this._startReelIndex++;

    if (!this._startTimer.running) {
      this._startTimer.addEventListener(TimerEvent.TIMER, this.startNextReel);
      this._startTimer.start();
    }

    if (this._startReelIndex === this.getView().getReelViews().length) {
      this.spinStarted();
    }
  }

  private spinStarted(): void {
    console.log('controllers.ReelsController.spinStarted');
    if (!this._stopTimer.running) {
      this._stopTimer.addEventListener(
        TimerEvent.TIMER_COMPLETE,
        this.stopSpin
      );
      this._stopTimer.start();
    }

    this._started.dispatch();

    this._spinning = true;
  }

  public stopSpin(event: Event | null = null): void {
    console.log('controllers.ReelsController.stopSpin');

    this._stopTimer.removeEventListener(
      TimerEvent.TIMER_COMPLETE,
      this.stopSpin
    );

    this._stopTimer.reset();
    this._stopReelIndex = 0;

    this.stopNextReel();

    this._stopping.dispatch();
  }

  private stopNextReel(): void {
    if (this._stopReelIndex < this.getView().getReelViews().length) {
      console.log(
        'controllers.ReelsController.stopNextReel',
        this._stopReelIndex
      );
      const reelView: ReelView = this.getView().getReelViews()[
        this._stopReelIndex
      ];
      const stopPosition: number =
        reelView.getModel().getPosition() +
        this.randomRange(0, reelView.getModel().getIconModels().length);

      reelView.onStopped = this.stopNextReel;
      reelView.stop(stopPosition);
      this._stopReelIndex++;
    } else {
      this.spinFinished();
    }
  }

  private spinFinished(): void {
    console.log('controllers.ReelsController.spinFinished');

    let spinResult: String = '';
    for (const reelView of this.getView().getReelViews()) {
      const iconModel: IconModel | null = reelView.getIconView(2);
      if (iconModel) {
        spinResult += iconModel.getId().toString();
      }
    }

    this._stopped.dispatch(spinResult);

    this._spinning = false;
  }

  private randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getModel(): ReelsModel {
    return this._model as ReelsModel;
  }

  public getView(): ReelsView {
    return this._view as ReelsView;
  }

  public getStarting(): Signal {
    return this._starting;
  }

  public getStarted(): Signal {
    return this._started;
  }

  public getStopping(): Signal {
    return this._stopping;
  }

  public getStopped(): Signal {
    return this._stopped;
  }

  public getSpinning(): boolean {
    return this._spinning;
  }
}
