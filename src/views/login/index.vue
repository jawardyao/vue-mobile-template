<template>
  <div class="app-contaier">
    <div class="login-bg"></div>
    <div class="login-wrap">
      <img class="login-title" :src="LOGIN_TITLE" />
      <div class="login-form">
        <van-form @submit="onSubmit">
          <van-field
            :border="true"
            v-model="username"
            name="username"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <template #left-icon>
              <img
                class="left-icon"
                src="/images/login-username.png"
              /> </template
          ></van-field>
          <van-field
            :border="true"
            v-model="password"
            type="password"
            name="password"
            placeholder="请输入密码"
            :rules="[{ required: true, message: '请输入密码' }]"
            ><template #left-icon>
              <img
                class="left-icon"
                src="/images/login-password.png"
              /> </template
          ></van-field>
          <div class="find-pwd" @click="toFindPwd">找回/忘记密码</div>
          <van-button block type="info" native-type="submit">登录</van-button>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { login } from '@/api/login';

import { LOGIN_TITLE } from '@/utils/constant';
import { TokenHelper } from '@/utils/helper';
export default {
  data() {
    return {
      LOGIN_TITLE,
      username: '',
      password: '',
    };
  },
  methods: {
    toFindPwd() {
      this.$router.push({ path: '/findpwd' });
    },
    onSubmit(values) {
      const {
        query: { redirect },
      } = this.$route;
      login(values)
        .then((data) => {
          TokenHelper.setTokenInfo(data);
          window.location.replace(decodeURIComponent(redirect));
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>

<style lang="less" scoped>
.login-bg {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url('https://modoo-oss-bucket.oss-cn-shanghai.aliyuncs.com/modoo/rc-upload-1600758063788-6_bg-wuye-mobile-login.png')
    no-repeat #fff;
  background-size: cover;
  background-position: 50%;
}

.login-wrap {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  padding: 100px 50px 0;
  .login-title {
    width: 100%;
  }
  .login-form {
    margin-top: 80px;
    .left-icon {
      width: 16px;
      height: 16px;
    }
    .find-pwd {
      text-align: right;
      color: #fff;
      font-size: 13px;
      padding-bottom: 26px;
    }
  }
}
</style>

<style lang="less">
.login-form {
  .van-cell {
    background-color: rgba(0, 24, 90, 0.33);
    border: 1px solid #f2f3f4;
    margin-bottom: 16px;
    border-radius: 5px;

    .van-field__control {
      color: #fff;
      &::placeholder {
        color: #fff;
      }
    }
    .van-field__left-icon {
      margin-right: 15px;
    }
  }
  .van-button {
    border-radius: 5px;
  }
}
</style>
