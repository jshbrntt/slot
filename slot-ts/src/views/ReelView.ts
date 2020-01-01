import View from '../engine/mvc/View';
import IconModel from '../models/IconModel';
import ReelModel from '../models/ReelModel';
import Transitions from '../stubs/Transitions';
import Tween from '../stubs/Tween';
import IconView from './IconView';
import Starling from '../stubs/Starling';
import SlotGame from '../SlotGame';

export default class ReelView extends View {
  private _game: SlotGame;
  private _iconsViews: IconView[] = [];
  private _tweenCount: number = 0;
  private _stopPosition: number = 0;
  private _onStopped: Function | null = null;

  constructor(model: ReelModel) {
    super(model);

    this._game = Starling.current.root as SlotGame;
    this._iconsViews = [];
    this._tweenCount = 0;

    this.setupInitialIcons();
  }

  public stop(stopPosition: number): void {
    this._stopPosition = this.getModel().getLoopingIndex(stopPosition);
  }

  public spin(): void {
    this.shiftReel();
  }

  private shiftReel(): void {
    // Removing bottom out of view icon.
    if (this._iconsViews) {
      const iconView = this._iconsViews.pop();

      if (iconView) {
        this.removeChild(iconView);
      }

      // Moving the position of the reel one forward.
      let position: number = this.getModel().getPosition();
      position++;

      // Reseting the reel position back to the start if new position is out of bounds.
      if (position === this.getModel().getIconModels().length) {
        position = 0;
      }

      this.getModel().setPosition(position);

      const newIconModel: IconModel = this.getModel().getIconModel(
        -2 + this.getModel().getPosition()
      );
      const newIconView: IconView = new IconView(newIconModel);

      this._iconsViews.unshift(newIconView);

      this._tweenCount = this._iconsViews.length - 1;
      for (let i: number = 1; i < this._iconsViews.length; i++) {
        const iconView: IconView = this._iconsViews[i];
        const tween: Tween = new Tween(iconView, 0.1, Transitions.LINEAR);
        tween.onComplete = this.onShiftedReel;
        tween.animate('y', iconView.y + iconView.height);
        Starling.juggler.add(tween);
      }
      this.addChild(newIconView);
    }
  }

  private onShiftedReel(): void {
    this._tweenCount--;
    if (this._tweenCount === 0) {
      // Stop spinning condition.
      if (this.getModel().getPosition() === this._stopPosition) {
        this.stopReel();
      } else {
        this.shiftReel();
      }
    }
  }

  private stopReel(): void {
    this._stopPosition = NaN;
    if (this.onStopped) {
      this.onStopped.apply(this);
    }
  }

  private setupInitialIcons(): void {
    for (let i: number = -2; i <= 2; i++) {
      const iconView: IconView = new IconView(
        this.getModel().getIconModel(i + this.getModel().getPosition())
      );
      this.addChild(iconView);
      iconView.y = (i + 2) * iconView.height;
      this._iconsViews.push(iconView);
    }
  }

  public getIconView(index: number): IconModel | null {
    if (index < this._iconsViews.length) {
      return this._iconsViews[index].getModel();
    }
    return null;
  }

  protected onUpdated(): void {
    super.onUpdated();
  }

  getModel(): ReelModel {
    return this._model as ReelModel;
  }

  get onStopped(): Function | null {
    return this._onStopped;
  }

  set onStopped(value: Function | null) {
    this._onStopped = value;
  }
}
