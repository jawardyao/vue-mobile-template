<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('global');

import { userLoginDetail } from '@/api/login';
import { TokenHelper } from '@/utils/helper';
import { __WX_HAS_AUTHED__ } from '@/utils/sessionKeys';
import { isWx } from './utils';
export default {
  data() {
    return {
      wxCode: this.$route.query.code,
    };
  },
  computed: {
    ...mapState({
      loginUser: (state) => state.loginUser,
    }),
  },
  methods: {
    ...mapActions(['setLoginUser']),
    getLoginUser() {
      const userId = TokenHelper.getUserId();
      const hasAuthedFlag = localStorage.getItem(__WX_HAS_AUTHED__);
      if (userId && !hasAuthedFlag) {
        userLoginDetail({
          userId,
          redirectUri: encodeURIComponent(location.origin + '/'),
        }).then((res) => {
          const { data } = res;
          this.setLoginUser({ payload: data });
          // this.$store.dispatch({
          //   type: 'global/setLoginUser',
          //   payload: data,
          // });
          if (isWx && data.authUrl) {
            localStorage.setItem(__WX_HAS_AUTHED__, 1);
            window.location.replace(data.authUrl);
          }
        });
      }
    },
  },
  mounted() {
    window.wx = wx;
    this.getLoginUser();
  },
};
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
