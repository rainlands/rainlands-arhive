import * as THREE from 'three';
import shortid from 'shortid';
import { CHUNK_SIZE } from '!constants';
import { loadMaterials } from './materials';

import GRASS_TEXTURE from '@resources/blocks/textures/grass/2.jpg';

const CHUNKS_MAP = {};
const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
const meshLocal = new THREE.Mesh(CUBE_GEOMETRY);

export const renderChunk = ({ scene, position, map }, timeout) => {
  const geometry = new THREE.Geometry();
  const { x, z } = position;
  const ID = shortid();

  if (!CHUNKS_MAP[x]) CHUNKS_MAP[x] = {};
  if (!CHUNKS_MAP[x][z]) {
    setTimeout(() => {
      if (!CHUNKS_MAP[x]) CHUNKS_MAP[x] = {};
      CHUNKS_MAP[x][z] = ID;

      Object.keys(map).forEach((i) => {
        Object.keys(map[i]).forEach((j) => {
          const height = map[i][j];

          meshLocal.position.set(
            Number(i) + CHUNK_SIZE * x,
            Math.round(height / 4), // divide by different numbers for every chunk
            Number(j) + CHUNK_SIZE * z,
          );
          meshLocal.updateMatrix();
          geometry.merge(meshLocal.geometry, meshLocal.matrix);
        });
      });

      const mesh = new THREE.Mesh(
        new THREE.BufferGeometry().fromGeometry(geometry),
        loadMaterials(GRASS_TEXTURE),
      );
      // const mesh = new THREE.Mesh(geometry, loadMaterials(GRASS_TEXTURE));
      mesh.name = ID;

      scene.add(mesh);
    }, timeout);
  }
};

export const unrenderChunk = ({ scene, position }, timeout) => {
  const { x, z } = position;

  if (CHUNKS_MAP[x]) {
    const chunkName = CHUNKS_MAP[x][z];

    setTimeout(() => {
      const chunk = scene.getObjectByName(chunkName);
      scene.remove(chunk);

      if (CHUNKS_MAP[x][z]) {
        delete CHUNKS_MAP[x][z];
      }

      if (!Object.keys(CHUNKS_MAP[x]).length) {
        delete CHUNKS_MAP[x];
      }
    }, timeout);
  }
};
