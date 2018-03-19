import TerrainGenerator from 'chunked-terrain-generator';
import { renderChunk, unrenderChunk } from './chunks';

export const createWorldGenerator = seed => new TerrainGenerator({
  seed: seed,
  minHeight: 0,
  maxHeight: 256
})

export const updateChunks = ({
  generator,
  userPosition,
  seed,
  scene,
}) => {

  const { map, added, deleted } = generator.updateMap({
    userPosition: Object.values(userPosition).map(o => Number(o.toFixed(0))),
    renderDistance: 5
  })

  added.forEach((coords) => {
    renderChunk({
      scene,
      position: coords,
      height: map[coords.x][coords.z],
    })
  })

  deleted.forEach((coords) => {
    unrenderChunk({
      scene,
      position: coords,
    })
  })
}
