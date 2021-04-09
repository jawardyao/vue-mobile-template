export default {
  namespaced: true,

  state: () => ({
    // 用于记录第一次进入的页面url
    landingUrl: '',
    activeNames: [],
    loginUser: {},
  }),

  mutations: {
    setActiveNames(state, payload) {
      // 变更状态
      state.activeNames = payload;
    },
    setLandingUrl(state, payload) {
      state.landingUrl = payload;
    },
    setLoginUser(state, payload) {
      state.loginUser = payload;
    },
  },

  actions: {
    setActiveNames(context, payload) {
      context.commit('setActiveNames', payload.payload);
    },
    setLandingUrl(context, payload) {
      context.commit('setLandingUrl', payload.payload);
    },
    setLoginUser(context, payload) {
      context.commit('setLoginUser', payload.payload);
    },
  },
};
