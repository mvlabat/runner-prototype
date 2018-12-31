import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
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
      buildableObject: () => action.getBuildableObject(),
      timeOccurred: () => action.actionInterface.getTimeOccurred(),
      senderId: () => action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: object => new SaveBuildableObjectAction(
      object.buildableObject,
      new Date(object.timeOccurred),
      object.senderId,
    ),
  });

export default SaveBuildableObjectAction;
