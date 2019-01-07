
export function str2fromttime (s) {
  if (!s) return ''
  return s.substring(0, 4) + '/' + s.substring(4, 6) + '/' + s.substring(6, 8) + ' ' + s.substring(8, 10) + ':' + s.substring(10, 12) + ':' + s.substring(12, 14)
}

export function getBeforeDate (n) {
  var date = new Date()
  var year, month, day
  date.setDate(date.getDate() - n)
  year = date.getFullYear()
  month = date.getMonth() + 1
  day = date.getDate()
  var s = year + '/' + (month < 10 ? ('0' + month) : month) + '/' + (day < 10 ? ('0' + day) : day)
  console.log(s)
  return new Date(s)
}

export function getEndDate (n) {
  var date = new Date()
  var year, month, day
  date.setDate(date.getDate() + n)
  year = date.getFullYear()
  month = date.getMonth() + 1
  day = date.getDate()
  var s = year + '/' + (month < 10 ? ('0' + month) : month) + '/' + (day < 10 ? ('0' + day) : day)
  console.log(s)
  return new Date(s)
}
