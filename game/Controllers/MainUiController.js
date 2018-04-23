/**
 * @param {CanvasWrapper} canvasWrapper
 * @constructor
 */
import CameraController from './CameraController';
import BuilderController from './BuilderController';
import PlayerController from './PlayerController';
import UpdatableInterface from '../Interfaces/UpdatableInterface';
import UiInputActions from '../Utils/UiInputActions';

/**
 * @param {CameraWrapper} cameraWrapper
 * @param {CanvasWrapper} canvasWrapper
 * @param {GameScene} gameScene
 * @constructor
 */
function MainUiController(cameraWrapper, canvasWrapper, gameScene) {
  const canvas = canvasWrapper.getCanvas();

  const cameraController = new CameraController(cameraWrapper, canvasWrapper);
  // We define these controllers here, because UI state (may) effects
  // what is updated and what is not.
  const builderController = new BuilderController(canvasWrapper, cameraWrapper, gameScene);
  const playerController = new PlayerController(gameScene, cameraWrapper);
  builderController.activateBuilderMode();

  this.updatableInterface = new UpdatableInterface(this, {
    update: (timeDelta) => {
      cameraController.updatableInterface.update(timeDelta);
      canvasWrapper.updateWorldMousePosition(cameraWrapper);
      builderController.updatableInterface.update(timeDelta);
      playerController.updatableInterface.update(timeDelta);
    },
  });

  const uiInputActions = new UiInputActions(cameraController, builderController, playerController);

  canvas.addEventListener('mousemove', (event) => {
    canvasWrapper.registerMousePosition(event);
  });

  document.addEventListener('keydown', (event) => {
    uiInputActions.emitKeyDown(event);
  });

  document.addEventListener('keyup', (event) => {
    uiInputActions.emitKeyUp(event);
  });

  canvas.addEventListener('click', (event) => {
    uiInputActions.emitMouseClick(event);
  });
}

export default MainUiController;
