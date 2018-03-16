import * as THREE from 'three';
import { GAME_ROOT } from '../constants';

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x87cefa, 1);

window.addEventListener('resize', () => {
  renderer.setSize(GAME_ROOT.offsetWidth, GAME_ROOT.offsetHeight);
})

export default renderer;
