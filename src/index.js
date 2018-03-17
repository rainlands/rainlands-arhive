import Game from './Game';
import { createRandomMap } from '@utils';

const RainLands = new Game();

RainLands.renderMap(createRandomMap({
  seed: Math.random(),
  width: 200,
  height: 200,
  depth: 50,
}));
RainLands.start();
