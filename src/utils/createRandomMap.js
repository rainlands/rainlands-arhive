import { Noise } from 'noisejs';

const randomNumberFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateHeightMap = ({
  seed,
  width,
  height,
  depth,
}) => {
  const noise = new Noise(seed);

  const heightMap = [];

  for (let x = 0; x < width; x++) {
    heightMap.push([])
    for (let y = 0; y < height; y++) {
      heightMap[x].push(
        Math.round(
          noise.perlin2(x / 100, y / 100) * 100
        )
      );
    }
  }

  return heightMap;
};

export default ({
  seed,
  width,
  height,
  depth,
}) => {
  const map = [];

  console.log(generateHeightMap({
    seed,
    width,
    height,
    depth,
  }));

  for (let i = 0; i < depth; i++) {
    map.push([]);

    for (let j = 0; j < width; j++) {
      map[i].push([]);

      for (let k = 0; k < height; k++) {
        const previousLayerCell = map[i - 1] && map[i - 1][j] && map[i - 1][j][k];

        if (previousLayerCell !== undefined) {
          if (previousLayerCell !== 0) {
            map[i][j].push(randomNumberFromRange(0, 2));
          } else {
            map[i][j].push(0);
          }
        } else {
          map[i][j].push(randomNumberFromRange(1, 2));
        }
      }
    }
  }

  return map;
};
