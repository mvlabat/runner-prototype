import HashableIdInterface from '../Interfaces/HashableIdInterface';
import BuildableObjectInterface from '../Interfaces/BuildableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';

function Cilcle(position, radius, color, predefinedHashid = '') {
  const parameters = {};

  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashid, {
    getHashedContent: () =>
      this.buildableObjectInterface.getScene().hashableIdInterface.getHashId(),
  });

  this.buildableObjectInterface = new BuildableObjectInterface(this, {
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
  this.buildableObjectInterface.setPosition(position);
  this.setRadius(radius);
  this.buildableObjectInterface.setColor(color);
}

export default Cilcle;
