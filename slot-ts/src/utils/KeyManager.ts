export default class KeyManager {
  static _initialized: boolean = false;
  static _document: Document | null;
  static _keys: { [keyCode: string]: boolean } | null;
  static _pressedFunctions: { [keyCode: string]: Function[] } | null;
  static _releasedFunctions: { [keyCode: string]: Function[] } | null;

  static initialize(document: Document): void {
    if (KeyManager._initialized) {
      return;
    }
    KeyManager._initialized = true;
    KeyManager._document = document;
    KeyManager._keys = {};
    KeyManager._pressedFunctions = {};
    KeyManager._releasedFunctions = {};

    KeyManager._document.addEventListener('keydown', KeyManager.onKeyDown);
    KeyManager._document.addEventListener('keyup', KeyManager.onKeyUp);
  }

  static onKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
    if (KeyManager._keys && KeyManager._pressedFunctions) {
      KeyManager._keys[event.keyCode] = false;
      if (!KeyManager._keys[event.keyCode]) {
        KeyManager._keys[event.keyCode] = true;
        KeyManager._pressedFunctions[event.keyCode] =
          KeyManager._pressedFunctions[event.keyCode] || [];
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
        KeyManager._releasedFunctions[event.keyCode] =
          KeyManager._releasedFunctions[event.keyCode] || [];
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
    if (KeyManager._document) {
      KeyManager._document.removeEventListener('keydown', KeyManager.onKeyDown);
      KeyManager._document.removeEventListener('keyup', KeyManager.onKeyUp);
    }
    KeyManager._initialized = false;
    KeyManager._document = null;
    KeyManager._keys = null;
    KeyManager._pressedFunctions = null;
    KeyManager._releasedFunctions = null;
  }
}
