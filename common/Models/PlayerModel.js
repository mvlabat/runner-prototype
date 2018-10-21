import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param {number|null} clientId
 * @param {string} displayName
 * @param {number} latency
 * @constructor
 */
function PlayerModel(clientId = null, displayName = '', latency = 0) {
  this.clientId = clientId;
  this.displayName = displayName;
  this.latency = latency;
  this.authenticated = false;
  this.online = true;
}

PlayerModel.serializableInterface = new SerializableInterface(PlayerModel, {
  /**
   * @param {PlayerModel} player
   */
  serialize: player => ({
    clientId: () => player.clientId,
    displayName: () => player.displayName,
    latency: () => player.latency,
  }),

  deserialize: object => new PlayerModel(object.clientId, object.displayName, object.latency),
});

export default PlayerModel;
