// pages/user/course/course.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    addHidden: true,
    courseid: null,
    cname: null,
    rname: null,
    id:null,
    startdate: "",
    starttime: "",
    enddate: "",
    endtime: "",
    datas: [],

  },
  listCourses: function () {
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/listCourses',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          datas: res.data
        })
      }
    })
  },
  modalConfirm: function (e) {
    this.modifySubmit()
    this.setData({
      modalHidden: true
    })
    console.log('confirm');
  },
  modalCancel: function (e) {
    this.setData({
      modalHidden: true,
      courseid: null,
      cname: null,
      rname: null,
      startdate: "",
      starttime: "",
      enddate: "",
      endtime: "",
    })
    console.log('cancel');
  },
  modalShow: function (e) {
    var menuItem = this.data.datas[parseInt(e.currentTarget.id)]
    console.log(menuItem)

    this.setData({
      listname: menuItem.courseid,
      modalHidden: false,
      id: e.currentTarget.id,
      cname: menuItem.cname,
      rname: menuItem.rname,
      startdate: menuItem.startDate,
      starttime: menuItem.startTime,
      enddate: menuItem.endDate,
      endtime: menuItem.endTime
    })
    console.log('show');
  },
  addConfirm: function (e) {
    this.addSubmit()
    this.setData({
      addHidden: true
    })
    console.log('confirm');
  },
  addCancel: function (e) {
    this.setData({
      addHidden: true,
      cname: null,
      rname: null,
      startdate: "",
      starttime: "",
      enddate: "",
      endtime: "",
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
    this.listCourses()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  getRname: function (e) {
    this.setData({
      rname: e.detail.value
    })
  },
  getCname: function (e) {
    this.setData({
      cname: e.detail.value
    })
  },
  getCourseId: function (e) {
    this.setData({
      courseid: e.detail.value
    })
  },
  searchCourse: function (e) {
    var that = this
    console.log(e.detail.value.search_content)
    if (e.detail.value.search_content) {
      wx.request({
        url: 'https://api.gentleleetommy.cn/getCourses',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data: {
          name: e.detail.value.search_content
        },
        success: function (res) {
          console.log(res.data)
          if (res.data.length != 0) {
            that.setData({
              datas: res.data
            })
          } else {
            wx.showToast({
              title: '无搜索结果',
              image: "/res/icon_warn.png",
              duration: 2000
            })
          }

        }
      })
    } else {
      this.listCourses()
    }
  },
  addSubmit: function () {
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/addCourse',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        courseid: that.data.courseid,
        cname: that.data.cname,
        rname: that.data.rname,
        startTime: that.data.startdate + " " + that.data.starttime,
        endTime: that.data.enddate + " " + that.data.endtime,
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx: wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000,
          })
          that.listCourses()
        } else {
          wx: wx.showToast({
            title: '该课程已存在',
            image: "/res/icon_warn.png",
            duration: 2000
          })
        }
      }
    })
    this.setData({
      courseid: "",
      cname: "",
      rname: "",
      startdate: "",
      starttime: "",
      endtime: "",
      enddate: ""
    })
  },
  modifySubmit: function (e) {
    var courseid = this.data.datas[this.data.id].courseid
    var that = this
    if (this.data.cname && this.data.rname && this.data.starttime && this.data.startdate && this.data.endtime && this.data.enddate) {
      wx.request({
        url: 'https://api.gentleleetommy.cn/modifyCourse',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data: {
          courseid: courseid,
          cname: that.data.cname,
          rname: that.data.rname,
          startTime: that.data.startdate + ' ' + that.data.starttime,
          endTime: that.data.enddate + ' ' + that.data.endtime,
        },
        success: function (res) {
          if (res.data.code == 200) {
            wx: wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
            })
          } else {
            wx: wx.showToast({
              title: '修改失败',
              image: "/res/icon_warn.png",
              duration: 2000
            })
          }
        }
      })
    } else {
      wx: wx.showToast({
        title: '不能为空',
        image: "/res/icon_warn.png",
        duration: 2000
      })
    }
    that.setData({
      courseid: null,
      cname: null,
      rname: null,
      startdate: "",
      starttime: "",
      enddate: "",
      endtime: "",
    })
    that.listCourses()
  },
  deleteCourse: function (e) {
    var courseid = this.data.datas[this.data.id].courseid
    var that = this
    console.log(that.data.id)
    wx.request({
      url: 'https://api.gentleleetommy.cn/deleteCourse',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        courseid: courseid,
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx: wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000,
          })
        } else {
          wx: wx.showToast({
            title: '删除失败',
            image: "/res/icon_warn.png",
            duration: 2000
          })
        }
      }
    })
    this.setData({
      modalHidden: true,
    })
    this.setData({
      courseid: null,
      cname: null,
      rname: null,
      id: null,
      startdate: "",
      starttime: "",
      enddate: "",
      endtime: "",
    })
    this.listCourses()
    console.log('delete');
  },
})