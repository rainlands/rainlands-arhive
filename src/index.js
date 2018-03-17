import Game from './Game';
import { createRandomMap } from '@utils';

const RainLands = new Game();

RainLands.renderMap(createRandomMap({
  seed: Math.random(),
  width: 5,
  height: 5,
  depth: 3,
}));
RainLands.start();
