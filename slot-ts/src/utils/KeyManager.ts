import { Stage } from '../stubs/Stage';
import { NativeSignal } from '../stubs/NativeSignal';

export class KeyManager {
  static _initialized: boolean = false;
  static _stage: Stage | null;
  static _keys: { [keyCode: string]: boolean } | null;
  static _pressedFunctions: { [keyCode: string]: Function[] } | null;
  static _releasedFunctions: { [keyCode: string]: Function[] } | null;
  static _pressedSignal: NativeSignal | null;
  static _releasedSignal: NativeSignal | null;

  static initialize(stage: Stage): void {
    if (KeyManager._initialized) {
      return;
    }
    KeyManager._initialized = true;
    KeyManager._stage = stage;
    KeyManager._keys = {};
    KeyManager._pressedFunctions = {};
    KeyManager._releasedFunctions = {};
    KeyManager._pressedSignal = new NativeSignal(
      KeyManager._stage,
      'keydown',
      KeyboardEvent
    );
    KeyManager._releasedSignal = new NativeSignal(
      KeyManager._stage,
      'keyup',
      KeyboardEvent
    );

    KeyManager._pressedSignal.add(KeyManager.onKeyDown);
    KeyManager._releasedSignal.add(KeyManager.onKeyUp);
  }

  static onKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
    if (KeyManager._keys && KeyManager._pressedFunctions) {
      KeyManager._keys[event.keyCode] = false;
      if (!KeyManager._keys[event.keyCode]) {
        KeyManager._keys[event.keyCode] = true;
        for (const pressedFunction of KeyManager._pressedFunctions[
          event.keyCode
        ]) {
          Function.call(pressedFunction);
        }
      }
    }
  }

  static held(keyCode: number): boolean {
    return (KeyManager._keys && KeyManager._keys[keyCode]) || false;
  }

  static onKeyUp(event: KeyboardEvent): void {
    if (KeyManager._keys && KeyManager._releasedFunctions) {
      if (!KeyManager._keys[event.keyCode]) {
        KeyManager._keys[event.keyCode] = true;
      } else {
        KeyManager._keys[event.keyCode] = false;
        for (const releasedFunction of KeyManager._releasedFunctions[
          event.keyCode
        ]) {
          Function.call(releasedFunction);
        }
      }
    }
  }

  static pressed(keyCode: number, listener: Function): void {
    if (KeyManager._pressedFunctions) {
      if (!KeyManager._pressedFunctions[keyCode]) {
        KeyManager._pressedFunctions[keyCode] = [];
      } else {
        KeyManager._pressedFunctions[keyCode].push(listener);
      }
    }
  }

  static removePressed(keyCode: number, listener: Function): void {
    if (KeyManager._pressedFunctions) {
      if (KeyManager._pressedFunctions[keyCode]) {
        KeyManager._pressedFunctions[keyCode].splice(
          KeyManager._pressedFunctions[keyCode].indexOf(listener),
          1
        );
        if (KeyManager._pressedFunctions[keyCode].length === 0) {
          delete KeyManager._pressedFunctions[keyCode];
        }
      }
    }
  }

  static released(keyCode: number, listener: Function): void {
    if (KeyManager._releasedFunctions) {
      if (!KeyManager._releasedFunctions[keyCode]) {
        KeyManager._releasedFunctions[keyCode] = [];
      } else {
        KeyManager._releasedFunctions[keyCode].push(listener);
      }
    }
  }

  static removeReleased(keyCode: number, listener: Function): void {
    if (KeyManager._releasedFunctions) {
      if (KeyManager._releasedFunctions[keyCode]) {
        KeyManager._releasedFunctions[keyCode].splice(
          KeyManager._releasedFunctions[keyCode].indexOf(listener),
          1
        );
        if (KeyManager._releasedFunctions[keyCode].length === 0) {
          delete KeyManager._releasedFunctions[keyCode];
        }
      }
    }
  }

  static dispose(): void {
    KeyManager._initialized = false;
    KeyManager._stage = null;
    KeyManager._keys = null;
    KeyManager._pressedFunctions = null;
    KeyManager._releasedFunctions = null;
    if (KeyManager._pressedSignal) {
      KeyManager._pressedSignal.removeAll();
    }
    if (KeyManager._releasedSignal) {
      KeyManager._releasedSignal.removeAll();
    }
    KeyManager._pressedSignal = null;
    KeyManager._releasedSignal = null;
  }
}
