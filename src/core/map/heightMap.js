import { Noise } from 'noisejs';
import normalizeToRange from 'normalize-to-range';

const normalize = (object, yMin, yMax) => {
  const array =
    Object.values(object).length > 1
      ? normalizeToRange(Object.values(object), yMin, yMax)
      : Object.values(object);
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
    width = 0, height = 0, offsetWidth = 0, offsetHeight = 0, yMin = 0, yMax = 0,
  },
) => {
  if (!map) map = {};

  for (let x = offsetHeight; x < height + offsetHeight; x++) {
    if (!map[x]) map[x] = [];

    for (let z = offsetWidth; z < width + offsetWidth; z++) {
      map[x][z] = Math.abs(noise.perlin2(+x / 100, +z / 100) * 100);
    }

    map[x] = normalize(map[x], yMin, yMax);
  }

  return map;
};
