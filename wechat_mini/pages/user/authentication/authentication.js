const app = getApp()
// const team = []
// const index = 0
Page({
  data: {
    items: [
      { name: 'male', value: '男' },
      { name: 'femail', value: '女' }
    ],
    team:[],
    index:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this;
    wx.request({
      url: 'https://api.gentleleetommy.cn/listTeam', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var team = [];
        for(var i = 0 ; i < res.data.length; i++){
          team.push(res.data[i].tname)
        }
        that.setData({
          index:0,
          array: team
        })    
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(e);
    if (e.detail.value.name.length == 0 || e.detail.value.phone.length == 0 || e.detail.value.gender.length == 0 || e.detail.value.email.length == 0 || e.detail.value.team.length == 0 || e.detail.value.code.length == 0) {
      wx.showToast({
        title: '请填写全部内容!',
        image:"/res/icon_warn.png",
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.request({
        url: 'http://127.0.0.1/miniApp/form.php',
        data: { wechatname:e.detail.value.wechatname,name: e.detail.value.name, phone: e.detail.value.phone, gender: e.detail.value.gender, email: e.detail.value.email, team: e.detail.value.team, code: e.detail.value.code },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        success: function (res) {
          console.log(res);
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          // success
        },
        fail: function (res) {
          console.log(res);
          // fail
        }
      })
    }
  }
})