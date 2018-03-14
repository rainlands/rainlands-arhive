import Renderer from './classes/Renderer';
import Scene from './classes/Scene';
import Camera from './classes/Camera';

import objectGenerator from './utils/objectGenerator';

// OBJECTS
import ground from './objects/ground';

export default class Game {
  constructor(DOMElement) {
    this.DOMElement = DOMElement;

    this._camera = new Camera();
    this._scene = new Scene();
    this._renderer = new Renderer();
  }

  start = () => {
    window.addEventListener('resize', this._resize);

    this._scene.addElement(ground);
    this._renderer.render(this.DOMElement);

    this._resize();
    this._loop();
  }

  _loop = () => {
    requestAnimationFrame(this._loop);

    this._renderer.entity.render(this._scene.entity, this._camera.entity);
  }

  _resize = () => {
    const { offsetWidth, offsetHeight } = this.DOMElement;

    this._camera.entity.aspect = offsetWidth / offsetHeight;
    this._camera.entity.updateProjectionMatrix();

    this._renderer.entity.setSize(offsetWidth, offsetHeight);
  }
}
