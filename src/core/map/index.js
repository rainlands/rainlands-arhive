import TerrainGenerator from 'terrain-generator';
import TGPluginComposer from 'terrain-generator-plugin-composer';
import {
  CHUNK_SIZE,
  RENDER_DISTANCE,
  UNRENDER_OFFSET,
  RENDER_TIMEOUT,
  UNRENDER_TIMEOUT,
} from '@constants';
import { renderChunk, unrenderChunk } from './chunks';

let INITIAL_RENDERED = false;

export const createWorldGenerator = (seed) => {
  const heightGenerator = new TerrainGenerator({
    seed,
    detalization: 100,
    minHeight: 0,
    maxHeight: 1,
  });

  heightGenerator.addPlugin(new TGPluginComposer({
    generator: new TerrainGenerator({
      seed: Math.random(),
      detalization: 200,
      minHeight: -35,
      maxHeight: 35,
    }),
    detalization: CHUNK_SIZE,
  }));

  const biomesGenerator = new TerrainGenerator({
    seed,
    detalization: 100,
    minHeight: 0,
    maxHeight: 1,
  });

  biomesGenerator.addPlugin(new TGPluginComposer({
    generator: new TerrainGenerator({
      seed: Math.random(),
      detalization: 1000,
      minHeight: -2,
      maxHeight: 7,
    }),
    detalization: CHUNK_SIZE,
  }));

  return {
    height: heightGenerator,
    biomes: biomesGenerator,
  };
};

export const updateChunks = ({ generator, userPosition, scene }) => {
  let userChunkX = Number((userPosition.x / CHUNK_SIZE).toFixed(0));
  let userChunkZ = Number((userPosition.z / CHUNK_SIZE).toFixed(0));

  if (userChunkX < 0 || Object.is(userChunkX, -0)) {
    userChunkX -= 1;
  }
  if (userChunkZ < 0 || Object.is(userChunkZ, -0)) {
    userChunkZ -= 1;
  }

  const heightMap = generator.height.updateMap({
    userPosition: [userChunkX, 0, userChunkZ],
    renderDistance: INITIAL_RENDERED ? RENDER_DISTANCE : RENDER_DISTANCE + UNRENDER_OFFSET,
    unrenderOffset: UNRENDER_OFFSET,
  });

  const biomesMap = generator.biomes.updateMap({
    userPosition: [userChunkX, 0, userChunkZ],
    renderDistance: INITIAL_RENDERED ? RENDER_DISTANCE : RENDER_DISTANCE + UNRENDER_OFFSET,
    unrenderOffset: UNRENDER_OFFSET,
  });

  Object.keys(heightMap.added).forEach((x) => {
    Object.keys(heightMap.added[x]).forEach((z) => {
      renderChunk(
        {
          scene,
          position: [x, z],
          chunk: heightMap.added[x][z],
          chunkBiomes: biomesMap.added[x][z],
        },
        INITIAL_RENDERED ? x * z * RENDER_TIMEOUT : 0,
      );
    });
  });

  Object.keys(heightMap.deleted).forEach((x) => {
    Object.keys(heightMap.deleted[x]).forEach((z) => {
      unrenderChunk(
        {
          scene,
          position: [x, z ],
        },
        x * z * UNRENDER_TIMEOUT,
      );
    });
  });

  if (!INITIAL_RENDERED) {
    INITIAL_RENDERED = true;
  }
};
