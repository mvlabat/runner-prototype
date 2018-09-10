/**
 * @constructor
 */
const LocalGameState = (() => {
  let localGameState;
  let localPlayerModel;
  let localNetworkController;
  let localActionController;
  let localBuilderController;
  let localPlayerController;

  return {
    initialize: (
      gameState,
      playerModel,
      networkController,
      actionController,
      builderController,
      playerController,
    ) => {
      localGameState = gameState;
      localPlayerModel = playerModel;
      localNetworkController = networkController;
      localActionController = actionController;
      localBuilderController = builderController;
      localPlayerController = playerController;
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

    /**
     * @return {BuilderController}
     */
    getBuilderController: () => localBuilderController,

    /**
     * @return {PlayerController}
     */
    getPlayerController: () => localPlayerController,
  };
})();

export default LocalGameState;
