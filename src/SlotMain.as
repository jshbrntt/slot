package
{
    import engine.core.Engine;

    import utils.KeyManager;

    [SWF(width="800",height="600",frameRate="60")]
    public class SlotMain extends Engine
    {
        public function SlotMain()
        {
            super(SlotGame);

            KeyManager.initialize(nativeStage);

            this.start();
        }
    }
}
