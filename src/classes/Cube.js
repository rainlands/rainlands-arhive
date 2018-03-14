import * as THREE from 'three';
import * as CANNON from 'cannon';

import objectGenerator from '@utils/objectGenerator';

export default class Cube {
  constructor({
    mass,
    size,
    texture,
    position,
    meshParams,
    bodyParams,
  }) {
    this.mesh = objectGenerator({
      geometry: new THREE.BoxGeometry(...size),
      material: new THREE.MeshLambertMaterial(meshParams),
      texture,
      position,
      params: {
        castShadow: true,
      },
    });;

    const [bodyX, bodyY, bodyZ] = size.map(x => x / 2);

    this.body = new CANNON.Body({
      mass,
      shape: new CANNON.Box(new CANNON.Vec3(bodyX, bodyY, bodyZ)),
      material: new CANNON.Material(bodyParams),
    });
    this.body.position.set(...position);
  }

  updatePosition = () => {
    this.mesh.position.copy(this.body.position);
    this.mesh.quaternion.copy(this.body.quaternion)
  };
}
