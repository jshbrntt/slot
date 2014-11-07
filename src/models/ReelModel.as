package models
{
    import engine.mvc.Model;

    import org.osflash.signals.Signal;

    public class ReelModel extends Model
    {
        private var _iconModels:Vector.<IconModel>;
        private var _spinning:Signal;
        private var _position:uint;
        private var _maxSpeed:uint;

        public function ReelModel(iconModels:Vector.<IconModel>)
        {
            _iconModels = iconModels;
            _spinning = new Signal();
            _position = 0;
            _maxSpeed = 200;
        }

        public function getCurrentIconModel():IconModel
        {
            return _iconModels[_position];
        }

        public function getLoopingIndex(index:int):int
        {
            return index - _iconModels.length * Math.floor(index / _iconModels.length);
        }

        public function getIconModel(index:int):IconModel
        {
            return _iconModels[getLoopingIndex(index)];
        }

        public function getSpinning():Signal
        {
            return _spinning;
        }

        public function setPosition(value:uint):void
        {
            _position = value;
        }

        public function getPosition():uint
        {
            return _position;
        }

        public function getIconModels():Vector.<IconModel>
        {
            return _iconModels;
        }

        public function toString():String
        {
            var string:String = "";
            for each(var iconModel:IconModel in _iconModels)
            {
                string += iconModel.getId();
            }
            string += "\n";
            for (var i:int = 0; i < ((_position + 1) % _iconModels.length); i++)
            {
                string += " ";
            }
            string += "^";
            return string;
        }
    }
}
