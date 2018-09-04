import ActivePlayersRegistry from 'common/Registries/ActivePlayersRegistry';

export default {
  namespaced: true,

  state: {
    allPlayers: [],
  },

  getters: {
    count(state) {
      return state.allPlayers.length;
    },
  },

  mutations: {
    addPlayer(state, player) {
      state.allPlayers.push(player);
    },

    removePlayerWithId(state, playerId) {
      const player = ActivePlayersRegistry.getPlayerById(playerId);
      const playerIndex = state.allPlayers.indexOf(player);
      state.allPlayers.splice(playerIndex, 1);
    },
  },
};
