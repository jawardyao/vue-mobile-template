<template>
  <div>
    <van-nav-bar fixed title="个人中心" left-arrow @click-left="onClickLeft" />
    <div class="app-container">
      <van-cell-group title="基本信息">
        <van-cell title="姓名" :value="loginUser.realName" />
        <van-cell title="联系方式" :value="loginUser.mobile" />
        <van-cell title="绑定微信昵称" :value="loginUser.wxNickName" />
      </van-cell-group>
      <van-cell-group title="部门信息">
        <van-cell title="部门" :value="loginUser.departmentName" />
        <van-cell title="职务" :value="loginUser.jobName" />
      </van-cell-group>
    </div>
    <div class="mt10">
      <van-button block @click="handleToModifyPwd">修改密码</van-button>
    </div>
    <div class="mt10">
      <van-button block @click="handleLogout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { logout } from '@/api/login';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      loginUser: (state) => state.global.loginUser,
    }),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    handleToModifyPwd() {
      this.$router.push('/findpwd');
    },
    clearStorage() {
      localStorage.clear();
      sessionStorage.clear();
    },
    handleLogout() {
      logout().then(() => {
        this.clearStorage();
        window.location.replace('/');
      });
    },
  },
};
</script>

<style lang="less" scoped>
.app-container {
  margin-top: 46px;
}
.mt10 {
  margin-top: 10px;
}
</style>
