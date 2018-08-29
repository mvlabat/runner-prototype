import * as THREE from 'three';

import HashableIdInterface from '../Interfaces/HashableIdInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import PlaceableObjectInterface from '../Interfaces/PlaceableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';
import {
  vector2Serialize,
  vector2Deserialize, colorSerialize, colorDeserialize,
} from '../Utils/ThreeJsonSerializes';

/**
 * @param position
 * @param isAstralShifted
 * @param color
 * @param predefinedHashId
 * @constructor
 */
function Player(position, isAstralShifted, color = null, predefinedHashId = '') {
  const parameters = {};

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

    isAstralShifted: () => isAstralShifted,
    setAstralShifted: (newIsAstralShifted) => {
      parameters.isAstralShifted = newIsAstralShifted;
      setDebugProperty(this, 'isAstralShifted', newIsAstralShifted);
      return this;
    },

    getColor: () => parameters.color,
    setColor: (newColor) => {
      parameters.color = newColor;
      setDebugProperty(this, 'color', newColor);
      return this;
    },
  });

  this.getRadius = () => 5;

  let movementDirection = new THREE.Vector2();

  /**
   * @return {Vector2}
   */
  this.getMovementDirection = () => movementDirection;

  /**
   * @param {Vector2} newMovementDirection
   * @returns {Player}
   */
  this.setMovementDirection = (newMovementDirection) => {
    movementDirection = newMovementDirection;
    setDebugProperty(this, 'movementDirection', newMovementDirection);
    return this;
  };

  // INITIALIZE DEFAULT PARAMETERS.
  this.placeableObjectInterface.setPosition(position);
  this.placeableObjectInterface.setAstralShifted(isAstralShifted);
  this.placeableObjectInterface.setColor(color || new THREE.Color(Math.random() * 0xffffff));
}

Player.jsonSerializableInterface = new JsonSerializableInterface(Player, {
  serialize: object => ({
    hashId: object.hashableIdInterface.getHashId(),
    position: vector2Serialize(object.placeableObjectInterface.getPosition()),
    isAstralShifted: object.placeableObjectInterface.isAstralShifted(),
    color: colorSerialize(object.placeableObjectInterface.getColor()),
  }),

  deserialize: json => new Player(
    vector2Deserialize(json.position),
    json.isAstralShifted,
    colorDeserialize(json.color),
    json.hashId,
  ),
});

export default Player;
