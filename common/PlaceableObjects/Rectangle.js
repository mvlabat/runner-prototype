import HashableIdInterface from '../Interfaces/HashableIdInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import PlaceableObjectInterface from '../Interfaces/PlaceableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';
import SavableInterface from '../Interfaces/SavableInterface';
import Paper from '../Paper';

/**
 * @param {CommonVector2} position
 * @param {CommonVector2} size
 * @param {CommonColor} color
 * @param {boolean} isPlaced
 * @param {string} predefinedHashId
 * @constructor
 */
function Rectangle(position, size, color, isPlaced, predefinedHashId = '') {
  const parameters = {};
  let path;

  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashId, {
    getHashedContent: () => (
      this.placeableObjectInterface.getScene().hashableIdInterface.getHashId()
    ),
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

    isPlaced: () => parameters.isPlaced,
    setPlaced: (newIsPlaced) => {
      parameters.isPlaced = newIsPlaced;
      setDebugProperty(this, 'isPlaced', newIsPlaced);
      return this;
    },

    recalculatePath: () => {
      path = new Paper.Path.Rectangle(parameters.position, parameters.size);
    },
    getPath: () => path,
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

      const newIsPlaced = newEntity.placeableObjectInterface.isPlaced();
      if (newIsPlaced !== undefined) {
        this.placeableObjectInterface.setPlaced(newIsPlaced);
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
  this.placeableObjectInterface.setPlaced(isPlaced);
  this.placeableObjectInterface.recalculatePath();
}

Rectangle.serializableInterface = new SerializableInterface(Rectangle, {
  serialize: object => ({
    position: () => object.placeableObjectInterface.getPosition(),
    size: () => object.getSize(),
    color: () => object.placeableObjectInterface.getColor(),
    isPlaced: () => object.placeableObjectInterface.isPlaced(),
    hashId: () => object.hashableIdInterface.getHashId(),
  }),

  deserialize: json => new Rectangle(
    json.position,
    json.size,
    json.color,
    json.isPlaced,
    json.hashId,
  ),
});

export default Rectangle;
