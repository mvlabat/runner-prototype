import SerializableInterface from '../Interfaces/SerializableInterface';
import { deserializeArray, serializeArray } from '../Utils/SerializationHelper';

/**
 * @oaram players
 * @oaram buildableObjects
 * @constructor
 */
function GameStateMessage(players, buildableObjects) {
  this.getPlayers = () => players;

  this.getBuildableObjects = () => buildableObjects;
}

GameStateMessage.serializableInterface = new SerializableInterface(GameStateMessage, {
  /**
   * @param {GameStateMessage} message
   */
  serialize: message => ({
    players: () => serializeArray(message.getPlayers()),
    buildableObjects: () => serializeArray(message.getBuildableObjects()),
  }),

  deserialize: json => new GameStateMessage(
    deserializeArray(json.players),
    deserializeArray(json.buildableObjects),
  ),
});

export default GameStateMessage;
