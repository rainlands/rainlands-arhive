import * as THREE from 'three';
import * as CANNON from 'cannon';

export default class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xffffff, 0, 200);

    if (process.env.NODE_ENV !== 'production') {
      this.scene.add(new THREE.AxesHelper(15));
    }

    this.world = new CANNON.World();
    this.world.gravity.set(0, -20, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();

    this.objects = [];
  }

  get entity() {
    return this.scene;
  }

  addElement = element => this.scene.add(element);

  addObject = (object) => {
    this.objects.push(object);
    this.scene.add(object.mesh);
    this.world.add(object.body);
  }

  update = () => {
    this.world.step(1 / 60);

    this.objects.forEach(object => object.updatePosition());
  }
}
