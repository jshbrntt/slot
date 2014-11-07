package
{
    import controllers.ReelsController;

    import engine.core.Scene;

    import flash.globalization.CurrencyFormatter;
    import flash.net.URLLoader;
    import flash.net.URLRequest;

    import models.ConfigModel;
    import models.ReelsModel;

    import starling.display.Button;
    import starling.display.Image;
    import starling.display.Sprite;
    import starling.events.Event;
    import starling.filters.BlurFilter;
    import starling.text.TextField;
    import starling.textures.Texture;
    import starling.textures.TextureSmoothing;
    import starling.utils.Color;

    import utils.Key;
    import utils.KeyManager;

    import views.ReelsView;

    public class SlotScene extends Scene
	{
        private var _xmlLoader:URLLoader;
        private var _configModel:ConfigModel;

        private var _reelsModel:ReelsModel;
        private var _reelsView:ReelsView;
        private var _reelsController:ReelsController;

        private var _overlayImage:Image;
        private var _spinButton:Button;

        private var _currencyFormatter:CurrencyFormatter;
        private var _balanceField:TextField;
        private var _balance:Number;
		
		public function SlotScene(game:SlotGame)
		{
			super(game);
		}
		
		override protected function init():void
		{
			super.init();
			_xmlLoader = new URLLoader();
            _xmlLoader.load(new URLRequest("./config.xml"));
            _xmlLoader.addEventListener(Event.COMPLETE, onConfigLoaded);

            KeyManager.pressed(Key.SPACE, onSpinButtonTriggered);
		}

        private function onConfigLoaded(event:Object):void
        {
            var xml:XML = new XML(event.target.data);
            _configModel = new ConfigModel(xml);

            setupReels();
            setupOverlay();
            setupButtons();
            setupScore();
        }

        private function setupScore():void
        {
            _currencyFormatter = new CurrencyFormatter("en-GB");
            _currencyFormatter.setCurrency("GBP", "£");
            _currencyFormatter.trailingZeros = true;

            _balance = 0;

            _balanceField = new TextField(170, 100, "BALANCE:\n"+_currencyFormatter.format(_balance, true), "Minecraftia", 40, Color.RED);
            _balanceField.bold = true;
            _balanceField.autoScale = true;
            _balanceField.x = 604;
            _balanceField.y = 214;
            _balanceField.filter = BlurFilter.createDropShadow(6, 0.785, 0, 1, 0);

            addChild(_balanceField);
        }

        private function setupOverlay():void
        {
            _overlayImage = new Image(game.assets.getTexture("overlay"));
            _overlayImage.smoothing = TextureSmoothing.NONE;
            _overlayImage.scaleX = _overlayImage.scaleY = 6;

            addChild(_overlayImage);
        }

        private function setupReels():void
        {
            _reelsModel = new ReelsModel(_configModel.getReels());
            _reelsView = new ReelsView(_reelsModel);
            _reelsController = new ReelsController(_reelsModel, _reelsView);

            addChild(_reelsView);
        }

        private function setupButtons():void
        {
            var btnUpTexture:Texture = game.assets.getTextureAtlas("sheet").getTexture("spin_up");
            var btnDownTexture:Texture = game.assets.getTextureAtlas("sheet").getTexture("spin_down");

            _spinButton = new Button(btnUpTexture, "", btnDownTexture);
            Image(Sprite(_spinButton.getChildAt(0)).getChildAt(0)).smoothing = TextureSmoothing.NONE;
            _spinButton.scaleX = _spinButton.scaleY = 6;
            _spinButton.x = 590;
            _spinButton.y = 54;
            _spinButton.addEventListener(Event.TRIGGERED, onSpinButtonTriggered);

            addChild(_spinButton);
        }

        private function onSpinButtonTriggered(event:Event = null):void
        {
            if (_spinButton.enabled)
            {
                if (_reelsController.getSpinning())
                {
                    _reelsController.getStarting().addOnce(onReelsStopping);
                    _reelsController.stopSpin();
                }
                else
                {
                    _reelsController.getStarting().addOnce(onReelsStarting);
                    _reelsController.startSpin();
                }
            }
        }

        private function onReelsStarting():void
        {
            _reelsController.getStarted().addOnce(onReelsStarted);
            _spinButton.enabled = false;
        }

        private function onReelsStarted():void
        {
            _reelsController.getStopping().addOnce(onReelsStopping);
            _spinButton.enabled = true;
        }

        private function onReelsStopping():void
        {
            _reelsController.getStopped().addOnce(onReelsStopped);
            _spinButton.enabled = false;
        }

        private function onReelsStopped(spinResult:String):void
        {
            _spinButton.enabled = true;

            if (_configModel.getPrizes()[spinResult] != undefined)
            {
                var prize:Number = _configModel.getPrizes()[spinResult];
                _balance += prize;
                _balanceField.text = "BALANCE:\n"+_currencyFormatter.format(_balance, true);
            }
        }
		
		override public function update():void 
		{
			super.update();
		}
	}

}