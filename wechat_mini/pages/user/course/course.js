// pages/user/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden:true,
    addHidden:true,
    placeData: [
      {
        courseid:"234325",
        name: "104",
        starttime: "2017-12-7",
        endtime: "2017-12-7",
        status: "进行中",
      },
      {
        courseid: "234325",
        name: "104",
        starttime: "2017-12-7",
        endtime: "2017-12-7",
        status: "进行中",
      },
      {
        courseid: "234325",
        name: "104",
        starttime: "2017-12-7",
        endtime: "2017-12-7",
        status: "进行中",
      },

    ],
    
  },
  modalConfirm: function (e) {
    this.setData({
      modalHidden: true
    })
    console.log('confirm');
  },
  modalCancel: function (e) {
    this.setData({
      modalHidden: true
    })
    console.log('cancel');
  },
  modalShow: function (e) {
    this.setData({
      modalHidden: false
    })
    console.log('show');
  },
  addConfirm: function (e) {
    this.setData({
      addHidden: true
    })
    console.log('confirm');
  },
  addCancel: function (e) {
    this.setData({
      addHidden: true
    })
    console.log('cancel');
  },
  addShow: function (e) {
    this.setData({
      addHidden: false
    })
    console.log('show');
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

  },
  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      starttime: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endtime: e.detail.value
    })
  }
})