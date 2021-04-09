import { http } from './base/request';

export const chukuList = (params) =>
  http.post('/wuye/kufang/chuku/page/list', params);

export const chukuDetail = (params) =>
  http.post('/wuye/kufang/chuku/detail', params);

export const deleteChuku = (params) =>
  http.post('/wuye/kufang/chuku/delete', params);

export const chargeback = (params) =>
  http.post('/wuye/kufang/chargeback', params);

export const materialList = (params) =>
  http.post('/wuye/consume/material/list/page', params);

export const assetList = (params) =>
  http.post('/wuye/assets/list/page', params);

export const getStaffList = (params) =>
  http.post('/boss/staff/list/page', params);

export const rukuList = (params) =>
  http.post('/wuye/kufang/ruku/page/list', params);

export const rukuDetail = (params) =>
  http.post('/wuye/kufang/ruku/detail', params);

export const deleteRuku = (params) =>
  http.post('/wuye/kufang/ruku/delete', params);

export const addRuku = (params) => http.post('/wuye/kufang/ruku/add', params);
export const editRuku = (params) => http.post('/wuye/kufang/ruku/edit', params);

export const addChuku = (params) => http.post('/wuye/kufang/chuku/add', params);
export const editChuku = (params) =>
  http.post('/wuye/kufang/chuku/edit', params);

export const getStoreyList = (params) =>
  http.post('/wuye/storey/query/cascade/list', params);

export const getDepartmentList = (params) =>
  http.post('/boss/department/list/page', params);

export const calcHcPrice = (params) =>
  http.post('/wuye/kufang/hao-cai/chu-ku/calculate/value', params);
