import Game from './Game';
import { createRandomChunkedMap } from '@utils';

// const RainLands = new Game();
//
// RainLands.generateMap();
// RainLands.start();
createRandomChunkedMap({
  seed: 123,
  size: 1,
  depth: 1,
})
