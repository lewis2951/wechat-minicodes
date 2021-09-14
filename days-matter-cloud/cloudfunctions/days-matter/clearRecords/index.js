const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 删除数据库集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取基础信息
    const wxContext = cloud.getWXContext()

    await db.collection('days-matter').where({
      createdBy: wxContext.OPENID,
      type: event.dtype
    }).remove()
    return {
      success: true
    }
  } catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}