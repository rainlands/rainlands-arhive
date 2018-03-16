import * as THREE from 'three';
import objectGenerator from './objectGenerator';

import grassTexture from '../entities/textures/grassTop.png';

export default (map) => {
  const mergedGeometry = new THREE.Geometry();
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial();

  material.map = new THREE.TextureLoader().load(grassTexture);

  let i = 0;

  map.map((width, x) => {
    width.map((height, y) => {
      height.map((block, z) => {
        i += 1;

        const mesh = new THREE.Mesh(boxGeometry)
        mesh.position.set(x, y, z);

        mesh.updateMatrix();
        mergedGeometry.merge(mesh.geometry, mesh.matrix);
      });
    });
  });

  console.log(i);

  const rendered = new THREE.Mesh(mergedGeometry, material);
  rendered.doubleSided = false;

  return rendered;
};


// export default (map) => {
//   const mergedGeometry = new THREE.Geometry();
//   const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
//   const material = new THREE.MeshLambertMaterial();
//
//   material.map = new THREE.TextureLoader().load(grassTexture);
//
//   let i = 0;
//
//   map.map((width, x) => {
//     width.map((height, y) => {
//       height.map((block, z) => {
//         i += 1;
//
//         boxGeometry.translate(x, y, z);
//         mergedGeometry.merge(boxGeometry);
//         boxGeometry.translate(-x, -y, -z);
//       });
//     });
//   });
//
//   console.log(i);
//
//   const rendered = new THREE.Mesh(mergedGeometry, material);
//   rendered.doubleSided = false;
//
//   return rendered;
// };
