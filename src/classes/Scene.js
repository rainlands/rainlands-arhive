import * as THREE from 'three';

export default class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xffffff, 0, 200);

    if (process.env.NODE_ENV !== 'production') {
      this.scene.add(new THREE.AxesHelper(15));
    }
  }

  get entity() {
    return this.scene;
  }

  addElement = element => this.scene.add(element);
}
