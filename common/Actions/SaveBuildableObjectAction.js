import ActionInterface from '../Interfaces/ActionInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import { deserialize, serialize } from '../Utils/JsonSerializationHelper';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {object} buildableObject
 * @param timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function SaveBuildableObjectAction(buildableObject, timeOccurred = 0, senderId = null) {
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

    isBroadcastedAfterExecution: () => true,
  });

  // CLASS IMPLEMENTATION.
  this.getBuildableObject = () => buildableObject;

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.setTimeOccurred(timeOccurred);
  this.broadcastedActionInterface.setSenderId(senderId);
}

SaveBuildableObjectAction.jsonSerializableInterface =
  new JsonSerializableInterface(SaveBuildableObjectAction, {
    /**
     * @param {SaveBuildableObjectAction} action
     */
    serialize: action => ({
      buildableObject: serialize(action.getBuildableObject()),
      timeOccurred: action.actionInterface.getTimeOccurred(),
      senderId: action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: json => new SaveBuildableObjectAction(
      deserialize(json.buildableObject),
      new Date(json.timeOccurred),
      json.senderId,
    ),
  });

export default SaveBuildableObjectAction;
