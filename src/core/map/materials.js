import * as THREE from 'three';
import MicroCache from 'microcache';
const microCache = new MicroCache();

export const loadMaterials = (materials) => {
  let result;

  if (Array.isArray(materials)) {
    result = materials.map((texture) => {
      const material = new THREE.MeshLambertMaterial();
      material.map = microCache.getSet('heavy', new THREE.TextureLoader().load(texture));

      return material;
    });
  } else {
    result = new THREE.MeshLambertMaterial();
    result.map = microCache.getSet('heavy', new THREE.TextureLoader().load(materials));
  }

  return result;
};
