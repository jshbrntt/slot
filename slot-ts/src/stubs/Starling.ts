import { Rectangle } from './Rectangle';
import { Stage } from './Stage';
import { Newable } from '../utils/Newable';
import { Game } from '../engine/core/Game';
import { DisplayObjectContainer } from './DisplayObjectContainer';
import { Tween } from './Tween';

class AnimationJuggler {
  public add(tween: Tween) {}
}

export class Starling extends EventTarget {
  static current: Starling;
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
