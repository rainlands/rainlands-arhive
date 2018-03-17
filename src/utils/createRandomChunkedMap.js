import { Noise } from 'noisejs';
import normalizeToRange from 'normalize-to-range';

const randomNumberFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateHeightMap = ({
  seed, width, height, depth,
}) => {
  const noise = new Noise(seed);

  const heightMap = [];

  for (let x = 0; x < width; x++) {
    const layer = [];
    for (let y = 0; y < height; y++) {
      layer.push(Math.abs(noise.perlin2(x / 100, y / 100) * 100));
    }

    const normalized = normalizeToRange(layer, 0, depth);

    heightMap.push(normalized);
  }

  return heightMap;
};

export default ({ seed, size, depth }) => {
  const CHUNK_SIZE = 16;

  const width = size * CHUNK_SIZE;
  const height = size * CHUNK_SIZE;

  const heightMap = generateHeightMap({
    seed,
    width,
    height,
    depth,
  });

  const map = [];

  for (let ch = 0; ch < size; ch++) {
    const hLayer = ch % (size / 2);
    const vLayer = (ch - hLayer) / (size / 2);

    map[ch] = [];

    for (let i = 0; i < depth; i++) {
      map[ch][i] = [];

      for (let j = 0; j < CHUNK_SIZE; j++) {
        map[ch][i][j] = [];

        for (let k = 0; k < CHUNK_SIZE; k++) {

          const orJ = (hLayer * CHUNK_SIZE) + j;
          const orK = (vLayer * CHUNK_SIZE) + k;

          if (heightMap[orJ][orJ] > i) {
            map[ch][i][j][k] = randomNumberFromRange(1, 2);
          } else {
            map[ch][i][j][k] = 0;
          }
        }
      }
    }
  }

  return map;
};