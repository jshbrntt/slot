import StubEvent from "./StubEvent";

export default class DisplayObjectContainer extends EventTarget {
  public parent: DisplayObjectContainer | null = null;
  public scaleX: number = 1;
  public scaleY: number = 1;
  public x: number = 0;
  public y: number = 0;
  public width: number = 0;
  public height: number = 0;
  public children: DisplayObjectContainer[] = [];
  public addChild(child: DisplayObjectContainer): void {
    this.children.push(child);
    child.parent = this;
    child.dispatchEvent(new StubEvent(StubEvent.ADDED_TO_STAGE));
  }
  public removeChild(child: DisplayObjectContainer): void {
    const childIndex: number = this.children.indexOf(child);
    if (childIndex !== -1) {
      this.children.splice(childIndex, 1);
    }
  }
  public getChildAt(index: number): DisplayObjectContainer | null {
    return this.children[index];
  }
  public removeChildren(): void {
    for (const child of this.children) {
      this.removeChild(child);
    }
  }
}
