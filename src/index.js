import Loop from './classes/Loop';
import Renderer from './classes/Renderer';
import Scene from './classes/Scene';
import Camera from './classes/Camera';

const renderer = new Renderer();
const scene = new Scene();
const camera = new Camera();

renderer.render(document.querySelector('#root'));

const loop = new Loop({
  renderer,
  scene,
  camera,
});
