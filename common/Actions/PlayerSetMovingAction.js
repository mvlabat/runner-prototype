import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import { vector2Deserialize, vector2Serialize } from '../Utils/ThreeJsonSerializes';
import ActionInterface from '../Interfaces/ActionInterface';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {string} playerHashId
 * @param {Vector2} direction
 * @param timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function PlayerSetMovingAction(playerHashId, direction, timeOccurred = 0, senderId = null) {
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

  this.broadcastedActionInterface = new BroadcastedActionInterface(this, {
    getSenderId: () => parameters.senderId,

    setSenderId: (newSenderId) => {
      parameters.senderId = newSenderId;
      setDebugProperty(this, 'senderId', newSenderId);
      return this;
    },
  });

  // CLASS IMPLEMENTATION.
  this.getPlayerHashId = () => playerHashId;
  this.getDirection = () => direction;

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.setTimeOccurred(timeOccurred);
  this.broadcastedActionInterface.setSenderId(senderId);
}

PlayerSetMovingAction.jsonSerializableInterface =
  new JsonSerializableInterface(PlayerSetMovingAction, {
    /**
     * @param {PlayerSetMovingAction} action
     * @returns {{actionType: string, playerHashId: string, position: {x, y}, direction: {x, y}}}
     */
    serialize: action => ({
      playerHashId: action.getPlayerHashId(),
      direction: vector2Serialize(action.getDirection()),
      timeOccurred: action.actionInterface.getTimeOccurred(),
      senderId: action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: json => new PlayerSetMovingAction(
      json.playerHashId,
      vector2Deserialize(json.direction),
      new Date(json.timeOccurred),
      json.senderId,
    ),
  });

export default PlayerSetMovingAction;
