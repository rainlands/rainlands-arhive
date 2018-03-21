import * as THREE from 'three';

export const createLights = () => {
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
  dirLight.position.set(1, 2, 1.5);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);

  return [dirLight, hemiLight];
};
