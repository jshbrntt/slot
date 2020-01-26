import Actuate from 'motion/Actuate';
import Linear from 'motion/easing/Linear';
import View from '../engine/mvc/View';
import IconModel from '../models/IconModel';
import ReelModel from '../models/ReelModel';
import IconView from './IconView';

export default class ReelView extends View {
  private iconsViews: IconView[] = [];
  private tweenCount: number = 0;
  private stopPosition: number = NaN;
  public onStopped: Function | null = null;

  constructor(model: ReelModel) {
    super(model);

    this.iconsViews = [];
    this.tweenCount = 0;

    this.setupInitialIcons();
  }

  public stop = (stopPosition: number): void => {
    this.stopPosition = this.getModel().getLoopingIndex(stopPosition);
  }

  public spin = (): void => {
    this.shiftReel();
  }

  private shiftReel = (): void => {
    if (this.iconsViews) {
      // Removing last icon at the bottom of the reel.
      const iconView = this.iconsViews.pop();
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

      // Apply the new limited position to the reel.
      this.getModel().setPosition(position);

      // Adding the next icon at the top of the reel.
      const newIconModel: IconModel = this.getModel().getIconModel(
        -2 + this.getModel().getPosition()
      );
      const newIconView: IconView = new IconView(newIconModel);
      this.iconsViews.unshift(newIconView);

      this.tweenCount = this.iconsViews.length - 1;
      for (let i: number = 1; i < this.iconsViews.length; i++) {
        const iconView: IconView = this.iconsViews[i];
        Actuate.tween(iconView, 0.2, { y: iconView.y + iconView.height })
          .ease(Linear.easeNone)
          .onComplete(this.onShiftedReel);
      }
      this.addChild(newIconView);
    }
  }

  private onShiftedReel = (): void => {
    this.tweenCount--;
    if (this.tweenCount === 0) {
      // Stop spinning condition.
      if (this.getModel().getPosition() === this.stopPosition) {
        this.stopReel();
      } else {
        this.shiftReel();
      }
    }
  }

  private stopReel = (): void => {
    this.stopPosition = NaN;
    if (this.onStopped) {
      this.onStopped.apply(this);
    }
  }

  private setupInitialIcons = (): void => {
    for (let i: number = -2; i <= 2; i++) {
      const iconModel: IconModel = this.getModel().getIconModel(i + this.getModel().getPosition());
      const iconView: IconView = new IconView(iconModel);
      this.addChild(iconView);
      iconView.y = (i + 2) * iconView.height;
      this.iconsViews.push(iconView);
    }
  }

  public getIconView = (index: number): IconModel | null => {
    if (index < this.iconsViews.length) {
      return this.iconsViews[index].getModel();
    }
    return null;
  }

  protected onUpdated = (): void => {
    super.onUpdated();
  }

  getModel(): ReelModel {
    return this.model as ReelModel;
  }
}
