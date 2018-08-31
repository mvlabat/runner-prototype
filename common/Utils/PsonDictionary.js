import PSON from 'pson/dist/PSON';
import { log } from './Debug';

const initialList = [
  'constructorName',
];

/**
 * @constructor
 */
const PsonDictionary = (() => {
  const words = new Set(initialList);
  let dictionary;

  return {
    addWord: (word) => {
      words.add(word);
    },

    commitDictionary: () => {
      if (dictionary) {
        throw new Error('Committing PsonDictionary twice is prohibited');
      }
      const sortedWords = [...(words)].sort();
      dictionary = new PSON.StaticPair(sortedWords);
      log(`Committed ${sortedWords.length} words to PsonDictionary`);
    },

    getDictionary: () => dictionary,
  };
})();

export default PsonDictionary;
