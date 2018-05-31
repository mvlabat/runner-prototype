import JsonSerializableRegistry from '../TypeRegistries/JsonSerializableRegistry';
import { hasInterface } from './InterfaceImplementation';
import JsonSerializableInterface from '../Interfaces/JsonSerializableInterface';

// TODO: handle errors somewhere: crashing server on serialization errors is not cool :[

export function serialize(object) {
  const { constructor } = object;
  if (hasInterface(constructor, JsonSerializableInterface)) {
    throw new Error('JsonSerializableInterface is not implemented');
  }
  return constructor.jsonSerializableInterface.serialize(object);
}

export function deserialize(json) {
  const constructor = JsonSerializableRegistry.getConstructor(json.constructorName);
  if (hasInterface(constructor, JsonSerializableInterface)) {
    throw new Error('JsonSerializableInterface is not implemented');
  }
  return constructor.jsonSerializableInterface.deserialize(json);
}
