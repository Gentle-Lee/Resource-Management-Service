const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hiddenView: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
  },
  onShow: function () {
    let user = app.globalData.userData
    console.log("userjiemian")
    console.log(user)
    if (user != null) {
      if (user[0].authname == 'admin') {
        this.setData({
          hiddenView: false,
          authorized: 'authorized',
          auth: '管理员'
        })
      } else {
        console.log(user[0].authname)
        this.setData({
          hiddenView: true,
          auth: '已认证',
          authorized: 'authorized'
        })
      }
    }
    else {
      this.setData({
        auth: '未认证',
        authorized: 'unauthorized'
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  JumpToAuthorization: function () {
    console.log('-------------click');
    wx.navigateTo({
      url: "authentication/authentication",
    })
  },
  JumpToApplication: function () {
    wx.navigateTo({
      url: "application/application",
    })
  },
  JumpToManagement: function () {
    wx.navigateTo({
      url: "management/management",
    })
  },
  JumpToCourse: function () {
    wx.navigateTo({
      url: "course/course",
    })
  },
  showInfo:function(){
    wx:wx.showModal({
      title: '使用须知',
      content: '希望大家爱护公共场地，保持场地干净整洁',
      cancelText: '再看看',
      confirmText: '知道了',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  showAuthor:function(){
    wx:wx.showToast({
      title: 'Gentle_Lee',
      image: '/res/icon_author.png',
      duration: 2000,
    })
  }
})