const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-')
  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const days = (dateStart, dateEnd) => {
  const start = new Date(formatTime(dateStart));
  const end = new Date(dateEnd);

  return parseInt((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

module.exports = {
  formatTime: formatTime,
  days: days
}
