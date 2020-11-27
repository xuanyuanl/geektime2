// miniprogram/pages/break/break.js
Page({

 /**
  * 页面的初始数据
  */
 data: {
  statusBarColor:'#ff903e',
  navBarColor:'#ff903e',
  titleColor:'#ffffff',
  isShow:false,
  animation:'',
  isSelected:true,
  boxBottomNum:2,
  office:true,
  punch:[],
  selectingPunch:[],
 },


 onPageScroll:function(e){
   const that = this
   wx.createSelectorQuery().select('.nav-select').boundingClientRect((rect)=>{
    if(rect.top - e.scrollTop <= 20){
      that.setData({
        statusBarColor:'#ffffff',
        navBarColor:'#ffffff',
        titleColor:'#000000',
        isShow:true
      })
    }else{
      that.setData({
        statusBarColor:'#ff903e',
        navBarColor:'#ff903e',
        titleColor:'#ffffff',
        isShow:false
      })
    }
   }).exec()
 },

 selectChange1(){
  let animation = wx.createAnimation({
    duration:500,
    timingFunction:'ease',
  })
  this.animation=animation
  animation.translateX(148).step();
  this.setData({
    animation:animation.export(),
    isSelected:true,
    office:false
  });
  this.toGetSelectingPunch()
 },

 selectChange2(){
  let animation = wx.createAnimation({
    duration:500,
    timingFunction:'ease',
  })
  this.animation=animation
  animation.translateX(0).step();
  this.setData({
    animation:animation.export(),
    isSelected:false,
    office:true
  })
 },

 runOnce(func) {
  let runOnce = true
  return function(params) {
    if (runOnce) {
      func.apply(this.params)
      runOnce = false
    }
  }
 },
 toGetSelectingPunch() {
   if (this.data.selectingPunch.length > 0) {
     return
   }else{
    //  云函数拿相应的数据
    const self = this
    wx.cloud.callFunction({
      name:'getSelectingPunch',
      data:{
        type:'elaborate',
      },
      success(res) {
        self.setData({
          selectingPunch:res.result.data
         })
        console.log(res);
      },
      fail(res) {
        console.log(res);
      }
    })    
   }
 },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {
  const self = this
  wx.cloud.callFunction({
    name:'getPunch',
    data:{
      type:'official',
    },
    success(res) {
      // console.log(res);
      self.setData({
        punch:res.result.data
      })
      // console.log(self.data.punch);
    },
    fail(res) {
      console.log(res);
    }
  })
 },

 punch() {
   wx.navigateTo({
     url: "../daka/daka",
     fail: ()=>{console.log('错误');},
     complete: ()=>{}
   });
 },
 /**
  * 生命周期函数--监听页面初次渲染完成
  */
 onReady: function () {

 },


 /**
  * 生命周期函数--监听页面显示
  */
 onShow: function () {
   
 },

 /**
  * 生命周期函数--监听页面隐藏
  */
 onHide: function () {

 },

 /**
  * 生命周期函数--监听页面卸载
  */
 onUnload: function () {

 },

 /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
 onPullDownRefresh: function () {

 },

 /**
  * 页面上拉触底事件的处理函数
  */
 onReachBottom: function () {

 },

 /**
  * 用户点击右上角分享
  */
 onShareAppMessage: function () {

 }
})