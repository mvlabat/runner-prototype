import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';

/**
 * @param {number} pingId
 * @param {number|null} lastLatency
 * @constructor
 */
function PingMessage(pingId, lastLatency = null) {
  this.getPingId = () => pingId;
  this.getLastLatency = () => lastLatency;
}

PingMessage.jsonSerializableInterface = new JsonSerializableInterface(
  PingMessage,
  {
    /**
     * @param {PingMessage} message
     */
    serialize: message => ({
      pingId: message.getPingId(),
      lastLatency: message.getLastLatency(),
    }),

    deserialize: json => new PingMessage(json.pingId, json.lastLatency),
  },
);

export default PingMessage;
