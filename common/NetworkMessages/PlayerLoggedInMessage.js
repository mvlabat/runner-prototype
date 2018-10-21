import SerializableInterface from '../Interfaces/SerializableInterface';
import { deserializeSerializable, serializeSerializable } from '../Utils/SerializationHelpers';

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
      player: () => serializeSerializable(message.getPlayer()),
    }),

    deserialize: object => new PlayerLoggedInMessage(deserializeSerializable(object.player)),
  },
);

export default PlayerLoggedInMessage;
