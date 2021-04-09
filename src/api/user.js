import { http } from './base/request';

export const detail = (params) =>
  http.post('/boss/user/detail', params, { withToken: false });

export const sendVerifyCode = (params) =>
  http.post('/comm/verify/code/v1/send', params, { withToken: false });

export const findPwd = (params) =>
  http.post('/boss/user/findPassword', params, { withToken: false });
