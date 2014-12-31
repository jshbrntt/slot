package engine.core
{
    import starling.display.Sprite;
    import starling.events.Event;

    public class Scene extends Sprite
    {
        private var _game:Game;

        public function Scene(game:Game)
        {
            _game = game;
            addEventListener(Event.ADDED_TO_STAGE, onAdded);
        }

        private function onAdded(e:Event):void
        {
            removeEventListener(Event.ADDED_TO_STAGE, onAdded);
            init();
        }

        protected function init():void
        {
            // abstract
        }

        public function update():void
        {
            // abstract
        }

        protected function get game():Game
        {
            return _game;
        }

        override public function dispose():void
        {
            _game = null;
            super.dispose();
        }
    }
}