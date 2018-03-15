import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x87cefa, 1);

export default renderer;
