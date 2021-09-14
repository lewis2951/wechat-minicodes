const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 获取基础信息
    const wxContext = cloud.getWXContext()

    const doc = await db.collection('days-matter').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        type: event.data.type,
        desc: event.data.desc,
        date: event.data.date,
        createdBy: wxContext.OPENID,
        createdAt: Date.now()
      }
    })
    return {
      doc,
      success: true
    }
  } catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}