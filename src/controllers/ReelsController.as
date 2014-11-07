package controllers
{
    import engine.mvc.Controller;

    import models.ReelModel;
    import models.ReelsModel;

    import views.ReelsView;

    public class ReelsController extends Controller
    {
        public function ReelsController(model:ReelModel, view:ReelsView)
        {
            super(model, view);
        }

        public function getModel():ReelsModel
        {
            return _model as ReelsModel;
        }

        public function getView():ReelsView
        {
            return _view as ReelsView;
        }
    }
}
