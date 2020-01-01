import Model from '../engine/mvc/Model';
import XML from '../stubs/XML';

export default class ConfigModel extends Model {
  private _xml: XML;
  private _reels: number[][];
  private _prizes: { [key: string]: number };

  constructor(xml: XML) {
    super();
    this._xml = xml;
    this._reels = [];
    this._prizes = {};
    this.parseXML(xml);
  }

  private parseXML(xml: XML): void {
    this._xml = xml;
    this._reels = [[]];
    this._prizes = {};

    // Parse Reels
    if (this._xml.reels) {
      for (const element of this._xml.reels.children()) {
        const reel: number[] = [];
        const icons: string[] = element.toString().split(',');
        for (const icon of icons) {
          reel.push(Number.parseInt(icon));
        }

        this._reels.push(reel);
      }
    }

    // Parse Prizes
    if (this._xml.prizes) {
      for (const element of this._xml.prizes.children()) {
        const line: string = element.line;
        this._prizes[line] = Number.parseFloat(element.toString());
      }
    }
  }

  public getReel(index: number): number[] | null {
    if (index < this._reels.length) {
      return this._reels[index];
    }
    return null;
  }

  public getReels(): number[][] {
    return this._reels;
  }

  public getPrizes(): { [result: string]: number } {
    return this._prizes;
  }
}
