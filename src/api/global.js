import { http } from './base/request';

export const uploadFile = (params) => {
  return http.post('/comm/file/v1/upload', params);
};
