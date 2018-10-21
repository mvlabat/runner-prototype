import SerializableRegistry from '../Registries/SerializableRegistry';
import { assertInterface, isInterface } from './InterfaceImplementation';

export function serialize(value) {
  if (typeof value === 'object' && value !== null) {
    if (isInterface(value.constructor.serializableInterface, 'SerializableInterface')) {
      return value.constructor.serializableInterface.serialize(value);
    }
    if (isIterable(value)) {
      return serializeArray(value);
    }
    return serializeObjectFields(value);
  }
  return value;
}

export function deserialize(value) {
  if (typeof value === 'object' && value !== null) {
    if (value.constructorName) {
      return deserializeSerializable(value);
    }
    if (isIterable(value)) {
      return deserializeArray(value);
    }
    return deserializeObjectFields(value);
  }
  return value;
}

export function serializeSerializable(object) {
  const { constructor } = object;
  assertInterface(constructor.serializableInterface, 'SerializableInterface');
  return constructor.serializableInterface.serialize(object);
}

export function deserializeSerializable(object) {
  const constructor = SerializableRegistry.getConstructor(object.constructorName);
  if (!constructor) {
    throw new Error(`Unknown constructor name: ${object.constructorName}`);
  }
  assertInterface(constructor.serializableInterface, 'SerializableInterface');
  return constructor.serializableInterface.deserialize(object);
}

export function serializeArray(array, serializer = serialize) {
  return Array.from(array).map(entity => serializer(entity));
}

export function deserializeArray(array, deserializer = deserialize) {
  return Array.from(array).map(entity => deserializer(entity));
}

export function serializeObjectFields(objectMap, serializer = serialize) {
  return Object.keys(objectMap).reduce((acc, key) => {
    acc[key] = serializer(objectMap[key]);
    return acc;
  }, {});
}

export function deserializeObjectFields(serializedObject, deserializer = deserialize) {
  return Object.keys(serializedObject).reduce((acc, key) => {
    acc[key] = deserializer(serializedObject[key]);
    return acc;
  }, {});
}

/**
 * Returns true for arrays, maps etc, but false for strings.
 */
export function isIterable(object) {
  if (object == null) {
    return false;
  }
  if (object.constructor === String) {
    return false;
  }
  return typeof object[Symbol.iterator] === 'function';
}
