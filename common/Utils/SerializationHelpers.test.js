import set from 'jest-plugin-set';

import {
  deserialize, deserializeArray, deserializeObjectFields,
  deserializeSerializable, isIterable,
  serialize, serializeArray, serializeObjectFields,
  serializeSerializable,
} from './SerializationHelpers';
import SerializableInterface from '../Interfaces/SerializableInterface';

describe('SerializationHelpers', () => {
  function SomeObject(value) {
    this.value = value;
  }

  SomeObject.serializableInterface = new SerializableInterface(SomeObject, {
    serialize: object => ({
      value: () => object.value,
    }),

    deserialize: object => new SomeObject(object.value),
  });

  set('someObjectDeserialized', () => new SomeObject(1));

  set('someObjectSerialized', () => ({ value: 1, constructorName: 'SomeObject' }));

  describe('isIterable', () => {
    it('returns true for Array', () => {
      expect(isIterable(new Array(1))).toBe(true);
    });

    it('returns true for Map', () => {
      expect(isIterable(new Map())).toBe(true);
    });

    it('returns false for String', () => {
      expect(isIterable('string')).toBe(false);
    });

    it('returns false for Object', () => {
      expect(isIterable({ value: 1 })).toBe(false);
    });

    it('returns false for null', () => {
      expect(isIterable(null)).toBe(false);
    });
  });

  describe('serializeSerializable/deserializeSerializable', () => {
    it('serializes', () => {
      expect(serializeSerializable(someObjectDeserialized)).toEqual(someObjectSerialized);
    });

    it('deserializes', () => {
      expect(deserializeSerializable(someObjectSerialized)).toEqual(someObjectDeserialized);
    });
  });

  describe('serializeArray/deserializeArray', () => {
    set('someMap', () => new Map([
      ['key1', someObjectDeserialized],
      ['key2', someObjectDeserialized],
    ]));

    set('arrayDeserialized', () => [someObjectDeserialized, someObjectDeserialized]);

    set('arraySerialized', () => [someObjectSerialized, someObjectSerialized]);

    it('serializes', () => {
      expect(serializeArray(someMap.values())).toEqual(arraySerialized);
    });

    it('deserializes', () => {
      expect(deserializeArray(arraySerialized)).toEqual(arrayDeserialized);
    });

    it('serializes with custom serializer', () => {
      expect(serializeArray(arrayDeserialized, () => true)).toEqual([true, true]);
    });

    it('deserializes with custom deserializer', () => {
      expect(deserializeArray(arraySerialized, () => false)).toEqual([false, false]);
    });
  });

  describe('serializeObjectFields/deserializeObjectFields', () => {
    set('objectDeserialized', () => ({
      key1: someObjectDeserialized,
      key2: someObjectDeserialized,
      key3: 'string',
    }));

    set('objectSerialized', () => ({
      key1: someObjectSerialized,
      key2: someObjectSerialized,
      key3: 'string',
    }));

    it('serializes', () => {
      expect(serializeObjectFields(objectDeserialized)).toEqual(objectSerialized);
    });

    it('deserializes', () => {
      expect(deserializeObjectFields(objectSerialized)).toEqual(objectDeserialized);
    });

    it('serializes with custom serializer', () => {
      expect(serializeObjectFields(objectDeserialized, () => true)).toEqual({
        key1: true,
        key2: true,
        key3: true,
      });
    });

    it('deserializes with custom deserializer', () => {
      expect(deserializeObjectFields(objectSerialized, () => false)).toEqual({
        key1: false,
        key2: false,
        key3: false,
      });
    });
  });

  describe('serialize/deserialize', () => {
    function SomeComplexObject(
      someInteger,
      someString,
      someArray,
      someInnerObject,
      someObjectsArray,
      someObjectMap,
    ) {
      this.someInteger = someInteger;
      this.someString = someString;
      this.someArray = someArray;
      this.someInnerObject = someInnerObject;
      this.someObjectsArray = someObjectsArray;
      this.someObjectMap = someObjectMap;
    }

    SomeComplexObject.serializableInterface = new SerializableInterface(SomeComplexObject, {
      serialize: object => ({
        someInteger: () => object.someInteger,
        someString: () => object.someString,
        someArray: () => object.someArray,
        someInnerObject: () => object.someInnerObject,
        someObjectsArray: () => object.someObjectsArray,
        someObjectMap: () => object.someObjectMap,
      }),

      deserialize: object => new SomeComplexObject(
        object.someInteger,
        object.someString,
        object.someArray,
        object.someInnerObject,
        object.someObjectsArray,
        object.someObjectMap,
      ),
    });

    set('objectDeserialized', () => new SomeComplexObject(
      1,
      'string',
      [1, 2],
      new SomeObject(5),
      [new SomeObject(3), new SomeObject(4)],
      {
        someInteger: 11,
        someString: 'stringstring',
        someArray: [11, 22],
        someInnerObject: new SomeObject(55),
        someObjectsArray: [new SomeObject(33), new SomeObject(44)],
      },
    ));

    set('objectSerialized', () => ({
      someInteger: 1,
      someString: 'string',
      someArray: [1, 2],
      someInnerObject: { value: 5, constructorName: 'SomeObject' },
      someObjectsArray: [
        { value: 3, constructorName: 'SomeObject' },
        { value: 4, constructorName: 'SomeObject' },
      ],
      someObjectMap: {
        someInteger: 11,
        someString: 'stringstring',
        someArray: [11, 22],
        someInnerObject: { value: 55, constructorName: 'SomeObject' },
        someObjectsArray: [
          { value: 33, constructorName: 'SomeObject' },
          { value: 44, constructorName: 'SomeObject' },
        ],
      },
      constructorName: 'SomeComplexObject',
    }));

    it('serializes', () => {
      expect(serialize(objectDeserialized)).toEqual(objectSerialized);
    });

    it('deserializes', () => {
      expect(deserialize(objectSerialized)).toEqual(objectDeserialized);
    });
  });
});
