import Controller from '../engine/mvc/Controller';
import Model from '../engine/mvc/Model';
import View from '../engine/mvc/View';

import Timer from 'openfl/utils/Timer';
import TimerEvent from 'openfl/events/TimerEvent';

import IconModel from '../models/IconModel';
import ReelsModel from '../models/ReelsModel';

import ReelView from '../views/ReelView';
import ReelsView from '../views/ReelsView';

export default class ReelsController extends Controller {
  static STARTING: string = 'ReelsController.STARTING';
  static STARTED: string = 'ReelsController.STARTED';
  static STOPPING: string = 'ReelsController.STOPPING';
  static STOPPED: string = 'ReelsController.STOPPED';

  private startTimer: Timer;
  private stopTimer: Timer;

  private startReelIndex: number;
  private stopReelIndex: number;
  private spinResult: string | null;

  private spinning: boolean;

  public constructor(model: Model, view: View) {
    super(model, view);
    this.startTimer = new Timer(
      600,
      this.getModel().getReelModels().length - 1
    );
    this.stopTimer = new Timer(5000, 1);
    this.startReelIndex = 0;
    this.stopReelIndex = 0;
    this.spinning = false;
  }

  public startSpin = (event: Event | null = null): void => {
    this.startTimer.reset();
    this.startReelIndex = 0;
    this.startNextReel();
    this.dispatchEvent(new Event(ReelsController.STARTING));
  }

  private startNextReel = (event: TimerEvent | null = null): void => {
    if (this.startTimer.running) {
      this.startTimer.stop();
      this.startTimer.removeEventListener(TimerEvent.TIMER, this.startNextReel);
    }
    const reelViews: ReelView[] = this.getView().getReelViews();
    const reelView: ReelView = reelViews[this.startReelIndex];
    reelView.spin();
    this.startReelIndex++;
    if (this.startReelIndex < reelViews.length) {
      this.startTimer.addEventListener(TimerEvent.TIMER, this.startNextReel);
      this.startTimer.start();
    } else {
      this.spinStarted();
    }
  }

  private spinStarted = (): void => {
    if (!this.stopTimer.running) {
      this.stopTimer.addEventListener(TimerEvent.TIMER_COMPLETE, () =>
        this.stopSpin()
      );
      this.stopTimer.start();
    }
    this.dispatchEvent(new Event(ReelsController.STARTED));
    this.spinning = true;
  }

  public stopSpin = (event: Event | null = null): void => {
    this.stopTimer.removeEventListener(
      TimerEvent.TIMER_COMPLETE,
      this.stopSpin
    );
    this.stopTimer.reset();
    this.stopReelIndex = 0;
    this.stopNextReel();
    this.dispatchEvent(new Event(ReelsController.STOPPING));
  }

  private stopNextReel = (): void => {
    if (this.stopReelIndex < this.getView().getReelViews().length) {
      const reelView: ReelView = this.getView().getReelViews()[
        this.stopReelIndex
      ];
      const stopPosition: number =
        reelView.getModel().getPosition() +
        this.randomRange(0, reelView.getModel().getIconModels().length);

      reelView.onStopped = this.stopNextReel;
      reelView.stop(stopPosition);
      this.stopReelIndex++;
    } else {
      this.spinFinished();
    }
  }

  private spinFinished = (): void => {
    this.spinResult = null;
    for (const reelView of this.getView().getReelViews()) {
      const iconModel: IconModel | null = reelView.getIconView(2);
      if (iconModel) {
        this.spinResult += iconModel.getId().toString();
      }
    }
    this.dispatchEvent(new Event(ReelsController.STOPPED));
    this.spinning = false;
  }

  private randomRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getModel(): ReelsModel {
    return this.model as ReelsModel;
  }

  public getView(): ReelsView {
    return this.view as ReelsView;
  }

  public getSpinResult(): string | null {
    return this.spinResult;
  }

  public getSpinning(): boolean {
    return this.spinning;
  }
}
