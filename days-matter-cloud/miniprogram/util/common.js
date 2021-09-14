const date = require('date.js')
const types = [
  ['red-letter', '纪念日', '111'],
  ['birth', '生日', '222'],
  ['exam', '考试', '333']
]

const groupBy = records => {
  let redLetters = []
  let births = []
  let exams = []
  records.forEach(record => {
    if (record.type === 'red-letter') {
      redLetters.push(record)
    } else if (record.type === 'birth') {
      births.push(record)
    } else {
      exams.push(record)
    }
  })

  return [redLetters, births, exams]
}

const showModel = (records, showModel) => {
  let redLetters = []
  let births = []
  let exams = []
  records.forEach(record => {
    record = date.calc(record, showModel)
    if (record.type === 'red-letter') {
      redLetters.push(record)
    } else if (record.type === 'birth') {
      births.push(record)
    } else {
      exams.push(record)
    }
  })

  return [redLetters, births, exams]
}

module.exports = {
  types,
  groupBy,
  showModel
}