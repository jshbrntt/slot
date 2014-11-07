package
{
    import controllers.ReelsController;

    import engine.core.Scene;

    import flash.events.Event;
    import flash.events.TimerEvent;
    import flash.net.URLLoader;
    import flash.net.URLRequest;
    import flash.utils.Timer;

    import models.ConfigModel;
    import models.IconModel;
    import models.ReelModel;

    import starling.display.Image;
    import starling.filters.BlurFilter;
    import starling.textures.TextureSmoothing;

    import views.ReelView;
    import views.ReelsView;

    public class SlotScene extends Scene
	{
        private var _xmlLoader:URLLoader;
        private var _configModel:ConfigModel;

        private var _reelsModel:ReelModel;
        private var _reelsView:ReelsView;
        private var _reelsController:ReelsController;

        private var _overlayImage:Image;
        private var _timer:Timer;
        private var _startReelIndex:int;
        private var _reelModels:Vector.<ReelModel>;
        private var _reelViews:Vector.<ReelView>;
        private var _stopTimer:Timer;
		
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

        private function onConfigLoaded(event:Event):void
        {
            var xml:XML = new XML(event.target.data);
            _configModel = new ConfigModel(xml);

            setupReels();
            setupOverlay();
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

            for (var i:int = 0; i < 3; i++)
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
                trace(reelView.height);
                reelView.x = i * reelView.width + 40;
                reelView.y = -130;
                addChild(reelView);

                _reelModels.push(reelModel);
                _reelViews.push(reelView);
            }

            _timer = new Timer(800, 3);
            _timer.addEventListener(TimerEvent.TIMER, onTimer);
            _timer.addEventListener(TimerEvent.TIMER_COMPLETE, onTimerComplete);
            _timer.start();

            _stopTimer = new Timer(10000, 1);
            _stopTimer.addEventListener(TimerEvent.TIMER_COMPLETE, onStopTimerComplete);
            _stopTimer.start();

//            var iconModel:IconModel = new IconModel(0);
//            var iconView:IconView = new IconView(iconModel);
//
//            addChild(iconView);

//            _reelsView = new ReelsView(_reelsModel);
//            _reelsController = new ReelsController(_reelsModel, _reelsView);
        }

        private function onStopTimerComplete(event:TimerEvent):void
        {
            for each(var reelView:ReelView in _reelViews)
            {
                reelView.stop(reelView.getModel().getPosition());
            }
        }

        private function randomRange(min:Number, max:Number):Number
        {
            return (Math.floor(Math.random() * (max - min + 1)) + min);
        }

        private function onTimer(event:TimerEvent):void
        {
            var reelView:ReelView = _reelViews[_startReelIndex];
            reelView.spin();
            _startReelIndex++;

        }

        private function onTimerComplete(event:TimerEvent):void
        {
            _timer.reset();
            _startReelIndex = 0;
        }
		
		override public function update():void 
		{
			super.update();
		}
	}

}