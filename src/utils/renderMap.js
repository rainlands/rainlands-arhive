import * as THREE from 'three';
import objectGenerator from './objectGenerator';

const isVisible = (map, x, y, z) =>
  !(map[y + 1] && map[y + 1][z] && map[y + 1][z][x]) ||
  !(map[y + 1] && map[y + 1][z] && map[y + 1][z][x + 1]) ||
  !(map[y + 1] && map[y + 1][z] && map[y + 1][z][x - 1]) ||
  !(map[y + 1] && map[y + 1][z + 1] && map[y + 1][z + 1][x]) ||
  !(map[y + 1] && map[y + 1][z - 1] && map[y + 1][z - 1][x]);

const loadMaterials = (materials) => {
  let result;

  if (Array.isArray(materials)) {
    result = materials.map((texture) => {
      const material = new THREE.MeshLambertMaterial();
      material.map = new THREE.TextureLoader().load(texture);

      return material;
    });
  } else {
    result = new THREE.MeshLambertMaterial();
    result.map = new THREE.TextureLoader().load(materials);
  }

  return result;
};

export default (chunk, chunkIndex, size, blocks) => {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const layers = {};

  const hLayer = chunkIndex % size;
  const vLayer = (chunkIndex - hLayer) / (size);

  console.log(hLayer, vLayer);

  chunk.forEach((zLayer, y) => {
    zLayer.forEach((xLayer, z) => {
      xLayer.forEach((block, x) => {
        if (isVisible(chunk, x, y, z)) {
          if (block !== 0) {

            const position = [
              (z - zLayer.length / 2) + (hLayer * xLayer.length),
              y,
              (x - xLayer.length / 2) + (vLayer * xLayer.length)
            ]

            if (!layers[block]) {
              const geometry = new THREE.Geometry();

              const materials = loadMaterials(blocks[block].texture);

              const mesh = new THREE.Mesh(cubeGeometry);
              mesh.position.set(...position);

              mesh.updateMatrix();
              geometry.merge(mesh.geometry, mesh.matrix);

              layers[block] = {
                geometry,
                materials,
              };
            } else {
              const mesh = new THREE.Mesh(cubeGeometry);
              mesh.position.set(...position);

              mesh.updateMatrix();
              layers[block].geometry.merge(mesh.geometry, mesh.matrix);
            }
          }
        }
      });
    });
  });

  return Object.keys(layers).map(key => new THREE.Mesh(layers[key].geometry, layers[key].materials));
};

// export default (map, blocks) => {
//   const mergedGeometry = new THREE.Geometry();
//   const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
//   const material = new THREE.MeshLambertMaterial();
//
//   // material.map = new THREE.TextureLoader().load(grassTexture);
//
//   let i = 0;
//
//   map.map((width, x) => {
//     width.map((height, y) => {
//       height.map((block, z) => {
//         i += 1;
//
//         const mesh = new THREE.Mesh(boxGeometry);
//         mesh.position.set(x, y, z);
//
//         mesh.updateMatrix();
//         mergedGeometry.merge(mesh.geometry, mesh.matrix);
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
