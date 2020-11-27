// miniprogram/pages/profile/profile.js
Page({

 /**
  * 页面的初始数据
  */
 data: {
  canIUse: wx.canIUse('button.open-type.getUserInfo'),
  logged:false,

  statusBarColor:'#ffffff',
  navBarColor:'#ffffff',
  titleColor:'#000000',

  avatarUrl:'',
  userName:'',
  userInfo:{},


  profile:[
    {
      imgUrl:'../../images/dingyue.png',
      title:'已订阅',
      description:'',
    },
    {
      imgUrl:'../../images/liquan.png',
      title:'礼券',
      description:'',
    },
    {
      imgUrl:'../../images/fenxiang.png',
      title:'分享有赏',
      description:'',
    },
    {
      imgUrl:'../../images/yaoqin.png',
      title:'邀请好友',
      description:'得30元',
    },
  ],

  profile2:[
    {
      imgUrl:'../../images/pintuan.png',
      title:'我的拼团',
      description:'',
    },
    {
      imgUrl:'../../images/liuyan.png',
      title:'我的留言',
      description:'',
    },
    {
      imgUrl:'../../images/huati.png',
      title:'我的话题评论',
      description:'',
    },
    {
      imgUrl:'../../images/shoucan.png',
      title:'我的收藏',
      description:'',
    },
  ]

 },

 

 /**
  * 生命周期函数--监听页面加载
  */

 bindGetUserInfo (e) {
  // console.log(e.detail.userInfo)
  let self = this
 
  wx.checkSession({
    success: () => { //登录成功了，把login的view结构替换掉
      // console.log(123);
      self.toGetSetting()
    },
    fail: () => { //第一次登录
      // console.log('456');
      self.toDisplay()
      
    }
  })



},

toGetSetting() {
  let self = this
  wx.getSetting({
    success:result => {
      if(result) {
        wx.getUserInfo({
          success: function(res) {
            // console.log(res);
            let userInfo = res.userInfo
            let nickName = userInfo.nickName
            let avatarUrl = userInfo.avatarUrl
            let gender = userInfo.gender //性别 0：未知、1：男、2：女
            let province = userInfo.province
            let city = userInfo.city
            let country = userInfo.country
            self.userInfo = userInfo
            wx.setStorage({
              key: 'avatarUrl',
              data: avatarUrl,                
            });
            wx.setStorage({
              key: 'gender',
              data: gender,                
            });
            wx.setStorage({
              key: 'userName',
              data: nickName,                
            });
            self.setData({
              avatarUrl:avatarUrl,
              userName:nickName
            })
            self.toLogin()
          }
        })
      }
      // console.log(result);
    }
  });
},

toLogin() {
  let self = this
  
  wx.login({  //登录
    
    success(res) { //登录成功，用code换取session_key和openid，
      if(res.code) {
        let code = res.code
        let appid = "wxd8c20ec0963d2af1"
        let secret = "515e52e6cc5c7d2bb4b599a34843b01b" //这个密码很重要，需要保护，不能放这里，咋办
        wx.request({ //通过这个接口
          url:'https://api.weixin.qq.com/sns/jscode2session?appid='+ appid +'&secret='+ secret +'&js_code=' + code + '&grant_type=authorization_code',
          data:{},
          success(res2) {
            // console.log(res2);
            if(res2.errMsg == 'request:ok' ) {
              let userInfo = res2.data
              console.log(userInfo);
              wx.setStorage({
                key: 'session_key',
                data: userInfo.session_key,                
              });
              wx.setStorage({
                key: 'openId',
                data: userInfo.openid,                
              });
              wx.setStorage({
                key: 'logged',
                data: 'true',                
              });
              self.setData({
                logged:true
              })
            }
            
          self.toGetStorage().then((res) => {
            // console.log(res);
            wx.cloud.callFunction({
              name:'pushUser',
              data:{
                openId:res.openId.data,
                session_key:res.session_key.data,
                nickName:res.nickName.data,
                avatarUrl:res.avatarUrl.data,
                gender:res.gender.data
              },
              success(res) {
                console.log(res);
              },
              fail(res) {
                console.log(res);
              }
            })


          })
        }
      })
    }else {
      console.log('登录失败' + res.errMsg);
    }
  }
})
},

toGetStorage() {
  let myStorage = new Promise((resolve,reject) => {
    let userInfo = {
      openId: "",
      session_key: "",
      nickName: "",
      avatarUrl: "",
      gender: 0,
    }

    wx.getStorage({
      key:'openId',
      success: res => {
        userInfo.openId = res
      }
    })
    wx.getStorage({
      key:'session_key',
      success: res => {
        userInfo.session_key = res
      }
    })
    wx.getStorage({
      key:'userName',
      success: res => {
        userInfo.nickName = res
      }
    })
    wx.getStorage({
      key:'avatarUrl',
      success: res => {
        userInfo.avatarUrl = res
      }
    })
    wx.getStorage({
      key:'gender',
      success: res => {
        userInfo.gender = res
      }
    })
    console.log(123);
    setTimeout(()=> {
      resolve(userInfo)
    },500)
  })
 
  return myStorage
    
},




 onLoad: function (options) {
  
  this.toDisplay()

 },
 toDisplay() {
  wx.getStorage({
    key:'logged',
    success:(res) => {
      this.setData({
        logged: res.data
      })
    }
  })
  wx.getStorage({
    key:'avatarUrl',
    success:(res) => {
      this.setData({
        avatarUrl: res.data
      })
      // console.log(res);
    }
  })
    
  wx.getStorage({
    key:'userName',
    success:(res) => {
      this.setData({
        userName: res.data
      })
      // console.log(res);
    }
  })
 },

//  toDo(item) {
//    let one = item.currentTarget.dataset.index

//   console.log(one);
//  },
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