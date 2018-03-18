import { Noise } from 'noisejs';

import { CHUNK_SIZE, BIOME_SIZE } from '!constants';
import { generateHeightMap, extendHeightMap } from './heightMap';
import renderChunk from './renderChunk';

let GLOBAL_HEIGHT_MAP = {},
  GLOBAL_NOISE,
  LOCAL_HEIGHT_MAP = {},
  LOCAL_NOISE,
  NOISE_MAP = {};

export const generateWorld = (seed) => {
  GLOBAL_NOISE = new Noise(seed);
  LOCAL_NOISE = new Noise(seed * Math.random());
};

export const renderChunks = (scene, userPosition) => {
  const { x, z } = userPosition;

  let xChunk = +(x / CHUNK_SIZE).toFixed(0);
  let zChunk = +(z / CHUNK_SIZE).toFixed(0);

  let xNoise = +(x / BIOME_SIZE).toFixed(0);
  let zNoise = +(z / BIOME_SIZE).toFixed(0);

  if (Object.is(xChunk, -0)) xChunk = -1;
  else if (xChunk < 0) xChunk -= 1;

  if (Object.is(zChunk, -0)) zChunk = -1;
  else if (zChunk < 0) zChunk -= 1;

  if (Object.is(xNoise, -0)) xNoise = -1;
  else if (xNoise < 0) xNoise -= 1;

  if (Object.is(zNoise, -0)) zNoise = -1;
  else if (zNoise < 0) zNoise -= 1;

  if (!NOISE_MAP || !NOISE_MAP[xNoise] || !NOISE_MAP[xNoise][zNoise]) {
    if (!NOISE_MAP[xNoise]) NOISE_MAP[xNoise] = {};
    NOISE_MAP[xNoise][zNoise] = new Noise(Math.random());
  }

  for (let i = -2; i < 3; i++) {
    for (let j = -2; j < 3; j++) {
      if (
        !GLOBAL_HEIGHT_MAP ||
        GLOBAL_HEIGHT_MAP[xChunk + i] === undefined ||
        GLOBAL_HEIGHT_MAP[xChunk + i][zChunk + j] === undefined
      ) {
        GLOBAL_HEIGHT_MAP = extendHeightMap(GLOBAL_HEIGHT_MAP, NOISE_MAP[xNoise][zNoise], {
          width: 1,
          height: 1,
          offsetWidth: zChunk + j,
          offsetHeight: xChunk + i,
          yMin: 0,
          yMax: 8,
        });

        renderChunk(scene, [zChunk + j, xChunk + i], GLOBAL_HEIGHT_MAP[xChunk + i][zChunk + j]);
      }
    }
  }
};
