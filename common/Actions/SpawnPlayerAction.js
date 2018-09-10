import ActionInterface from '../Interfaces/ActionInterface';
import SerializableInterface from '../Interfaces/SerializableInterface';
import { deserialize, serialize } from '../Utils/SerializationHelper';
import BroadcastedActionInterface from '../Interfaces/BroadcastedActionInterface';
import { setDebugProperty } from '../Utils/Debug';

/**
 * @param {Player} player
 * @param {number|null} clientId
 * @param timeOccurred
 * @param {number|null} senderId
 * @constructor
 */
function SpawnPlayerAction(player, clientId = null, timeOccurred = 0, senderId = null) {
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
  this.getPlayer = () => player;
  setDebugProperty(this, 'player', player);

  this.getClientId = () => clientId;
  this.setClientId = (newClientId) => {
    parameters.clientId = newClientId;
    setDebugProperty(this, 'clientId', newClientId);
  };

  // INITIALIZE DEFAULT PARAMETERS.
  this.setClientId(clientId);
  this.actionInterface.setTimeOccurred(timeOccurred);
  this.broadcastedActionInterface.setSenderId(senderId);
}

SpawnPlayerAction.serializableInterface =
  new SerializableInterface(SpawnPlayerAction, {
    /**
     * @param {SpawnPlayerAction} action
     */
    serialize: action => ({
      player: () => serialize(action.getPlayer()),
      clientId: () => action.getClientId(),
      timeOccurred: () => action.actionInterface.getTimeOccurred(),
      senderId: () => action.broadcastedActionInterface.getSenderId(),
    }),

    deserialize: json => new SpawnPlayerAction(
      deserialize(json.player),
      json.clientId,
      new Date(json.timeOccurred),
      json.senderId,
    ),
  });

export default SpawnPlayerAction;
