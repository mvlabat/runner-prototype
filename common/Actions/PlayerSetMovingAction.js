import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import { vector2Deserialize, vector2Serialize } from '../Utils/ThreeJsonSerializes';
import ActionInterface from '../Interfaces/ActionInterface';

/**
 * @param {string} playerHashId
 * @param {Vector2} direction
 * @param deserializedTimeOccurred
 * @constructor
 */
function PlayerSetMovingAction(playerHashId, direction, deserializedTimeOccurred = 0) {
  let timeOccurred = deserializedTimeOccurred;

  this.actionInterface = new ActionInterface(this, {
    getTimeOccurred: () => timeOccurred,

    setTimeOccurred: (time) => {
      timeOccurred = time;
    },
  });

  this.getPlayerHashId = () => playerHashId;
  this.getDirection = () => direction;
}

PlayerSetMovingAction.jsonSerializableInterface =
  new JsonSerializableInterface(PlayerSetMovingAction, {
    /**
     * @param {PlayerSetMovingAction} action
     * @returns {{actionType: string, playerHashId: string, position: {x, y}, direction: {x, y}}}
     */
    serialize: action => ({
      playerHashId: action.getPlayerHashId(),
      direction: vector2Serialize(action.getDirection()),
      timeOccurred: action.actionInterface.getTimeOccurred(),
    }),

    deserialize: json => new PlayerSetMovingAction(
      json.playerHashId,
      vector2Deserialize(json.direction),
      json.timeOccurred,
    ),
  });

export default PlayerSetMovingAction;
