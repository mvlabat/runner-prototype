import HashableIdInterface from '../Interfaces/HashableIdInterface';
import BuildableObjectInterface from '../Interfaces/BuildableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';
import SerializableInterface from '../Interfaces/SerializableInterface';
import {
  vector2Serialize,
  vector2Deserialize,
  colorSerialize,
  colorDeserialize,
} from '../Utils/ThreeSerializers';

function Rectangle(position, size, color, predefinedHashid = '') {
  const parameters = {};

  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashid, {
    getHashedContent: () =>
      this.buildableObjectInterface.getScene().hashableIdInterface.getHashId(),
  });

  this.buildableObjectInterface = new BuildableObjectInterface(this, {
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
  });

  // CLASS IMPLEMENTATION.
  this.getSize = () => parameters.size;
  this.setSize = (newSize) => {
    parameters.size = newSize;
    setDebugProperty(this, 'size', newSize);
    return this;
  };

  // INITIALIZE DEFAULT PARAMETERS.
  this.buildableObjectInterface.setPosition(position);
  this.setSize(size);
  this.buildableObjectInterface.setColor(color);
}

Rectangle.serializableInterface = new SerializableInterface(this, {
  serialize: object => ({
    hashId: object.hashableIdInterface.getHashId(),
    position: vector2Serialize(object.buildableObjectInterface.getPosition()),
    size: vector2Serialize(object.getSize()),
    color: colorSerialize(object.buildableObjectInterface.getColor()),
  }),

  deserialize: json => new Rectangle(
    vector2Deserialize(json.position),
    vector2Deserialize(json.size),
    colorDeserialize(json.color),
    json.hashId,
  ),
});

export default Rectangle;
