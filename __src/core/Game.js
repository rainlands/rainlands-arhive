import * as THREE from 'three';
import Stats from 'stats-js';

import Renderer from './renderer';
import Scene, { addToScene } from './scene';
import Camera from './camera';
import objectGenerator from '../utils/objectGenerator';
import renderMapUtil from '../utils/renderMap';

import { createCube, createCubeGroup } from '../entities/cube';
import { initializeControls, animateMovementTick } from '../utils/controls';

import { GAME_ROOT } from '../constants';
import grassTexture from '../entities/textures/grassTop.png';


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
      geometry: new THREE.PlaneGeometry(1024, 1024, 1024),
      material: new THREE.MeshLambertMaterial({ side: THREE.DoubleSide }),
      rotation: [90, 0, 0],
      position: [0, -1, 0],
      textureUrl: grassTexture,
      params: {
        receiveShadow: true,
      },
    }),
  ]);

  // controls
  initializeControls(Camera, Camera);

  const sun = new THREE.DirectionalLight(0xffffff, 0.6);
  sun.position.set(1, 2, 1.8);

  addToScene([
    new THREE.AxesHelper(1),
    new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5),
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

export const renderMap = (map) => {
  Scene.add(renderMapUtil(map))
}
