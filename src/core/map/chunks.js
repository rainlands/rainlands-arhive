import * as THREE from 'THREE';
import shortID from 'shortid';
import { CHUNK_SIZE } from '@constants';
import { loadMaterials } from './materials';

const GEOMETRY = new THREE.Geometry();
const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);
const CHUNKS_NAMES = {};
const mesh = new THREE.Mesh(CUBE_GEOMETRY);

export const renderChunk = ({
  scene, position, chunk, chunkBiomes,
}, timeout) => {
  const [x, z] = position;
  const layers = {};

  for (let i = 0; i < CHUNK_SIZE; i++) {
    for (let j = 0; j < CHUNK_SIZE; j++) {
      const biome = Math.round(chunkBiomes[i][j]);

      mesh.position.set(
        Number(i) + CHUNK_SIZE * x,
        Math.round(chunk[i][j]), // divide by different numbers for every chunk
        Number(j) + CHUNK_SIZE * z,
      );
      mesh.updateMatrix();

      if (!layers[biome]) {
        const geometry = new THREE.Geometry();
        const materials = loadMaterials(biome);

        geometry.merge(mesh.geometry, mesh.matrix);

        layers[biome] = {
          geometry,
          materials,
        };
      } else {
        layers[biome].geometry.merge(mesh.geometry, mesh.matrix);
      }
    }
  }

  const toRender = [];

  Object.values(layers).map((layer) => {
    const mesh = new THREE.Mesh(
      new THREE.BufferGeometry().fromGeometry(layer.geometry),
      layer.materials,
    );
    const meshName = shortID();
    mesh.name = meshName;

    toRender.push(mesh);

    if (!CHUNKS_NAMES[x]) CHUNKS_NAMES[x] = {};
    if (!CHUNKS_NAMES[x][z]) CHUNKS_NAMES[x][z] = [meshName];
    else CHUNKS_NAMES[x][z].push(meshName);
  });

  setTimeout(() => {
    toRender.forEach((mesh) => {
      if (CHUNKS_NAMES[x] && CHUNKS_NAMES[x][z]) {
        scene.add(mesh);
      }
    })
  }, timeout);
};

export const unrenderChunk = ({ scene, position }) => {
  const [x, z] = position;

  CHUNKS_NAMES[x][z].forEach((name) => {
    const object = scene.getObjectByName(name);

    if (object) {
      if (object) {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
        scene.remove(object);
      }
    }
  });

  if (CHUNKS_NAMES[x][z]) {
    delete CHUNKS_NAMES[x][z];
  }

  if (!Object.keys(CHUNKS_NAMES[x]).length) {
    delete CHUNKS_NAMES[x];
  }
};
