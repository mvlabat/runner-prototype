import HashableIdInterface from './Interfaces/HashableIdInterface';
import { setDebugProperty } from './Utils/Debug';
import PlaceableObjectInterface from './Interfaces/PlaceableObjectInterface';

function Player(position, scene, predefinedHashId = '') {
  const parameters = {};

  this.hashableIdInterface = new HashableIdInterface(this, predefinedHashId, {
    getHashedContent: () =>
      this.placeableObjectInterface.getScene().hashableIdInterface.getHashId(),
  });

  this.placeableObjectInterface = new PlaceableObjectInterface(this, {
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
