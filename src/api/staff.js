import { http } from './base/request';

export const wyStaffList = (req) => http.post('/boss/staff/wygl/list', req);
