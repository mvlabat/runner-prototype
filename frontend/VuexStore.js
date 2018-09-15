import store from './store';

/**
 * For interacting with VuexStore from the game part it's better to use and extend UiManager
 * (or something else, which is not present at the moment) in order to abstract away from front-end
 * frameworks.
 *
 * @constructor
 */
function VuexStore() {
  return store;
}

export default VuexStore;
