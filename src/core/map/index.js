import { Noise } from 'noisejs';

import { CHUNK_SIZE } from '!constants';
import { generateHeightMap, extendHeightMap } from './heightMap';
import renderChunk from './renderChunk';

let GLOBAL_HEIGHT_MAP = {},
  GLOBAL_NOISE,
  LOCAL_HEIGHT_MAP = {},
  LOCAL_NOISE;

export const generateWorld = (seed) => {
  GLOBAL_NOISE = new Noise(seed);
  LOCAL_NOISE = new Noise(seed * Math.random());
};

export const renderChunks = (scene, userPosition) => {
  const { x, z } = userPosition;

  let xChunk = +(x / CHUNK_SIZE).toFixed(0);
  let zChunk = +(z / CHUNK_SIZE).toFixed(0);

  if (Object.is(xChunk, -0)) xChunk = -1;
  else if (xChunk < 0) xChunk -= 1;

  if (Object.is(zChunk, -0)) zChunk = -1;
  else if (zChunk < 0) zChunk -= 1;

  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (!GLOBAL_HEIGHT_MAP || GLOBAL_HEIGHT_MAP[xChunk + i] === undefined || GLOBAL_HEIGHT_MAP[xChunk + i][zChunk + j] === undefined) {
        GLOBAL_HEIGHT_MAP = extendHeightMap(GLOBAL_HEIGHT_MAP, GLOBAL_NOISE, {
          width: 1,
          height: 1,
          offsetWidth: zChunk + j,
          offsetHeight: xChunk + i,
          yMin: 0,
          yMax: 4,
        });

        renderChunk(
          scene,
          [zChunk + j, xChunk + i],
          GLOBAL_HEIGHT_MAP[xChunk + i][zChunk + j],
        );
      }
    }
  }
};
