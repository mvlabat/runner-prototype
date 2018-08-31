import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { deserialize, serialize } from '../Utils/SerializationHelper';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {Player} player
 * @param timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function SpawnPlayerAction(player, timeOccurred = 0, senderId = null) {
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
  this.getPlayer = () => player;

  // INITIALIZE DEFAULT PARAMETERS.
  this.actionInterface.setTimeOccurred(timeOccurred);
  this.broadcastedActionInterface.setSenderId(senderId);
}

SpawnPlayerAction.serializableInterface =
  new SerializableInterface(SpawnPlayerAction, {
    /**
     * @param {SpawnPlayerAction} action
     * @returns {{actionType: string, playerHashId: string, timeOccurred: number}}
     */
    serialize: action => ({
      player: () => serialize(action.getPlayer()),
      timeOccurred: () => action.actionInterface.getTimeOccurred(),
      senderId: () => action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: json => new SpawnPlayerAction(
      deserialize(json.player),
      new Date(json.timeOccurred),
      json.senderId,
    ),
  });

export default SpawnPlayerAction;
