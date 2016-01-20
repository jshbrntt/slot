package
{
    import engine.core.Engine;

    import utils.KeyManager;

    [SWF(width="800",height="600",frameRate="60",backgroundColor="#ffffff")]
    public class SlotEngine extends Engine
    {
        public function SlotEngine()
        {
            super(SlotGame);

            KeyManager.initialize(nativeStage);

            this.start();
        }
    }
}
