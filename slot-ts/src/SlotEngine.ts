import Engine from './engine/core/Engine';
import SlotGame from './SlotGame';
import Stage from 'openfl/display/Stage';

export default class SlotEngine extends Engine {
  public constructor() {
    super(SlotGame);
  }
}

function init() {
  const engine = new SlotEngine();
  document.body.appendChild(engine.stage.element);
}

function createStartButton() {
  const button = document.createElement('button');
  button.textContent = 'Start';
  document.body.appendChild(button);
  button.addEventListener('click', () => {
    document.body.removeChild(button);
    init();
  });
}

init();
