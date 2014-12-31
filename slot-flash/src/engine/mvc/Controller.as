package engine.mvc
{

    public class Controller
    {
        protected var _model:Model;
        protected var _view:View;

        public function Controller(model:Model, view:View)
        {
            _model = model;
            _view = view;
        }

    }

}