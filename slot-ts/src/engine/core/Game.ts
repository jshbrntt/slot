import AssetLibrary from 'openfl/utils/AssetLibrary';
import AssetManifest from 'openfl/utils/AssetManifest';
import Assets from 'openfl/utils/Assets';
import Sprite from 'openfl/display/Sprite';
import Event from 'openfl/events/Event';
import Scene from './Scene';
import TWEEN from '@tweenjs/tween.js';

export default class Game extends Sprite {
  public constructor(
    protected manifest: AssetManifest,
    protected debug: boolean = false,
    protected frameCount: number = 0,
    protected frameRate: number = 0,
    protected scene: Scene | null = null,
    protected passedTime: number = 0,
    protected totalTime: number = 0,
    protected paused: boolean = true
  ) {
    super();
    this.load();
  }

  private load(): void {
    AssetLibrary.loadFromManifest(this.manifest)
      .onComplete(library => {
        Assets.registerLibrary('default', library);
        this.init();
      })
      .onError(error => {
        console.error(error);
      });
  }

  protected init(): void {
    this.unpause();
    this.addEventListener(Event.ENTER_FRAME, () => this.onEnterFrame);
  }

  protected onEnterFrame(event: Event) {
    this.update();
  }

  public togglePause(): void {
    if (this.paused) {
      this.unpause();
    } else {
      this.pause();
    }
  }

  public pause(): void {
    this.paused = true;
  }

  public unpause(): void {
    this.paused = false;
  }

  public update(): void {
    this.passedTime = Date.now() - this.totalTime;
    this.totalTime += this.passedTime;
    console.log('update', this.passedTime, this.totalTime);
    if (this.frameCount++ % 60 === 0) {
      this.frameRate = this.frameCount / this.totalTime;
      this.frameCount = this.totalTime = 0;
    }
    if (this.scene) {
      this.scene.update();
      TWEEN.update(this.totalTime);
    }
  }

  public setScene(scene: Scene) {
    if (this.scene) {
      this.removeChild(this.scene);
      this.scene.dispose();
      this.scene = null;
    }
    this.scene = scene;
    this.addChild(this.scene);
  }
}
