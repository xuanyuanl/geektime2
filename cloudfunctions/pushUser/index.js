// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'first-wxdb-uxfm6'

cloud.init()
const db = cloud.database({env})

// 云函数入口函数
exports.main = async (event, context) => {

//  const wxContext = cloud.getWXContext()
//  const openId = cloud.getWXContext.openId
console.log(event);
 let returnResult = await db.collection('user').add({
   data: {
     openId: event.openId,
     session_key: event.session_key,
     nickName: event.nickName,
     avatarUrl: event.avatarUrl,
     gender: event.gender
   }
 }) 
console.log(returnResult);
 return {
  returnResult
 }
}