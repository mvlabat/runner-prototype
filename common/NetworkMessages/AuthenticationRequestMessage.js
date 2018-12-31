import SerializableInterface from '../Interfaces/SerializableInterface';
import NetworkMessageInterface from '../Interfaces/NetworkMessageInterface';

/**
 * @param {string} displayName
 * @constructor
 */
function AuthenticationRequestMessage(displayName) {
  this.networkMessageInterface = new NetworkMessageInterface(this, {});

  this.getDisplayName = () => displayName;
}

AuthenticationRequestMessage.serializableInterface = new SerializableInterface(
  AuthenticationRequestMessage,
  {
    /**
     * @param {AuthenticationRequestMessage} message
     */
    serialize: message => ({
      displayName: () => message.getDisplayName(),
    }),

    deserialize: object => new AuthenticationRequestMessage(object.displayName),
  },
);

export default AuthenticationRequestMessage;
