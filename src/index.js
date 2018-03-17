import Game from './Game';
import IslandMap from '@resources/maps/island.json';

const RainLands = new Game();
RainLands.start();

RainLands.renderMap(IslandMap)
