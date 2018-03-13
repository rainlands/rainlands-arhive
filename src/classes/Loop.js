export default class Loop {
  constructor({ renderer, scene, camera }) {
    this.Renderer = renderer;
    this.Scene = scene;
    this.Camera = camera;
  }

  _animate() {
    requestAnimationFrame(this._animate);

    this.Renderer.render(this.Scene, this.Camera);
  }

  start() {
    requestAnimationFrame(this._animate);
  }
}
