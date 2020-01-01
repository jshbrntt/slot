export default class XML extends String {
  public prizes: XML | null = null;
  public reels: XML | null = null;
  constructor(
    public data: string
  ) {
    super(data);
  }
  public children(): XML[] {
    return [];
  }
  public toString(): string {
    return '';
  }
  get line(): string {
    return '';
  }
}
