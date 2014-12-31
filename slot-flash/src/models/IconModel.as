package models
{
    import engine.mvc.Model;

    public class IconModel extends Model
    {
        private var _id:uint;

        public function IconModel(id:uint)
        {
            super();

            _id = id;
        }

        public function getId():uint
        {
            return _id;
        }

        public function setId(value:uint):void
        {
            _id = value;
            _updated.dispatch();
        }
    }
}
