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
            var game:SlotGame = Starling.current.root as SlotGame;
            var iconTextures:Vector.<Texture> = game.assets.getTextureAtlas("atlas01").getTextures("icon");

            if (getModel().getId() < (iconTextures.length - 1))
            {
                var iconTexture:Texture = iconTextures[getModel().getId()];
                _iconImage = new Image(iconTexture);
                _iconImage.smoothing = TextureSmoothing.NONE;
                addChild(_iconImage);
            }
            else
            {
                throw new Error("Icon texture not found.");
            }

        }

        public function getModel():IconModel
        {
            return _model as IconModel;
        }
    }
}
