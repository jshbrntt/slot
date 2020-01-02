import View from '../engine/mvc/View';
import IconModel from '../models/IconModel';
import ReelModel from '../models/ReelModel';
import IconView from './IconView';
import { Easing, Tween } from '@tweenjs/tween.js';

export default class ReelView extends View {
  private iconsViews: IconView[] = [];
  private tweenCount: number = 0;
  private stopPosition: number = 0;
  public onStopped: Function | null = null;

  constructor(model: ReelModel) {
    super(model);

    this.iconsViews = [];
    this.tweenCount = 0;

    this.setupInitialIcons();
  }

  public stop(stopPosition: number): void {
    this.stopPosition = this.getModel().getLoopingIndex(stopPosition);
  }

  public spin(): void {
    this.shiftReel();
  }

  private shiftReel(): void {
    // Removing bottom out of view icon.
    if (this.iconsViews) {
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

      this.getModel().setPosition(position);

      const newIconModel: IconModel = this.getModel().getIconModel(
        -2 + this.getModel().getPosition()
      );
      const newIconView: IconView = new IconView(newIconModel);

      this.iconsViews.unshift(newIconView);

      this.tweenCount = this.iconsViews.length - 1;
      for (let i: number = 1; i < this.iconsViews.length; i++) {
        const iconView: IconView = this.iconsViews[i];
        const tween: Tween = new Tween(iconView)
          .to({y: iconView.y + iconView.height})
          .easing(Easing.Linear.None);
        tween.onComplete = this.onShiftedReel;
      }
      this.addChild(newIconView);
    }
  }

  private onShiftedReel(): void {
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

  private stopReel(): void {
    this.stopPosition = NaN;
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
      this.iconsViews.push(iconView);
    }
  }

  public getIconView(index: number): IconModel | null {
    if (index < this.iconsViews.length) {
      return this.iconsViews[index].getModel();
    }
    return null;
  }

  protected onUpdated(): void {
    super.onUpdated();
  }

  getModel(): ReelModel {
    return this.model as ReelModel;
  }
}
