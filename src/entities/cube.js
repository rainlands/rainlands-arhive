import * as THREE from 'three';

import grass from './textures/grass.jpg';
import grassTop from './textures/grassTop.png';

export const createCube = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  type,
  ...params,
}) => {

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  let materials = [];

  if (type === 'grass') {

    for (var i = 0; i < 6; i++) {
      const material = new THREE.MeshLambertMaterial({ color: 'white' });

      if (i === 2) {
        material.map = new THREE.TextureLoader().load(grassTop);
      } else {
        material.map = new THREE.TextureLoader().load(grass);
      }

      materials.push(material)
    }
  }

  const cube = new THREE.Mesh(
    geometry,
    materials,
  );

  cube.rotation.set(...rotation.map(s => s * (Math.PI / 180)));
  cube.position.set(...position.map(e => e + 0.5));

  Object.assign(cube, params);

  return cube;
}
