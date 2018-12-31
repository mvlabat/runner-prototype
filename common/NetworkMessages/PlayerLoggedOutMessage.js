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

    deserialize: object => new PlayerLoggedOutMessage(object.clientId),
  },
);

export default PlayerLoggedOutMessage;
