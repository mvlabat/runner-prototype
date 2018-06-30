import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';

/**
 * @param clientId
 * @constructor
 */
function AuthenticationResponseMessage(clientId) {
  this.getClientId = () => clientId;
}

AuthenticationResponseMessage.jsonSerializableInterface = new JsonSerializableInterface(
  AuthenticationResponseMessage,
  {
    /**
     * @param {AuthenticationResponseMessage} message
     */
    serialize: message => ({
      clientId: message.getClientId(),
    }),

    deserialize: json => new AuthenticationResponseMessage(json.clientId),
  },
);

export default AuthenticationResponseMessage;
