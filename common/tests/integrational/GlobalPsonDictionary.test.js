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

SomethingElseSerialized.serializableInterface = new SerializableInterface(SomethingElseSerialized, {
  serialize: () => ({
    [someFieldName]: () => null,
    [anotherFieldName]: () => null,
  }),

  deserialize: () => new SomethingElseSerialized(),
});

describe('GlobalPsonDictionary', () => {
  it('has words added from SerializableInterface', () => {
    expect(GlobalPsonDictionary.hasWord(someFieldName)).toBe(true);
    expect(GlobalPsonDictionary.hasWord(anotherFieldName)).toBe(true);
    expect(GlobalPsonDictionary.hasWord(SomethingSerialized.name)).toBe(true);
    expect(GlobalPsonDictionary.hasWord(SomethingElseSerialized.name)).toBe(true);
  });
});
