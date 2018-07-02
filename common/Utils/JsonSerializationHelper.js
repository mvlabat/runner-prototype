import JsonSerializableRegistry from '../TypeRegistries/JsonSerializableRegistry';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';

export function serialize(object) {
  const { constructor } = object;
  JsonSerializableInterface.assert(constructor);
  return constructor.jsonSerializableInterface.serialize(object);
}

export function deserialize(json) {
  const constructor = JsonSerializableRegistry.getConstructor(json.constructorName);
  if (!constructor) {
    throw new Error(`Unknown constructor name: ${json.constructorName}`);
  }
  JsonSerializableInterface.assert(constructor);
  return constructor.jsonSerializableInterface.deserialize(json);
}

export function serializeArray(array, serializer = serialize) {
  return Array.from(array).map(entity => serializer(entity));
}

export function deserializeArray(array, deserializer = deserialize) {
  return Array.from(array).map(entity => deserializer(entity));
}
