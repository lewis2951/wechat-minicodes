const findUser = require('./user/findUser')
const getOpenId = require('./getOpenId/index')
const addRecord = require('./addRecord/index')
const findRecords = require('./findRecords/index')
const removeRecord = require('./removeRecord/index')
const clearRecords = require('./clearRecords/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'findUser':
      return await findUser.main(event, context)
    case 'getOpenId':
      return await getOpenId.main(event, context)
    case 'addRecord':
      return await addRecord.main(event, context)
    case 'findRecords':
      return await findRecords.main(event, context)
    case 'removeRecord':
      return await removeRecord.main(event, context)
    case 'clearRecords':
      return await clearRecords.main(event, context)
  }
}