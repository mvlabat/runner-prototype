import SerializableInterface from '../Interfaces/SerializableInterface';

/**
 * @param {PlayerModel} player
 * @constructor
 */
function PlayerLoggedInMessage(player) {
  this.getPlayer = () => player;
}

PlayerLoggedInMessage.serializableInterface = new SerializableInterface(
  PlayerLoggedInMessage,
  {
    /**
     * @param {PlayerLoggedInMessage} message
     */
    serialize: message => ({
      player: () => message.getPlayer(),
    }),

    deserialize: object => new PlayerLoggedInMessage(object.player),
  },
);

export default PlayerLoggedInMessage;
