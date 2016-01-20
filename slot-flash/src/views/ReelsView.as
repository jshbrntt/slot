package views
{
    import engine.mvc.Model;
    import engine.mvc.View;

    import models.ReelModel;
    import models.ReelsModel;

    public class ReelsView extends View
    {
        private var _reelViews:Vector.<ReelView>;

        public function ReelsView(model:Model)
        {
            super(model);

            _reelViews = new Vector.<ReelView>();
            
            createReelViews();
        }

        private function createReelViews():void
        {
            var reelModels:Vector.<ReelModel> = getModel().getReelModels();

            for each(var reelModel:ReelModel in reelModels)
            {
                var reelView:ReelView = new ReelView(reelModel);
                reelView.scaleX = reelView.scaleY = 6;
                reelView.x = reelModels.indexOf(reelModel) * reelView.width + 40;
                reelView.y = -130;
                addChild(reelView);

                _reelViews.push(reelView);
            }
        }

        public function getReelViews():Vector.<ReelView>
        {
            return _reelViews;
        }

        public function getModel():ReelsModel
        {
            return _model as ReelsModel;
        }
    }
}
