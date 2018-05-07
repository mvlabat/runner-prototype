import * as THREE from 'three';

import HashableIdInterface from './Interfaces/HashableIdInterface';
import { setDebugProperty } from './Utils/Debug';
import PlaceableObjectInterface from './Interfaces/PlaceableObjectInterface';
import PlayerRenderer from './Renderers/PlayerRender';

function Player(position, predefinedHashId = '') {
  const parameters = {};
  const renderer = new PlayerRenderer();

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

    getRenderer: () => renderer,
  });

  this.getRadius = () => 5;

  // INITIALIZE DEFAULT PARAMETERS.
  this.placeableObjectInterface.setPosition(position);
  this.placeableObjectInterface.setColor(new THREE.Color(Math.random() * 0xffffff));
}

export default Player;
