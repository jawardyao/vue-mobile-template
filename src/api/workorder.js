import { http } from './base/request';

export const detail = (params) => {
  return http.post('boss/repair/detail', params);
};

export const completion = (params) => {
  return http.post('/boss/repair/completion', params);
};

export const repairListPage = (params) => {
  return http.post('/boss/repair/mobile/list/page', params);
};

export const repairAdd = (req) =>
  http.post('/boss/repair/add', req, { onlyOneRequest: true });

export const repairDispatcher = (req) =>
  http.post('/boss/repair/dispatcher', req);
