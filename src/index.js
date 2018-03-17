import Game from './Game';
import { createRandomMap } from '@utils';

const RainLands = new Game();

RainLands.renderMap(createRandomMap({
  seed: Math.random(),
  width: 80,
  height: 80,
  depth: 10,
}));
RainLands.start();
