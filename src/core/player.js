import * as THREE from 'three';
import { GAME_ROOT } from '!constants';

export default () => {
  const aspect = GAME_ROOT.offsetWidth / GAME_ROOT.offsetHeight;

  const camera = new THREE.PerspectiveCamera(60, aspect, 0.3, 300);

  camera.rotation.order = 'YXZ'; // XXX: IMPORTANT
  camera.position.set(0, 15, 0);

  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  window.addEventListener('resize', () => {
    camera.aspect = GAME_ROOT.offsetWidth / GAME_ROOT.offsetHeight;
    camera.updateProjectionMatrix();
  });

  return camera;
};
