import Renderer from '@core/renderer';
import Scene from '@core/scene';
import Player from '@core/player';

import { stats, controls, lights } from '@utils';
import blocks from '@resources/blocks';
import { createWorldGenerator, updateChunks } from '@core/map';

// constants
import { GAME_ROOT } from '@constants';

export default class Game {
  constructor() {
    this.blocks = blocks;
    this.seed = Math.random();

    this.stats = stats();

    this.renderer = Renderer();
    this.scene = Scene();
    this.player = Player();
  }

  // /////////////
  // INTERNALS //
  // /////////////

  _tick = () => {
    this.stats.begin();

    requestAnimationFrame(this._tick);

    controls.animateMovementTick(this.player);
    this.renderer.render(this.scene, this.player);

    updateChunks({
      generator: this.worldGenerator,
      scene: this.scene,
      userPosition: this.player.position,
      seed: this.seed,
    });

    this.stats.end();
  };
  
  // //////////////////
  // PUBLIC METHODS //
  // //////////////////

  addElementsToScene = (elementsArray) => {
    elementsArray.forEach(e => this.scene.add(e));
  };

  generateMap = () => {
    this.worldGenerator = createWorldGenerator(this.seed);
  };

  start = () => {
    controls.initializeControls(this.player);
    this.addElementsToScene(lights.createLights());

    GAME_ROOT.appendChild(this.renderer.domElement);

    this._tick();
  };
}
