import HashableIdInterface from '../Interfaces/HashableIdInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import PlaceableObjectInterface from '../Interfaces/PlaceableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';
import Paper from '../Paper';
import CommonVector2 from '../Math/CommonVector2';
import CommonColor from '../Math/CommonColor';

const BASE_PLAYER_RADIUS = 5;

/**
 * @param {CommonVector2} position
 * @param {boolean} isPlaced
 * @param {CommonColor} color
 * @param {string} predefinedHashId
 * @constructor
 */
function Player(position, isPlaced, color = null, predefinedHashId = '') {
  const parameters = {};
  let path;

  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashId, {
    getHashedContent: () => (
      this.placeableObjectInterface.getScene().hashableIdInterface.getHashId()
    ),
  });

  this.placeableObjectInterface = new PlaceableObjectInterface(this, {
    getType: () => 'player',

    getPosition: () => parameters.position,
    setPosition: (newPosition) => {
      parameters.position = newPosition;
      setDebugProperty(this, 'position', newPosition);
      return this;
    },

    isPlaced: () => parameters.isPlaced,
    setPlaced: (newIsPlaced) => {
      parameters.isPlaced = newIsPlaced;
      setDebugProperty(this, 'isPlaced', newIsPlaced);
      return this;
    },

    getColor: () => parameters.color,
    setColor: (newColor) => {
      parameters.color = newColor;
      setDebugProperty(this, 'color', newColor);
      return this;
    },

    recalculatePath: () => {
      path = new Paper.Path.Circle(parameters.position, BASE_PLAYER_RADIUS);
    },
    getPath: () => path,
  });

  this.getRadius = () => BASE_PLAYER_RADIUS;

  this.movementDirection = new CommonVector2();

  // INITIALIZE DEFAULT PARAMETERS.
  this.placeableObjectInterface.setPosition(position);
  this.placeableObjectInterface.setPlaced(isPlaced);
  this.placeableObjectInterface.setColor(color || CommonColor.random());
  this.placeableObjectInterface.recalculatePath();
}

Player.serializableInterface = new SerializableInterface(Player, {
  serialize: player => ({
    position: () => player.placeableObjectInterface.getPosition(),
    isPlaced: () => player.placeableObjectInterface.isPlaced(),
    color: () => player.placeableObjectInterface.getColor(),
    hashId: () => player.hashableIdInterface.getHashId(),
  }),

  deserialize: object => new Player(
    object.position,
    object.isPlaced,
    object.color,
    object.hashId,
  ),
});

export default Player;
