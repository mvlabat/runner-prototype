import NetworkMessageInterface from '../Interfaces/NetworkMessageInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import { deserialize, serialize } from '../Utils/JsonSerializationHelper';

/**
 * @param payload
 * @param senderId
 * @constructor
 */
function BroadcastActionMessage(payload, senderId = null) {
  this.networkMessageInterface = new NetworkMessageInterface(this, {
    getPayload: () => payload,

    getSenderId: () => senderId,
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
      senderId: message.networkMessageInterface.getSenderId(),
    }),

    deserialize: json => new BroadcastActionMessage(deserialize(json.payload), json.senderId),
  },
);

export default BroadcastActionMessage;
