package models
{
    import engine.mvc.Model;

    public class ReelsModel extends Model
    {
        private var _reelsConfig:Vector.<Vector.<int>>;
        private var _reelModels:Vector.<ReelModel>;

        public function ReelsModel(reelsConfig:Vector.<Vector.<int>>)
        {
            _reelsConfig = reelsConfig;
            _reelModels = new Vector.<ReelModel>();

            createReelModels();
        }

        private function createReelModels():void
        {
            for each(var reelConfig:Vector.<int> in _reelsConfig)
            {
                var iconModels:Vector.<IconModel> = new Vector.<IconModel>();

                for each(var iconId:int in reelConfig)
                {
                    iconModels.push(new IconModel(iconId));
                }

                var reelModel:ReelModel = new ReelModel(iconModels);

                _reelModels.push(reelModel);
            }
        }

        public function getReelModels():Vector.<ReelModel>
        {
            return _reelModels;
        }
    }
}
