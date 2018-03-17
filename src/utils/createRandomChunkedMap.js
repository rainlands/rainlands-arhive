import { Noise } from 'noisejs';
import normalizeToRange from 'normalize-to-range';

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
    const layer = [];
    for (let y = 0; y < height; y++) {
      layer.push(
        Math.abs(noise.perlin2(x / 100, y / 100) * 100)
      );
    }

    const normalized = normalizeToRange(layer, 0, depth);

    heightMap.push(normalized)
  }

  return heightMap;
};

export default ({
  seed,
  size,
  depth,
}) => {
  const map = [];
  const width = size * 8;
  const height = size * 8;

  const heightMap = generateHeightMap({
    seed,
    width,
    height,
    depth,
  })

  const expMap = Array(size).fill(
    Array(depth).fill(
      Array(4).fill(
        Array(4).fill(null)
      )
    )
  )

  for (var ch = 0; ch < expMap.length; ch++) {
    const hLayer = ch % (size / 2);
    const vLayer = (ch - hLayer) / (size / 2);

    console.log(hLayer, vLayer);

    // for (let i = 0; i < depth; i++) {
    //   for (let j = layer * 4; j < (layer * 4) + 8; j++) {
    //     for (let k = 0; k < height; k++) {
    //
    //     }
    //   }
    // }
  }

  // for (let i = 0; i < depth; i++) {
  //   map.push([]);
  //
  //   for (let j = 0; j < width; j++) {
  //     map[i].push([]);
  //
  //     for (let k = 0; k < height; k++) {
  //       const previousLayerCell = map[i - 1] && map[i - 1][j] && map[i - 1][j][k];
  //
  //       if (heightMap[k][j] > i) {
  //         map[i][j].push(randomNumberFromRange(1, 2));
  //       } else {
  //         map[i][j].push(0);
  //       }
  //
  //     }
  //   }
  // }

  return map;
};
