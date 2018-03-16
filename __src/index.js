import * as Game from './core/Game';

Game.start();

Game.renderMap(
  Array(10).fill(
    Array(10).fill(
      Array(10).fill(0)
    )
  )
)
