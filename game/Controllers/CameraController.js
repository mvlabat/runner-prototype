import * as THREE from 'three';
import MovingDirections from '../Utils/Movement';
import UpdatableInterface from '../Interfaces/UpdatableInterface';

/**
 * @param {CameraWrapper} cameraWrapper
 * @param {CanvasWrapper} canvasWrapper
 * @constructor
 */
function CameraController(cameraWrapper, canvasWrapper) {
  // INTERFACES IMPLEMENTATION.
  this.updatableInterface = new UpdatableInterface(this, {
    update: (timeDelta) => {
      cameraWrapper.updateCameraSize(new THREE.Vector2(), canvasWrapper.getCanvasSize());
      moveCamera(timeDelta);
    },
  });

  const movingDirections = new MovingDirections();

  this.setMovementDirection = (direction, enable) => {
    movingDirections[direction] = enable;
  };

  const CAMERA_SPEED = 150;

  function moveCamera(timeDelta) {
    const offsetVector = movingDirections
      .getDirectionVector()
      .multiplyScalar(CAMERA_SPEED * timeDelta);
    const newPosition = cameraWrapper.getPosition().add(offsetVector);
    cameraWrapper.setPosition(newPosition);
  }
}

export default CameraController;
