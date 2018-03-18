import { Noise } from 'noisejs';

import { CHUNK_SIZE } from '!constants';
import { generateHeightMap, extendHeightMap } from './heightMap';
import renderChunk from './renderChunk';

let GLOBAL_HEIGHT_MAP,
  GLOBAL_NOISE,
  LOCAL_HEIGHT_MAP,
  LOCAL_NOISE;

export const generateWorld = (seed) => {
  GLOBAL_NOISE = new Noise(seed);
  LOCAL_NOISE = new Noise(seed * Math.random());
};

export const renderChunks = (userPosition) => {
  const { x, z } = userPosition;

  let xChunk = +(x / 16).toFixed(0);
  let zChunk = +(z / 16).toFixed(0);

  if (Object.is(xChunk, -0)) xChunk = -1;
  else if (xChunk < 0) xChunk -= 1;

  if (Object.is(zChunk, -0)) zChunk = -1;
  else if (zChunk < 0) zChunk -= 1;

  if (!GLOBAL_HEIGHT_MAP || GLOBAL_HEIGHT_MAP[xChunk] === undefined || GLOBAL_HEIGHT_MAP[xChunk][zChunk] === undefined) {
    console.log(`GENERATING HEIGHT MAP FOR ${xChunk}:${zChunk}`);

    GLOBAL_HEIGHT_MAP = extendHeightMap(GLOBAL_HEIGHT_MAP, GLOBAL_NOISE, {
      width: 1,
      height: 1,
      offsetWidth: zChunk,
      offsetHeight: xChunk,
      yMin: 0,
      yMax: 4,
    });

    renderChunk(GLOBAL_HEIGHT_MAP[xChunk][zChunk]);
  }
};
