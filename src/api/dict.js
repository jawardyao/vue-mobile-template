import { http } from './base/request';

export const listV2 = (req) => http.post('/boss/dict/v2/list', req);
