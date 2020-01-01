import Filter from './Filter';

export default class BlurFilter {
  static createDropShadow(
    blurX: number,
    blurY: number,
    spread: number,
    offsetX: number,
    offsetY: Number
  ): Filter {
    return new Filter();
  }
}
