<template>
  <div>
    <van-nav-bar
      fixed
      title="找回/忘记密码"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="app-container">
      <van-form>
        <van-field
          v-model="username"
          name="username"
          label="登录账号"
          placeholder="请输入手机号"
          @blur="handleSearch"
        >
          <template #button>
            <van-button size="mini" type="info" plain @click="handleSearch">
              查询
            </van-button>
          </template></van-field
        >
        <van-field v-model="phone" label="手机号" name="phone" disabled />
        <van-field
          v-model="verifyCode"
          label="验证码"
          name="verifyCode"
          placeholder="请输入验证码"
        >
          <template #button>
            <van-button
              size="small"
              type="info"
              round
              :disabled="time > 0"
              @click="sendCode"
            >
              <template v-if="time">
                <van-count-down
                  :time="time"
                  format="ss"
                  style="display: inline-block; color: #fff"
                  @finish="handleCountdownFinish"
                />S后重新获取
              </template>
              <template v-else>发送验证码</template>
            </van-button>
          </template>
        </van-field>
        <van-field
          v-model="password"
          label="新密码"
          type="password"
          name="password"
          placeholder="请输入新密码"
        />
        <van-field
          v-model="confirmPassword"
          label="确认新密码"
          type="password"
          name="confirmPassword"
          placeholder="请再次输入新密码"
        />
      </van-form>
      <div class="find-btn">
        <van-button type="info" block @click="handleSubmit">确认</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapState } from 'vuex';
import { detail, findPwd, sendVerifyCode } from '@/api/user';
export default {
  data() {
    return {
      username: '',
      phone: '',
      verifyCode: '',
      password: '',
      confirmPassword: '',
      time: 0,
    };
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
    onClickRight() {},
    // 倒计时结束
    handleCountdownFinish() {
      this.time = 0;
    },
    handleSearch() {
      this.getUserDetail(this.username);
    },
    getUserDetail(username) {
      detail({ username })
        .then((res) => {
          const { data } = res;
          const phone = data.mobile;
          this.phone = phone;
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    sendCode() {
      if (!this.phone) {
        return;
      }
      sendVerifyCode({ mobile: this.phone, businessNo: 5 })
        .then(() => {
          this.time = 60 * 1000;
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
    handleSubmit() {
      const values = {
        username: this.username,
        phone: this.phone,
        verifyCode: this.verifyCode,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      if (!values.username) {
        Toast.fail('请输入登录账号');
        return;
      }
      if (!values.phone) {
        Toast.fail('请输入手机号');
        return;
      }
      if (!values.verifyCode) {
        Toast.fail('请输入验证码');
        return;
      }
      if (!values.password) {
        Toast.fail('请输入新密码');
        return;
      }
      if (!values.confirmPassword) {
        Toast.fail('请输入确认密码');
        return;
      }
      if (values.password !== values.confirmPassword) {
        Toast.fail('两次密码不一致');
        return;
      }

      findPwd({
        mobile: values.phone,
        userName: values.username,
        verificationCode: values.verifyCode,
        password: values.password,
        rePassword: values.confirmPassword,
      })
        .then(() => {
          Toast.success('修改成功');
          this.$router.back();
        })
        .catch((err) => {
          Toast.fail(err);
        });
    },
  },
  mounted() {
    const { loginUser } = this;
    if (loginUser.username) {
      this.username = loginUser.username;
      this.getUserDetail(loginUser.username);
    }
  },
};
</script>

<style lang="less" scoped>
.app-container {
  padding: 15px;
  margin-top: 46px;
}

.find-btn {
  padding: 80px 40px;
  .van-button {
    border-radius: 5px;
  }
}
</style>
