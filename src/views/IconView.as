package views
{
    import engine.mvc.Model;
    import engine.mvc.View;

    import models.IconModel;

    import starling.core.Starling;
    import starling.display.Image;
    import starling.textures.Texture;
    import starling.textures.TextureSmoothing;

    public class IconView extends View
    {
        private static const ATLAS_NAME:String = "sheet";

        public static var idMap:Vector.<String> = new <String>
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

        private var _iconImage:Image;

        public function IconView(model:Model)
        {
            super(model);
            createIconImage();
        }

        override protected function onUpdated():void
        {
            super.onUpdated();
            removeChildren();
            createIconImage();
        }

        protected function createIconImage():void
        {
            if (getModel().getId() < idMap.length - 1)
            {

                var iconName:String = idMap[getModel().getId()];
                var iconTexture:Texture = SlotGame(Starling.current.root).assets.getTextureAtlas(ATLAS_NAME).getTexture(iconName);

                if (!iconTexture)
                {
                    throw new Error("Icon texture not found.");
                }

                _iconImage = new Image(iconTexture);
                _iconImage.smoothing = TextureSmoothing.NONE;
                addChild(_iconImage);
            }
        }

        public function getModel():IconModel
        {
            return _model as IconModel;
        }
    }
}
