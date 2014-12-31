package
{
    import engine.core.Game;

    public class SlotGame extends Game
	{
		
		public function SlotGame()
		{
			super(SlotAssets);
		}
		
		override protected function init():void
		{
            super.init();
			scene = new SlotScene(this);
		}
	
	}

}