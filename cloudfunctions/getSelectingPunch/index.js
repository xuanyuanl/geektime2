// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'first-wxdb-uxfm6'

cloud.init()
const db = cloud.database({env})
// 云函数入口函数
exports.main = async (event, context) => {
//  const wxContext = cloud.getWXContext()

 let returnResult = await db.collection('card').where({
  isOpen: true,
  switch: true
 }).get()

 return returnResult
}