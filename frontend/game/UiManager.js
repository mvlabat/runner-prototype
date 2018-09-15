import store from '../store';

/**
 * @constructor
 * @param {PlayerController} playerController
 * @param {BuilderController} builderController
 */
function UiManager(playerController, builderController) {
  this.activatePlayerMode = () => {
    playerController.activatePlayerMode();
    builderController.deactivateBuilderMode();
    store.commit('gameUi/activatePlayerMode');
  };

  this.activateBuilderMode = () => {
    playerController.deactivatePlayerMode();
    builderController.activateBuilderMode();
    store.commit('gameUi/activateBuilderMode');
  };
}

export default UiManager;
