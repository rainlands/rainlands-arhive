import * as THREE from 'three';
import shortid from 'shortid';
import { loadMaterials } from './materials';

import GRASS_TEXTURE from '@resources/blocks/textures/grass/2.jpg';

const CHUNKS_MAP = {};
const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);

export const renderChunk = ({ scene, position, height }) => {
  const { x, z } = position;
  const ID = shortid();

  if (!CHUNKS_MAP[x]) CHUNKS_MAP[x] = {};
  CHUNKS_MAP[x][z] = ID;

  setTimeout(() => {
    const geometry = new THREE.Geometry();
    const mesh = new THREE.Mesh(
      CUBE_GEOMETRY,
      loadMaterials(GRASS_TEXTURE),
    );
    mesh.position.set(x, height, z);
    mesh.name = ID;

    scene.add(mesh)
  });
};

export const unrenderChunk = ({ scene, position }) => {
  const { x, z } = position;

  const chunkName = CHUNKS_MAP[x][z];

  setTimeout(() => {
    const chunk = scene.getObjectByName(chunkName);
    scene.remove(chunk);
  });

  delete CHUNKS_MAP[x][z];
  if (!Object.keys(CHUNKS_MAP[x]).length) {
    delete CHUNKS_MAP[x];
  }
};
