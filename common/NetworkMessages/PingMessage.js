import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param {number} pingId
 * @param {number|null} lastLatency
 * @constructor
 */
function PingMessage(pingId, lastLatency = null) {
  this.getPingId = () => pingId;
  this.getLastLatency = () => lastLatency;
}

PingMessage.serializableInterface = new SerializableInterface(
  PingMessage,
  {
    /**
     * @param {PingMessage} message
     */
    serialize: message => ({
      pingId: () => message.getPingId(),
      lastLatency: () => message.getLastLatency(),
    }),

    deserialize: object => new PingMessage(object.pingId, object.lastLatency),
  },
);

export default PingMessage;
