import * as THREE from 'three';

import Player from 'platformio-common/PlaceableObjects/Player';
import { log } from 'platformio-common/Utils/Debug';
import UpdatableInterface from 'platformio-common/Interfaces/UpdatableInterface';

import SpawnPlayerAction from 'platformio-common/Actions/SpawnPlayerAction';
import DespawnPlayerAction from 'platformio-common/Actions/DespawnPlayerAction';
import PlayerSetMovingAction from 'platformio-common/Actions/PlayerSetMovingAction';

import MovementDirections from '../Utils/MovementDirections';

/**
 * @param {ActionController} actionController
 * @param {CameraWrapper} cameraWrapper
 * @constructor
 */
function PlayerController(actionController, cameraWrapper) {
  let activated = false;
  /**
   * @type {Player}
   */
  let player = null;

  // INTERFACES IMPLEMENTATION.

  this.updatableInterface = new UpdatableInterface(this, {
    update: () => {
      if (!activated) {
        return;
      }
      cameraWrapper.setPosition(player.placeableObjectInterface.getPosition());
    },
  });

  // CLASS IMPLEMENTATION.

  this.activatePlayerMode = () => {
    activated = true;
    log('Player mode activated.');
    addPlayer(new THREE.Vector2());
  };

  this.deactivatePlayerMode = () => {
    activated = false;
    removePlayer();
  };

  const movementDirections = new MovementDirections();

  this.setMovementDirection = (direction, enable) => {
    movementDirections[direction] = enable;
    actionController.addAction(new PlayerSetMovingAction(
      player.hashableIdInterface.getHashId(),
      movementDirections.getDirectionVector(),
    ));
  };

  /**
   * @param {Vector2} position
   */
  function addPlayer(position) {
    player = new Player(position);
    actionController.addAction(new SpawnPlayerAction(player));
  }

  function removePlayer() {
    actionController.addAction(new DespawnPlayerAction(player.hashableIdInterface.getHashId()));
    player = null;
  }
}

export default PlayerController;
