// components/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {			// 设置标题
      type: String,
      value: ''
    },
    statusBarColor: {
      type: String,
      value: '#fff'
    },
    navBarColor: {
      type: String,
      value: "#fff"
    },
    titleColor: {
      type: String,
      value: "#000"
    },
    isGoBack: {
      type:Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  observers: {
    'statusBarColor,navBarColor,titleColor'(sc, nc, tc) {  // canvasUrl: 父组件传递过来的值

      let ns = `background-color:${nc};height:${wx.db.navBarHeight}px; color:${tc}`
      let ss = `background-color:${sc};height:${wx.db.statusBarHeight}px;`
      let topHeight = wx.db.statusBarHeight + wx.db.navBarHeight

      this.setData({
        navBarStyle: ns,
        statusBarStyle: ss,
        topHeight
      })
      wx.setNavigationBarColor({ //设置头部电池时间的字体颜色
        frontColor: '#000000',
        backgroundColor: this.data.navBarColor
      })

    },

  },


  data: {
  

  navBarStyle: "",
  statusBarStyle: "",
  topHeight: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      wx.navigateBack({
        delta: 1
      })  
    }
  }
})
