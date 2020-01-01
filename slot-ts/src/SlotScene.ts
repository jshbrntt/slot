import Assets from 'openfl/lib/openfl/utils/Assets';
import Bitmap from 'openfl/lib/openfl/display/Bitmap';
import ConfigModel from './models/ConfigModel';
import Keyboard from 'openfl/lib/openfl/ui/Keyboard';
import KeyManager from './utils/KeyManager';
import MouseEvent from 'openfl/lib/openfl/events/MouseEvent';
import ReelsController from './controllers/ReelsController';
import ReelsModel from './models/ReelsModel';
import ReelsView from './views/ReelsView';
import Scene from './engine/core/Scene';
import SimpleButton from 'openfl/lib/openfl/display/SimpleButton';
import SlotAssets from './SlotAssets';
import TextField from 'openfl/lib/openfl/text/TextField';
import TextFormat from 'openfl/lib/openfl/text/TextFormat';
import XML from './stubs/XML';

export default class SlotScene extends Scene {
  private loader: XMLHttpRequest | null = null;
  private configModel: ConfigModel | null = null;
  private reelsModel: ReelsModel | null = null;
  private reelsView: ReelsView | null = null;
  private reelsController: ReelsController | null = null;
  private overlayBitmap: Bitmap | null = null;
  private spinButton: SimpleButton | null = null;
  private balanceField: TextField | null = null;
  private balance: number | null = null;
  private errorField: TextField | null = null;
  private config: object;

  protected init(): void {
    super.init();
    this.config = JSON.parse(Assets.getText('config.json'));
    KeyManager.pressed(Keyboard.SPACE, this.onSpinButtonTriggered);
    this.setup();
  }

  private displayError(text: string): void {
    this.errorField = new TextField();
    this.errorField.width = 800;
    this.errorField.height = 600;
    this.errorField.text = text;
    this.errorField.embedFonts = true;
    this.errorField.setTextFormat(
      new TextFormat('Minecraftia', 32, 0xff0000, true)
    );
    this.addChild(this.errorField);
  }

  private setup(): void {
    this.setupReels();
    this.setupOverlay();
    this.setupButtons();
    this.setupScore();
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
    this.overlayBitmap = SlotAssets.getBitmap('ui_overlay');
    this.overlayBitmap.scaleX = this.overlayBitmap.scaleY = 6;
    this.addChild(this.overlayBitmap);
  }

  private setupButtons(): void {
    const btnUpBitmap = SlotAssets.getBitmap('ui_spin_up');
    const btnDownBitmap = SlotAssets.getBitmap('ui_spin_down');
    this.spinButton = new SimpleButton(btnUpBitmap, btnUpBitmap, btnDownBitmap);
    this.spinButton.scaleX = this.spinButton.scaleY = 6;
    this.spinButton.x = 590;
    this.spinButton.y = 54;
    this.spinButton.addEventListener(
      MouseEvent.CLICK,
      this.onSpinButtonTriggered
    );
    this.addChild(this.spinButton);
  }

  private setupScore(): void {
    this.balance = 0;

    const textFormat = new TextFormat();
    textFormat.bold = true;
    textFormat.color = 0xff0000;
    textFormat.font = 'Minecraftia';
    textFormat.size = 50;

    this.balanceField = new TextField();
    this.balanceField.setTextFormat(textFormat);
    this.balanceField.x = 604;
    this.balanceField.y = 214;
    this.balanceField.width = 170;
    this.balanceField.height = 100;
    this.balanceField.text = 'BALANCE:\n' + this.getBalanceFormatted();

    this.addChild(this.balanceField);
  }

  private onSpinButtonTriggered(event: Event | null = null): void {
    if (this.spinButton && this.reelsController) {
      if (this.spinButton.enabled) {
        if (this.reelsController.getSpinning()) {
          this.reelsController.addEventListener(
            ReelsController.STOPPING,
            this.onReelsStopping,
            { once: true }
          );
          this.reelsController.stopSpin();
        } else {
          this.reelsController.addEventListener(
            ReelsController.STARTING,
            this.onReelsStarting,
            { once: true }
          );
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
      this.reelsController.addEventListener(
        ReelsController.STARTED,
        this.onReelsStarted,
        { once: true }
      );
      this.spinButton.enabled = false;
    }
  }

  private onReelsStarted(): void {
    if (this.reelsController && this.spinButton) {
      this.reelsController.addEventListener(
        ReelsController.STOPPING,
        this.onReelsStopping,
        { once: true }
      );
      this.spinButton.enabled = true;
    }
  }

  private onReelsStopping(): void {
    if (this.reelsController && this.spinButton) {
      this.reelsController.addEventListener(
        ReelsController.STOPPED,
        this.onReelsStopped,
        { once: true }
      );
      this.spinButton.enabled = false;
    }
  }

  private onReelsStopped(): void {
    const spinResult = this.reelsController.getSpinResult();
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
