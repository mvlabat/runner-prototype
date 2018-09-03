import SerializableInterface from '../Interfaces/SerializableInterface';
import { deserialize, serialize } from '../Utils/SerializationHelper';

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
      player: () => serialize(message.getPlayer()),
    }),

    deserialize: json => new PlayerLoggedInMessage(deserialize(json.player)),
  },
);

export default PlayerLoggedInMessage;
