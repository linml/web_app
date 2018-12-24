
export function str2fromttime (s) {
  if (!s) return ''
  return s.substring(0, 4) + '/' + s.substring(4, 6) + '/' + s.substring(6, 8) + ' ' + s.substring(8, 10) + ':' + s.substring(10, 12) + ':' + s.substring(12, 14)
}
