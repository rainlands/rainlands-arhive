import * as THREE from 'three';

import objectGenerator from '@utils/objectGenerator';

export default objectGenerator({
  geometry: new THREE.PlaneGeometry(5, 5, 5),
  material: new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 'red',
  }),
  rotation: [90, 0, 0],
  position: [0, -0.501, 0],
  params: {
    receiveShadow: true,
  },
});
