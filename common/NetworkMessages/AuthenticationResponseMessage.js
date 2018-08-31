import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param clientId
 * @constructor
 */
function AuthenticationResponseMessage(clientId) {
  this.getClientId = () => clientId;
}

AuthenticationResponseMessage.serializableInterface = new SerializableInterface(
  AuthenticationResponseMessage,
  {
    /**
     * @param {AuthenticationResponseMessage} message
     */
    serialize: message => ({
      clientId: () => message.getClientId(),
    }),

    deserialize: json => new AuthenticationResponseMessage(json.clientId),
  },
);

export default AuthenticationResponseMessage;
