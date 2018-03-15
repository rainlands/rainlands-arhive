import * as THREE from 'three';

const scene = new THREE.Scene();

scene.fog = new THREE.Fog(0x87cefa, 0, 400);
scene.add(new THREE.AxesHelper(15));

export default scene;

/**
 * Add array of elements to scene
 * @param {Array} elements Three.js elements
 */
export const addToScene = (elements) => {
  elements.forEach((el) => {
    scene.add(el);
  })
}
