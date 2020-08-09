/**
 * 适当缩小图片，并且瘦身
 */
export function narrowAndSlim(url) {
  return url + '?imageView2/0/w/300|imageslim'
}

/**
 * 仅瘦身
 */
export function slim(url) {
  return url + '?imageslim'
}
