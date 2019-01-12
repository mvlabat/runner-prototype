import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param {Iterable<*>} actions
 * @param {number} serverTime
 * @constructor
 */
function GameStateUpdateMessage(actions, serverTime) {
  this.getActions = () => actions;

  this.getServerTime = () => serverTime;
}

GameStateUpdateMessage.serializableInterface = new SerializableInterface(GameStateUpdateMessage, {
  /**
   * @param {GameStateUpdateMessage} message
   */
  serialize: message => ({
    actions: () => message.getActions(),
    serverTime: () => message.getServerTime(),
  }),

  deserialize: object => new GameStateUpdateMessage(
    object.actions,
    object.serverTick,
  ),
});

export default GameStateUpdateMessage;
