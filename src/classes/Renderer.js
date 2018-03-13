import * as THREE from 'three';

export default class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer();
  }

  get entity() {
    return this.renderer;
  }

  render(DOMElement) {
    this.DOMElement = DOMElement;

    this.renderer.setSize(DOMElement.offsetWidth, DOMElement.offsetHeight);

    DOMElement.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this._resize);
  }

  _resize = () => {
    this.renderer.setSize(this.DOMElement.offsetWidth, this.DOMElement.offsetHeight);
  }
}
