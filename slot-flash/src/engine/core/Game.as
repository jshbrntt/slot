package engine.core
{
    import starling.core.Starling;
    import starling.display.Sprite;
    import starling.events.EnterFrameEvent;
    import starling.events.Event;
    import starling.utils.AssetManager;

    public class Game extends Sprite
    {
        private var _assets:AssetManager;
        private var _debug:Boolean;
        private var _frameCount:int;
        private var _frameRate:Number;
        private var _scene:Scene;
        private var _totalTime:Number;

        public function Game(embedded:Class, debug:Boolean = false)
        {
            _assets = new AssetManager();
            _assets.verbose = true;
            _debug = debug;

            _assets.enqueue(embedded);

            Starling.current.addEventListener(Event.ROOT_CREATED, onRootCreated);
        }

        private function onRootCreated(e:Event):void
        {
            Starling.current.removeEventListener(Event.ROOT_CREATED, onRootCreated);
            if (Starling.current.root == this)
            {
                _assets.loadQueue(onProgress);
            }
        }

        private function onProgress(ratio:Number):void
        {
            if (ratio == 1.0)
            {
                init();
            }
        }

        protected function init():void
        {
            _frameRate = Starling.current.nativeStage.frameRate;
        }

        public function update(e:EnterFrameEvent):void
        {
            _totalTime += e.passedTime;
            if (++_frameCount % 60 == 0)
            {
                _frameRate = _frameCount / _totalTime;
                _frameCount = _totalTime = 0;
            }
            if (_scene)
            {
                _scene.update();
            }
        }

        public function set scene(value:Scene):void
        {
            if (_scene != null)
            {
                removeChild(_scene);
                _scene.dispose();
                _scene = null;
            }
            _scene = value;
            if (_scene != null)
            {
                addChild(_scene);
            }
        }

        override public function dispose():void
        {
            _debug = false;
            if (_scene != null)
            {
                _scene.dispose();
            }
            _scene = null;
            _frameRate = NaN;
            _totalTime = NaN;
            _frameCount = 0;
            super.dispose();
        }

        public function get assets():AssetManager
        {
            return _assets;
        }

        public function get debug():Boolean
        {
            return _debug;
        }

        public function get frameRate():Number
        {
            return _frameRate;
        }

        public function get scene():Scene
        {
            return _scene;
        }
    }
}