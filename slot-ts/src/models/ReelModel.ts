import { Signal } from '../stubs/Signal';
import { Model } from '../engine/mvc/Model';
import { IconModel } from './IconModel';

export class ReelModel extends Model {
    private _iconModels: IconModel[];
    private _spinning: Signal;
    private _position: number;

    constructor(iconModels: IconModel[]) {
        super();
        this._iconModels = iconModels;
        this._spinning = new Signal();
        this._position = 0;
    }

    public  getLoopingIndex(index: number): number {
        return index - this._iconModels.length * Math.floor(index / this._iconModels.length);
    }

    public  getIconModel(index: number): IconModel {
        return this._iconModels[this.getLoopingIndex(index)];
    }

    public  setPosition(value: number): void {
        this._position = value;
    }

    public  getPosition(): number {
        return this._position;
    }

    public  getIconModels(): IconModel[] {
        return this._iconModels;
    }
}

