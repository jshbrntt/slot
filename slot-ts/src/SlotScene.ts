import Scene from './engine/core/Scene';
import ConfigModel from './models/ConfigModel';
import ReelsModel from './models/ReelsModel';
import ReelsView from './views/ReelsView';
import ReelsController from './controllers/ReelsController';
import KeyManager from './utils/KeyManager';
import XML from './stubs/XML';
import StubEvent from './stubs/StubEvent';
import BlurFilter from './stubs/BlurFilter';
import Color from './stubs/Color';
import TextField from 'openfl/text/TextField';
import TextureSmoothing from './stubs/TextureSmoothing';
import Button from './stubs/Button';
import Texture from './stubs/Texture';
import StubImage from './stubs/StubImage';
import Keyboard from 'openfl/ui/Keyboard';
import TextFormat from 'openfl/lib/openfl/text/TextFormat';
import Assets from 'openfl/lib/openfl/utils/Assets';

export default class SlotScene extends Scene {
  private loader: XMLHttpRequest | null = null;
  private configModel: ConfigModel | null = null;
  private reelsModel: ReelsModel | null = null;
  private reelsView: ReelsView | null = null;
  private reelsController: ReelsController | null = null;
  private overlayImage: StubImage | null = null;
  private spinButton: Button | null = null;
  private balanceField: TextField | null = null;
  private balance: number | null = null;
  private errorField: TextField | null = null;
  private config: object;

  protected init(): void {
    super.init();
    this.config = JSON.parse(Assets.getText('config.json'));
    KeyManager.pressed(Keyboard.SPACE, this.onSpinButtonTriggered);
  }

  private displayError(text: string): void {
    this.errorField = new TextField();
    this.errorField.width = 800;
    this.errorField.height = 600;
    this.errorField.text = text;
    this.errorField.embedFonts = true;
    this.errorField.setTextFormat(new TextFormat('Minecraftia', 32, 0xFF0000, true));
    this.addChild(this.errorField);
  }

  private onLoaderComplete(event: Event): void {
    if (this.loader) {
      const xml: XML = new XML(this.loader.response);
      this.configModel = new ConfigModel(xml);

      this.setupReels();
      this.setupOverlay();
      this.setupButtons();
      this.setupScore();
    }
  }

  private setupReels(): void {
    if (this.configModel) {
      this.reelsModel = new ReelsModel(this.configModel.getReels());
      this.reelsView = new ReelsView(this.reelsModel);
      this.reelsController = new ReelsController(
        this.reelsModel,
        this.reelsView
      );

      this.addChild(this.reelsView);
    }
  }

  private setupOverlay(): void {
    this.overlayImage = new StubImage(
      this.game.assets.getTexture('ui_overlay')
    );
    if (this.overlayImage) {
      this.overlayImage.smoothing = TextureSmoothing.NONE;
      this.overlayImage.scaleX = this.overlayImage.scaleY = 6;
    }

    this.addChild(this.overlayImage);
  }

  private setupButtons(): void {
    const btnUpTexture: Texture = this.game.assets.getTexture('ui_spin_up');
    const btnDownTexture: Texture = this.game.assets.getTexture('ui_spin_down');

    this.spinButton = new Button(btnUpTexture, '', btnDownTexture);
    const outer = this.spinButton.getChildAt(0);
    if (outer) {
      const inner = outer.getChildAt(0) as StubImage;
      if (inner) {
        inner.smoothing = TextureSmoothing.NONE;
        this.spinButton.scaleX = this.spinButton.scaleY = 6;
        this.spinButton.x = 590;
        this.spinButton.y = 54;
        this.spinButton.addEventListener(
          StubEvent.TRIGGERED,
          this.onSpinButtonTriggered
        );

        this.addChild(this.spinButton);
      }
    }
  }

  private setupScore(): void {
    // this._currencyFormatter = new CurrencyFormatter('en-GB');
    // this._currencyFormatter.setCurrency('GBP', '£');
    // this._currencyFormatter.trailingZeros = true;

    this.balance = 0;

    this.balanceField = new TextField(
      170,
      100,
      'BALANCE:\n' + this.getBalanceFormatted(),
      'Minecraftia',
      40,
      Color.RED
    );
    this.balanceField.bold = true;
    this.balanceField.autoScale = true;
    this.balanceField.x = 604;
    this.balanceField.y = 214;
    this.balanceField.filter = BlurFilter.createDropShadow(6, 0.785, 0, 1, 0);

    this.addChild(this.balanceField);
  }

  private onSpinButtonTriggered(event: Event | null = null): void {
    if (this.spinButton && this.reelsController) {
      if (this.spinButton.enabled) {
        if (this.reelsController.getSpinning()) {
          this.reelsController.getStopping().addOnce(this.onReelsStopping);
          this.reelsController.stopSpin();
        } else {
          this.reelsController.getStarting().addOnce(this.onReelsStarting);
          this.reelsController.startSpin();
        }
      }
    }
  }

  private getBalanceFormatted(): string {
    const balance = this.balance || 0;
    return balance.toLocaleString(window.navigator.language, {
      style: 'currency',
      currency: 'GBP'
    });
  }

  private onReelsStarting(): void {
    if (this.reelsController && this.spinButton) {
      this.reelsController.getStarted().addOnce(this.onReelsStarted);
      this.spinButton.enabled = false;
    }
  }

  private onReelsStarted(): void {
    if (this.reelsController && this.spinButton) {
      this.reelsController.getStopping().addOnce(this.onReelsStopping);
      this.spinButton.enabled = true;
    }
  }

  private onReelsStopping(): void {
    if (this.reelsController && this.spinButton) {
      this.reelsController.getStopped().addOnce(this.onReelsStopped);
      this.spinButton.enabled = false;
    }
  }

  private onReelsStopped(spinResult: string): void {
    if (
      this.configModel &&
      this.reelsController &&
      this.spinButton &&
      this.balance &&
      this.balanceField
    ) {
      this.spinButton.enabled = true;

      if (this.configModel.getPrizes()[spinResult]) {
        const prize: number = this.configModel.getPrizes()[spinResult];
        this.balance += prize;
        this.balanceField.text = 'BALANCE:\n' + this.getBalanceFormatted();
      }
    }
  }
}
