import Renderer from './core/Renderer';
import Scene from './core/Scene';
import Camera from './core/Camera';

import objectGenerator from './utils/objectGenerator';
import Cube from './classes/Cube';

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
    this._scene.addObject(new Cube({
      size: [1, 1, 1],
      position: [0.435, 3, 0],
      mass: 1,
    }));

    this._scene.addObject(new Cube({
      size: [1, 1, 1],
      position: [0, 0, 0],
      mass: 0,
    }));
    this._renderer.render(this.DOMElement);

    this._resize();
    this._loop();
  }

  _loop = () => {
    requestAnimationFrame(this._loop);

    this._scene.update();

    this._renderer.entity.render(this._scene.entity, this._camera.entity);
  }

  _resize = () => {
    const { offsetWidth, offsetHeight } = this.DOMElement;

    this._camera.entity.aspect = offsetWidth / offsetHeight;
    this._camera.entity.updateProjectionMatrix();

    this._renderer.entity.setSize(offsetWidth, offsetHeight);
  }
}
