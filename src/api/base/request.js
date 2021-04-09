import axios from 'axios';
import { TokenHelper } from '@/utils/helper';
import { ENV_CONFIG } from '@/env.config';

const shouldReLogin = (code) => code * 1 === 50022 || code * 1 === 50017;

const isSuccessCode = (code) => code * 1 === 20000;

const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

var instance = axios.create({
  baseURL: ENV_CONFIG.api,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  function (config) {
    // Form表单数据
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    const token = TokenHelper.getToken();
    if (config.withToken && token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    const { data } = response;
    if (shouldReLogin(data.code)) {
      clearStorage();
      window.location.href = '/login';
      return Promise.reject(data.message);
    }

    if (isSuccessCode(data.code)) {
      return data; // 只需要data部分
    }

    return Promise.reject(data.message);
  },
  function (error) {
    return Promise.reject(error);
  },
);

/**
 * 是否重复请求
 */
const apiRequestMap = {};
const apiIsRepetitive = (api) => {
  const limittime = 1000; // 1s
  const reqdate = Date.now();
  const lastreqdate = apiRequestMap[api];
  apiRequestMap[api] = reqdate;
  return lastreqdate && reqdate - lastreqdate < limittime;
};

function post(url, req = {}, options = {}) {
  const defaultOptions = {
    withToken: true,
    onlyOneRequest: false,
  };
  options = { ...defaultOptions, ...options };

  // 限定时间内只允许请求一次
  if (options.onlyOneRequest && apiIsRepetitive(url)) {
    console.error('1s内不允许重复请求');
    return;
  }

  return instance.post(url, req, options);
}

export const http = {
  post,
};
