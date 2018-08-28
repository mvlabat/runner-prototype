import ActionInterface from '../Interfaces/ActionInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {string} clientId
 * @param timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function DespawnClientPlayersAction(clientId, timeOccurred = 0, senderId = null) {
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
  this.getClientId = () => clientId;

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.setTimeOccurred(timeOccurred);
  this.broadcastedActionInterface.setSenderId(senderId);
}

DespawnClientPlayersAction.jsonSerializableInterface =
  new JsonSerializableInterface(DespawnClientPlayersAction, {
    /**
     * @param {DespawnClientPlayersAction} action
     * @returns {{playerHashId: string, timeOccurred: number, senderId: number|null}}
     */
    serialize: action => ({
      clientId: action.getClientId(),
      timeOccurred: action.actionInterface.getTimeOccurred(),
      senderId: action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: json => new DespawnClientPlayersAction(
      json.clientId,
      new Date(json.timeOccurred),
      json.senderId,
    ),
  });

export default DespawnClientPlayersAction;
