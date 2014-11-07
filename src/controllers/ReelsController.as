package controllers
{
    import engine.mvc.Controller;
    import engine.mvc.Model;
    import engine.mvc.View;

    import models.ReelModel;

    import views.ReelsView;

    public class ReelsController extends Controller
    {
        public function ReelsController(model:ReelModel, view:ReelsView)
        {
            super(model, view);
        }

        public function startSpin():void
        {
//            model.startSpin();
        }

        public function finishSpin():void
        {

        }

        protected function get model():ReelModel
        {
            return _model as ReelModel;
        }

        protected function get view():ReelsView
        {
            return _view as ReelsView;
        }
    }
}
