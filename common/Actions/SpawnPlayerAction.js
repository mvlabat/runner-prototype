import ActionInterface from '../Interfaces/ActionInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import { deserialize, serialize } from '../Utils/JsonSerializationHelper';

/**
 * @param {Player} player
 * @param deserializedTimeOccurred
 * @constructor
 */
function SpawnPlayerAction(player, deserializedTimeOccurred = 0) {
  let timeOccurred = deserializedTimeOccurred;

  this.actionInterface = new ActionInterface(this, {
    getTimeOccurred: () => timeOccurred,

    setTimeOccurred: (time) => {
      timeOccurred = time;
    },
  });

  this.getPlayer = () => player;
}

SpawnPlayerAction.jsonSerializableInterface =
  new JsonSerializableInterface(SpawnPlayerAction, {
    /**
     * @param {SpawnPlayerAction} object
     * @returns {{actionType: string, playerHashId: string, timeOccurred: number}}
     */
    serialize: object => ({
      player: serialize(object.getPlayer()),
      timeOccurred: object.actionInterface.getTimeOccurred(),
    }),

    deserialize: json => new SpawnPlayerAction(
      deserialize(json.player),
      json.timeOccurred,
    ),
  });

export default SpawnPlayerAction;
