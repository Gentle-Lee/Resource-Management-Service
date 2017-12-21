// pages/user/application/application.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false,
    placeData:[
      {
        name:"104",
        starttime:"2017-12-7",
        endtime:"2017-12-7",
        status:"进行中",
        usage:"用于婕拉看风景阿萨德积分王府井"
      },
      {
        name: "104",
        starttime: "2017-12-7",
        endtime: "2017-12-7",
        status: "进行中",
        usage: "用于婕拉看风景阿萨德积分王府井"
      },
      {
        name: "104",
        starttime: "2017-12-7",
        endtime: "2017-12-7",
        status: "进行中",
        usage: "用于婕拉看风景阿萨德积分王府井"
      },
      
    ],
    resData: [
      {
        name: "104",
        starttime: "2017-12-7",
        endtime: "2017-12-7",
        status: "进行中",
        usage: "用于婕拉看风景阿萨德积分王府井",
        num:5
      },
      {
        name: "104",
        starttime: "2017-12-7",
        endtime: "2017-12-7",
        status: "进行中",
        usage: "用于风景阿萨德积分王府井",
        num: 5
      },
      {
        name: "104",
        starttime: "2017-12-7",
        endtime: "2017-12-7",
        status: "进行中",
        usage: "用于婕拉看风景分王府井",
        num: 7
      },

    ]
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