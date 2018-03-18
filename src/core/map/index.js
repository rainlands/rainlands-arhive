import { Noise } from 'noisejs';

import { CHUNK_SIZE } from '!constants';
import { generateHeightMap, extendHeightMap } from './heightMap';
import renderChunk from './renderChunk';

let HEIGHT_MAP,
  GLOBAL_NOISE,
  LOCAL_NOISE;

export const generateWorld = (seed) => {
  // generate chunks height map

  GLOBAL_NOISE = new Noise(seed);
  LOCAL_NOISE = new Noise(seed * Math.random());

  HEIGHT_MAP = generateHeightMap(GLOBAL_NOISE, {
    width: 2,
    height: 2,
    depth: 2,
    seed,
  });

  // generate detailed height map for every chunk
  // const detailedHeightMap = HEIGHT_MAP.map(
  //   x => x.map(
  //     z => generateHeightMap(z, 4, 4, 4)
  //   )
  // );

  // height map from 0:0 chunk
  // console.log(HEIGHT_MAP[0][0]);
};

export const renderChunks = (userPosition, seed) => {
  const { x, z } = userPosition;

  let xChunk = +(x / 16).toFixed(0);
  let zChunk = +(z / 16).toFixed(0);

  if (Object.is(xChunk, -0)) xChunk = -1;
  else if (xChunk < 0) xChunk -= 1;

  if (Object.is(zChunk, -0)) zChunk = -1;
  else if (zChunk < 0) zChunk -= 1;

  if (HEIGHT_MAP[xChunk] === undefined || HEIGHT_MAP[xChunk][zChunk] === undefined) {
    console.log(`GENERATING HEIGHT MAP FOR ${xChunk}:${zChunk}`);

    HEIGHT_MAP = extendHeightMap(HEIGHT_MAP, LOCAL_NOISE, {
      width: 1,
      height: 1,
      offsetWidth: zChunk,
      offsetHeight: xChunk,
      depth: 2,
    });

    renderChunk(HEIGHT_MAP[xChunk][zChunk]);
  }
};
