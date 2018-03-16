import * as THREE from 'three';
import { GAME_ROOT } from '../constants';

export default (() => {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  const { offsetWidth, offsetHeight } = GAME_ROOT;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x87cefa, 1);
  renderer.setSize(offsetWidth, offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  window.addEventListener('resize', () => {
    renderer.setSize(offsetWidth, offsetHeight);
  });

  return renderer;
})();
