import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './libs/rem';
import './plugins/vant';
import './components/index';

import '@vant/touch-emulator';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
