import { deserializeSerializable, serializeSerializable } from './SerializationHelpers';
import GlobalPsonDictionary from './GlobalPsonDictionary';

/**
 * @constructor
 */
const PsonSerializationHelper = (() => (
  {
    serialize: object => (
      GlobalPsonDictionary.getDictionary().encode(serializeSerializable(object)).toBuffer()
    ),

    deserialize: data => (
      deserializeSerializable(GlobalPsonDictionary.getDictionary().decode(data))
    ),
  }
))();

export default PsonSerializationHelper;
