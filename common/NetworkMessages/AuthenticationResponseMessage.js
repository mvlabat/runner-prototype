import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param {number|string} response - Client ID if success or error message.
 * @constructor
 */
function AuthenticationResponseMessage(response) {
  this.getResponse = () => response;
}

AuthenticationResponseMessage.serializableInterface = new SerializableInterface(
  AuthenticationResponseMessage,
  {
    /**
     * @param {AuthenticationResponseMessage} message
     */
    serialize: message => ({
      response: () => message.getResponse(),
    }),

    deserialize: json => new AuthenticationResponseMessage(json.response),
  },
);

export default AuthenticationResponseMessage;
