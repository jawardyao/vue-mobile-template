import qs from 'qs';
import { ENV_CONFIG } from '@/env.config';
import { http } from './base/request';

export const login = (params) => {
  params = { ...params, ...ENV_CONFIG.client };
  return http.post(
    `/uaa/oauth/token?${qs.stringify(params)}`,
    {},
    { withToken: false },
  );
};

export const userLoginDetail = (params) =>
  http.post('/boss/user/login/detail', params);

export const logout = (params) => http.post('/uaa/logout', params);

export const wxAuth = (params) => http.post('/boss/user/auth', params);
