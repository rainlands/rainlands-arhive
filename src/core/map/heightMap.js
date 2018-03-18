import { Noise } from 'noisejs';
import normalizeToRange from 'normalize-to-range';

const normalize = (object, depth) => {
  const array = normalizeToRange(Object.values(object), 0, depth);
  const keys = Object.keys(object);
  return array.reduce((acc, cur, i) => {
    acc[keys[i]] = cur;
    return acc;
  }, {});
};

export const generateHeightMap = (noise, {
  width, height, depth, seed,
}) => {
  const map = {};

  for (let x = 0; x < height; x++) {
    if (!map[x]) map[x] = {};

    for (let z = 0; z < width; z++) {
      map[x][z] = Math.abs(noise.perlin2(x / 100, z / 100) * 100);
    }

    map[x] = normalize(map[x], depth);
  }

  return map;
};

export const extendHeightMap = (map, noise, {
  width, height, offsetWidth, offsetHeight, depth,
}) => {
  for (let x = offsetHeight; x < height + offsetHeight; x++) {
    if (!map[x]) map[x] = [];

    for (let z = offsetWidth; z < width + offsetWidth; z++) {
      map[x][z] = Math.abs(noise.perlin2(x / 100, z / 100) * 100);
    }

    map[x] = normalize(map[x], depth);
  }

  return map;
};
