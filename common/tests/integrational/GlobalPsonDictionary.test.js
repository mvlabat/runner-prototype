import GlobalPsonDictionary from '../../Utils/GlobalPsonDictionary';
import SerializableInterface from '../../Interfaces/SerializableInterface';

const someFieldName = 'someTestSerializedFieldName';
const anotherFieldName = 'anotherTestSerializedFieldName';

function SomethingSerialized() {}
function SomethingElseSerialized() {}

SomethingSerialized.serializableInterface = new SerializableInterface(SomethingSerialized, {
  serialize: () => ({
    [someFieldName]: () => null,
    [anotherFieldName]: () => null,
  }),

  deserialize: () => new SomethingSerialized(),
});

SomethingElseSerialized.serializableInterface = new SerializableInterface(SomethingSerialized, {
  serialize: () => ({
    [someFieldName]: () => null,
    [anotherFieldName]: () => null,
  }),

  deserialize: () => new SomethingElseSerialized(),
});

describe('GlobalPsonDictionary', () => {
  it('has words added from SerializableInterface', () => {
    GlobalPsonDictionary.hasWord(someFieldName);
    GlobalPsonDictionary.hasWord(anotherFieldName);
    GlobalPsonDictionary.hasWord(SomethingSerialized.constructor.name);
    GlobalPsonDictionary.hasWord(SomethingElseSerialized.constructor.name);
  });
});
