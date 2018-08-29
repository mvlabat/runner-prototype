import * as THREE from 'three';

/**
 * @param {HTMLCanvasElement} canvas
 * @constructor
 */
function CanvasWrapper(canvas) {
  const canvasWrapper = document.getElementById('canvas-wrapper');
  const mousePosition = new THREE.Vector2();
  const mouseWorldPosition = new THREE.Vector3();

  /**
   * @returns {HTMLCanvasElement}
   */
  this.getCanvas = () => canvas;

  /**
   * @returns {Vector2}
   */
  this.getCanvasSize = () => (
    new THREE.Vector2(canvasWrapper.clientWidth, canvasWrapper.clientHeight)
  );

  /**
   * @returns {Vector3}
   */
  this.getMouseWorldPosition = () => mouseWorldPosition.clone();

  /**
   * @param {CameraWrapper} cameraWrapper
   */
  this.updateWorldMousePosition = (cameraWrapper) => {
    const rect = canvas.getBoundingClientRect();
    const x = (mousePosition.x / rect.width) * 2 - 1;
    const y = -(mousePosition.y / rect.height) * 2 + 1;

    const viewportMousePosition = new THREE.Vector3(x, y, 0);
    const worldPosition = viewportMousePosition.clone().unproject(cameraWrapper.getCamera());
    mouseWorldPosition.copy(worldPosition);
    mouseWorldPosition.z = 0;
  };

  /**
   * @param event
   */
  this.registerMousePosition = (event) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
  };
}

export default CanvasWrapper;
