import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param {Iterable<PlayerModel>} activePlayers
 * @param {Object} playerObjects - Key is Client ID, value is Player.
 * @param {Iterable<*>} buildableObjects
 * @constructor
 */
function GameStateMessage(activePlayers, playerObjects, buildableObjects) {
  this.getActivePlayers = () => activePlayers;

  this.getPlayerObjects = () => playerObjects;

  this.getBuildableObjects = () => buildableObjects;
}

GameStateMessage.serializableInterface = new SerializableInterface(GameStateMessage, {
  /**
   * @param {GameStateMessage} message
   */
  serialize: message => ({
    activePlayers: () => message.getActivePlayers(),
    playerObjects: () => message.getPlayerObjects(),
    buildableObjects: () => message.getBuildableObjects(),
  }),

  deserialize: object => new GameStateMessage(
    object.activePlayers,
    object.playerObjects,
    object.buildableObjects,
  ),
});

export default GameStateMessage;
