import * as THREE from 'three';

/**
 * @param {CameraWrapper} cameraWrapper
 * @param {CanvasWrapper} canvasWrapper
 * @constructor
 */
export default function CameraController(cameraWrapper, canvasWrapper) {
  this.updateCameraSize = () => {
    cameraWrapper.updateCameraSize(new THREE.Vector2(), canvasWrapper.getCanvasSize());
  };
}
