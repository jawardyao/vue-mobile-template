import { http } from './base/request';

export const waterMeterListPage = (params) =>
  http.post('/boss/water/meter/list/page', params);

export const listpage = (params) =>
  http.post('/boss/water/meter/record/list/page', params);

export const del = (params) =>
  http.post('/boss/water/meter/record/delete', params);

export const detail = (params) =>
  http.post('/boss/water/meter/record/detail/list/page', params);

export const modify = (params) =>
  http.post('/boss/water/meter/record/detail/modify', params);

export const audit = (params) =>
  http.post('/boss/water/meter/record/audit', params);

export const deleteRecord = (params) =>
  http.post('/boss/water/meter/record/detail/delete', params);

export const addRecord = (params) =>
  http.post('/boss/water/meter/record/detail/add', params);
