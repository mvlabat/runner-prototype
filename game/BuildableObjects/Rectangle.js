import HashableIdInterface from '../Interfaces/HashableIdInterface';
import PlacableObjectInterface from '../Interfaces/PlacableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';
import RectangleRenderer from '../Renderers/RectangleRenderer';

function Rectangle(position, size, color, predefinedHashid = '') {
  const parameters = {};
  const renderer = new RectangleRenderer();

  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashid, {
    getHashedContent: () =>
      this.placableObjectInterface.getScene().hashableIdInterface.getHashId(),
  });

  this.placableObjectInterface = new PlacableObjectInterface(this, {
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

    getRenderer: () => renderer,
  });

  // CLASS IMPLEMENTATION.
  this.getSize = () => parameters.size;
  this.setSize = (newSize) => {
    parameters.size = newSize;
    setDebugProperty(this, 'size', newSize);
    return this;
  };

  // INITIALIZE DEFAULT PARAMETERS.
  this.placableObjectInterface.setPosition(position);
  this.setSize(size);
  this.placableObjectInterface.setColor(color);
}

export default Rectangle;
