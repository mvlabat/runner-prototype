import ActionInterface from '../Interfaces/ActionInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';

/**
 * @param {string} playerHashId
 * @param deserializedTimeOccurred
 * @constructor
 */
function DespawnPlayerAction(playerHashId, deserializedTimeOccurred = 0) {
  let timeOccurred = deserializedTimeOccurred;

  this.actionInterface = new ActionInterface(this, {
    getTimeOccurred: () => timeOccurred,

    setTimeOccurred: (time) => {
      timeOccurred = time;
    },
  });

  this.getPlayerHashId = () => playerHashId;
}

DespawnPlayerAction.jsonSerializableInterface =
  new JsonSerializableInterface(DespawnPlayerAction, {
    /**
     * @param {DespawnPlayerAction} action
     * @returns {{actionType: string, playerHashId: string, timeOccurred: number}}
     */
    serialize: action => ({
      playerHashId: action.getPlayerHashId(),
      timeOccurred: action.actionInterface.getTimeOccurred().getTime(),
    }),

    deserialize: json => new DespawnPlayerAction(
      json.playerHashId,
      json.timeOccurred,
    ),
  });

export default DespawnPlayerAction;
