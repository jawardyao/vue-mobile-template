<template>
  <div>
    <van-nav-bar title="摩都物业管理系统" @click-right="handleToUser">
      <template #right>
        <van-icon name="contact" size="22" />
      </template>
    </van-nav-bar>
    <div class="app-container">
      <van-collapse v-model="activeMenus" @change="setActiveNames">
        <van-collapse-item title="能耗管理" name="1">
          <van-cell-group :border="false">
            <van-cell title="水费管理" to="/energy/water" />
            <van-cell title="电费管理" to="/energy/electric" />
          </van-cell-group>
        </van-collapse-item>
        <van-collapse-item title="工单管理" name="2">
          <van-cell-group :border="false">
            <van-cell title="工单管理" to="/workorder" />
          </van-cell-group>
        </van-collapse-item>
        <!-- <van-collapse-item title="租赁管理" name="3">
          <van-cell-group :border="false">
            <van-cell title="客户管理" to="" />
            <van-cell title="合同管理" to="" />
          </van-cell-group>
        </van-collapse-item> -->
        <van-collapse-item title="资产管理" name="4">
          <van-cell-group :border="false">
            <van-cell title="入库管理" to="/asset/ruku" />
            <van-cell title="出库管理" to="/asset/chuku" />
          </van-cell-group>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// import wxConfig from '@/utils/wxConfig';
import { wxAuth } from '@/api/login';
import { TokenHelper } from '@/utils/helper';
import { __WX_HAS_AUTHED__ } from '@/utils/sessionKeys';
export default {
  data() {
    return {
      activeMenus: [],
      wxCode: this.$route.query.code,
    };
  },
  computed: {
    ...mapState({
      count: (state) => state.user.count,
      activeNames: (state) => state.global.activeNames,
    }),
  },
  methods: {
    setActiveNames(names) {
      this.$store.dispatch({
        type: 'global/setActiveNames',
        payload: names,
      });
    },
    handleToUser() {
      this.$router.push({
        path: '/user',
      });
    },
  },
  mounted() {
    this.activeMenus = this.activeNames;
    const userId = TokenHelper.getUserId();
    if (userId && this.wxCode) {
      wxAuth({ userId, code: this.wxCode }).then(() => {
        localStorage.removeItem(__WX_HAS_AUTHED__);
        // 此处的跳转是为了将地址栏中的code刷掉
        window.location.replace('/');
      });
    }
  },
  // created() {
  //   let url = '';
  //   // 判断是否是ios微信浏览器
  //   if (window.__wxjs_is_wkwebview === true) {
  //     url = this.$store.state.global.landingUrl.split('#')[0];
  //   } else {
  //     url = window.location.href.split('#')[0];
  //   }
  //   wxConfig.config({
  //     config: {
  //       url,
  //       jsApiList: ['checkJsApi', 'scanQRCode'],
  //     },
  //   });
  // },
};
</script>

<style lang="less" scoped>
.app-container {
  padding: 15px 0;
}
</style>
