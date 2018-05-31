import ActionInterface from '../Interfaces/ActionInterface';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';
import { deserialize, serialize } from '../Utils/JsonSerializationHelper';

/**
 * @param {object} buildableObject
 * @param deserializedTimeOccurred
 * @constructor
 */
function SaveBuildableObjectAction(buildableObject, deserializedTimeOccurred = 0) {
  let timeOccurred = deserializedTimeOccurred;

  this.actionInterface = new ActionInterface(this, {
    getTimeOccurred: () => timeOccurred,

    setTimeOccurred: (time) => {
      timeOccurred = time;
    },
  });

  this.getBuildableObject = () => buildableObject;
}

SaveBuildableObjectAction.jsonSerializableInterface =
  new JsonSerializableInterface(SaveBuildableObjectAction, {
    /**
     * @param {SaveBuildableObjectAction} object
     */
    serialize: object => ({
      buildableObject: serialize(object.getBuildableObject()),
      timeOccurred: object.actionInterface.getTimeOccurred(),
    }),

    deserialize: json => new SaveBuildableObjectAction(
      deserialize(json.buildableObject),
      json.timeOccurred,
    ),
  });

export default SaveBuildableObjectAction;
