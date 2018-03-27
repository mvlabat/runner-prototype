import * as THREE from 'three';

/**
 * @param {HTMLCanvasElement} canvas
 * @constructor
 */
function CanvasWrapper(canvas) {
  const canvasWrapper = document.getElementById('canvas-wrapper');

  this.getCanvas = () => canvas;

  /**
   * @returns {Vector2}
   */
  this.getCanvasSize = () =>
    new THREE.Vector2(canvasWrapper.clientWidth, canvasWrapper.clientHeight);
}

export default CanvasWrapper;
