/**
 * @constructor
 * @param {PlayerController} playerController
 * @param {BuilderController} builderController
 * @param {Store} vuexStore
 */
function UiManager(playerController, builderController, vuexStore) {
  this.activatePlayerMode = () => {
    playerController.activatePlayerMode();
    builderController.deactivateBuilderMode();
    vuexStore.commit('gameUi/activatePlayerMode');
  };

  this.activateBuilderMode = () => {
    playerController.deactivatePlayerMode();
    builderController.activateBuilderMode();
    vuexStore.commit('gameUi/activateBuilderMode');
  };
}

export default UiManager;
