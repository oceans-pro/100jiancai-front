import http from '@/utils/axios-http-util'


/**
 * @param {number} type 来源 0代表后台，1代表前台
 * @param {number} device 设备是手机还是电脑 0代表电脑，1代表手机
 * @param {string} refer 来路，记录是从百度还是搜狗还是直接打地址
 */
export function logVisitor(type, device, refer) {
  return http.get('/visitor', {type, device, refer})
}
