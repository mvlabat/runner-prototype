import SerializableInterface from '../Interfaces/SerializableInterface';
import NetworkMessageInterface from '../Interfaces/NetworkMessageInterface';

/**
 * @param {number} pingId
 * @constructor
 */
function PongMessage(pingId) {
  this.networkMessageInterface = new NetworkMessageInterface(this, {});

  this.getPingId = () => pingId;
}

PongMessage.serializableInterface = new SerializableInterface(
  PongMessage,
  {
    /**
     * @param {PongMessage} message
     */
    serialize: message => ({
      pingId: () => message.getPingId(),
    }),

    deserialize: json => new PongMessage(json.pingId),
  },
);

export default PongMessage;
