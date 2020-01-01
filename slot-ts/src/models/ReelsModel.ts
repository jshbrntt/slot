import IconModel from '../models/IconModel';
import ReelModel from '../models/ReelModel';
import Model from '../engine/mvc/Model';

export default class ReelsModel extends Model {
    private reelsConfig: number[][];
    private reelModels: ReelModel[];

    constructor(reelsConfig: number[][]) {
        super();
        this.reelsConfig = reelsConfig;
        this.reelModels = [];
        this.createReelModels();
    }

    private createReelModels(): void {
        for (const reelConfig of this.reelsConfig) {
            const iconModels: IconModel[] = [];
            for (const iconId of reelConfig) {
                iconModels.push(new IconModel(iconId));
            }
            const reelModel: ReelModel = new ReelModel(iconModels);
            this.reelModels.push(reelModel);
        }
    }

    public  getReelModels(): ReelModel[] {
        return this.reelModels;
    }
}

