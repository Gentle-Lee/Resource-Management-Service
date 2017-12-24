var app = getApp()
Page({
  data: {
    rname:null,
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    wlist: []
  },
  onLoad: function (option) {
    console.log('onLoad')
    console.log(option.rname)
    this.setData({
      rname:option.rname
    })
  },
  onShow:function(){
    this.getSchedule()
  },
  bindStartDateChange: function (e) {
    this.setData({
      startdate: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      starttime: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endtime: e.detail.value
    })
  },
  applySubmit:function(e){
    var that = this
    var user = app.globalData.userData[0]
    if(e.detail.value.startdate && e.detail.value.starttime && e.detail.value.endtime && e.detail.value.usage){
      wx.request({
        url: 'https://api.gentleleetommy.cn/applyRoom',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data: {
          startTime: e.detail.value.startdate + ' ' + e.detail.value.starttime,
          endTime: e.detail.value.startdate + ' ' + e.detail.value.endtime,
          rname:that.data.rname,
          userphone:user.phone,
          description:e.detail.value.usage
        },
        success: function (res) {
          if (res.data.code == 200) {
            wx: wx.showToast({
              title: '申请成功',
              icon: 'success',
              duration: 2000,
            })
          } else if (res.data.code == 204){
            wx: wx.showToast({
              title: '时间段已被申请',
              image: "/res/icon_warn.png",
              duration: 2000
            })
          } else {
            wx: wx.showToast({
              title: '申请失败',
              image: "/res/icon_warn.png",
              duration: 2000
            })
          }
        }
      })
    }else{
      wx: wx.showToast({
        title: '不能为空',
        image: "/res/icon_warn.png",
        duration: 2000
      })
      this.getSchedule()
    }
    
  },
  getSchedule:function(){
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/getSchedule',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        rname:that.data.rname
      },
      success: function (res) {
        if (res.data.code == 200) {
          var result =  res.data.result
          that.setData({
            wlist:result
          })
        } else {
          wx: wx.showToast({
            title: '未知错误',
            image: "/res/icon_warn.png",
            duration: 2000
          })
        }
      }
    })
  }
  
})
