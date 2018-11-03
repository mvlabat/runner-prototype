import SerializableRegistry from '../Registries/SerializableRegistry';
import GlobalPsonDictionary from '../Utils/GlobalPsonDictionary';
import { deserializeObjectFields, serialize } from '../Utils/SerializationHelpers';
import InterfaceImplementation from '../Utils/InterfaceImplementation';

/**
 * SerializableInterface must be implemented for constructors themselves.
 * Required methods:
 * - serialize
 * - deserialize
 *
 * SerializableInterface is implemented for any class that has to be serialized and deserialized,
 * usually for sending it over a network.
 *
 * @param constructor
 * @param interfaceImplementation
 * @constructor
 */
function SerializableInterface(constructor, interfaceImplementation) {
  if (!SerializableRegistry.hasConstructor(constructor.name)) {
    SerializableRegistry.registerConstructor(constructor);
  }

  const implementation = new InterfaceImplementation(this, constructor, interfaceImplementation);

  /**
   * This method must return a plain object, which fields reflect fields of a resulted object,
   * and values have to be functions that return corresponding serialized values.
   * Note that all the values are serialized recursively: plain objects and iterable collections
   * are traversed, objects implementing SerializableInterface are processed calling their
   * `serialize` method as well.
   * @see ../Utils/SerializationHelpers.js `serialize` function.
   *
   * @example
   * object => ({
   *   fieldA: () => object.fieldA,
   *   anotherField: () => object.fieldB,
   * })
   */
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

  /**
   * This method must return an instance of the class for which this interface is implemented.
   *
   * @example
   * object => new SomethingSerialized(object.fieldA, object.anotherField)
   */
  this.deserialize =
      object => implementation.callMethod('deserialize', deserializeObjectFields(object));

  const schema = implementation.callMethod('serialize');
  for (const field of Object.keys(schema)) {
    GlobalPsonDictionary.addWord(field);
  }
  GlobalPsonDictionary.addWord(constructor.name);
}

export default SerializableInterface;
