import Model from '../engine/mvc/Model';
import IconModel from './IconModel';

export default class ReelModel extends Model {
    static SPINNING = 'ReelModel.SPINNING';
    private iconModels: IconModel[];
    private position: number;

    constructor(iconModels: IconModel[]) {
        super();
        this.iconModels = iconModels;
        this.position = 0;
    }

    public  getLoopingIndex(index: number): number {
        return index - this.iconModels.length * Math.floor(index / this.iconModels.length);
    }

    public  getIconModel(index: number): IconModel {
        return this.iconModels[this.getLoopingIndex(index)];
    }

    public  setPosition(value: number): void {
        this.position = value;
    }

    public  getPosition(): number {
        return this.position;
    }

    public  getIconModels(): IconModel[] {
        return this.iconModels;
    }
}

