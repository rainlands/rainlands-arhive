import * as THREE from 'three';
import { GAME_ROOT } from '../constants';

const camera = new THREE.PerspectiveCamera(
  60,
  GAME_ROOT.offsetWidth / GAME_ROOT.offsetHeight,
  1,
  1000,
);

camera.rotation.order = 'YXZ'; // XXX: IMPORTANT
camera.position.set(-3, 2, 12);

window.addEventListener('resize', () => {
  console.log('123');
  camera.aspect = GAME_ROOT.offsetWidth / GAME_ROOT.offsetHeight;
  camera.updateProjectionMatrix();
})

export default camera;
