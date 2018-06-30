import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import { deserializeArray, serializeArray } from '../Utils/JsonSerializationHelper';

/**
 * @oaram players
 * @oaram buildableObjects
 * @constructor
 */
function GameStateMessage(players, buildableObjects) {
  this.getPlayers = () => players;

  this.getBuildableObjects = () => buildableObjects;
}

GameStateMessage.jsonSerializableInterface = new JsonSerializableInterface(GameStateMessage, {
  /**
   * @param {GameStateMessage} message
   */
  serialize: message => ({
    players: serializeArray(message.getPlayers()),
    buildableObjects: serializeArray(message.getBuildableObjects()),
  }),

  deserialize: json => new GameStateMessage(
    deserializeArray(json.players),
    deserializeArray(json.buildableObjects),
  ),
});

export default GameStateMessage;
