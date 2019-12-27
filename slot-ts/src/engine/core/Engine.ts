import { Game } from './Game';
import { Sprite } from '../../stubs/Sprite';
import { Stage } from '../../stubs/Stage';
import { Rectangle } from '../../stubs/Rectangle';
import { Starling } from '../../stubs/Starling';
import { Newable } from '../../utils/Newable';

export class Engine extends Sprite {
  static _starling: Starling | null;

  static _gameClass: Newable<Game> | null;
  static _nativeStage: Stage | null;
  static _viewPort: Rectangle | null;

  constructor(
    gameClass: Newable<Game>,
    viewPort: Rectangle,
    nativeStage: Stage
  ) {
    super();
    Engine._gameClass = gameClass;
    Engine._viewPort = viewPort;
    Engine._nativeStage = nativeStage;
    Engine._starling = new Starling(
      Engine._gameClass,
      Engine._nativeStage,
      Engine._viewPort
    );
  }

  protected start(): void {
    if (Engine._starling && !Engine._starling.isStarted) {
      Engine._starling.start();
    }
  }

  protected stop(): void {
    if (Engine._starling && Engine._starling.isStarted) {
      Engine._starling.stop();
    }
  }

  get starling(): Starling | null {
    return Engine._starling;
  }

  get nativeStage(): Stage | null {
    return Engine._nativeStage;
  }

  public dispose(): void {
    Engine._gameClass = null;
    Engine._viewPort = null;
    Engine._nativeStage = null;
    if (Engine._starling) {
      Engine._starling.dispose();
    }
    Engine._starling = null;
  }
}
