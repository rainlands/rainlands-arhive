import * as THREE from 'three';

export const loadMaterials = (materials) => {
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
