import * as THREE from 'three';
import Stats from 'stats-js';

import Renderer from './renderer';
import Scene, { addToScene } from './scene';
import Camera from './camera';
import objectGenerator from '../utils/objectGenerator';

import { initializeControls, animateMovementTick } from '../utils/controls';

import { GAME_ROOT } from '../constants';


/**
 * Game tick
 * @param  {Function} cb Callback
 */
let tick = (cb) => {
  requestAnimationFrame(tick);

  animateMovementTick();

  if (cb) cb();
};


/**
 * Initialize game
 */
const initialize = () => {
  addToScene([
    objectGenerator({
      geometry: new THREE.BoxGeometry(1, 1, 1),
      material: new THREE.MeshLambertMaterial({ color: 'red' }),
      position: [0, 0, 0],
      params: {
        castShadow: true,
      },
    }),
    objectGenerator({
      geometry: new THREE.BoxGeometry(1, 1, 1),
      material: new THREE.MeshLambertMaterial({ color: 'red' }),
      position: [1, 0, 1],
      params: {
        castShadow: true,
      },
    }),
    objectGenerator({
      geometry: new THREE.PlaneGeometry(1024, 1024, 1024),
      material: new THREE.MeshLambertMaterial({ side: THREE.DoubleSide }),
      rotation: [90, 0, 0],
      position: [0, -0.5, 0],
      params: {
        receiveShadow: true,
      },
    }),
  ]);

  // controls
  initializeControls(Camera, Camera);

  // lights

  const sun = new THREE.DirectionalLight(0xffffff, 0.8);
  sun.position.set(1, 1, 1.5);

  addToScene([
    new THREE.AxesHelper(1),
    new THREE.HemisphereLight(0xffffff, 0xffffff, 0.2),
    sun,
  ]);
}

/**
 * Start game
 */
export const start = () => {
  Renderer.setSize(GAME_ROOT.offsetWidth, GAME_ROOT.offsetHeight);
  Renderer.setPixelRatio(window.devicePixelRatio || 1);
  GAME_ROOT.appendChild(Renderer.domElement);

  Camera.aspect = GAME_ROOT.offsetWidth / GAME_ROOT.offsetHeight;
  Camera.updateProjectionMatrix();

  const stats = new Stats();
  stats.setMode(0);

  // Align top-left
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  GAME_ROOT.appendChild(stats.domElement);

  initialize();

  tick = tick.bind(0, () => {
    stats.begin();

    Renderer.render(Scene, Camera);

    stats.end();
  });

  tick();
};
