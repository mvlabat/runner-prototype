import SerializableInterface from '../Interfaces/SerializableInterface';
import ActionInterface from '../Interfaces/ActionInterface';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {string} playerHashId
 * @param {Vector2} position
 * @param {Vector2} direction
 * @param timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function PlayerSetMovingAction(
  playerHashId,
  position,
  direction,
  timeOccurred = 0,
  senderId = null,
) {
  const parameters = {};

  // INTERFACES IMPLEMENTATION.
  this.actionInterface = new ActionInterface(this, {
    getTimeOccurred: () => parameters.timeOccurred,

    setTimeOccurred: (newTimeOccurred) => {
      parameters.timeOccurred = newTimeOccurred;
      setDebugProperty(this, 'timeOccurred', newTimeOccurred);
      return this;
    },
  });

  this.broadcastedActionInterface = new BroadcastedActionInterface(this, {});

  // CLASS IMPLEMENTATION.
  this.getPlayerHashId = () => playerHashId;
  this.getPosition = () => position;
  this.getDirection = () => direction;
  setDebugProperty(this, 'playerHashId', playerHashId);
  setDebugProperty(this, 'position', position);
  setDebugProperty(this, 'direction', direction);

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.setTimeOccurred(timeOccurred);
  this.broadcastedActionInterface.setSenderId(senderId);
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
      timeOccurred: () => action.actionInterface.getTimeOccurred(),
      senderId: () => action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: object => new PlayerSetMovingAction(
      object.playerHashId,
      object.position,
      object.direction,
      new Date(object.timeOccurred),
      object.senderId,
    ),
  });

export default PlayerSetMovingAction;
