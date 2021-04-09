import { http } from './base/request';

export const wxconfig = (req) => http.post('/comm/wx/js/signature', req);
