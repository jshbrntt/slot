package views
{
    import engine.mvc.View;

    import models.IconModel;

    import models.ReelModel;

    import starling.animation.Transitions;

    import starling.animation.Tween;

    import starling.core.Starling;

    import starling.display.Image;
    import starling.textures.Texture;

    import utils.Key;

    import utils.KeyManager;

    public class ReelView extends View
    {
        private static const ATLAS_NAME:String = "sheet";

        private static var _idMap:Vector.<String> = new <String>
                [
                    "club",         // 0
                    "diamond",      // 1
                    "heart",        // 2
                    "spade",        // 3
                    "nine",         // 4
                    "ten",          // 5
                    "jack",         // 6
                    "queen",        // 7
                    "king",         // 8
                    "ace",          // 9
                    "bar_one",      // 10
                    "bar_two",      // 11
                    "bar_three",    // 12
                    "seven_one",    // 13
                    "seven_two",    // 14
                    "seven_three"   // 15
                ];

        private var _game:SlotGame;
        private var _iconsViews:Vector.<IconView>;
        private var _tweenCount:uint;
        private var _stop:Boolean;
        private var _stopPosition:Number;
        private var _onStopped:Function;

        public function ReelView(model:ReelModel)
        {
            super(model);

            _game = Starling.current.root as SlotGame;
            _iconsViews = new Vector.<IconView>();
            _tweenCount = 0;

            setupInitialIcons();
        }

        public function stop(stopPosition:int):void
        {
            _stopPosition = getModel().getLoopingIndex(stopPosition);
        }

        public function spin():void
        {
            shiftReel();
        }

        private function shiftReel():void
        {
            // Removing bottom out of view icon.
            removeChild(_iconsViews.pop());

            // Moving the position of the reel one forward.
            var position:uint = getModel().getPosition();
            position++;

            // Reseting the reel position back to the start if new position is out of bounds.
            if (position == getModel().getIconModels().length)
            {
                position = 0;
            }

            getModel().setPosition(position);

            var newIconModel:IconModel = getModel().getIconModel(-2 + getModel().getPosition());
            var newIconView:IconView = new IconView(newIconModel);

            _iconsViews.unshift(newIconView);

            _tweenCount = _iconsViews.length - 1;
            for (var i:int = 1; i < _iconsViews.length; i++)
            {
                var iconView:IconView = _iconsViews[i];
                var tween:Tween = new Tween(iconView, 0.1, Transitions.LINEAR);
                tween.onComplete = onShiftedReel;
                tween.animate("y", iconView.y + iconView.height);
                Starling.juggler.add(tween);
            }

            addChild(newIconView);

        }

        private function onShiftedReel():void
        {
            _tweenCount--;
            if (_tweenCount == 0)
            {
                // Stop spinning condition.
                if (getModel().getPosition() == _stopPosition)
                {
                    stopReel();
                }
                else
                {
                    shiftReel();
                }
            }
        }

        private function stopReel():void
        {
            _stopPosition = NaN;
            if (onStopped)
            {
                onStopped.apply(this);
            }
        }

        private function setupInitialIcons():void
        {
            for (var i:int = -2; i <= 2; ++i)
            {
                var iconView:IconView = new IconView(getModel().getIconModel(i + getModel().getPosition()));
                addChild(iconView);
                iconView.y = (i + 2) * iconView.height;
                _iconsViews.push(iconView);
            }
        }

        private function createIconImage(id:uint):Image
        {
            if (id < _idMap.length - 1)
            {
                var iconName:String = _idMap[id];
                var iconTexture:Texture = _game.assets.getTextureAtlas(ATLAS_NAME).getTexture(iconName);

                if (!iconTexture)
                {
                    throw new Error("Icon texture not found.");
                }

                return new Image(iconTexture);
            }
            return null;
        }

        public function getIconView(index:uint):IconModel
        {
            if (index < _iconsViews.length)
            {
                return _iconsViews[index].getModel();
            }
            return null;
        }

        override protected function onUpdated():void
        {
            super.onUpdated();

        }

        public function getModel():ReelModel
        {
            return _model as ReelModel;
        }

        public function get onStopped():Function
        {
            return _onStopped;
        }

        public function set onStopped(value:Function):void
        {
            _onStopped = value;
        }
    }
}
