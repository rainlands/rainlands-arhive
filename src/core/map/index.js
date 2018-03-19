import TerrainGenerator from 'chunked-terrain-generator';
import CTGPluginDetailer from 'ctg-plugin-detailer';
import { CHUNK_SIZE } from '!constants'
import { renderChunk, unrenderChunk } from './chunks';

export const createWorldGenerator = seed => {
  const generator = new TerrainGenerator({
    seed,
    minHeight: 0,
    maxHeight: 2,
  });

  generator.addPlugin(new CTGPluginDetailer(CHUNK_SIZE, 4));

  return generator;
}

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
  //
  // console.log(userChunkX, userChunkZ);
  // console.log(map);


  const { map, added, deleted } = generator.updateMap({
    userPosition: [userChunkX, 0, userChunkZ],
    renderDistance: 1,
    unrenderDistance: 4,
  });


  added.forEach((coords) => {
    renderChunk({
      scene,
      position: coords,
      map: map[coords.x][coords.z],
    });
  });

  deleted.forEach((coords) => {
    unrenderChunk({
      scene,
      position: coords,
    });
  });
};
