import UpdatableInterface from 'common/Interfaces/UpdatableInterface';
import CameraController from './CameraController';
import BuilderController from './BuilderController';
import PlayerController from './PlayerController';
import UiInputActions from '../Utils/UiInputActions';

/**
 * @param {ActionController} actionController
 * @param {CameraWrapper} cameraWrapper
 * @param {CanvasWrapper} canvasWrapper
 * @constructor
 */
function MainUiController(actionController, cameraWrapper, canvasWrapper) {
  const canvas = canvasWrapper.getCanvas();

  const cameraController = new CameraController(cameraWrapper, canvasWrapper);
  // We define these controllers here, because UI state (may) effects
  // what is updated and what is not.
  const builderController = new BuilderController(actionController, canvasWrapper);
  const playerController = new PlayerController(actionController, cameraWrapper);
  playerController.activatePlayerMode();

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
