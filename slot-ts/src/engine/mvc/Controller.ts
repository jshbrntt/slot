import Model from './Model';
import View from './View';
import DelegatedEventTarget from './DelegatedEventTarget';

export default class Controller extends DelegatedEventTarget {
  constructor(protected model: Model, protected view: View) {
    super();
  }
}
