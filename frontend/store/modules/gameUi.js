export default {
  namespaced: true,

  mutations: {
    activatePlayerMode: (state) => {
      state.playerMode = true;
      state.builderMode = false;
    },

    activateBuilderMode: (state) => {
      state.playerMode = false;
      state.builderMode = true;
    },
  },

  state: {
    playerMode: true,
    builderMode: false,
  },
};
