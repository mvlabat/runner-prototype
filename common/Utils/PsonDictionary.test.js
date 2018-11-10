import set from 'jest-plugin-set';

import PsonDictionary from './PsonDictionary';

describe('PsonDictionary', () => {
  set('emptyDictionary', () => new PsonDictionary());
  beforeEach(() => {
    emptyDictionary.commitDictionary();
  });

  describe('without initial list', () => {
    set('dictionary', () => new PsonDictionary());
    set('anotherDictionary', () => new PsonDictionary());
    set('word', () => 'someLongTestWord');
    set('anotherWord', () => 'anotherLongTestWord');

    set('encodedObject', () => ({
      [word]: 'some value',
      [anotherWord]: 'some value',
    }));

    it('adds words', () => {
      dictionary.addWord(word);
      dictionary.addWord(anotherWord);
      expect(dictionary.hasWord(word)).toBe(true);
      expect(dictionary.hasWord(anotherWord)).toBe(true);
      expect(dictionary.getDictionaryLength()).toBe(2);
    });

    it("doesn't store duplicates", () => {
      dictionary.addWord(word);
      dictionary.addWord(word);
      expect(dictionary.getDictionaryLength()).toBe(1);
    });

    it('throws an error when gets commited twice', () => {
      dictionary.commitDictionary();
      expect(() => {
        dictionary.commitDictionary();
      }).toThrow('Committing PsonDictionary twice is prohibited');
    });

    it('actually commits added words', () => {
      dictionary.addWord(word);
      dictionary.addWord(anotherWord);
      dictionary.commitDictionary();

      const encodedWithCommitedLength = dictionary.getDictionary()
        .encode(encodedObject)
        .toBuffer()
        .byteLength;

      const encodedWithEmptyLength = emptyDictionary.getDictionary()
        .encode(encodedObject)
        .toBuffer()
        .byteLength;

      expect(encodedWithCommitedLength).toBeLessThan(encodedWithEmptyLength);
    });

    it('is able to decode', () => {
      dictionary.addWord(word);
      dictionary.addWord(anotherWord);
      dictionary.commitDictionary();
      anotherDictionary.addWord(word);
      anotherDictionary.addWord(anotherWord);
      anotherDictionary.commitDictionary();

      const encodedBuffer = dictionary.getDictionary().encode(encodedObject).toBuffer();
      const decodedObject = anotherDictionary.getDictionary().decode(encodedBuffer);
      expect(decodedObject).toEqual(encodedObject);
    });

    it('is not able to decode with inconsistent dictionary', () => {
      dictionary.addWord(word);
      dictionary.addWord(anotherWord);
      dictionary.commitDictionary();

      const encodedBuffer = dictionary.getDictionary().encode(encodedObject).toBuffer();
      const decodedObject = emptyDictionary.getDictionary().decode(encodedBuffer);
      expect(decodedObject).not.toEqual(encodedObject);
    });
  });

  describe('with initial list', () => {
    set('word', () => 'someLongTestWord');
    set('initialWord', () => 'initialLongTestWord');
    set('initialList', () => [initialWord]);
    set('dictionary', () => new PsonDictionary(initialList));

    set('encodedObject', () => ({
      [initialWord]: 'some value',
    }));

    it('has initial words', () => {
      expect(dictionary.hasWord(initialWord)).toBe(true);
      expect(dictionary.getDictionaryLength()).toBe(1);
    });

    it('adds new words', () => {
      dictionary.addWord(word);
      expect(dictionary.hasWord(word)).toBe(true);
      expect(dictionary.getDictionaryLength()).toBe(2);
    });

    it('actually commits initial words', () => {
      dictionary.commitDictionary();

      const encodedWithCommitedLength = dictionary.getDictionary()
        .encode(encodedObject)
        .toBuffer()
        .byteLength;

      const encodedWithEmptyLength = emptyDictionary.getDictionary()
        .encode(encodedObject)
        .toBuffer()
        .byteLength;

      expect(encodedWithCommitedLength).toBeLessThan(encodedWithEmptyLength);
    });
  });
});
