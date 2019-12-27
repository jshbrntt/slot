import { Scene } from './engine/core/Scene';
import { ConfigModel } from './models/ConfigModel';
import { ReelsModel } from './models/ReelsModel';
import { ReelsView } from './views/ReelsView';
import { ReelsController } from './controllers/ReelsController';
import { SlotGame } from './SlotGame';
import { KeyManager } from './utils/KeyManager';
import { Key } from './utils/Key';
import { XML } from './stubs/XML';
import { StubEvent } from './stubs/StubEvent';
import { BlurFilter } from './stubs/BlurFilter';
import { Color } from './stubs/Color';
import { TextField } from './stubs/TextField';
import { TextureSmoothing } from './stubs/TextureSmoothing';
import { Button } from './stubs/Button';
import { Texture } from './stubs/Texture';
import { StubImage } from './stubs/StubImage';

export class SlotScene extends Scene {
  private _loader: XMLHttpRequest | null = null;
  private _configModel: ConfigModel | null = null;

  private _reelsModel: ReelsModel | null = null;
  private _reelsView: ReelsView | null = null;
  private _reelsController: ReelsController | null = null;

  private _overlayImage: StubImage | null = null;
  private _spinButton: Button | null = null;

  private _balanceField: TextField | null = null;
  private _balance: number | null = null;
  private _errorField: TextField | null = null;

  constructor(game: SlotGame) {
    super(game);
  }

  protected init(): void {
    super.init();

    this.loadConfig('./config.xml');

    KeyManager.pressed(Key.SPACE, this.onSpinButtonTriggered);
  }

  private loadConfig(url: string): void {
    this._loader = new XMLHttpRequest();
    this._loader.onload = event => this.onLoaderComplete(event);
    this._loader.onerror = event => this.onLoaderError(event);

    try {
      this._loader.open('GET', url);
    } catch (error) {
      this.displayError('A SecurityError has occurred.');
    }
  }

  private displayError(text: string): void {
    this._errorField = new TextField(
      window.stage.stageWidth,
      window.stage.stageHeight,
      text
    );

    if (this._errorField) {
      this._errorField.fontName = 'Minecraftia';
      this._errorField.autoScale = true;
      this._errorField.fontSize = 32;
      this._errorField.color = Color.RED;
      this._errorField.bold = true;

      this.addChild(this._errorField);
    }
  }

  private onLoaderError(event: StubEvent): void {
    this.displayError(
      'Failed to load configuration.\nCopy\n/config-template/config.template.xml\nto\n/bin/config.xml'
    );
  }

  private onLoaderComplete(event: Event): void {
    if (this._loader) {
      const xml: XML = new XML(this._loader.response);
      this._configModel = new ConfigModel(xml);

      this.setupReels();
      this.setupOverlay();
      this.setupButtons();
      this.setupScore();
    }
  }

  private setupReels(): void {
    if (this._configModel) {
      this._reelsModel = new ReelsModel(this._configModel.getReels());
      this._reelsView = new ReelsView(this._reelsModel);
      this._reelsController = new ReelsController(
        this._reelsModel,
        this._reelsView
      );

      this.addChild(this._reelsView);
    }
  }

  private setupOverlay(): void {
    this._overlayImage = new StubImage(
      this.game.assets.getTexture('ui_overlay')
    );
    if (this._overlayImage) {
      this._overlayImage.smoothing = TextureSmoothing.NONE;
      this._overlayImage.scaleX = this._overlayImage.scaleY = 6;
    }

    this.addChild(this._overlayImage);
  }

  private setupButtons(): void {
    const btnUpTexture: Texture = this.game.assets.getTexture('ui_spin_up');
    const btnDownTexture: Texture = this.game.assets.getTexture('ui_spin_down');

    this._spinButton = new Button(btnUpTexture, '', btnDownTexture);
    const outer = this._spinButton.getChildAt(0);
    if (outer) {
      const inner = outer.getChildAt(0) as StubImage;
      if (inner) {
        inner.smoothing = TextureSmoothing.NONE;
        this._spinButton.scaleX = this._spinButton.scaleY = 6;
        this._spinButton.x = 590;
        this._spinButton.y = 54;
        this._spinButton.addEventListener(
          StubEvent.TRIGGERED,
          this.onSpinButtonTriggered
        );

        this.addChild(this._spinButton);
      }
    }
  }

  private setupScore(): void {
    // this._currencyFormatter = new CurrencyFormatter('en-GB');
    // this._currencyFormatter.setCurrency('GBP', '£');
    // this._currencyFormatter.trailingZeros = true;

    this._balance = 0;

    this._balanceField = new TextField(
      170,
      100,
      'BALANCE:\n' + this.getBalanceFormatted(),
      'Minecraftia',
      40,
      Color.RED
    );
    this._balanceField.bold = true;
    this._balanceField.autoScale = true;
    this._balanceField.x = 604;
    this._balanceField.y = 214;
    this._balanceField.filter = BlurFilter.createDropShadow(6, 0.785, 0, 1, 0);

    this.addChild(this._balanceField);
  }

  private onSpinButtonTriggered(event: Event | null = null): void {
    if (this._spinButton && this._reelsController) {
      if (this._spinButton.enabled) {
        if (this._reelsController.getSpinning()) {
          this._reelsController.getStopping().addOnce(this.onReelsStopping);
          this._reelsController.stopSpin();
        } else {
          this._reelsController.getStarting().addOnce(this.onReelsStarting);
          this._reelsController.startSpin();
        }
      }
    }
  }

  private getBalanceFormatted(): string {
    const balance = this._balance || 0;
    return balance.toLocaleString(window.navigator.language, {
      style: 'currency',
      currency: 'GBP'
    });
  }

  private onReelsStarting(): void {
    if (this._reelsController && this._spinButton) {
      this._reelsController.getStarted().addOnce(this.onReelsStarted);
      this._spinButton.enabled = false;
    }
  }

  private onReelsStarted(): void {
    if (this._reelsController && this._spinButton) {
      this._reelsController.getStopping().addOnce(this.onReelsStopping);
      this._spinButton.enabled = true;
    }
  }

  private onReelsStopping(): void {
    if (this._reelsController && this._spinButton) {
      this._reelsController.getStopped().addOnce(this.onReelsStopped);
      this._spinButton.enabled = false;
    }
  }

  private onReelsStopped(spinResult: string): void {
    if (
      this._configModel &&
      this._reelsController &&
      this._spinButton &&
      this._balance &&
      this._balanceField
    ) {
      this._spinButton.enabled = true;

      if (this._configModel.getPrizes()[spinResult]) {
        const prize: number = this._configModel.getPrizes()[spinResult];
        this._balance += prize;
        this._balanceField.text = 'BALANCE:\n' + this.getBalanceFormatted();
      }
    }
  }
}
