import SerializableInterface from '../Interfaces/SerializableInterface';
import ActionInterface from '../Interfaces/ActionInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {string} playerHashId
 * @param {Vector2} position
 * @param {Vector2} direction
 * @param {number|null} tickOccurred
 * @param {number|null} senderId
 * @constructor
 */
function PlayerSetMovingAction(
  playerHashId,
  position,
  direction,
  tickOccurred = null,
  senderId = null,
) {
  // INTERFACES IMPLEMENTATION.
  this.actionInterface = new ActionInterface(this, {
    isBroadcastedAfterExecution: () => true,
    isAlteredDuringExecution: () => true,
  });

  // CLASS IMPLEMENTATION.
  this.getPlayerHashId = () => playerHashId;
  this.getPosition = () => position;
  this.getDirection = () => direction;
  setDebugProperty(this, 'playerHashId', playerHashId);
  setDebugProperty(this, 'position', position);
  setDebugProperty(this, 'direction', direction);

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.tickOccurred = tickOccurred;
  this.actionInterface.senderId = senderId;
}

PlayerSetMovingAction.serializableInterface =
  new SerializableInterface(PlayerSetMovingAction, {
    /**
     * @param {PlayerSetMovingAction} action
     */
    serialize: action => ({
      playerHashId: () => action.getPlayerHashId(),
      position: () => action.getPosition(),
      direction: () => action.getDirection(),
      tickOccurred: () => action.actionInterface.tickOccurred,
      senderId: () => action.actionInterface.senderId,
    }),

    deserialize: object => new PlayerSetMovingAction(
      object.playerHashId,
      object.position,
      object.direction,
      object.tickOccurred,
      object.senderId,
    ),
  });

export default PlayerSetMovingAction;
