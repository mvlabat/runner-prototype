import SerializableRegistry from '../Registries/SerializableRegistry';
import SerializableInterface from '../Interfaces/SerializableInterface';

export function serialize(object) {
  const { constructor } = object;
  SerializableInterface.assert(constructor);
  return constructor.serializableInterface.serialize(object);
}

export function deserialize(json) {
  const constructor = SerializableRegistry.getConstructor(json.constructorName);
  if (!constructor) {
    throw new Error(`Unknown constructor name: ${json.constructorName}`);
  }
  SerializableInterface.assert(constructor);
  return constructor.serializableInterface.deserialize(json);
}

export function serializeArray(array, serializer = serialize) {
  return Array.from(array).map(entity => serializer(entity));
}

export function deserializeArray(array, deserializer = deserialize) {
  return Array.from(array).map(entity => deserializer(entity));
}

export function serializeObjectMap(objectMap, serializer = serialize) {
  return Object.keys(objectMap).reduce((acc, key) => {
    acc[key] = serializer(objectMap[key]);
    return acc;
  }, {});
}

export function deserializeObjectMap(serializedObjectMap, deserializer = deserialize) {
  return Object.keys(serializedObjectMap).reduce((acc, key) => {
    acc[key] = deserializer(serializedObjectMap[key]);
    return acc;
  }, {});
}
