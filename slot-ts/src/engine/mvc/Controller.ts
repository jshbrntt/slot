import { Model } from './Model';
import { View } from './View';

export class Controller {
    protected _model: Model;
    protected _view: View;

    constructor(
        protected model: Model,
        protected view: View
    ) {
        this._model = model;
        this._view = view;
    }
}
