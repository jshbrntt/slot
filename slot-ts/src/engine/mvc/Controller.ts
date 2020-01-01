import Model from './Model';
import View from './View';

export default class Controller {
  constructor(protected model: Model, protected view: View) {}
}
