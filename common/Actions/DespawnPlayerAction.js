import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {string} playerHashId
 * @param {number|null} timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function DespawnPlayerAction(playerHashId, timeOccurred = null, senderId = null) {
  // INTERFACES IMPLEMENTATION.
  this.actionInterface = new ActionInterface(this, {
    isBroadcastedAfterExecution: () => true,
  });

  // CLASS IMPLEMENTATION.
  this.getPlayerHashId = () => playerHashId;
  setDebugProperty(this, 'playerHashId', playerHashId);

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.timeOccurred = timeOccurred;
  this.actionInterface.senderId = senderId;
}

DespawnPlayerAction.serializableInterface =
  new SerializableInterface(DespawnPlayerAction, {
    /**
     * @param {DespawnPlayerAction} action
     */
    serialize: action => ({
      playerHashId: () => action.getPlayerHashId(),
      timeOccurred: () => action.actionInterface.timeOccurred,
      senderId: () => action.actionInterface.senderId,
    }),

    deserialize: object => new DespawnPlayerAction(
      object.playerHashId,
      object.timeOccurred,
      object.senderId,
    ),
  });

export default DespawnPlayerAction;
