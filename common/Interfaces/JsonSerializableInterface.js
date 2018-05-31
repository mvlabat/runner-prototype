import InterfaceImplementation from '../Utils/InterfaceImplementation';
import JsonSerializableRegistry from '../TypeRegistries/JsonSerializableRegistry';

function JsonSerializableInterface(constructor, interfaceImplementation) {
  JsonSerializableRegistry.registerConstructor(constructor);

  const implementation = new InterfaceImplementation(this, constructor, interfaceImplementation);

  this.serialize = (object) => {
    const json = implementation.callMethod('serialize', object);
    json.constructorName = constructor.name;
    return json;
  };

  this.deserialize = json => implementation.callMethod('deserialize', json);
}

export default JsonSerializableInterface;
