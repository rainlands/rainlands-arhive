import Game from './Game';

const RainLands = new Game();
RainLands.start();


// RainLands.renderMap(
//   Array(3).fill(
//     Array(3).fill(
//       Array(3).fill(0)
//     )
//   )
// )

RainLands.renderMap([
  [
    [0, 1],
    [0, 1],
  ],
  [
    [0, 1],
    [0, 1],
  ],
])
