import { Noise } from 'noisejs';
import normalizeToRange from 'normalize-to-range';

let NOISE,
  HEIGHT_MAP = {};

const normalize = (object, depth) => {
  const array = normalizeToRange(Object.values(object), 0, depth);
  const keys = Object.keys(object);
  return array.reduce((acc, cur, i) => {
    acc[keys[i]] = cur;
    return acc;
  }, {});
};

export const generateHeightMap = ({
  width, height, depth, seed,
}) => {
  NOISE = new Noise(seed);

  for (let x = 0; x < height; x++) {
    if (!HEIGHT_MAP[x]) HEIGHT_MAP[x] = {};

    for (let z = 0; z < width; z++) {
      HEIGHT_MAP[x][z] = Math.abs(NOISE.perlin2(x / 100, z / 100) * 100);
    }

    HEIGHT_MAP[x] = normalize(HEIGHT_MAP[x], depth);
  }

  return HEIGHT_MAP;
};

export const extendHeightMap = ({
  width, height, offsetWidth, offsetHeight, depth,
}) => {
  for (let x = offsetHeight; x < height + offsetHeight; x++) {
    if (!HEIGHT_MAP[x]) HEIGHT_MAP[x] = [];

    for (let z = offsetWidth; z < width + offsetWidth; z++) {
      HEIGHT_MAP[x][z] = Math.abs(NOISE.perlin2(x / 100, z / 100) * 100);
    }

    HEIGHT_MAP[x] = normalize(HEIGHT_MAP[x], depth);
  }

  return HEIGHT_MAP;
};
