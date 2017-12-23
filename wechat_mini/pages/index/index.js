//index.js
const app = getApp()
Page({
  data: {
    imgurl: '../../res/icon_place_default.png',
    datas: [

    ],
    modalHidden: true,
    addHidden: true,
    applyHidden: true,
    modalText: "",
    hiddenView: true,
    id: 0,
    capacity: null,
    space: null,
    description: null,
    addrname: null,
    addcapacity: null,
    addspace: null,
    adddescription: null,
  },

  //view加载
  onLoad: function () {
    console.log('onLoad')
    this.listRooms()

  },
  onShow: function () {
    var that = this
    let user = app.globalData.userData
    if (user) {
      if (user[0].authname == 'admin') {
        this.setData({
          hiddenView: false
        })
      }
    }
    this.listRooms()
  },
  searchRoom: function (e) {
    var that = this
    console.log(e.detail.value.search_content)
    if (e.detail.value.search_content) {
      wx.request({
        url: 'https://api.gentleleetommy.cn/getRooms',
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
      this.getRooms()
    }

  },
  //事件响应
  listRooms: function () {
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/listRooms',
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

  didSelectCell: function (prama) {
    var menuItem = this.data.datas[parseInt(prama.currentTarget.id)]
    console.log(prama.currentTarget.id);

    this.setData({
      modalHidden: false,
      modalText: "点击了第" + prama.currentTarget.id + "位 姓名：" + menuItem.name
    })
  },
  modalConfirm: function (e) {
    var menuItem = this.data.datas[parseInt(e.currentTarget.id)]

    this.modifySubmit()

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
    var menuItem = this.data.datas[parseInt(e.currentTarget.id)]
    console.log(e.currentTarget.id);
    this.setData({
      modalHidden: false,
      listname: menuItem.rname,
      id: e.currentTarget.id,
      capacity: menuItem.capacity,
      space: menuItem.space,
      description: menuItem.description
    })
    console.log('show');
  },
  modifySubmit: function (e) {
    var rname = this.data.datas[this.data.id].rname
    console.log(rname.name)
    var that = this
    if (this.data.capacity && this.data.space && this.data.description) {
      wx.request({
        url: 'https://api.gentleleetommy.cn/modifyRoom',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data: {
          rname: rname,
          capacity: that.data.capacity,
          space: that.data.space,
          description: that.data.description
        },
        success: function (res) {
          if (res.data.code == 200) {
            wx: wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,
            })
            that.setData({
              capacity: null,
              space: null,
              description: null
            })
            that.getRooms()
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

  },
  deleteRoom: function (e) {
    var rname = this.data.datas[this.data.id].rname
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/deleteRoom',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        rname: rname,
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx: wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000,
          })
          that.setData({
            capacity: null,
            space: null,
            description: null
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
    this.listRooms()
    console.log('delete');
  },
  addConfirm: function (e) {
    this.addSubmit();
    this.setData({
      addHidden: true
    })
    console.log('confirm');
  },
  addSubmit: function () {
    var that = this
    console.log(that.data.addrname)
    console.log(that.data.addcapacity)
    wx.request({
      url: 'https://api.gentleleetommy.cn/addRoom',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        rname: that.data.addrname,
        capacity: that.data.addcapacity,
        space: that.data.addspace,
        description: that.data.adddescription,
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx: wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000,
          })
          that.setData({
            addrname: null,
            addcapacity: null,
            addspace: null,
            adddescription: null
          })
          that.getRooms()
        } else {
          wx: wx.showToast({
            title: '该场地已存在',
            image: "/res/icon_warn.png",
            duration: 2000
          })
        }
      }
    })
  },
  addCancel: function (e) {
    this.setData({
      addHidden: true,
      addrname: null,
      addcapacity: null,
      addspace: null,
      adddescription: null
    })
    console.log('cancel');
  },
  addShow: function (e) {
    this.setData({
      addHidden: false
    })
    console.log('show');
  },
  applyConfirm: function (e) {
    this.setData({
      applyHidden: true
    })

    console.log('confirm');
  },
  applyCancel: function (e) {
    this.setData({
      applyHidden: true
    })
    console.log('cancel');
  },
  applyShow: function (e) {
    this.setData({
      applyHidden: false
    })
    console.log('show');
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
  },
  JumpToPlaceApplication: function () {
    wx.navigateTo({
      url: "placeapplication/placeapplication",
    })
  },
  getCapacity: function (e) {
    this.setData({
      capacity: e.detail.value
    })
  },
  getSpace: function (e) {
    this.setData({
      space: e.detail.value
    })
  },
  getDescription: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  getAddRname: function (e) {
    this.setData({
      addrname: e.detail.value
    })
    console.log(e.detail.value)

  },
  getAddCapacity: function (e) {
    this.setData({
      addcapacity: e.detail.value
    })
  },
  getAddSpace: function (e) {
    this.setData({
      addspace: e.detail.value
    })
  },
  getAddDescription: function (e) {
    this.setData({
      adddescription: e.detail.value
    })
  },

})