import * as THREE from 'three';

/**
 * @param {CameraWrapper} cameraWrapper
 * @param {CanvasWrapper} canvasWrapper
 * @constructor
 */
export default function CameraController(cameraWrapper, canvasWrapper) {
  this.updateCamera = (timeDelta) => {
    cameraWrapper.updateCameraSize(new THREE.Vector2(), canvasWrapper.getCanvasSize());
    moveCamera(timeDelta);
  };

  const keysPressed = {
    up: false,
    right: false,
    down: false,
    left: false,
  };

  const keysMapping = {
    KeyW: 'up',
    KeyD: 'right',
    KeyS: 'down',
    KeyA: 'left',
  };

  window.addEventListener('keydown', (event) => {
    const directionKey = keysMapping[event.code];
    if (directionKey) {
      keysPressed[directionKey] = true;
    }
  });

  window.addEventListener('keyup', (event) => {
    const directionKey = keysMapping[event.code];
    if (directionKey) {
      keysPressed[directionKey] = false;
    }
  });

  const CAMERA_SPEED = 150;

  function moveCamera(timeDelta) {
    const offsetVector = new THREE.Vector2(CAMERA_SPEED * timeDelta, 0);
    // console.log(offsetVector);
    let angle = 0;
    if (keysPressed.up && keysPressed.right && !keysPressed.down && !keysPressed.left) {
      angle = 45;
    } else if (keysPressed.up && !keysPressed.right && !keysPressed.down && keysPressed.left) {
      angle = 135;
    } else if (!keysPressed.up && !keysPressed.right && keysPressed.down && keysPressed.left) {
      angle = 225;
    } else if (!keysPressed.up && keysPressed.right && keysPressed.down && !keysPressed.left) {
      angle = 315;
    } else if (keysPressed.right && !keysPressed.left) {
      angle = 0;
    } else if (keysPressed.up && !keysPressed.down) {
      angle = 90;
    } else if (!keysPressed.right && keysPressed.left) {
      angle = 180;
    } else if (!keysPressed.up && keysPressed.down) {
      angle = 270;
    } else {
      return;
    }

    offsetVector.rotateAround(new THREE.Vector2(), angle * THREE.Math.DEG2RAD);
    cameraWrapper.setPosition(cameraWrapper.getPosition().add(offsetVector));
  }
}
