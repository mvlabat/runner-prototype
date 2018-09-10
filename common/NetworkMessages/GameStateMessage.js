import SerializableInterface from '../Interfaces/SerializableInterface';
import {
  deserializeArray,
  deserializeObjectMap,
  serializeArray,
  serializeObjectMap,
} from '../Utils/SerializationHelper';

/**
 * @param {Iterable<PlayerModel>} activePlayers
 * @param {Object} playerObjects - Key is Client ID, value is Player.
 * @param {Iterable<*>} buildableObjects
 * @constructor
 */
function GameStateMessage(activePlayers, playerObjects, buildableObjects) {
  this.getActivePlayers = () => activePlayers;

  this.getPlayerObjects = () => playerObjects;

  this.getBuildableObjects = () => buildableObjects;
}

GameStateMessage.serializableInterface = new SerializableInterface(GameStateMessage, {
  /**
   * @param {GameStateMessage} message
   */
  serialize: message => ({
    activePlayers: () => serializeArray(message.getActivePlayers()),
    playerObjects: () => serializeObjectMap(message.getPlayerObjects()),
    buildableObjects: () => serializeArray(message.getBuildableObjects()),
  }),

  deserialize: json => new GameStateMessage(
    deserializeArray(json.activePlayers),
    deserializeObjectMap(json.playerObjects),
    deserializeArray(json.buildableObjects),
  ),
});

export default GameStateMessage;
