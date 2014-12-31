package engine.core
{
    import flash.display.Sprite;
    import flash.display.Stage;
    import flash.geom.Rectangle;

    import starling.core.Starling;

    public class Engine extends Sprite
    {
        private static var _gameClass:Class;
        private static var _nativeStage:Stage;
        private static var _starling:Starling;
        private static var _viewPort:Rectangle;

        public function Engine(game:Class, viewPort:Rectangle = null):void
        {
            _gameClass = game;
            _viewPort = viewPort;
            _nativeStage = stage;
            _starling = new Starling(_gameClass, _nativeStage, _viewPort);
        }

        protected function start():void
        {
            if (!_starling.isStarted)
            {
                _starling.start();
            }
        }

        protected function stop():void
        {
            if (_starling.isStarted)
            {
                _starling.stop();
            }
        }

        public static function get starling():Starling
        {
            return _starling;
        }

        public static function get nativeStage():Stage
        {
            return _nativeStage;
        }

        public function dispose():void
        {
            _gameClass = null;
            _viewPort = null;
            _nativeStage = null;
            if (_starling)
                _starling.dispose();
            _starling = null;
        }
    }
}