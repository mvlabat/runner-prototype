import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param {number} clientId
 * @constructor
 */
function PlayerLoggedOutMessage(clientId) {
  this.getClientId = () => clientId;
}

PlayerLoggedOutMessage.serializableInterface = new SerializableInterface(
  PlayerLoggedOutMessage,
  {
    /**
     * @param {PlayerLoggedOutMessage} message
     */
    serialize: message => ({
      clientId: () => message.getClientId(),
    }),

    deserialize: json => new PlayerLoggedOutMessage(json.clientId),
  },
);

export default PlayerLoggedOutMessage;
