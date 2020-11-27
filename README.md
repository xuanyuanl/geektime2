# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

//  getUserInfo() {
  // wx.navigateTo({  
  //   url:'../login/login',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
  //   success:function(){
  //     console.log('789');
      // wx.openSetting({
      //   success:(res) => {
      //     console.log(res);
      //     res.authSetting = {
      //       "scope.userInfo": true,
      //       "scope.userLocation":true
      //     }
      //   },
      //   fail: (e) => {
      //     console.log(e);
      //   }
      // })
    // },        //成功后的回调；
    // fail:()=> {
    //   console.log('111');
    // }
  // })

//  },





  // let self = this
 
  // wx.getSetting({
  //   success:res => {
  //     if(res) {
  //       wx.getUserInfo({
  //         success: function(res) {
  //           var userInfo = res.userInfo
  //           var nickName = userInfo.nickName
  //           var avatarUrl = userInfo.avatarUrl
  //           var gender = userInfo.gender //性别 0：未知、1：男、2：女
  //           var province = userInfo.province
  //           var city = userInfo.city
  //           var country = userInfo.country
  //           self.userInfo = userInfo
  //           wx.setStorage({
  //             key: 'avatarUrl',
  //             data: avatarUrl,                
  //           });
  //           wx.setStorage({
  //             key: 'userName',
  //             data: nickName,                
  //           });
  //           self.setData({
  //             avatarUrl:avatarUrl,
  //             userName:nickName
  //           })
  //         }
  //       })
  //     }
  //     console.log(res);
  //   }
  // });

  //  wx.checkSession({
  //   success: () => { //登录成功了，把login的view结构替换掉
  //     console.log(123);
  //   },
  //   fail: () => { //第一次登录
  //     console.log('456');
  //     // this.onLogin()
      
  //   }
  // })

  //  wx.login({  //登录
    
  //   success(res) { //登录成功，用code换取session_key和openid，
  //     if(res.code) {
  //       let code = res.code
  //       let appid = "wxd8c20ec0963d2af1"
  //       let secret = "515e52e6cc5c7d2bb4b599a34843b01b" //这个密码很重要，需要保护，不能放这里，咋办
  //       wx.request({ //通过这个接口
  //         url:'https://api.weixin.qq.com/sns/jscode2session?appid='+ appid +'&secret='+ secret +'&js_code=' + code + '&grant_type=authorization_code',
  //         data:{},
  //         success(res2) {
  //           console.log(res2);
  //           if(res2.errMsg == 'request:ok' ) {
  //             let userInfo = res2.data
  //             console.log(userInfo);
  //             wx.setStorage({
  //               key: 'session_key',
  //               data: userInfo.session_key,                
  //             });
  //             wx.setStorage({
  //               key: 'openId',
  //               data: userInfo.openid,                
  //             });
  //             wx.setStorage({
  //               key: 'logged',
  //               data: 'true',                
  //             });
  //             self.setData({
  //               logged:true
  //             })
  //           }
  //         }
  //       })
  //     }else {
  //       console.log('登录失败' + res.errMsg);
  //     }
  //   }
  // })

  
  // wx.getStorage({
  //   key:'logged',
  //   success:(res) => {
  //     this.setData({
  //       logged: res.data
  //     })
  //     // console.log(res);
  //   }
  // })
  // wx.getStorage({
  //   key:'avatarUrl',
  //   success:(res) => {
  //     this.setData({
  //       avatarUrl: res.data
  //     })
  //     // console.log(res);
  //   }
  // })
    
  // wx.getStorage({
  //   key:'userName',
  //   success:(res) => {
  //     this.setData({
  //       userName: res.data
  //     })
  //     // console.log(res);
  //   }
  // })
  //#########################################################

  // function onLogin() {
  //   wx.login({
  //     success: function(res) {
  //       if (res.code) {
  //         wx.request({
  //           url:'',
  //           data: {
  //             code: res.code
  //           },
  //           success: (res) => {
  //             const self = this
  //             if('luoji cengg ' ) {
  //               let json = JSON.parse(res.data.Data)
  //               wx.setStorage({
  //                 key: 'third_Session',
  //                 data: json.third_Session,
  //                 success: (result)=>{                 
  //                 },
  //                 fail: ()=>{},
  //                 complete: ()=>{}
  //               });
  //               getUserInfo()
  //             }
  //             else {
  //               //
  //             }
  //           },
  //           fail: function (res) {
  //             //
  //           }
  //         })
  //       } else {
  //         console.log('获取用户登录态失败！',res.errMsg);
  //       }
  //     }
  //   })
  // }

  // function getUserInfo() {
  //   wx.getUserInfo({
  //     success: function (res) {
  //       var userInfo = res.userInfo
  //       userInfoInSQL(userInfo)
  //     },
  //     fail: function() {
  //       userAccess()
  //     }
  //   })
  // }

  // function userInfoInSQL(userIno) {
  //   wx.getStorage({
  //     key:'third_Session',
  //     success: function (res) {
  //       wx.request({
  //         url: '',
  //         data: {
  //           third_Session: res.data,
  //           nickName: userIno.nickName,
  //           avatarUrl: userIno.avatarUrl,
  //           gender: userIno.gender,
  //           province: userIno.province,
  //           city: userIno.city,
  //           country: userIno.country,
  //           openId: userIno.openId,
  //         },
  //         success:function(res) {

  //         }
  //       })
  //     }
  //   })
  // }
