// import * as THREE from 'three';
//
// import Loop from './classes/Loop';
// import Renderer from './classes/Renderer';
// import Scene from './classes/Scene';
// import Camera from './classes/Camera';
//
// import objectGenerator from './utils/objectGenerator';
//
// const renderer = new Renderer();
// const scene = new Scene();
// const camera = new Camera();
//
// const ground = objectGenerator({
//   geometry: new THREE.PlaneGeometry(5, 5, 5),
//   material: new THREE.MeshBasicMaterial({
//     side: THREE.DoubleSide,
//     color: 'red',
//   }),
//   rotation: [90, 0, 0],
//   position: [0, -0.501, 0],
//   params: {
//     receiveShadow: true,
//   },
// });
// scene.addElement(ground);
// renderer.render(document.querySelector('#root'));
//
// const loop = new Loop({
//   renderer,
//   scene,
//   camera,
// });
//
// loop.start();


import Game from './Game';

const game = new Game(
  document.querySelector('#root')
);

game.start();
