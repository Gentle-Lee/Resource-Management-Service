//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    this.getUserData()
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUserData:function(){
    let _this = this
    // let mphone = wx.getStorageSync('phone') || ''
    let mphone = '13510568133'
    console.log("dianhuahaoma:" + mphone)
    if (mphone == "") {
      wx.showToast({
        title: '请前往认证',
        image: "/res/icon_warn.png",
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://api.gentleleetommy.cn/getUser',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data: {
          phone: mphone
        },
        success: function (res) {
          _this.globalData.userData = res.data.user
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    userData: null,
  }
})