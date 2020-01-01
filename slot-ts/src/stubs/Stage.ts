import DisplayObjectContainer from './DisplayObjectContainer';

export default class Stage extends DisplayObjectContainer {
  public frameRate: number = 60;
  public stageWidth: number = 800;
  public stageHeight: number = 600;
}
