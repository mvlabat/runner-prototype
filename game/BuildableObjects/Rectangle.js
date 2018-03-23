import HashableIdInterface from '../Interfaces/HashableIdInterface';
import BuildableObjectInterface from '../Interfaces/BuildableObjectInterface';

function Rectangle(position, size, color) {
  const parameters = {
    position,
    size,
    color,
  };

  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, {
    getHashedContent: () =>
      this.buildableObjectInterface.getScene().hashableIdInterface.getHashId(),
  });

  this.buildableObjectInterface = new BuildableObjectInterface(this, {
    getType: () => 'rectangle',

    getPosition: () => parameters.position,
    setPosition: (newPosition) => {
      parameters.position = newPosition;
      return this;
    },

    getColor: () => parameters.color,
    setColor: (newColor) => {
      parameters.color = newColor;
      return this;
    },
  });

  // CLASS IMPLEMENTATION.
  this.getSize = () => parameters.size;
  this.setSize = (newSize) => {
    parameters.size = newSize;
    return this;
  };
}

export default Rectangle;
