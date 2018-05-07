import HashableIdInterface from '../Interfaces/HashableIdInterface';
import PlaceableObjectInterface from '../Interfaces/PlaceableObjectInterface';
import { setDebugProperty } from '../Utils/Debug';
import CircleRenderer from '../Renderers/CircleRenderer';

function Circle(position, radius, color, predefinedHashId = '') {
  const parameters = {};
  const renderer = new CircleRenderer();

  // INTERFACES IMPLEMENTATION.
  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashId, {
    getHashedContent: () =>
      this.placeableObjectInterface.getScene().hashableIdInterface.getHashId(),
  });

  this.placeableObjectInterface = new PlaceableObjectInterface(this, {
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

    getRenderer: () => renderer,
  });

  // CLASS IMPLEMENTATION.
  this.getRadius = () => parameters.radius;
  this.setRadius = (newRadius) => {
    parameters.radius = newRadius;
    setDebugProperty(this, 'Radius', newRadius);
    return this;
  };

  // INITIALIZE DEFAULT PARAMETERS.
  this.placeableObjectInterface.setPosition(position);
  this.setRadius(radius);
  this.placeableObjectInterface.setColor(color);
}

export default Circle;
