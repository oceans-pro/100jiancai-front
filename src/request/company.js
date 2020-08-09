/**
 * @see src\main\java\oceans\controller\open\GetController.java
 */
import http from '@/utils/axios-http-util'

export function getAllSwiper() {
  return http.get('/info/carousel')
}

export function getIntroduction() {
  return http.get('/info/introduction')
}

export function getContact() {
  return http.get('/info/contact')
}

export function getHistory() {
  return http.get('/info/company_history')
}

export function getAdvantage() {
  return http.get('/info/advantage')
}

export function getHire() {
  return http.get('/hire/active')
}

export function getHireConfig() {
  return http.get('/hire/config')
}

export function getNews(num, size) {
  return http.get('/news', {num, size})
}

export function getProduct(typeId) {
  return http.get('/product/type', {type: typeId})
}

/**
 * 向服务器发送一条留言
 * @param {Object}data
 * @param {String}data.title
 * @param {String}data.content
 */
export function postMessage(data) {
  return http.post('/message', data)
}


