import * as THREE from 'three';
import shortid from 'shortid';
import { CHUNK_SIZE } from '!constants';
import { loadMaterials } from './materials';

import GRASS_TEXTURE from '@resources/blocks/textures/grass/2.jpg';

const CHUNKS_MAP = {};
const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);

export const renderChunk = ({ scene, position, map }, timeout) => {
  const geometry = new THREE.Geometry();
  const { x, z } = position;
  const ID = shortid();

  if (!CHUNKS_MAP[x]) CHUNKS_MAP[x] = {};
  if (!CHUNKS_MAP[x][z]) {
    setTimeout(() => {
      CHUNKS_MAP[x][z] = ID;

      Object.keys(map).forEach((i) => {
        Object.keys(map[i]).forEach((j) => {
          const height = map[i][j];

          const mesh = new THREE.Mesh(CUBE_GEOMETRY);
          mesh.position.set(
            Number(i) + CHUNK_SIZE * x,
            Math.round(height / 4), // divide by different numbers for every chunk
            Number(j) + CHUNK_SIZE * z,
          );
          mesh.updateMatrix();
          geometry.merge(mesh.geometry, mesh.matrix);
        });
      });

      const mesh = new THREE.Mesh(geometry, loadMaterials(GRASS_TEXTURE));
      mesh.name = ID;

      scene.add(mesh);
    }, timeout);
  }
};

export const unrenderChunk = ({ scene, position }, timeout) => {
  const { x, z } = position;

  if (CHUNKS_MAP[x] && CHUNKS_MAP[x][z]) {
    const chunkName = CHUNKS_MAP[x][z];

    setTimeout(() => {
      const chunk = scene.getObjectByName(chunkName);
      scene.remove(chunk);

      delete CHUNKS_MAP[x][z];
      if (!Object.keys(CHUNKS_MAP[x]).length) {
        delete CHUNKS_MAP[x];
      }
    }, timeout);
  }
};
