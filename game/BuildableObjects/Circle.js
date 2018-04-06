import HashableIdInterface from '../Interfaces/HashableIdInterface';
import PlacableObjectInterface from '../Interfaces/PlacableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';

function Circle(position, radius, color, predefinedHashId = '') {
  const parameters = {};

  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashId, {
    getHashedContent: () =>
      this.placableObjectInterface.getScene().hashableIdInterface.getHashId(),
  });

  this.placableObjectInterface = new PlacableObjectInterface(this, {
    getType: () => 'circle',

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
  this.getRadius = () => parameters.radius;
  this.setRadius = (newRadius) => {
    parameters.radius = newRadius;
    setDebugProperty(this, 'Radius', newRadius);
    return this;
  };

  // INITIALIZE DEFAULT PARAMETERS.
  this.placableObjectInterface.setPosition(position);
  this.setRadius(radius);
  this.placableObjectInterface.setColor(color);
}

export default Circle;
