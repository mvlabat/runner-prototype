import PSON from 'pson/dist/PSON';

/**
 * @param {string[]} initialList
 * @constructor
 */
function PsonDictionary(initialList) {
  const words = new Set(initialList);
  let dictionary;

  this.addWord = (word) => {
    words.add(word);
  };

  this.hasWord = word => words.has(word);

  this.getDictionaryLength = () => words.size;

  this.commitDictionary = () => {
    if (dictionary) {
      throw new Error('Committing PsonDictionary twice is prohibited');
    }
    const sortedWords = [...(words)].sort();
    dictionary = new PSON.StaticPair(sortedWords);
  };

  this.getDictionary = () => dictionary;
}

export default PsonDictionary;
