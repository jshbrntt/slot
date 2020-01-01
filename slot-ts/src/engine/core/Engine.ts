import Game from './Game';
import Newable from '../../utils/Newable';

export default class Engine {
  protected game: Game;

  public constructor(protected GameClass: Newable<Game>) {
    this.game = new GameClass();
  }
}
