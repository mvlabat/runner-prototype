import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import NetworkMessageInterface from '../Interfaces/NetworkMessageInterface';

/**
 * @param {number} pingId
 * @constructor
 */
function PongMessage(pingId) {
  this.networkMessageInterface = new NetworkMessageInterface(this, {});

  this.getPingId = () => pingId;
}

PongMessage.jsonSerializableInterface = new JsonSerializableInterface(
  PongMessage,
  {
    /**
     * @param {PongMessage} message
     */
    serialize: message => ({
      pingId: message.getPingId(),
    }),

    deserialize: json => new PongMessage(json.pingId),
  },
);

export default PongMessage;
