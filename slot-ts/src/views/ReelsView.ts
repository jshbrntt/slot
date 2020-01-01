import Model from '../engine/mvc/Model';
import View from '../engine/mvc/View';
import ReelModel from '../models/ReelModel';
import ReelsModel from '../models/ReelsModel';
import ReelView from './ReelView';

export default class ReelsView extends View {
  private reelViews: ReelView[];

  constructor(model: Model) {
    super(model);
    this.reelViews = [];
    this.createReelViews();
  }

  private createReelViews(): void {
    const reelModels: ReelModel[] = this.getModel().getReelModels();

    for (const reelModel of reelModels) {
      const reelView: ReelView = new ReelView(reelModel);
      reelView.scaleX = reelView.scaleY = 6;
      reelView.x = reelModels.indexOf(reelModel) * reelView.width + 40;
      reelView.y = -130;
      this.addChild(reelView);

      this.reelViews.push(reelView);
    }
  }

  public getReelViews(): ReelView[] {
    return this.reelViews;
  }

  public getModel(): ReelsModel {
    return this.model as ReelsModel;
  }
}
