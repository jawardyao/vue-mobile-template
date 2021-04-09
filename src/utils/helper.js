import { ENV_CONFIG } from '@/env.config';
import { __TOKEN_INFO__ } from '@/utils/sessionKeys';

const TokenHelper = {
  setTokenInfo: (data = {}) => {
    data.login_time = data.login_time || +Date.now();
    data.host = window.location.host;
    data.api = ENV_CONFIG.api;
    localStorage.setItem(__TOKEN_INFO__, JSON.stringify(data));
  },
  removeTokenInfo: () => localStorage.removeItem(__TOKEN_INFO__),
  getTokenInfo: () => {
    let tokenInfo = localStorage.getItem(__TOKEN_INFO__);
    if (tokenInfo) {
      tokenInfo = JSON.parse(tokenInfo);
      const { login_time: loginTime, host, api } = tokenInfo;
      let { expires_in: expiresIn } = tokenInfo;
      // 域名不同，清除token
      if (host !== window.location.host) {
        TokenHelper.removeTokenInfo();
        return {};
      }
      // 请求服务api不同，清除token
      if (api !== ENV_CONFIG.api) {
        TokenHelper.removeTokenInfo();
        return {};
      }
      // 是否过期
      expiresIn *= 1000; // expires_in 是以 秒 为单位的
      const nowTime = +new Date();
      // 登录时间加上有效期 小于等于 当前时间 ，则为token已失效
      if (loginTime + expiresIn <= nowTime) {
        TokenHelper.removeTokenInfo();
        return {};
      }

      return tokenInfo;
    }
    return {};
  },
  getToken: () => TokenHelper.getTokenInfo().access_token,
  getUserId: () => TokenHelper.getTokenInfo().userId,
};

const SelectHelper = {
  /**
   * 渲染下拉项的数据展示
   */
  find: (value, options, extend = {}) => {
    if (!options || options.length <= 0) {
      return value;
    }

    const defaultExtend = {
      valueName: 'value',
      labelName: 'label',
      valueIfNone: '--',
    };
    extend = { ...defaultExtend, ...extend };

    const findValue = options.find(
      (item) => String(item[extend.valueName]) === String(value),
    );
    if (findValue) {
      return findValue[extend.labelName];
    }
    return value || extend.valueIfNone;
  },
};

const NumberHelper = {
  /**
   * 两位精度
   */
  maxTwoPrecision: (num) =>
    num && num.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3'),
  /**
   * 一位精度
   */
  maxOnePrecision: (num) =>
    num && num.replace(/^(-)*(\d+)\.(\d).*$/, '$1$2.$3'),
  /**
   * 仅允许正整数
   */
  intOnly: (num) => num && num.replace(/^(-)*(\d+)\.(\d).*$/, '$2'),
};

export { TokenHelper, SelectHelper, NumberHelper };
