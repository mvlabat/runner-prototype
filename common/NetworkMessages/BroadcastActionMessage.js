import NetworkMessageInterface from '../Interfaces/NetworkMessageInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param payload
 * @constructor
 */
function BroadcastActionMessage(payload) {
  this.networkMessageInterface = new NetworkMessageInterface(this, {
    getPayload: () => payload,
  });

  setDebugProperty(this, 'payload', payload);
}

BroadcastActionMessage.serializableInterface = new SerializableInterface(
  BroadcastActionMessage,
  {
    /**
     * @param {BroadcastActionMessage} message
     */
    serialize: message => ({
      payload: () => message.networkMessageInterface.getPayload(),
    }),

    deserialize: object => new BroadcastActionMessage(object.payload),
  },
);

export default BroadcastActionMessage;
