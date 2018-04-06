import HashableIdInterface from './Interfaces/HashableIdInterface';
import { setDebugProperty } from './Utils/Debug';
import PlacableObjectInterface from './Interfaces/PlacableObjectInterface';

function Player(position, scene, predefinedHashId = '') {
  const parameters = {};

  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashId, {
    getHashedContent: () =>
      this.placableObjectInterface.getScene().hashableIdInterface.getHashId(),
  });

  this.placableObjectInterface = new PlacableObjectInterface(this, {
    getType: () => 'player',

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

  this.getRadius = () => 5;
}

export default Player;
