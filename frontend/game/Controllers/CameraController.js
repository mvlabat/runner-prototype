import * as THREE from 'three';
import UpdatableInterface from 'common/Interfaces/UpdatableInterface';
import { threeFromCommonVector } from 'common/Utils/ThreeConverters';
import MovementDirections from '../Utils/MovementDirections';

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

  const movingDirections = new MovementDirections();

  this.setMovementDirection = (direction, enable) => {
    movingDirections[direction] = enable;
  };

  const CAMERA_SPEED = 150;

  function moveCamera(timeDelta) {
    const offsetVector = movingDirections
      .getDirectionVector()
      .clone()
      .multiplyScalar(CAMERA_SPEED * timeDelta);
    const newPosition = cameraWrapper
      .getPosition()
      .clone()
      .add(threeFromCommonVector(offsetVector));
    cameraWrapper.setPosition(newPosition);
  }
}

export default CameraController;
