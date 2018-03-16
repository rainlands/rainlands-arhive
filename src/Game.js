import renderer from './core/renderer';
import scene from './core/scene';
import player from './core/player';

import { renderMap } from '@utils';

export default class Game {
  constructor() {
  
  }

  ///////////////
  // INTERNALS //
  ///////////////

  _tick = () => {
    requestAnimationFrame(this._tick);
  }

  ////////////////////
  // PUBLIC METHODS //
  ////////////////////

  start = () => {
    this._tick();
  }

  renderMap = (map) => {

  }
}
