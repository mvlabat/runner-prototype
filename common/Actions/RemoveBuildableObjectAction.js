import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {string} buildableObjectHashId
 * @param {number|null} timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function RemoveBuildableObjectAction(buildableObjectHashId, timeOccurred = null, senderId = null) {
  // INTERFACES IMPLEMENTATION.
  this.actionInterface = new ActionInterface(this, {
    isBroadcastedAfterExecution: () => true,
  });

  // CLASS IMPLEMENTATION.
  this.getBuildableObjectHashId = () => buildableObjectHashId;
  setDebugProperty(this, 'buildableObjectHashId', buildableObjectHashId);

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.timeOccurred = timeOccurred;
  this.actionInterface.senderId = senderId;
}

RemoveBuildableObjectAction.serializableInterface =
  new SerializableInterface(RemoveBuildableObjectAction, {
    /**
     * @param {RemoveBuildableObjectAction} action
     */
    serialize: action => ({
      buildableObjectHashId: () => action.getBuildableObjectHashId(),
      timeOccurred: () => action.actionInterface.timeOccurred,
      senderId: () => action.actionInterface.senderId,
    }),

    deserialize: object => new RemoveBuildableObjectAction(
      object.buildableObjectHashId,
      object.timeOccurred,
      object.senderId,
    ),
  });

export default RemoveBuildableObjectAction;
