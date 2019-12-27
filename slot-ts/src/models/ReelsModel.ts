import { IconModel } from '../models/IconModel';
import { ReelModel } from '../models/ReelModel';
import { Model } from '../engine/mvc/Model';

export class ReelsModel extends Model {
    private _reelsConfig: number[][];
    private _reelModels: ReelModel[];

    constructor(reelsConfig: number[][]) {
        super();
        this._reelsConfig = reelsConfig;
        this._reelModels = [];
        this.createReelModels();
    }

    private createReelModels(): void {
        for (const reelConfig of this._reelsConfig) {
            const iconModels: IconModel[] = [];
            for (const iconId of reelConfig) {
                iconModels.push(new IconModel(iconId));
            }
            const reelModel: ReelModel = new ReelModel(iconModels);
            this._reelModels.push(reelModel);
        }
    }

    public  getReelModels(): ReelModel[] {
        return this._reelModels;
    }
}

