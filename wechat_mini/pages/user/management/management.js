// pages/user/application/application.js\
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    placeData: [],
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
    this.listRoomApplications()
    this.listGoodsApplications()
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
  listRoomApplications: function () {
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/listRoomApplications',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        userphone: app.globalData.userData[0].phone
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          placeData: res.data
        })
      }
    })
  },
  searchRoomApplication: function (e) {
    var that = this
    if (e.detail.value.search_content == '') {
      this.listRoomApplications()
      return;
    }
    wx.request({
      url: 'https://api.gentleleetommy.cn/getRoomApplication',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        startTime: e.detail.value.search_content
      },
      success: function (res) {
        if (res.data.length != 0) {
          that.setData({
            placeData: res.data
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
  deleteRoomApplication: function (e) {
    var menuItem = this.data.placeData[parseInt(e.currentTarget.id)]
    console.log(menuItem.startTime)
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/deleteRoomApplication',
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
          that.listRoomApplications()
        } else {
          wx: wx.showToast({
            title: '撤销失败',
            icon: 'success',
            duration: 2000,
          })
        }
      }
    })
  },
  listGoodsApplications: function () {
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/listGoodsApplications',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          resData: res.data
        })
      }
    })
  },
  searchGoodsApplication: function (e) {
    var that = this
    if (e.detail.value.search_content == '') {
      this.listRoomApplications()
      return;
    }
    wx.request({
      url: 'https://api.gentleleetommy.cn/getGoodsApplication',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        startTime: e.detail.value.search_content
      },
      success: function (res) {
        if (res.data.length != 0) {
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
  deleteGoodsApplication: function (e) {
    var menuItem = this.data.placeData[parseInt(e.currentTarget.id)]
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
        startTime: menuItem.startTime
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx: wx.showToast({
            title: '撤销成功',
            icon: 'success',
            duration: 2000,
          })
          that.listRoomApplications()
        } else {
          wx: wx.showToast({
            title: '撤销失败',
            icon: 'success',
            duration: 2000,
          })
        }
      }
    })
  },
  takeGoods: function (e) {
    var menuItem = this.data.resData[parseInt(e.currentTarget.id)]
    console.log(menuItem.startTime)
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/takeGoods',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        userphone: menuItem.phone,
        id: menuItem.id,
        status: menuItem.status
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx: wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000,
          })
          that.listGoodsApplications()
        } else if (res.data.code == 202) {
          wx: wx.showToast({
            title: '无事发生',
            image: "/res/icon_warn.png",
            duration: 2000,
          })
        }
        else {
          wx: wx.showToast({
            title: '修改失败',
            image: "/res/icon_warn.png",
            duration: 2000,
          })
        }
      }
    })
  },
  returnGoods: function (e) {
    var menuItem = this.data.resData[parseInt(e.currentTarget.id)]
    console.log(menuItem.startTime)
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/returnGoods',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        userphone: menuItem.phone,
        id: menuItem.id,
        status: menuItem.status
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx: wx.showToast({
            title: '归还成功',
            icon: 'success',
            duration: 2000,
          })
          that.listGoodsApplications()
        } else if (res.data.code == 202) {
          wx: wx.showToast({
            title: '无事发生',
            image: "/res/icon_warn.png",
            duration: 2000,
          })
        }
        else {
          wx: wx.showToast({
            title: '归还失败',
            image: "/res/icon_warn.png",
            duration: 2000,
          })
        }
        that.listGoodsApplications()
      }
    })
  },
})