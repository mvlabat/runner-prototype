import * as THREE from 'three';

/**
 * @constructor
 */
function CanvasWrapper() {
  let canvas;
  let domCanvasWrapper;
  const mousePosition = new THREE.Vector2();
  const mouseWorldPosition = new THREE.Vector3();

  /**
   * @param {HTMLCanvasElement} newCanvas
   */
  this.initialize = (newCanvas) => {
    canvas = newCanvas;
    domCanvasWrapper = document.getElementById('canvas-wrapper');
  };

  /**
   * @returns {HTMLCanvasElement}
   */
  this.getCanvas = () => canvas;

  /**
   * @returns {Vector2}
   */
  this.getCanvasSize = () => (
    new THREE.Vector2(domCanvasWrapper.clientWidth, domCanvasWrapper.clientHeight)
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
