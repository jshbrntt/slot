package models {
    import engine.mvc.Model;

    import flash.utils.Dictionary;

    import nape.geom.Vec2;

    public class ConfigModel extends Model
    {
        private static const CONFIG:String = "config";
        private static const REELS:String = "reels";
        private static const PRIZES:String = "prizes";

        private var _xml:XML;
        private var _reels:Vector.<Vector.<int>>;
        private var _prizes:Dictionary;

        public function ConfigModel(xml:XML)
        {
            parseXML(xml);
        }

        private function parseXML(xml:XML):void
        {
            _xml = xml;
            _reels = new Vector.<Vector.<int>>();
            _prizes = new Dictionary();

            // Parse Reels
            for each (var element:XML in _xml.reels.children())
            {
                var reel:Vector.<int> = new Vector.<int>();
                var icons:Array = element.toString().split(',');
                for each (var icon:String in icons)
                {
                    reel.push(int(icon));
                }

                _reels.push(reel);
            }

            // Parse Prizes
            for each (element in _xml.prizes.children())
            {
                var line:String = element.@line;
                _prizes[line] = parseFloat(element);
            }
        }

        public function getReel(index:uint):Vector.<int>
        {
            if (index < _reels.length)
            {
                return _reels[index];
            }
            return null;
        }

        public function getReels():Vector.<Vector.<int>>
        {
            return _reels;
        }

        public function getPrizes():Dictionary
        {
            return _prizes;
        }
    }
}
