export default class Key {
  static LEFT: number = 37;
  static UP: number = 38;
  static RIGHT: number = 39;
  static DOWN: number = 40;

  static MENU: number = 0x01000012;
  static BACK: number = 0x01000016;

  static ENTER: number = 13;
  static COMMAND: number = 15;
  static CONTROL: number = 17;
  static SPACE: number = 32;
  static SHIFT: number = 16;
  static BACKSPACE: number = 8;
  static CAPS_LOCK: number = 20;
  static DELETE: number = 46;
  static END: number = 35;
  static ESCAPE: number = 27;
  static HOME: number = 36;
  static INSERT: number = 45;
  static TAB: number = 9;
  static PAGE_DOWN: number = 34;
  static PAGE_UP: number = 33;
  static LEFT_SQUARE_BRACKET: number = 219;
  static RIGHT_SQUARE_BRACKET: number = 221;

  static A: number = 65;
  static B: number = 66;
  static C: number = 67;
  static D: number = 68;
  static E: number = 69;
  static F: number = 70;
  static G: number = 71;
  static H: number = 72;
  static I: number = 73;
  static J: number = 74;
  static K: number = 75;
  static L: number = 76;
  static M: number = 77;
  static N: number = 78;
  static O: number = 79;
  static P: number = 80;
  static Q: number = 81;
  static R: number = 82;
  static S: number = 83;
  static T: number = 84;
  static U: number = 85;
  static V: number = 86;
  static W: number = 87;
  static X: number = 88;
  static Y: number = 89;
  static Z: number = 90;

  static F1: number = 112;
  static F2: number = 113;
  static F3: number = 114;
  static F4: number = 115;
  static F5: number = 116;
  static F6: number = 117;
  static F7: number = 118;
  static F8: number = 119;
  static F9: number = 120;
  static F10: number = 121;
  static F11: number = 122;
  static F12: number = 123;
  static F13: number = 124;
  static F14: number = 125;
  static F15: number = 126;

  static DIGIT_0: number = 48;
  static DIGIT_1: number = 49;
  static DIGIT_2: number = 50;
  static DIGIT_3: number = 51;
  static DIGIT_4: number = 52;
  static DIGIT_5: number = 53;
  static DIGIT_6: number = 54;
  static DIGIT_7: number = 55;
  static DIGIT_8: number = 56;
  static DIGIT_9: number = 57;

  static NUMPAD_0: number = 96;
  static NUMPAD_1: number = 97;
  static NUMPAD_2: number = 98;
  static NUMPAD_3: number = 99;
  static NUMPAD_4: number = 100;
  static NUMPAD_5: number = 101;
  static NUMPAD_6: number = 102;
  static NUMPAD_7: number = 103;
  static NUMPAD_8: number = 104;
  static NUMPAD_9: number = 105;
  static NUMPAD_ADD: number = 107;
  static NUMPAD_DECIMAL: number = 110;
  static NUMPAD_DIVIDE: number = 111;
  static NUMPAD_ENTER: number = 108;
  static NUMPAD_MULTIPLY: number = 106;
  static NUMPAD_SUBTRACT: number = 109;

  static toString(code: number): string {
    if (code >= Key.A && code <= Key.Z) {
      return String.fromCharCode(code);
    }
    if (code >= Key.F1 && code <= Key.F15) {
      return 'F' + String(code - 111);
    }
    if (code >= 96 && code <= 105) {
      return 'NUMPAD ' + String(code - 96);
    }
    switch (code) {
      case Key.LEFT:
        return 'LEFT';
      case Key.UP:
        return 'UP';
      case Key.RIGHT:
        return 'RIGHT';
      case Key.DOWN:
        return 'DOWN';
      case Key.MENU:
        return 'MENU';
      case Key.ENTER:
        return 'ENTER';
      case Key.CONTROL:
        return 'CONTROL';
      case Key.SPACE:
        return 'SPACE';
      case Key.SHIFT:
        return 'SHIFT';
      case Key.BACKSPACE:
        return 'BACKSPACE';
      case Key.CAPS_LOCK:
        return 'CAPS LOCK';
      case Key.DELETE:
        return 'DELETE';
      case Key.END:
        return 'END';
      case Key.ESCAPE:
        return 'ESCAPE';
      case Key.HOME:
        return 'HOME';
      case Key.INSERT:
        return 'INSERT';
      case Key.TAB:
        return 'TAB';
      case Key.PAGE_DOWN:
        return 'PAGE DOWN';
      case Key.PAGE_UP:
        return 'PAGE UP';
      case Key.NUMPAD_ADD:
        return 'NUMPAD ADD';
      case Key.NUMPAD_DECIMAL:
        return 'NUMPAD DECIMAL';
      case Key.NUMPAD_DIVIDE:
        return 'NUMPAD DIVIDE';
      case Key.NUMPAD_ENTER:
        return 'NUMPAD ENTER';
      case Key.NUMPAD_MULTIPLY:
        return 'NUMPAD MULTIPLY';
      case Key.NUMPAD_SUBTRACT:
        return 'NUMPAD SUBTRACT';
      default:
        return String.fromCharCode(code);
    }
  }
}
