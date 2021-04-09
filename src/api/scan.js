import { http } from './base/request';

export const scanParse = (params) => http.post('/boss/qr/code/parse', params);
