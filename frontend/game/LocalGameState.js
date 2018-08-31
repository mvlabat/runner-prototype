/**
 * @constructor
 */
const LocalGameState = (() => {
  let localGameState;
  let localPlayerModel;

  return {
    initialize: (gameState, playerModel) => {
      localGameState = gameState;
      localPlayerModel = playerModel;
    },

    /**
     * @return {GameState}
     */
    getGameState: () => localGameState,

    /**
     * @return {PlayerModel}
     */
    getPlayerModel: () => localPlayerModel,
  };
})();

export default LocalGameState;
