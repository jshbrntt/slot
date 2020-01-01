import Model from './Model';
import View from './View';

export default class Controller extends EventTarget {
  constructor(protected model: Model, protected view: View) {
    super();
  }
}
