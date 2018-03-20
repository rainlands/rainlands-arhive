import lock from 'pointer-lock';
import { USER_SPEED } from '@constants';

const movement = {};

const handleMove = (initial, camera, move) => {
  initial.x += move.dx / 3;

  if (initial.y + move.dy < 90 && initial.y + move.dy > -90) {
    initial.y += move.dy / 3;
  }

  camera.rotation.y = -(initial.x * Math.PI / 180);
  camera.rotation.x = -(initial.y * Math.PI / 180);

  camera.updateProjectionMatrix();
};

const setupPointer = (mv, camera) => {
  const initial = {
    x: 0,
    y: 0,
  };

  mv.on('data', handleMove.bind(0, initial, camera));
};

export const initializeControls = (camera) => {
  const pointer = lock(document.body);
  pointer.on('attain', mv => setupPointer(mv, camera));

  window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
      case 87:
        movement.forward = true;
        break;
      case 83:
        movement.back = true;
        break;
      case 65:
        movement.left = true;
        break;
      case 68:
        movement.right = true;
        break;
      case 32:
        movement.top = true;
        break;
      case 16:
        movement.bottom = true;
        break;
    }
  });

  window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
      case 87:
        movement.forward = false;
        break;
      case 83:
        movement.back = false;
        break;
      case 65:
        movement.left = false;
        break;
      case 68:
        movement.right = false;
        break;
      case 32:
        movement.top = false;
        break;
      case 16:
        movement.bottom = false;
        break;
    }
  });
};

export const animateMovementTick = (camera) => {
  if (movement.forward) {
    camera.position.x -= Math.sin(camera.rotation.y) * USER_SPEED;
    camera.position.z -= Math.cos(camera.rotation.y) * USER_SPEED;
  }
  if (movement.back) {
    camera.position.x += Math.sin(camera.rotation.y) * USER_SPEED;
    camera.position.z += Math.cos(camera.rotation.y) * USER_SPEED;
  }
  if (movement.left) {
    camera.position.x += Math.sin(camera.rotation.y - Math.PI / 2) * USER_SPEED;
    camera.position.z += Math.cos(camera.rotation.y - Math.PI / 2) * USER_SPEED;
  }
  if (movement.right) {
    camera.position.x -= Math.sin(camera.rotation.y - Math.PI / 2) * USER_SPEED;
    camera.position.z -= Math.cos(camera.rotation.y - Math.PI / 2) * USER_SPEED;
  }
  if (movement.top) {
    camera.position.y += USER_SPEED;
  }
  if (movement.bottom) {
    camera.position.y -= USER_SPEED;
  }
  // if (movement.top) {
  //   camera.velocity.y += 1;
  // }
  // if (movement.bottom) {
  //   camera.velocity.y -= 1;
  // }
};
