import Assets from 'openfl/utils/Assets';
import Bitmap from 'openfl/display/Bitmap';
import Keyboard from 'openfl/ui/Keyboard';
import KeyManager from './utils/KeyManager';
import MouseEvent from 'openfl/events/MouseEvent';
import ReelsController from './controllers/ReelsController';
import ReelsModel from './models/ReelsModel';
import ReelsView from './views/ReelsView';
import Scene from './engine/core/Scene';
import SimpleButton from 'openfl/display/SimpleButton';
import SlotAssets from './SlotAssets';
import TextField from 'openfl/text/TextField';
import TextFormat from 'openfl/text/TextFormat';
import TextFormatAlign from 'openfl/text/TextFormatAlign';
import GridFitType from 'openfl/text/GridFitType';
import TextFieldAutoSize from 'openfl/text/TextFieldAutoSize';

export default class SlotScene extends Scene {
  private reelsModel: ReelsModel | null = null;
  private reelsView: ReelsView | null = null;
  private reelsController: ReelsController | null = null;
  private overlayBitmap: Bitmap | null = null;
  private spinButton: SimpleButton | null = null;
  private balanceField: TextField | null = null;
  private balance: number = 0;
  private config: {
    reels: number[][];
    prizes: {
      lint: number[];
      payout: number;
    }[];
  };

  protected init(): void {
    super.init();
    this.config = JSON.parse(Assets.getText('config.json'));
    KeyManager.pressed(Keyboard.SPACE, () => this.onSpinButtonTriggered());
    this.setup();
  }

  private setup(): void {
    this.setupReels();
    this.setupOverlay();
    this.setupButtons();
    this.setupScore();
  }

  private setupReels(): void {
    this.reelsModel = new ReelsModel(this.config.reels);
    this.reelsView = new ReelsView(this.reelsModel);
    this.reelsController = new ReelsController(this.reelsModel, this.reelsView);
    this.addChild(this.reelsView);
  }

  private setupOverlay(): void {
    this.overlayBitmap = SlotAssets.getBitmap('ui_overlay');
    this.overlayBitmap.scaleX = this.overlayBitmap.scaleY = 6;
    this.addChild(this.overlayBitmap);
  }

  private setupButtons(): void {
    const btnUpBitmap = SlotAssets.getBitmap('ui_spin_up');
    const btnDownBitmap = SlotAssets.getBitmap('ui_spin_down');
    this.spinButton = new SimpleButton(
      btnUpBitmap,
      btnUpBitmap,
      btnDownBitmap,
      btnUpBitmap
    );
    this.spinButton.scaleX = this.spinButton.scaleY = 6;
    this.spinButton.x = 590;
    this.spinButton.y = 54;
    this.spinButton.addEventListener(MouseEvent.CLICK, () =>
      this.onSpinButtonTriggered()
    );
    this.addChild(this.spinButton);
  }

  private setupScore(): void {
    this.balance = 0;
    const textFormat = new TextFormat('VT323', 38, 0xff0000);
    textFormat.align = TextFormatAlign.CENTER;

    this.balanceField = new TextField();
    this.balanceField.defaultTextFormat = textFormat;
    this.balanceField.selectable = false;
    this.balanceField.x = 604;
    this.balanceField.y = 200;
    this.balanceField.autoSize = TextFieldAutoSize.CENTER;
    this.balanceField.gridFitType = GridFitType.PIXEL;
    this.balanceField.width = 170;
    this.balanceField.height = 200;
    this.balanceField.text = 'BALANCE\n' + this.getBalanceFormatted();

    this.addChild(this.balanceField);
  }

  private onSpinButtonTriggered(event: Event | null = null): void {
    if (!this.spinButton || !this.reelsController || !this.spinButton.enabled) {
      return;
    }
    if (this.reelsController.getSpinning()) {
      this.reelsController.addEventListener(
        ReelsController.STOPPING,
        () => this.onReelsStopping(),
        { once: true }
      );
      this.reelsController.stopSpin();
    } else {
      this.reelsController.addEventListener(
        ReelsController.STARTING,
        () => this.onReelsStarting(),
        { once: true }
      );
      this.reelsController.startSpin();
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
    if (!this.reelsController || !this.spinButton) {
      return;
    }
    this.reelsController.addEventListener(
      ReelsController.STARTED,
      () => this.onReelsStarted(),
      { once: true }
    );
    this.spinButton.enabled = false;
    this.spinButton.alpha = 0.5;
  }

  private onReelsStarted(): void {
    if (!this.reelsController || !this.spinButton) {
      return;
    }
    this.reelsController.addEventListener(
      ReelsController.STOPPING,
      () => this.onReelsStopping(),
      { once: true }
    );
    this.spinButton.enabled = true;
    this.spinButton.alpha = 1;
  }

  private onReelsStopping(): void {
    if (!this.reelsController || !this.spinButton) {
      return;
    }
    this.reelsController.addEventListener(
      ReelsController.STOPPED,
      () => this.onReelsStopped(),
      { once: true }
    );
    this.spinButton.enabled = false;
    this.spinButton.alpha = 0.5;
  }

  private onReelsStopped(): void {
    const spinResult = this.reelsController.getSpinResult();
    if (
      this.config &&
      this.reelsController &&
      this.spinButton &&
      this.balance !== null &&
      this.balanceField
    ) {
      this.spinButton.enabled = true;
      this.spinButton.alpha = 1;
      if (this.config.prizes[spinResult]) {
        const prize: number = this.config.prizes[spinResult];
        this.balance += prize;
        this.balanceField.text = 'BALANCE:\n' + this.getBalanceFormatted();
      }
    }
  }
}
