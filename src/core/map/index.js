import shortid from 'shortid';
import isNegateZero from 'is-negative-zero';
import blocks from '@resources/blocks';
import { MAP_SIZE, CHUNK_SIZE } from '!constants';

import generateMap from './generateMap';
import renderChunk from './renderChunk';

let GENERATED_MAP;
const RENDERED_CHUNKS = [];

const addToRenderedChunks = (x, y, name) => {
  if (RENDERED_CHUNKS[x]) {
    if (RENDERED_CHUNKS[x][y]) {
      // if (isNaN(RENDERED_CHUNKS[x][y][0])) {
      //   RENDERED_CHUNKS[x][y][0] = name;
      // } else {
      //   RENDERED_CHUNKS[x][y].push(name);
      // }
      RENDERED_CHUNKS[x][y].push(name);
    } else {
      RENDERED_CHUNKS[x][y] = [name];
    }
  } else {
    RENDERED_CHUNKS[x] = [];
    RENDERED_CHUNKS[x][y] = [name];
  }
};

const addChunkToScene = ({
  chunk, index, scene, x, y,
}) => {
  renderChunk({
    chunk,
    index,
    mapSize: MAP_SIZE,
    blocks,
  }).forEach((rendered) => {
    const name = shortid();

    rendered.name = name;

    scene.add(rendered);

    addToRenderedChunks(x, y, name);
  });
};

export const renderMap = (scene) => {
  GENERATED_MAP = generateMap({
    seed: Math.floor(Math.random() * (65536 - 1 + 1) + 1), // 1 - 65536
    size: MAP_SIZE,
    depth: 16,
  });
};

export const updateMap = (scene, userPosition) => {
  const { x, z } = userPosition;

  const xChunk = +(x / CHUNK_SIZE).toFixed(0);
  const zChunk = +(z / CHUNK_SIZE).toFixed(0);

    const xChunksToRender = [xChunk - 2, xChunk - 1, xChunk, xChunk + 1, xChunk + 2];
    const zChunksToRender = [zChunk - 2, zChunk - 1, zChunk, zChunk + 1, zChunk + 2];

  xChunksToRender.forEach((xChunk) => {
    zChunksToRender.forEach((zChunk) => {
      const chunkIndex = zChunk * MAP_SIZE + xChunk;

      if (chunkIndex < MAP_SIZE * MAP_SIZE) {
        if (xChunk >= 0 && !isNegateZero(+xChunk) && zChunk >= 0 && !isNegateZero(+zChunk)) {
          const renderedChunkMaterialsNames =
            RENDERED_CHUNKS[xChunk] && RENDERED_CHUNKS[xChunk][zChunk];

          if (
            ((!renderedChunkMaterialsNames || renderedChunkMaterialsNames.length === 0) &&
              !renderedChunkMaterialsNames)
          ) {

            if (GENERATED_MAP[chunkIndex]) {
              console.log('RENDERING');
              addChunkToScene({
                chunk: GENERATED_MAP[chunkIndex],
                index: chunkIndex,
                scene,
                x: xChunk,
                y: zChunk,
              });
            }
          }
        }
      }
    });
  });
};

// const xChunksToUnrender = [
//   xChunk - 5,
//   xChunk - 3,
//   xChunk - 3,
//   xChunk + 3,
//   xChunk + 4,
//   xChunk + 5,
// ]
// const zChunksToUnrender = [
//   zChunk - 5,
//   zChunk - 3,
//   zChunk - 3,
//   zChunk + 3,
//   zChunk + 4,
//   zChunk + 5,
// ]
//
// xChunksToUnrender.forEach((xChunk) => {
//   zChunksToUnrender.forEach((zChunk) => {
//     const chunkMaterials = RENDERED_CHUNKS[xChunk] && RENDERED_CHUNKS[xChunk][zChunk];
//
//     if (chunkMaterials && chunkMaterials.length) {
//       console.log('DELETING');
//       chunkMaterials.forEach((name) => {
//         const material = scene.getObjectByName(name);
//
//         scene.remove(material);
//       })
//
//       RENDERED_CHUNKS[xChunk][zChunk] = [];
//     }
//   })
// })
