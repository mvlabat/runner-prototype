import HashableIdInterface from '../Interfaces/HashableIdInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import PlaceableObjectInterface from '../Interfaces/PlaceableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';
import {
  vector2Serialize,
  vector2Deserialize,
  colorSerialize,
  colorDeserialize,
} from '../Utils/ThreeJsonSerializes';
import SavableInterface from '../Interfaces/SavableInterface';

/**
 * @param position
 * @param size
 * @param color
 * @param isAstralShifted
 * @param predefinedHashid
 * @constructor
 */
function Rectangle(position, size, color, isAstralShifted, predefinedHashid = '') {
  const parameters = {};

  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashid, {
    getHashedContent: () =>
      this.placeableObjectInterface.getScene().hashableIdInterface.getHashId(),
  });

  this.placeableObjectInterface = new PlaceableObjectInterface(this, {
    getType: () => 'rectangle',

    getPosition: () => parameters.position,
    setPosition: (newPosition) => {
      parameters.position = newPosition;
      setDebugProperty(this, 'position', newPosition);
      return this;
    },

    getColor: () => parameters.color,
    setColor: (newColor) => {
      parameters.color = newColor;
      setDebugProperty(this, 'color', newColor);
      return this;
    },

    isAstralShifted: () => isAstralShifted,
    setAstralShifted: (newIsAstralShifted) => {
      parameters.isAstralShifted = newIsAstralShifted;
      setDebugProperty(this, 'isAstralShifted', newIsAstralShifted);
      return this;
    },
  });

  this.savableInterface = new SavableInterface(this, {
    /**
     * @param {Rectangle} newEntity
     */
    save: (newEntity) => {
      const newPosition = newEntity.placeableObjectInterface.getPosition();
      if (newPosition !== undefined) {
        this.placeableObjectInterface.setPosition(newPosition.clone());
      }

      const newColor = newEntity.placeableObjectInterface.getColor();
      if (newColor !== undefined) {
        this.placeableObjectInterface.setColor(newColor.clone());
      }

      const newSize = newEntity.getSize();
      if (newSize !== undefined) {
        this.setSize(newSize);
      }

      const newIsAstralShifted = newEntity.placeableObjectInterface.isAstralShifted();
      if (newIsAstralShifted !== undefined) {
        this.placeableObjectInterface.setAstralShifted(newIsAstralShifted);
      }
      return this;
    },
  });

  // CLASS IMPLEMENTATION.
  this.getSize = () => parameters.size;
  this.setSize = (newSize) => {
    parameters.size = newSize;
    setDebugProperty(this, 'size', newSize);
    return this;
  };

  // INITIALIZE DEFAULT PARAMETERS.
  this.placeableObjectInterface.setPosition(position);
  this.setSize(size);
  this.placeableObjectInterface.setColor(color);
  this.placeableObjectInterface.setAstralShifted(isAstralShifted);
}

Rectangle.jsonSerializableInterface = new JsonSerializableInterface(Rectangle, {
  serialize: object => ({
    hashId: object.hashableIdInterface.getHashId(),
    position: vector2Serialize(object.placeableObjectInterface.getPosition()),
    size: vector2Serialize(object.getSize()),
    color: colorSerialize(object.placeableObjectInterface.getColor()),
    isAstralShifted: object.placeableObjectInterface.isAstralShifted(),
    type: object.placeableObjectInterface.getType(),
  }),

  deserialize: json => new Rectangle(
    vector2Deserialize(json.position),
    vector2Deserialize(json.size),
    colorDeserialize(json.color),
    json.isAstralShifted,
    json.hashId,
  ),
});

export default Rectangle;
