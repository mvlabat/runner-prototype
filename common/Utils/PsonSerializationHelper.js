import { deserialize, serialize } from './SerializationHelper';
import GlobalPsonDictionary from './GlobalPsonDictionary';

/**
 * @constructor
 */
const PsonSerializationHelper = (() => (
  {
    serialize: object => (
      GlobalPsonDictionary.getDictionary().encode(serialize(object)).toBuffer()
    ),

    deserialize: data => (
      deserialize(GlobalPsonDictionary.getDictionary().decode(data))
    ),
  }
))();

export default PsonSerializationHelper;
