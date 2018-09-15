const playersById = new Map();

/**
 * @constructor
 */
const ActivePlayersRegistry = {
  /**
   * @param {PlayerModel} player
   */
  registerPlayer: (player) => {
    playersById.set(player.clientId, player);
  },

  /**
   * @return {IterableIterator<PlayerModel>}
   */
  getAllPlayers: () => playersById.values(),

  /**
   * @param {number} id
   * @return {PlayerModel|undefined}
   */
  getPlayerById: id => playersById.get(id),

  /**
   * @param id
   * @return {boolean}
   */
  hasPlayerWithId: id => !!playersById.get(id),

  /**
   * @param id
   */
  removePlayerWithId: (id) => {
    playersById.delete(id);
  },
};

export default ActivePlayersRegistry;
