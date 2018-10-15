import SerializableInterface from '../Interfaces/SerializableInterface';
import ActionInterface from '../Interfaces/ActionInterface';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';
import { setDebugProperty } from '../Utils/Debug';
import { deserialize, serialize } from '../Utils/SerializationHelper';

/**
 * @param {string} playerHashId
 * @param {CommonVector2} position
 * @param {CommonVector2} direction
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
      position: () => serialize(action.getPosition()),
      direction: () => serialize(action.getDirection()),
      timeOccurred: () => action.actionInterface.getTimeOccurred(),
      senderId: () => action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: json => new PlayerSetMovingAction(
      json.playerHashId,
      deserialize(json.position),
      deserialize(json.direction),
      new Date(json.timeOccurred),
      json.senderId,
    ),
  });

export default PlayerSetMovingAction;
