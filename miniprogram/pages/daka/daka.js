// miniprogram/pages/daka/daka.js
Page({

 /**
  * 页面的初始数据
  */
 data: {
  statusBarColor:'#ffffff',
  navBarColor:'#ffffff',
  titleColor:'#000',
  title:'',
  titleToast:'如：每天随手拍一张 / 每周学习新技术 / 30天健康减脂',
  isOpen:true,
  switch:true,
  switchContent: '打卡可能被精选展示在列表中，所有人可参与',
  one:true,
  two:false,
  three:false,
  titleMax:30,
  titleNumber:0,
  max:1000,
  content:'',
  ss:'&#13',
  currentWordNumber:0,
  logged:false,
  openId:'',
  userName: '',
 },

 title(title) {

  let value = title.detail.value;
  let len = parseInt(value.length);
  this.setData({
    titleNumber: len,
    title: value
  });
 },
 open() {
  this.setData({
    isOpen:true
  })
 },
 private() {
  this.setData({
    isOpen:false
  })
 },
 switch (event) {
  if(event.detail.value) {
    this.setData({
      switchContent: '打卡可能被精选展示在列表中，所有人可参与',
      switch:true
    })
  }else{
    this.setData({
      switchContent: '打卡不会被精选展示在列表中，但你可以邀请好友小范围参与',
      switch:false
    })
  }
  },
  select(e) {
    let a = e.target.dataset.index
    if(a=='one') {
      this.setData({
        one:true,
        two:false,
        three:false,
        content: "打卡30天，每日读书半小时 \n\n 这个世界太大，拿起书才知道自己的渺小，也只有拿起书，才不怕真理的无穷，进一寸得一寸的欢喜。\n\n 读书是一件需要互相“取暖”的事情，我们聚在一起，每天读书打卡，还能看看别人都在读什么书，给自己一些指导和参考，以此来激励持续阅读，所以在这里：让我们一起见证阅读为你带来的改变。\n\n 打卡规范：\n\n 1、Day1，阅读了《原则》，我的收获XXXX；\n 2、Day2，继续阅读《原则》，我的收获XXXX；\n\n 时间：XX年XX月XX日 00:00-XX年XX月XX日24:00"
      })
    }else if(a=='two') {
      this.setData({
        one:false,
        two:true,
        three:false,
        content: "打卡60天，掌握《趣谈网络协议》 \n\n 网络协议，程序员必备技能之一，大厂面试常考科目。\n\n 但是其知识点琐碎繁杂，内容枯燥，很难真正掌握，直到看到刘超老师的《趣谈网络协议》，全程以故事为蓝本，通过比喻的方式轻松理解网络协议内容，从点到线，再到面，系统理解网络协议之间的关系，而不是死记硬背。 \n\n 邀你参与打卡，彻底掌握网络协议，打卡模版： \n\n 打卡规范：\n\n 1、Day1，阅读了《原则》，我的收获XXXX；\n 2、Day2，继续阅读《原则》，我的收获XXXX；\n\n 时间：XX年XX月XX日 00:00-XX年XX月XX日24:00"
      })
    }else if(a=='three') {
      this.setData({
        one:false,
        two:false,
        three:true,
        content: "今天你运动了吗？ \n\n 俗话说，生命在于运动。运动的好处谁都知道，但是却始终不愿意迈开自己的双腿。 \n\n 邀你参与运动打卡，从今天开始，每天运动，见证自己的变化。你会慢慢发现，你减重了、有了腹肌，也更自律了。 \n\n 打卡规范：\n\n 1、Day1，三组俯卧撑；\n 2、Day2，慢跑半小时； \n\n 时间：XX年XX月XX日 00:00-XX年XX月XX日24:00"
      })
    }
  },
  


  input: function (e) {
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > this.data.max) return;

    this.setData({
      currentWordNumber: len
    });
    // if(this.data.currentWordNumber == 1000){
    //   wx.showModal({
    //     title: '提示',
    //     content: '您输入的次数已达上限',
    //   })
    // }
  },
  commit(e) {
    let self = this
    if(!this.data.title) {
      wx.showToast({
        title: '打卡名称/简介不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if(!self.data.logged) {
      wx.showToast({
        title: '未登录，请先登录',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.checkSession({
      success: (result)=>{
        console.log(result);
      },
      fail: (err)=>{//失败跳转到登录界面，提示点击头像进行登录 
        wx.showToast({
          title: '当前未登录，请先登录',
          icon: 'none',
          duration: 2000
        })    
        wx.switchTab({
          url: 'page/profile/profile'
        })
        console.log(err);
        return
      },
    });

    
    
    wx.cloud.callFunction({
      name:'clock',
      data: {
        title: self.data.title,
        isOpen: self.data.isOpen,
        switch: self.data.switch,
        content: self.data.content,
        openId: self.data.openId,
        userName: self.data.userName,
        watchTimes: 0,
        joinTimes: 0,
      },
      success(res) {
        // console.log(res);
        wx.showModal({
          title: '发起成功',
          content: '',
          showCancel: false,
          cancelColor: '#000000',
          confirmText: '确定',
          confirmColor: '#3CC51F',
          success: (result) => {
            if(result.confirm){
              wx.navigateBack({
                delta: 1
              })
            }
          },
          fail: ()=>{},
          complete: ()=>{}
        })
      },
      fail(res) {
        console.log(res);
      }
    })
  },
 /**
  * 生命周期函数--监听页面加载
  */
 onLoad: function (options) {

  let self = this
  wx.getStorage({
    key: 'logged',
    success: (res) => {
      self.setData({
        logged: res
      })
    }
  });
  wx.getStorage({
    key:'openId',
    success: (res) => {
      self.setData({
        openId: res.data
      })
    }
  });
  wx.getStorage({
    key:'userName',
    success: (res) => {
      self.setData({
        userName: res
      })
    }
  })

  
  self.setData({
    content: "打卡30天，每日读书半小时 \n\n 这个世界太大，拿起书才知道自己的渺小，也只有拿起书，才不怕真理的无穷，进一寸得一寸的欢喜。\n\n 读书是一件需要互相“取暖”的事情，我们聚在一起，每天读书打卡，还能看看别人都在读什么书，给自己一些指导和参考，以此来激励持续阅读，所以在这里：让我们一起见证阅读为你带来的改变。\n\n 打卡规范：\n\n 1、Day1，阅读了《原则》，我的收获XXXX；\n 2、Day2，继续阅读《原则》，我的收获XXXX；\n\n 时间：XX年XX月XX日 00:00-XX年XX月XX日24:00"
  })
 
 },

 StringArray(arr) {
  arr = arr.join('').split(',')
  return arr
 },

 /**
  * 生命周期函数--监听页面初次渲染完成
  */
 onReady: function () {
  let len = parseInt(this.data.content.length);
  this.setData({
    currentWordNumber: len
  });
 },

 /**
  * 生命周期函数--监听页面显示
  */
 onShow: function () {
  console.log(this.userName);
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