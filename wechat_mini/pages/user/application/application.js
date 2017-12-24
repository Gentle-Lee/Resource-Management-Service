// pages/user/application/application.js\
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    placeData:[],
    resData: []
  },
  selected: function (e) {
    this.setData({
      selected1: false,
      selected: true
    })
  },
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.listUserRoomApplications()
    this.listUserGoodsApplications()
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
  
  },
  listUserRoomApplications:function(){
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/listUserRoomApplications',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
       userphone:app.globalData.userData[0].phone
      },
      success: function (res) {
        that.setData({
          placeData: res.data
        })
      }
    })
  },
  searchUserRoomApplication:function(e){
    var that = this
    if (e.detail.value.search_content == ''){
      this.listUserRoomApplications()
      return;
    }
    wx.request({
      url: 'https://api.gentleleetommy.cn/getUserRoomApplication',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        userphone: app.globalData.userData[0].phone,
        startTime: e.detail.value.search_content
      },
      success: function (res) {
        if(res.data.length != 0){
          that.setData({
            placeData: res.data
          })
        }else{
          wx:wx.showToast({
            title: '无搜索结果',
            image: "/res/icon_warn.png",
            duration: 2000,
          })
        }
        
      }
    })
  },
  deleteUserRoomApplication:function(e){
    var menuItem = this.data.placeData[parseInt(e.currentTarget.id)]
    console.log(menuItem.startTime)
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/deleteUserRoomApplication',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        userphone: app.globalData.userData[0].phone,
        startTime: menuItem.startTime
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx: wx.showToast({
            title: '撤销成功',
            icon: 'success',
            duration: 2000,
          })
          that.listUserRoomApplications()
        } else {
          wx: wx.showToast({
            title: '撤销失败',
            image: "/res/icon_warn.png",
            duration: 2000,
          })
        }
      }
    })
  },
  listUserGoodsApplications: function () {
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/listUserGoodsApplications',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        userphone: app.globalData.userData[0].phone
      },
      success: function (res) {
        that.setData({
          resData: res.data
        })
      }
    })
  },
  searchUserGoodsApplication: function (e) {
    var that = this
    if (e.detail.value.search_content == '') {
      this.listUserRoomApplications()
      return;
    }
    wx.request({
      url: 'https://api.gentleleetommy.cn/getUserGoodsApplication',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        userphone: app.globalData.userData[0].phone,
        startTime: e.detail.value.search_content
      },
      success: function (res) {
        if (res.data.length !=0) {
          that.setData({
            resData: res.data
          })
        } else {
          wx: wx.showToast({
            title: '无搜索结果',
            image: "/res/icon_warn.png",
            duration: 2000,
          })
        }
      }
    })
  },
  deleteUserGoodsApplication: function (e) {
    var menuItem = this.data.resData[parseInt(e.currentTarget.id)]
    console.log(menuItem.startTime)
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/deleteUserGoodsApplication',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        userphone: app.globalData.userData[0].phone,
        id: menuItem.id,
        status: menuItem.status
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx: wx.showToast({
            title: '撤销成功',
            icon: 'success',
            duration: 2000,
          })
          that.listUserRoomApplications()
        } else if (res.data.code == 202){
          wx: wx.showToast({
            title: '尚未归还',
            image: "/res/icon_warn.png",
            duration: 2000,
          })
        } 
        else {
          wx: wx.showToast({
            title: '撤销失败',
            image: "/res/icon_warn.png",
            duration: 2000,
          })
        }
      }
    })
  },
})