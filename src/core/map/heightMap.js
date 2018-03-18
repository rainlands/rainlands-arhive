import { Noise } from 'noisejs';
import normalizeToRange from 'normalize-to-range';

const normalize = (object, yMin, yMax) => {
  const array = normalizeToRange(Object.values(object), yMin, yMax);
  const keys = Object.keys(object);
  return array.reduce((acc, cur, i) => {
    acc[keys[i]] = cur;
    return acc;
  }, {});
};

export const extendHeightMap = (
  map,
  noise,
  {
    width = 0, height = 0, offsetWidth = 0, offsetHeight = 0, yMin, yMax,
  },
) => {
  if (!map) map = {};

  for (let x = offsetHeight; x <= height + offsetHeight; x++) {
    if (!map[x]) map[x] = [];

    for (let z = offsetWidth; z <= width + offsetWidth; z++) {
      map[x][z] = Math.abs(noise.perlin2(x / 100, z / 100) * 100);
    }

    map[x] = normalize(map[x], yMin, yMax);
  }

  return map;
};
