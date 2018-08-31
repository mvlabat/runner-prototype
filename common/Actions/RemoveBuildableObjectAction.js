import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { setDebugProperty } from '../Utils/Debug';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';

/**
 * @param {string} buildableObjectHashId
 * @param timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function RemoveBuildableObjectAction(buildableObjectHashId, timeOccurred = 0, senderId = null) {
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
  this.getBuildableObjectHashId = () => buildableObjectHashId;

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.setTimeOccurred(timeOccurred);
  this.broadcastedActionInterface.setSenderId(senderId);
}

RemoveBuildableObjectAction.serializableInterface =
  new SerializableInterface(RemoveBuildableObjectAction, {
    /**
     * @param {RemoveBuildableObjectAction} action
     */
    serialize: action => ({
      buildableObjectHashId: () => action.getBuildableObjectHashId(),
      timeOccurred: () => action.actionInterface.getTimeOccurred(),
      senderId: () => action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: json => new RemoveBuildableObjectAction(
      json.buildableObjectHashId,
      new Date(json.timeOccurred),
      json.senderId,
    ),
  });

export default RemoveBuildableObjectAction;
