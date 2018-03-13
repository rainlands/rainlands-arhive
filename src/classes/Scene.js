import * as THREE from 'three';

export default class Scene {
  constructor() {
    this.scene = new THREE.Scene();
  }

  get entity() {
    return this.scene;
  }
}
