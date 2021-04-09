import { isWx } from '.';
import { wxconfig } from '../api/wxconfig';

// 当前环境
const buildEnv = process.env.VUE_APP_BUILD_ENV || 'dev';
const isProd = buildEnv === 'prod';

var wxConfig = {
  //配置
  config: function (options) {
    var self = this;
    const {
      config = {},
      success,
      // fail
    } = options;
    self.configObj = config;

    // 微信环境下
    if (isWx) {
      getConfigData();
    }

    //发送请求，获取公众号的唯一标识、公众号的唯一标识、生成签名的随机串、签名
    function getConfigData() {
      wxconfig({
        businessNo: '03',
        url: encodeURIComponent(self.configObj.url),
      }).then((res) => {
        const { code, data } = res;
        if (code == 20000) {
          window.wx.config({
            debug: !isProd, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: self.configObj.jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          window.wx.ready(function () {
            success && success();
          });
          // window.wx.error(function (res) {
          //   // fail && fail(res);
          //   console.log('catch config error :: =============== ::', res);
          // });
        }
      });
    }
  },
};

export default wxConfig;
