import HashableIdInterface from '../Interfaces/HashableIdInterface';
import BuildableObjectInterface from '../Interfaces/BuildableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';

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

export default Rectangle;
