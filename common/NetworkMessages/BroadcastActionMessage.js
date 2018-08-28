import NetworkMessageInterface from '../Interfaces/NetworkMessageInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import { deserialize, serialize } from '../Utils/JsonSerializationHelper';

/**
 * @param payload
 * @constructor
 */
function BroadcastActionMessage(payload) {
  this.networkMessageInterface = new NetworkMessageInterface(this, {
    getPayload: () => payload,
  });
}

BroadcastActionMessage.jsonSerializableInterface = new JsonSerializableInterface(
  BroadcastActionMessage,
  {
    /**
     * @param {BroadcastActionMessage} message
     */
    serialize: message => ({
      payload: serialize(message.networkMessageInterface.getPayload()),
    }),

    deserialize: json => new BroadcastActionMessage(deserialize(json.payload)),
  },
);

export default BroadcastActionMessage;
