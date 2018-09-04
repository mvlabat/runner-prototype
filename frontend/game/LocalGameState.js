/**
 * @constructor
 */
const LocalGameState = (() => {
  let localGameState;
  let localPlayerModel;
  let localNetworkController;
  let localActionController;

  return {
    initialize: (gameState, playerModel, networkController, actionController) => {
      localGameState = gameState;
      localPlayerModel = playerModel;
      localNetworkController = networkController;
      localActionController = actionController;
    },

    /**
     * @return {GameState}
     */
    getGameState: () => localGameState,

    /**
     * @return {PlayerModel}
     */
    getPlayerModel: () => localPlayerModel,

    /**
     * @return {ClientNetworkController}
     */
    getNetworkController: () => localNetworkController,

    /**
     * @return {ActionController}
     */
    getActionController: () => localActionController,
  };
})();

export default LocalGameState;
