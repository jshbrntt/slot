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
        private static const ATLAS_NAME:String = "iconsTexture";

        private static var _idMap:Vector.<String> = new <String>
                [
                    "club",
                    "diamond",
                    "heart",
                    "spade",
                    "nine",
                    "ten",
                    "jack",
                    "queen",
                    "king",
                    "ace",
                    "bar_one",
                    "bar_two",
                    "bar_three",
                    "seven_one",
                    "seven_two",
                    "seven_three"
                ];

        private var _game:SlotGame;
        private var _iconsViews:Vector.<IconView>;
        private var _tweenCount:uint;
        private var _stop:Boolean;
        private var _stopPosition:int;

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
            _stopPosition = stopPosition;
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
            if (position >= getModel().getIconModels().length)
            {
                position = 0;
            }

            getModel().setPosition(position);
            trace(getModel().getPosition());

            var newIconModel:IconModel = getModel().getIconModel(-2 + getModel().getPosition());
            var newIconView:IconView = new IconView(newIconModel);

            _iconsViews.unshift(newIconView);

            _tweenCount = _iconsViews.length - 1;
            for (var i:int = 1; i < _iconsViews.length; i++)
            {
                var iconView:IconView = _iconsViews[i];
                var tween:Tween = new Tween(iconView, 0.2, Transitions.LINEAR);
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
                if (_stopPosition && getModel().getPosition() == _stopPosition)
                {
                    onStopped();
                }
                else
                {
                    shiftReel();
                }
            }
        }

        private function onStopped():void
        {

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

        override protected function onUpdated():void
        {
            super.onUpdated();

        }

        public function getModel():ReelModel
        {
            return _model as ReelModel;
        }

    }
}
