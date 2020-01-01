export default class Timer extends EventTarget {
  public running: boolean = false;
  constructor(delay: Number, repeatCount: number) {
    super();
  }
  public start(): void {}
  public reset(): void {}
}
