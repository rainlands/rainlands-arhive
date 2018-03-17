import shortid from 'shortid';
import blocks from '@resources/blocks';
import { MAP_SIZE } from '!constants'

import generateMap from './generateMap';
import renderChunk from './renderChunk';

let GENERATED_MAP;
const RENDERED_CHUNKS = [];

const addChunkToScene = ({
  chunk,
  index,
  scene,
}) => {

  const xPosition = index % MAP_SIZE;
  const yPosition = (index - xPosition) / (MAP_SIZE);

  if (RENDERED_CHUNKS[xPosition]) {
    RENDERED_CHUNKS[xPosition][yPosition] = [];
  } else {
    RENDERED_CHUNKS[xPosition] = []
    RENDERED_CHUNKS[xPosition][yPosition] = [];
  }

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
      RENDERED_CHUNKS[xPosition][yPosition].push(name);
    })
}

export const renderMap = (scene) => {
  GENERATED_MAP = generateMap({
    seed: Math.floor(Math.random() * (65536 - 1 + 1) + 1), // 1 - 65536
    size: MAP_SIZE,
    depth: 16
  });

  GENERATED_MAP.forEach((chunk, index) => {
    setTimeout(() => {
      addChunkToScene({
        chunk,
        index,
        scene,
      })
    });
  })
}

export const updateMap = (scene, userPosition) => {
  const { x, z } = userPosition;

  const xChunk = (x / 8).toFixed(0);
  const zChunk = (z / 8).toFixed(0);

  console.log(xChunk, zChunk);


  const renderedChunkMaterialsNames = RENDERED_CHUNKS[xChunk] && RENDERED_CHUNKS[xChunk][zChunk];

  if (renderedChunkMaterialsNames) {
    renderedChunkMaterialsNames.forEach((name) => {
      const material = scene.getObjectByName(name);
      scene.remove(material);
    })
  }
}
