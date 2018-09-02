import SerializableInterface from '../Interfaces/SerializableInterface';
import { deserializeArray, serializeArray } from '../Utils/SerializationHelper';

/**
 * @param activePlayers
 * @param playerObjects
 * @param buildableObjects
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
    playerObjects: () => serializeArray(message.getPlayerObjects()),
    buildableObjects: () => serializeArray(message.getBuildableObjects()),
  }),

  deserialize: json => new GameStateMessage(
    deserializeArray(json.activePlayers),
    deserializeArray(json.playerObjects),
    deserializeArray(json.buildableObjects),
  ),
});

export default GameStateMessage;
