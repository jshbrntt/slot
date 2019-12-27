import { AssetManager, AssetManifest } from '../../stubs/AssetManager';
import { EnterFrameEvent } from '../../stubs/EnterFrameEvent';
import { Scene } from './Scene';
import { Sprite } from '../../stubs/Sprite';
import { Starling } from '../../stubs/Starling';
import { StubEvent } from '../../stubs/StubEvent';

export class Game extends Sprite {
  private _assets: AssetManager;
  private _debug: boolean = false;
  private _frameCount: number = 0;
  private _frameRate: number = 0;
  private _scene: Scene | null = null;
  private _totalTime: number = 0;

  constructor(assetManifest: AssetManifest, debug: boolean = false) {
    super();
    this._assets = new AssetManager();
    this._assets.verbose = true;
    this._debug = debug;

    this._assets.enqueue(assetManifest);

    Starling.current.addEventListener(
      StubEvent.ROOT_CREATED,
      this.onRootCreated
    );
  }

  private onRootCreated(e: Event): void {
    Starling.current.removeEventListener(
      StubEvent.ROOT_CREATED,
      this.onRootCreated
    );
    if (Starling.current.root === this) {
      this._assets.loadQueue(this.onProgress);
    }
  }

  private onProgress(ratio: number): void {
    if (ratio === 1.0) {
      this.init();
    }
  }

  protected init(): void {
    const { nativeStage } = Starling.current;
    this._frameRate = (nativeStage && nativeStage.frameRate) || 0;
  }

  public update(event: EnterFrameEvent): void {
    this._totalTime += event.passedTime;
    if (++this._frameCount % 60 === 0) {
      this._frameRate = this._frameCount / this._totalTime;
      this._frameCount = this._totalTime = 0;
    }
    if (this._scene) {
      this._scene.update();
    }
  }

  set scene(value: Scene | null) {
    if (this._scene) {
      this.removeChild(this._scene);
      this._scene.dispose();
      this._scene = null;
    }
    this._scene = value;
    if (this._scene) {
      this.addChild(this._scene);
    }
  }

  public dispose(): void {
    this._debug = false;
    if (this._scene) {
      this._scene.dispose();
    }
    this._scene = null;
    this._frameRate = NaN;
    this._totalTime = NaN;
    this._frameCount = 0;
    super.dispose();
  }

  get assets(): AssetManager {
    return this._assets;
  }

  get debug(): boolean {
    return this._debug;
  }

  get frameRate(): number {
    return this._frameRate;
  }

  get scene(): Scene | null {
    return this._scene;
  }
}
