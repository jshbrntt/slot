import Rectangle from './Rectangle';
import Stage from './Stage';
import Newable from '../utils/Newable';
import Game from '../engine/core/Game';
import DisplayObjectContainer from './DisplayObjectContainer';
import Tween from './Tween';
import StubEvent from './StubEvent';

class AnimationJuggler {
  public add(tween: Tween) {}
}

export default class Starling extends EventTarget {
  static _current: Starling;
  public root: DisplayObjectContainer | null = null;
  public isStarted: boolean;
  static juggler: AnimationJuggler = new AnimationJuggler();
  constructor(
    private gameClass: Newable<Game>,
    public nativeStage: Stage,
    private viewPort: Rectangle
  ) {
    super();
    this.isStarted = false;
    Starling._current = this;
    this.root = new this.gameClass();
    this.dispatchEvent(new StubEvent(StubEvent.ROOT_CREATED));
  }
  static get current(): Starling {
    return this._current;
  }
  public start(): void {
    this.isStarted = true;
  }
  public stop(): void {
    this.isStarted = false;
  }
  public dispose(): void {
    this.stop();
  }
}
