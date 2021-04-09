import Vue from 'vue';
import Vuex from 'vuex';

import global from './modules/global';
import test from './modules/test';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { test, global },
});
