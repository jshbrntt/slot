import Game from './Game';
import Newable from '../../utils/Newable';
import Stage from 'openfl/display/Stage';

export default class Engine {
  public stage: Stage;

  public constructor(protected GameClass: Newable<Game>) {
    this.stage = new Stage(800, 600, 0xffffff, GameClass);
  }
}
