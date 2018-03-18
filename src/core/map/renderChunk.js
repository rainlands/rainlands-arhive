import * as THREE from 'three';
import { CHUNK_SIZE } from '!constants';
import loadMaterials from './loadMaterials';
import texture from '@resources/blocks/textures/grass/2.jpg';

const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);

export default (scene, position, chunk) => {
  const geometry = new THREE.Geometry();
  const materials = loadMaterials(texture);

  for (let y = 0; y < chunk + 1; y++) {
    if (y + 1 > chunk) {
      for (let x = 0; x < CHUNK_SIZE; x++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {
          const mesh = new THREE.Mesh(CUBE_GEOMETRY);
          mesh.position.set(x + position[1] * CHUNK_SIZE, y, z + position[0] * CHUNK_SIZE);

          mesh.updateMatrix();
          geometry.merge(mesh.geometry, mesh.matrix);
        }
      }
    }
  }

  scene.add(new THREE.Mesh(geometry, materials));
};
