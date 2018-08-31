import { deserialize, serialize } from './SerializationHelper';
import PsonDictionary from './PsonDictionary';

/**
 * @constructor
 */
const PsonSerializationHelper = (() => (
  {
    serialize: object => (
      PsonDictionary.getDictionary().encode(serialize(object)).toBuffer()
    ),

    deserialize: data => (
      deserialize(PsonDictionary.getDictionary().decode(data))
    ),
  }
))();

export default PsonSerializationHelper;
