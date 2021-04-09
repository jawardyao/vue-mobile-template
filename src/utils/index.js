const ua = navigator.userAgent.toLocaleLowerCase();

/** 是否是微信环境 */
export const isWx = ua.indexOf('micromessenger') != -1;

/** 是否是安卓 */
export const isAndroid = ua.match(/android/i) === 'android';

/** 是否是ios */
export const isIOS = ua.match(/iPhone/i) === 'iphone';
