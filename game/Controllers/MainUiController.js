/**
 * @param {CanvasWrapper} canvasWrapper
 * @param {BuilderController} builderController
 * @constructor
 */
export default function MainUiController(canvasWrapper, builderController) {
  const canvas = canvasWrapper.getCanvas();

  canvas.addEventListener('mousemove', event => builderController.onMouseMove(event));
  canvas.addEventListener('mouseup', event => builderController.onMouseUp(event));
}
