import Game from './Game';
import { createRandomMap } from '@utils';

const RainLands = new Game();

RainLands.renderMap(createRandomMap({
  seed: Math.random(),
  width: 100,
  height: 100,
  depth: 10,
}));
RainLands.start();
