import store from '../store';
import LocalGameState from './LocalGameState';

const UiManager = (() => ({
  activatePlayerMode: () => {
    LocalGameState.getPlayerController().activatePlayerMode();
    LocalGameState.getBuilderController().deactivateBuilderMode();
    store.commit('gameUi/activatePlayerMode');
  },

  activateBuilderMode: () => {
    LocalGameState.getPlayerController().deactivatePlayerMode();
    LocalGameState.getBuilderController().activateBuilderMode();
    store.commit('gameUi/activateBuilderMode');
  },
}))();

export default UiManager;
