import DisplayObjectContainer from './DisplayObjectContainer';
import Filter from './Filter';

export default class TextField extends DisplayObjectContainer {
  public bold: boolean = false;
  public autoScale: boolean = false;
  public filter: Filter | null = null;
  constructor(
    public x: number,
    public y: number,
    public text: string,
    public fontName?: string,
    public fontSize?: number,
    public color?: string
  ) {
    super();
  }
}
