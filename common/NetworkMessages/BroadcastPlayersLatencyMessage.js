import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param {Object} playersLatency - Players latency (value) by client id (key).
 * @constructor
 */
function BroadcastPlayersLatencyMessage(playersLatency) {
  this.getPlayersLatency = () => playersLatency;
}

BroadcastPlayersLatencyMessage.serializableInterface = new SerializableInterface(
  BroadcastPlayersLatencyMessage,
  {
    /**
     * @param {BroadcastPlayersLatencyMessage} message
     */
    serialize: message => ({
      playersLatency: () => message.getPlayersLatency(),
    }),

    deserialize: json => new BroadcastPlayersLatencyMessage(json.playersLatency),
  },
);

export default BroadcastPlayersLatencyMessage;
