package engine.mvc 
{
	import models.CellModel;
	import starling.display.DisplayObjectContainer;
	
	/**
	 * View.as
	 * @author Joshua Barnett
	 */
	public class View extends DisplayObjectContainer
	{
		protected var _model:Model;
		
		public function View(model:Model) 
		{
			if (!model)
				throw new Error("Cannot create view from null Model");
			_model = model;
			_model.updated.add(onUpdated);
		}
		
		protected function onUpdated():void
		{
			// Abstract
		}
	}
}