package
{
    import engine.core.Scene;

    import flash.events.TimerEvent;
    import flash.net.URLLoader;
    import flash.net.URLRequest;
    import flash.utils.Timer;

    import models.ConfigModel;
    import models.IconModel;
    import models.ReelModel;

    import starling.display.Button;
    import starling.display.Image;
    import starling.display.Sprite;
    import starling.events.Event;
    import starling.textures.Texture;
    import starling.textures.TextureSmoothing;

    import views.ReelView;

    public class SlotScene extends Scene
	{
        private var _xmlLoader:URLLoader;
        private var _configModel:ConfigModel;

        private var _overlayImage:Image;
        private var _spinButton:Button;

        private var _startTimer:Timer;
        private var _stopTimer:Timer;

        private var _startReelIndex:int;
        private var _stopReelIndex:int;
        private var _reelModels:Vector.<ReelModel>;
        private var _reelViews:Vector.<ReelView>;
		
		public function SlotScene(game:SlotGame)
		{
			super(game);
		}
		
		override protected function init():void
		{
			super.init();
			_xmlLoader = new URLLoader();
            _xmlLoader.load(new URLRequest("config.xml"));
            _xmlLoader.addEventListener(Event.COMPLETE, onConfigLoaded);

            _reelModels = new Vector.<ReelModel>();
            _reelViews = new Vector.<ReelView>();
		}

        private function onConfigLoaded(event:Object):void
        {
            var xml:XML = new XML(event.target.data);
            _configModel = new ConfigModel(xml);

            setupReels();
            setupOverlay();
            setupButtons();
        }

        private function setupOverlay():void
        {
            _overlayImage = new Image(game.assets.getTexture("overlayTexture"));
            _overlayImage.smoothing = TextureSmoothing.NONE;
            _overlayImage.scaleX = _overlayImage.scaleY = 6;
            addChild(_overlayImage);
        }

        private function setupReels():void
        {
            _startReelIndex = 0;

            for (var i:int = 0; i < _configModel.getReels().length; i++)
            {
                var iconModels:Vector.<IconModel> = new Vector.<IconModel>();
                var reel:Vector.<int> = _configModel.getReel(i);
                for each(var id:int in reel)
                {
                    iconModels.push(new IconModel(id));
                }
                var reelModel:ReelModel = new ReelModel(iconModels);
                var reelView:ReelView = new ReelView(reelModel);
                reelView.scaleX = reelView.scaleY = 6;
                reelView.x = i * reelView.width + 40;
                reelView.y = -130;
                addChild(reelView);

                _reelModels.push(reelModel);
                _reelViews.push(reelView);
            }

            _startTimer = new Timer(600, _configModel.getReels().length - 1);
            _stopTimer = new Timer(5000, 1);
        }

        private function setupButtons():void
        {
            var spinButtonUpTexture:Texture = game.assets.getTextureAtlas("iconsTexture").getTexture("spin_up");
            var spinButtonDownTexture:Texture = game.assets.getTextureAtlas("iconsTexture").getTexture("spin_down");
            _spinButton = new Button(spinButtonUpTexture, "", spinButtonDownTexture);
            Image(Sprite(_spinButton.getChildAt(0)).getChildAt(0)).smoothing = TextureSmoothing.NONE;
            _spinButton.scaleX = _spinButton.scaleY = 6;
            _spinButton.x = 590;
            _spinButton.y = 54;
            addChild(_spinButton);
            _spinButton.addEventListener(Event.TRIGGERED, startReelSpin);
        }

        private function startReelSpin(event:Object = null):void
        {
            trace("SlotScene.startReelSpin");
            _spinButton.removeEventListener(Event.TRIGGERED, startReelSpin);
            _spinButton.enabled = false;

            _startTimer.reset();
            _startReelIndex = 0;

            startNextReel();
        }

        private function startNextReel(event:TimerEvent = null):void
        {
            trace("SlotScene.startNextReel", _startReelIndex);
            var reelView:ReelView = _reelViews[_startReelIndex];
            reelView.spin();
            _startReelIndex++;

            if(!_startTimer.running)
            {
                _startTimer.addEventListener(TimerEvent.TIMER, startNextReel);
                _startTimer.start();
            }

            if (_startReelIndex == _reelViews.length)
            {
                spinStarted();
            }

        }

        private function spinStarted():void
        {
            trace("SlotScene.spinStarted");
            if(!_stopTimer.running)
            {
                _stopTimer.addEventListener(TimerEvent.TIMER_COMPLETE, stopReelSpin);
                _stopTimer.start();
            }
            _spinButton.addEventListener(Event.TRIGGERED, stopReelSpin);
            _spinButton.enabled = true;
        }

        private function stopReelSpin(event:Object = null):void
        {
            trace("SlotScene.stopReelSpin");
            _spinButton.removeEventListener(Event.TRIGGERED, stopReelSpin);
            _stopTimer.removeEventListener(TimerEvent.TIMER_COMPLETE, stopReelSpin);

            _spinButton.enabled = false;

            _stopTimer.reset();
            _stopReelIndex = 0;

            stopNextReel();
        }

        private function stopNextReel():void
        {
            if (_stopReelIndex < _reelViews.length)
            {
                trace("SlotScene.stopNextReel", _stopReelIndex);
                var reelView:ReelView = _reelViews[_stopReelIndex];
                var stopPosition:int = reelView.getModel().getPosition() + randomRange(0, reelView.getModel().getIconModels().length);

                reelView.onStopped = stopNextReel;
                reelView.stop(stopPosition);
                _stopReelIndex++;
            }
            else
            {
                spinFinished();
            }
        }

        private function spinFinished():void
        {
            trace("SlotScene.spinFinished");
            _spinButton.enabled = true;
            _spinButton.addEventListener(Event.TRIGGERED, startReelSpin);
        }

        private function randomRange(min:Number, max:Number):Number
        {
            return (Math.floor(Math.random() * (max - min + 1)) + min);
        }
		
		override public function update():void 
		{
			super.update();
		}
	}

}