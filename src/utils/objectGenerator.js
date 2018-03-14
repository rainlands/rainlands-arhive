import * as THREE from 'three';

export default ({
  geometry,
  material,
  textureUrl,
  position = [0, 0, 0],
  rotation = [0, 0, 0], params,
}) => {
  if (textureUrl) {
    const texture = new THREE.TextureLoader().load(textureUrl);

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1024, 1024);

    material.map = texture; // eslint-disable-line
  }

  const object = new THREE.Mesh(geometry, material);
  object.rotation.set(...rotation.map(s => s * (Math.PI / 180)));
  object.position.set(...position);

  Object.assign(object, params);

  return object;
};
