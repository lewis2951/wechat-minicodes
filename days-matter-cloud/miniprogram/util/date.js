const formatDay = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${[year, month, day].map(formatNumber).join('-')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const today = formatDay(new Date())

const calc = (record, showModel) => {
  if (record.type === 'red-letter') {
    calcRedLetter(record, showModel)
  } else if (record.type === 'birth') {
    calcBirth(record, showModel);
  } else {
    calcExam(record);
  }
  return record;
}

const calcRedLetter = (record, showModel) => {
  if (record.date > today) {
    record.days = days(today, record.date)
    record.descView = record.desc + ' 将于'
    record.dateView = record.date
    return
  }
  if (showModel === 0) {
    record.days = days(today, record.date)
    record.descView = record.desc + ' 已经'
    record.dateView = record.date
  } else {
    const tmp = nextDay(record.date);
    record.days = days(today, tmp[1])
    record.descView = record.desc + ' ' + tmp[0] + '周年 将于'
    record.dateView = tmp[1]
  }
}

const calcBirth = (record, showModel) => {
  if (record.date > today) {
    record.days = days(today, record.date)
    record.descView = record.desc + ' 将于'
    record.dateView = record.date
    return
  }
  if (showModel === 0) {
    record.days = days(today, record.date)
    record.descView = record.desc + ' 已经'
    record.dateView = record.date
  } else {
    const tmp = nextDay(record.date);
    record.days = days(today, tmp[1])
    record.descView = record.desc + ' ' + tmp[0] + '岁 将于'
    record.dateView = tmp[1]
  }
}

const calcExam = record => {
  record.days = days(today, record.date)
  let msg = (record.days > 0) ? ' 剩余' : ' 已过'
  record.descView = record.desc + msg
  record.dateView = record.date
}

const days = (dateStart, dateEnd) => {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);

  return parseInt((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

const nextDay = date => {
  let tmp = new Date(date);
  const srcYear = tmp.getFullYear()
  const todayTmp = new Date(today);

  if (tmp.getTime() < todayTmp.getTime()) {
    tmp.setFullYear(todayTmp.getFullYear());
    if (tmp.getTime() < todayTmp.getTime()) {
      tmp.setFullYear(todayTmp.getFullYear() + 1)
    }
  }
  return [tmp.getFullYear() - srcYear, formatDay(tmp)]
}

module.exports = {
  formatDay,
  calc
}