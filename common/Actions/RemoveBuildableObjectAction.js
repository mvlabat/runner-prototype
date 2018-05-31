import ActionInterface from '../Interfaces/ActionInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';

/**
 * @param {string} buildableObjectHashId
 * @param deserializedTimeOccurred
 * @constructor
 */
function RemoveBuildableObjectAction(buildableObjectHashId, deserializedTimeOccurred = 0) {
  let timeOccurred = deserializedTimeOccurred;

  this.actionInterface = new ActionInterface(this, {
    getTimeOccurred: () => timeOccurred,

    setTimeOccurred: (time) => {
      timeOccurred = time;
    },
  });

  this.getBuildableObjectHashId = () => buildableObjectHashId;
}

RemoveBuildableObjectAction.jsonSerializableInterface =
  new JsonSerializableInterface(RemoveBuildableObjectAction, {
    /**
     * @param {RemoveBuildableObjectAction} object
     */
    serialize: object => ({
      buildableObjectHashId: object.getBuildableObjectHashId(),
      timeOccurred: object.actionInterface.getTimeOccurred(),
    }),

    deserialize: json => new RemoveBuildableObjectAction(
      json.buildableObjectHashId,
      json.timeOccurred,
    ),
  });

export default RemoveBuildableObjectAction;
