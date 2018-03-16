import lock from 'pointer-lock';

const movement = {};

let BODY,
  CAMERA;

const handleMove = (initial, move) => {
  initial.x += move.dx;

  if (initial.y + move.dy < 90 && initial.y + move.dy > -90) {
    initial.y += move.dy;
  }

  CAMERA.rotation.y = -(initial.x * Math.PI / 180);
  CAMERA.rotation.x = -(initial.y * Math.PI / 180);

  CAMERA.updateProjectionMatrix();
};

const setupPointer = (movements) => {
  const initial = { x: 0, y: 0 };

  movements.on('data', handleMove.bind(0, initial));
};

export const initializeControls = (body, camera) => {
  BODY = body;
  CAMERA = camera;

  const pointer = lock(document.body);
  pointer.on('attain', setupPointer);

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

export const animateMovementTick = () => {
  if (movement.forward) {
    BODY.position.x -= Math.sin(CAMERA.rotation.y) * 0.1;
    BODY.position.z -= Math.cos(CAMERA.rotation.y) * 0.1;
  }
  if (movement.back) {
    BODY.position.x += Math.sin(CAMERA.rotation.y) * 0.1;
    BODY.position.z += Math.cos(CAMERA.rotation.y) * 0.1;
  }
  if (movement.left) {
    BODY.position.x += Math.sin(CAMERA.rotation.y - Math.PI / 2) * 0.1;
    BODY.position.z += Math.cos(CAMERA.rotation.y - Math.PI / 2) * 0.1;
  }
  if (movement.right) {
    BODY.position.x -= Math.sin(CAMERA.rotation.y - Math.PI / 2) * 0.1;
    BODY.position.z -= Math.cos(CAMERA.rotation.y - Math.PI / 2) * 0.1;
  }
  if (movement.top) {
    BODY.position.y += 0.1;
  }
  if (movement.bottom) {
    BODY.position.y -= 0.1;
  }
  // if (movement.top) {
  //   BODY.velocity.y += 1;
  // }
  // if (movement.bottom) {
  //   BODY.velocity.y -= 1;
  // }
};
