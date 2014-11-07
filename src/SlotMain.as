package
{
    import engine.core.Engine;

    import flash.display.StageAlign;
    import flash.display.StageScaleMode;

    import starling.utils.HAlign;
    import starling.utils.VAlign;

    import utils.KeyManager;

    [SWF(width="800",height="600",frameRate="60")]
    public class SlotMain extends Engine
    {
        public function SlotMain()
        {
            super(SlotGame);

            nativeStage.align = StageAlign.TOP_LEFT;
            nativeStage.scaleMode = StageScaleMode.NO_SCALE;

            starling.showStatsAt(HAlign.RIGHT, VAlign.BOTTOM, 2);

            KeyManager.initialize(nativeStage);

            this.start();
        }
    }
}
