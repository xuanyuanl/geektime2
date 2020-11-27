// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'first-wxdb-uxfm6'

cloud.init()
const db = cloud.database({env})

// 云函数入口函数
exports.main = async (event, context) => {
//  const openId = cloud.getWXContext.openId

 let returnResult = await db.collection('punch').get()

 return returnResult

}