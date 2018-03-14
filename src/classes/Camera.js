import * as THREE from 'three';

export default class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.set(1, 0.5, 2);
  }

  get entity() {
    return this.camera;
  }
}
