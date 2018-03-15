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

// module.exports = {
//   animateMovementTick() {
//
//     if (movement.forward) {
//       this.body.position.x -= Math.sin(CAMERA.rotation.y) * 0.1;
//       this.body.position.z -= Math.cos(CAMERA.rotation.y) * 0.1;
//     }
//     if (movement.back) {
//       this.body.position.x += Math.sin(CAMERA.rotation.y) * 0.1;
//       this.body.position.z += Math.cos(CAMERA.rotation.y) * 0.1;
//     }
//     if (movement.left) {
//       this.body.position.x += Math.sin(CAMERA.rotation.y - Math.PI / 2) * 0.1;
//       this.body.position.z += Math.cos(CAMERA.rotation.y - Math.PI / 2) * 0.1;
//     }
//     if (movement.right) {
//       this.body.position.x -= Math.sin(CAMERA.rotation.y - Math.PI / 2) * 0.1;
//       this.body.position.z -= Math.cos(CAMERA.rotation.y - Math.PI / 2) * 0.1;
//     }
//
//     if (movement.forward || movement.back || movement.left || movement.right) {
//       if (this.stepState <= this.stepSize) {
//         this.body.position.y += this.stepRange;
//         CAMERA.rotation.y += this.stepRange * Math.PI / 180;
//         if (this.toggled) {
//           this.body.position.x += this.stepRange;
//         } else {
//           this.body.position.x -= this.stepRange;
//         }
//       } else if (this.stepState <= this.stepSize * 2) {
//         this.body.position.y -= this.stepRange;
//         CAMERA.rotation.y -= this.stepRange * Math.PI / 180;
//         if (this.toggled) {
//           this.body.position.x += this.stepRange;
//         } else {
//           this.body.position.x -= this.stepRange;
//         }
//       } else {
//         this.stepState = 0;
//         this.toggled = !this.toggled;
//       }
//
//       this.stepState += 1;
//     }
//
//     if (movement.top) {
//       if (this.permissions.fly) {
//         this.body.velocity.y += 1;
//       } else {
//         // this.body.velocity.y = 5;
//       }
//     }
//     if (movement.bottom) {
//       if (this.permissions.fly) {
//         this.body.velocity.y -= 1;
//       } else {
//
//       }
//     }
//   },
//
//   _initializeControls() {
//     this.movement = {};
//     this.pointer = lock(document.body);
//     this.pointer.on('attain', this._setupPointer.bind(this));
//
//     window.addEventListener('keydown', ({ keyCode }) => {
//       const { movement } = this;
//       switch (keyCode) {
//         case 87: movement.forward = true; break;
//         case 83: movement.back = true; break;
//         case 65: movement.left = true; break;
//         case 68: movement.right = true; break;
//         case 32: this.body.velocity.y += 8; break;
//         case 16: this.body.velocity.y -= 8; break;
//       }
//       this.movement = movement;
//     });
//
//     window.addEventListener('keyup', ({ keyCode }) => {
//       const { movement } = this;
//       switch (keyCode) {
//         case 87: movement.forward = false; break;
//         case 83: movement.back = false; break;
//         case 65: movement.left = false; break;
//         case 68: movement.right = false; break;
//       }
//       this.movement = movement;
//     });
//   },
//
//   _handleMove(initial, move) {
//     initial.x += move.dx;
//
//     if (initial.y + move.dy < 90 && initial.y + move.dy > -90) {
//       initial.y += move.dy;
//     }
//
//     CAMERA.rotation.y = -(initial.x * Math.PI / 180);
//     CAMERA.rotation.x = -(initial.y * Math.PI / 180);
//
//     CAMERA.updateProjectionMatrix();
//   },
//
//   _setupPointer(movements) {
//     const initial = { x: 0, y: 0 };
//
//     movements.on('data', this._handleMove.bind(this, initial));
//   },
// };
