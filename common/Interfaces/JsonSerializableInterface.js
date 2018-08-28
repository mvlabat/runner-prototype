import InterfaceImplementation, {
  assertInterface,
  isInterface,
} from '../Utils/InterfaceImplementation';
import JsonSerializableRegistry from '../Registries/JsonSerializableRegistry';

/**
 * @param constructor
 * @param interfaceImplementation
 * @constructor
 */
function JsonSerializableInterface(constructor, interfaceImplementation) {
  if (!JsonSerializableRegistry.hasConstructor(constructor.name)) {
    JsonSerializableRegistry.registerConstructor(constructor);
  }

  const implementation = new InterfaceImplementation(this, constructor, interfaceImplementation);

  this.serialize = (object) => {
    const json = implementation.callMethod('serialize', object);
    json.constructorName = constructor.name;
    return json;
  };

  this.deserialize = json => implementation.callMethod('deserialize', json);
}

JsonSerializableInterface.assert = (entity) => {
  assertInterface(entity.jsonSerializableInterface, JsonSerializableInterface);
};

JsonSerializableInterface.has = entity =>
  isInterface(entity.jsonSerializableInterface, JsonSerializableInterface);

export default JsonSerializableInterface;
