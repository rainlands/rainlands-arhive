import * as THREE from 'three';
import { GAME_ROOT } from '!constants';

export default () => {
  const { offsetWidth, offsetHeight } = GAME_ROOT;
  const aspect = offsetWidth / offsetHeight;

  const camera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);

  camera.rotation.order = 'YXZ'; // XXX: IMPORTANT
  camera.position.set(-3, 2, 12);

  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  window.addEventListener('resize', () => {
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  });

  return camera;
};
