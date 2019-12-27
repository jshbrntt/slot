import { Newable } from '../utils/Newable';
import { Stage } from './Stage';

export class NativeSignal {
  constructor(stage: Stage, type: string, prototype: Newable<KeyboardEvent>) {}
  public add(callback: Function): void {}
  public remove(): void {}
  public removeAll(): void {}
}
