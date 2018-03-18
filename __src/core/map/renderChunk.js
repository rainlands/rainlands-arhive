import * as THREE from 'three';

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

export default ({
  chunk, index, mapSize, blocks,
}) => {
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const layers = {};

  const hLayer = index % mapSize;
  const vLayer = (index - hLayer) / mapSize;

  chunk.forEach((zLayer, y) => {
    zLayer.forEach((xLayer, z) => {
      xLayer.forEach((block, x) => {
        if (block !== 0) {
          const position = [
            z - zLayer.length / 2 + hLayer * xLayer.length,
            y,
            x - xLayer.length / 2 + vLayer * xLayer.length,
          ];

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
      });
    });
  });

  return Object.keys(layers).map(key => new THREE.Mesh(layers[key].geometry, layers[key].materials));
};
