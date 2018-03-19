import TerrainGenerator from 'chunked-terrain-generator';

let terrainGenerator;

export const generateWorld = (seed) => {
  terrainGenerator = new TerrainGenerator({
    seed: seed,
    minHeight: 0,
    maxHeight: 256
  })
  //
  // for (var i = 0; i < 10; i++) {
  //   console.log(terrainGenerator.updateMap({
  //     userPosition: [i, 15, i],
  //     renderDistance: 1
  //   }));
  // }
}

export const updateChunks = ({ scene, userPosition, seed }) => {
  console.log(terrainGenerator.updateMap({
    userPosition: Object.values(userPosition).map(o => +o.toFixed(0)),
    renderDistance: 1
  }));
}
