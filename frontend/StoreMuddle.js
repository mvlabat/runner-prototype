let storeMuddle = null;

/**
 * A hacky way to pass ClientMuddle to vuex store avoiding cycle imports.
 *
 * @param {ClientMuddle=} muddle
 * @return {ClientMuddle|null}
 * @constructor
 */
function StoreMuddle(muddle) {
  if (muddle) {
    storeMuddle = muddle;
  }
  return storeMuddle;
}

export default StoreMuddle;
