import NetworkMessageInterface from '../Interfaces/NetworkMessageInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { deserialize, serialize } from '../Utils/SerializationHelper';
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
      payload: () => serialize(message.networkMessageInterface.getPayload()),
    }),

    deserialize: json => new BroadcastActionMessage(deserialize(json.payload)),
  },
);

export default BroadcastActionMessage;
