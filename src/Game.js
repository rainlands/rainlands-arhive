import Renderer from '@core/renderer';
import Scene from '@core/scene';
import Player from '@core/player';

import { renderMap, controls, lights } from '@utils';
import blocks from '@resources/blocks';

// constants
import { GAME_ROOT } from '!constants';

export default class Game {
  constructor() {
    this.blocks = blocks;

    this.renderer = Renderer();
    this.scene = Scene();
    this.player = Player();
  }

  // /////////////
  // INTERNALS //
  // /////////////

  _tick = () => {
    requestAnimationFrame(this._tick);

    controls.animateMovementTick(this.player);

    this.renderer.render(this.scene, this.player);
  };

  // //////////////////
  // PUBLIC METHODS //
  // //////////////////

  addElementsToScene = (elementsArray) => {
    elementsArray.forEach(e => this.scene.add(e));
  };

  renderMap = (map) => {
    renderMap(map, this.blocks);
  };

  start = () => {
    controls.initializeControls(this.player);
    this.addElementsToScene(lights.createLights())

    GAME_ROOT.appendChild(this.renderer.domElement);

    this._tick();
  };
}
