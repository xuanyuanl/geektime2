// 云函数入口文件
const cloud = require('wx-server-sdk')
const env = 'first-wxdb-uxfm6'

cloud.init()
const db = cloud.database({env})

// 云函数入口函数
exports.main = async (event, context) => {
 const wxContext = cloud.getWXContext()
 
 let result = await db.collection("card").add({
   data: {
    title: event.title,
    isOpen: event.isOpen,
    switch: event.switch,
    content: event.content,
    openId: event.openId,
    watchTimes: event.watchTimes,
    joinTimes: event.joinTimes,
    userName: event.userName
   }
 })
 return result

}