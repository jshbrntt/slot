package controllers
{
    import engine.mvc.Controller;
    import engine.mvc.Model;
    import engine.mvc.View;

    import flash.events.TimerEvent;
    import flash.utils.Timer;

    import models.IconModel;
    import models.ReelsModel;

    import org.osflash.signals.Signal;

    import views.ReelView;
    import views.ReelsView;

    public class ReelsController extends Controller
    {
        private var _startTimer:Timer;
        private var _stopTimer:Timer;

        private var _startReelIndex:int;
        private var _stopReelIndex:int;

        private var _starting:Signal;
        private var _started:Signal;

        private var _stopping:Signal;
        private var _stopped:Signal;

        private var _spinning:Boolean;

        public function ReelsController(model:Model, view:View)
        {
            super(model, view);

            _startTimer = new Timer(600, getModel().getReelModels().length - 1);
            _stopTimer = new Timer(5000, 1);

            _startReelIndex = 0;
            _stopReelIndex = 0;

            _starting = new Signal();
            _started = new Signal();

            _stopping = new Signal();
            _stopped = new Signal();

            _spinning = false;
        }

        public function startSpin(event:Object = null):void
        {
            trace("controllers.ReelsController.startSpin");

            _startTimer.reset();
            _startReelIndex = 0;

            startNextReel();

            _starting.dispatch();
        }

        private function startNextReel(event:TimerEvent = null):void
        {
            trace("controllers.ReelsController.startNextReel", _startReelIndex);
            var reelView:ReelView = getView().getReelViews()[_startReelIndex];
            reelView.spin();
            _startReelIndex++;

            if(!_startTimer.running)
            {
                _startTimer.addEventListener(TimerEvent.TIMER, startNextReel);
                _startTimer.start();
            }

            if (_startReelIndex == getView().getReelViews().length)
            {
                spinStarted();
            }

        }

        private function spinStarted():void
        {
            trace("controllers.ReelsController.spinStarted");
            if(!_stopTimer.running)
            {
                _stopTimer.addEventListener(TimerEvent.TIMER_COMPLETE, stopSpin);
                _stopTimer.start();
            }

            _started.dispatch();

            _spinning = true;
        }

        public function stopSpin(event:Object = null):void
        {
            trace("controllers.ReelsController.stopSpin");

            _stopTimer.removeEventListener(TimerEvent.TIMER_COMPLETE, stopSpin);

            _stopTimer.reset();
            _stopReelIndex = 0;

            stopNextReel();

            _stopping.dispatch();
        }

        private function stopNextReel():void
        {
            if (_stopReelIndex < getView().getReelViews().length)
            {
                trace("controllers.ReelsController.stopNextReel", _stopReelIndex);
                var reelView:ReelView = getView().getReelViews()[_stopReelIndex];
                var stopPosition:int = reelView.getModel().getPosition() + randomRange(0, reelView.getModel().getIconModels().length);

                reelView.onStopped = stopNextReel;
                reelView.stop(stopPosition);
                _stopReelIndex++;
            }
            else
            {
                spinFinished();
            }
        }

        private function spinFinished():void
        {
            trace("controllers.ReelsController.spinFinished");

            var spinResult:String = "";
            for each(var reelView:ReelView in getView().getReelViews())
            {
                var iconModel:IconModel = reelView.getIconView(2);
                spinResult += iconModel.getId().toString();
            }

            _stopped.dispatch(spinResult);

            _spinning = false;
        }

        private function randomRange(min:Number, max:Number):Number
        {
            return (Math.floor(Math.random() * (max - min + 1)) + min);
        }

        public function getModel():ReelsModel
        {
            return _model as ReelsModel;
        }

        public function getView():ReelsView
        {
            return _view as ReelsView;
        }

        public function getStarting():Signal
        {
            return _starting;
        }

        public function getStarted():Signal
        {
            return _started;
        }

        public function getStopping():Signal
        {
            return _stopping;
        }

        public function getStopped():Signal
        {
            return _stopped;
        }

        public function getSpinning():Boolean
        {
            return _spinning;
        }
    }
}
