import SerializableRegistry from '../Registries/SerializableRegistry';
import GlobalPsonDictionary from '../Utils/GlobalPsonDictionary';
import { deserializeObjectFields, serialize } from '../Utils/SerializationHelpers';
import InterfaceImplementation from '../Utils/InterfaceImplementation';

/**
 * @param constructor
 * @param interfaceImplementation
 * @constructor
 */
function SerializableInterface(constructor, interfaceImplementation) {
  if (!SerializableRegistry.hasConstructor(constructor.name)) {
    SerializableRegistry.registerConstructor(constructor);
  }

  const implementation = new InterfaceImplementation(this, constructor, interfaceImplementation);

  this.serialize = (object) => {
    const schema = implementation.callMethod('serialize', object);
    const plainObject = {};
    for (const field of Object.keys(schema)) {
      if (typeof schema[field] !== 'function') {
        throw new TypeError(`SerializableInterface: field '${field}' of ${constructor.name} serialize method must be a function`);
      }

      const value = schema[field]();
      plainObject[field] = serialize(value);
    }
    plainObject.constructorName = constructor.name;
    return plainObject;
  };

  this.deserialize =
      object => implementation.callMethod('deserialize', deserializeObjectFields(object));

  const schema = implementation.callMethod('serialize');
  for (const field of Object.keys(schema)) {
    GlobalPsonDictionary.addWord(field);
  }
  GlobalPsonDictionary.addWord(constructor.name);
}

export default SerializableInterface;
