import shortid from 'shortid';
import isNegateZero from 'is-negative-zero';
import blocks from '@resources/blocks';
import { MAP_SIZE } from '!constants'

import generateMap from './generateMap';
import renderChunk from './renderChunk';

let GENERATED_MAP;
const RENDERED_CHUNKS = [];

const addToRenderedChunks = (x, y, name) => {
  if (RENDERED_CHUNKS[x]) {
    if (RENDERED_CHUNKS[x][y]) {
      RENDERED_CHUNKS[x][y].push(name);
    } else {
      RENDERED_CHUNKS[x][y] = [name];
    }
  } else {
    RENDERED_CHUNKS[x] = [];
    RENDERED_CHUNKS[x][y] = [name];
  }
}

const addChunkToScene = ({
  chunk,
  index,
  scene,
  x,
  y
}) => {
  renderChunk({
    chunk,
    index,
    mapSize: MAP_SIZE,
    blocks
  })
    .forEach((rendered) => {
      const name = shortid();

      rendered.name = name;

      scene.add(rendered);

      console.log(x, y);

      addToRenderedChunks(x, y, name);
    })
}

export const renderMap = (scene) => {
  GENERATED_MAP = generateMap({
    seed: Math.floor(Math.random() * (65536 - 1 + 1) + 1), // 1 - 65536
    size: MAP_SIZE,
    depth: 16
  });
}

export const updateMap = (scene, userPosition) => {
  const { x, z } = userPosition;

  const xChunk = +(x / 8).toFixed(0);
  const zChunk = +(z / 8).toFixed(0);

  const chunkIndex = (zChunk * 8) + xChunk;

  if (
    xChunk >= 0 &&
    !isNegateZero(+xChunk) &&
    zChunk >= 0 &&
    !isNegateZero(+zChunk)
  ) {
    const renderedChunkMaterialsNames = RENDERED_CHUNKS[xChunk] && RENDERED_CHUNKS[xChunk][zChunk];

    if (!renderedChunkMaterialsNames || renderedChunkMaterialsNames.length === 0) {
      console.log('rendering...');

      if (GENERATED_MAP[chunkIndex]) {
        addChunkToScene({
          chunk: GENERATED_MAP[chunkIndex],
          index: chunkIndex,
          scene,
          x: xChunk,
          y: zChunk,
        })
      }
    }
  }
}
