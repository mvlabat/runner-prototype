import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param {Iterable<PlayerModel>} activePlayers
 * @param {Object} playerObjects - Key is Client ID, value is Player.
 * @param {Iterable<*>} buildableObjects
 * @param {Iterable<*>} actions
 * @param {number} serverTime
 * @constructor
 */
function GameStateMessage(activePlayers, playerObjects, buildableObjects, actions, serverTime) {
  this.getActivePlayers = () => activePlayers;

  this.getPlayerObjects = () => playerObjects;

  this.getBuildableObjects = () => buildableObjects;

  this.getActions = () => actions;

  this.getServerTime = () => serverTime;
}

GameStateMessage.serializableInterface = new SerializableInterface(GameStateMessage, {
  /**
   * @param {GameStateMessage} message
   */
  serialize: message => ({
    activePlayers: () => message.getActivePlayers(),
    playerObjects: () => message.getPlayerObjects(),
    buildableObjects: () => message.getBuildableObjects(),
    actions: () => message.getActions(),
    serverTime: () => message.getServerTime(),
  }),

  deserialize: object => new GameStateMessage(
    object.activePlayers,
    object.playerObjects,
    object.buildableObjects,
    object.actions,
    object.serverTime,
  ),
});

export default GameStateMessage;
