// components/punch/punch.js
Component({
 /**
  * 组件的属性列表
  */
 properties: {
  punchName: {
    type:String,
    value:'',
  },
  ptc: {
    type:String,
    value:'',
  },
  ptt: {
    type:String,
    value:'',
  },
  userImg: {
    type:String,
    value:'',
  },
  userComment: {
    type:String,
    value:'',
  }
 },

 /**
  * 组件的初始数据
  */
 data: {
  boxBottomNum:2,
  punchName:'',
  ptc:'',
  ptt:'',
  userImg:'',
  userComment:'',
 },

 /**
  * 组件的方法列表
  */
 methods: {

 }
})
