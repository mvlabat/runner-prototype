import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { deserialize, serialize } from '../Utils/SerializationHelper';
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
    isBroadcastedAfterExecution: () => true,
  });

  // CLASS IMPLEMENTATION.
  this.getBuildableObject = () => buildableObject;
  setDebugProperty(this, 'buildableObject', buildableObject);

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.setTimeOccurred(timeOccurred);
  this.broadcastedActionInterface.setSenderId(senderId);
}

SaveBuildableObjectAction.serializableInterface =
  new SerializableInterface(SaveBuildableObjectAction, {
    /**
     * @param {SaveBuildableObjectAction} action
     */
    serialize: action => ({
      buildableObject: () => serialize(action.getBuildableObject()),
      timeOccurred: () => action.actionInterface.getTimeOccurred(),
      senderId: () => action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: json => new SaveBuildableObjectAction(
      deserialize(json.buildableObject),
      new Date(json.timeOccurred),
      json.senderId,
    ),
  });

export default SaveBuildableObjectAction;
