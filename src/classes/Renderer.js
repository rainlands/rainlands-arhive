import * as THREE from 'three';

export default class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setClearColor(0x212121, 1);
  }

  get entity() {
    return this.renderer;
  }

  render = (DOMElement) => {
    DOMElement.appendChild(this.renderer.domElement);
  }
}
