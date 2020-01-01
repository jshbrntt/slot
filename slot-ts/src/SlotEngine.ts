import Engine from './engine/core/Engine';
import SlotGame from './SlotGame';
import Stage from 'openfl/display/Stage';

export default class SlotEngine extends Engine {
  public constructor() {
    super(SlotGame);
  }
}

const stage = new Stage(800, 400, 0xffffff, SlotEngine);
document.body.appendChild(stage.element);
