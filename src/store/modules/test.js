export default {
  namespaced: true,

  state: () => ({
    count: 1,
  }),

  mutations: {
    increment(state) {
      // 变更状态
      state.count++;
    },
  },

  actions: {
    increment({ commit }) {
      commit('increment');
    },
  },
};
