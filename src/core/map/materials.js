import * as THREE from 'three';
import MicroCache from 'microcache';

import blocks from '@resources/blocks';

const microCache = new MicroCache();

export const loadMaterials = (blockID) => {
  let result;
  const block = blocks[blockID];


  if (Array.isArray(block.texture)) {
    result = block.textures.map((texture) => {
      const material = new THREE.MeshLambertMaterial();
      material.map = microCache.getSet(block.name, new THREE.TextureLoader().load(texture));
      // material.map = new THREE.TextureLoader().load(texture);

      return material;
    });
  } else {
    result = new THREE.MeshLambertMaterial();
    result.map = microCache.getSet(block.name, new THREE.TextureLoader().load(block.texture));
    // result.map = new THREE.TextureLoader().load(materials);
  }

  return result;
};
