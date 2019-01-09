import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {object} buildableObject
 * @param {number|null} timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function SaveBuildableObjectAction(buildableObject, timeOccurred = null, senderId = null) {
  // INTERFACES IMPLEMENTATION.
  this.actionInterface = new ActionInterface(this, {
    isBroadcastedAfterExecution: () => true,
  });

  // CLASS IMPLEMENTATION.
  this.getBuildableObject = () => buildableObject;
  setDebugProperty(this, 'buildableObject', buildableObject);

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.timeOccurred = timeOccurred;
  this.actionInterface.senderId = senderId;
}

SaveBuildableObjectAction.serializableInterface =
  new SerializableInterface(SaveBuildableObjectAction, {
    /**
     * @param {SaveBuildableObjectAction} action
     */
    serialize: action => ({
      buildableObject: () => action.getBuildableObject(),
      timeOccurred: () => action.actionInterface.timeOccurred,
      senderId: () => action.actionInterface.senderId,
    }),

    deserialize: object => new SaveBuildableObjectAction(
      object.buildableObject,
      object.timeOccurred,
      object.senderId,
    ),
  });

export default SaveBuildableObjectAction;
