import TerrainGenerator from 'chunked-terrain-generator';
import CTGPluginDetailer from 'ctg-plugin-detailer';
import euc from 'euclidean-distance';
import {
  CHUNK_SIZE,
  RENDER_DISTANCE,
  UNRENDER_OFFSET,
  RENDER_TIMEOUT,
  UNRENDER_TIMEOUT,
} from '!constants';
import { renderChunk, unrenderChunk } from './chunks';

let INITIAL_RENDERED = false;

export const createWorldGenerator = (seed) => {
  const generator = new TerrainGenerator({
    seed,
    minHeight: 0,
    maxHeight: 2,
  });

  generator.addPlugin(new CTGPluginDetailer(CHUNK_SIZE, 4));

  return generator;
};

export const updateChunks = ({
  generator, userPosition, seed, scene,
}) => {
  let userChunkX = Number((userPosition.x / CHUNK_SIZE).toFixed(0));
  let userChunkZ = Number((userPosition.z / CHUNK_SIZE).toFixed(0));

  if (userChunkX < 0 || Object.is(userChunkX, -0)) {
    userChunkX -= 1;
  }
  if (userChunkZ < 0 || Object.is(userChunkZ, -0)) {
    userChunkZ -= 1;
  }

  const { map, added, deleted } = generator.updateMap({
    userPosition: [userChunkX, 0, userChunkZ],
    renderDistance: RENDER_DISTANCE,
    unrenderDistance: RENDER_DISTANCE + UNRENDER_OFFSET,
  });

  added.forEach((coords, i) => {
    renderChunk(
      {
        scene,
        position: coords,
        map: map[coords.x][coords.z],
      },
      INITIAL_RENDERED ? i * RENDER_TIMEOUT : 0,
      // i * euc([coords.x, coords.z], [userChunkX, userChunkZ]) * 10,
    );
  });

  deleted.forEach((coords, i) => {
    unrenderChunk(
      {
        scene,
        position: coords,
      },
      i * UNRENDER_TIMEOUT,
      // i * (300 - euc([coords.x, coords.z], [userChunkX, userChunkZ]) * 10),
    );
  });

  if (!INITIAL_RENDERED) {
    INITIAL_RENDERED = true;
  }
};
