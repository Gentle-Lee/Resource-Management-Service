//index.js
const app = getApp()
Page({
  data: {
    imgurl: '../../res/icon_resource_default.png',
    datas: [],
    id: null,
    adminModalHidden: true,
    addHidden: true,
    applyHidden: true,
    hiddenView: true,
    totalnum: null,
    stock: null,
    description: null,
    addtotalnum: null,
    addstock: null,
    adddescription: null,
    starttime: "",
    startdate: "",
    enddate: "",
    endtime: "",
    inputnum: null,
    inputusage: null,
  },
  applySubmit: function (e) {
    let user = app.globalData.userData;
    if(!user){
      wx: wx.showToast({
        title: '请前往认证',
        image: "/res/icon_warn.png",
        duration: 2000
      })
      this.setData({
        applyHidden:true
      })
      return;
    }
    var menuItem = this.data.datas[this.data.id]
    console.log(menuItem)
    var that = this
    if (this.data.inputnum && this.data.starttime && this.data.startdate && this.data.endtime && this.data.enddate && this.data.inputusage) {
      var timestamp1 = Date.parse(new Date(this.data.startdate + ' ' + this.data.starttime));
      var timestamp2 = Date.parse(new Date(this.data.enddate + ' ' + this.data.endtime));
      var timestamp3 = new Date();
      console.log(timestamp1)
      console.log(timestamp2)
      var that = this
      if (this.data.inputnum > menuItem.stock) {
        wx: wx.showToast({
          title: '库存不足',
          image: "/res/icon_warn.png",
          duration: 2000
        })
        return;
      } else if (timestamp1 >= timestamp2 || timestamp2 < timestamp3) {
        wx: wx.showToast({
          title: '时间错误',
          image: "/res/icon_warn.png",
          duration: 2000
        })
        return;
      }
      else {
        wx.request({
          url: 'https://api.gentleleetommy.cn/applyGoods',
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'POST',
          data: {
            num: that.data.inputnum,
            startTime: that.data.startdate + ' ' + that.data.starttime,
            endTime: that.data.enddate + ' ' + that.data.endtime,
            gname: that.data.gname,
            status: '未领取',
            description:that.data.inputusage,
            userphone:user[0].phone
          },
          success: function (res) {
            if (res.data.code == 200) {
              wx: wx.showToast({
                title: '申请成功',
                icon: 'success',
                duration: 2000,
              })
              that.setData({
                applyHidden: true
              })
            } else if (res.data.code == 204){
              wx: wx.showToast({
                title: '时间已过期',
                image: "/res/icon_warn.png",
                duration: 2000
              })
            }
            else {
              wx: wx.showToast({
                title: '申请失败',
                image: "/res/icon_warn.png",
                duration: 2000
              })
            }
          }
        })
      }
    } else {
      wx: wx.showToast({
        title: '不能为空',
        image: "/res/icon_warn.png",
        duration: 2000
      })
    }
    that.setData({
      starttime: "",
      startdate: "",
      enddate: "",
      endtime: "",
      inputnum: null,
      inputusage: null,
    })
    that.listGoods()
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
    this.listGoods()
  },
  listGoods: function () {
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/listGoods',
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
  searchGoods: function (e) {
    var that = this
    console.log(e.detail.value.search_content)
    if (e.detail.value.search_content) {
      wx.request({
        url: 'https://api.gentleleetommy.cn/getGoods',
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
      this.listGoods()
    }

  },
  //view加载
  onLoad: function () {
    console.log('onLoad')

    var that = this
  },

  //事件响应

  didSelectCell: function (prama) {
    var menuItem = this.data.datas[parseInt(prama.currentTarget.id)]
    console.log(prama.currentTarget.id);

    this.setData({
      modalHidden: false,
      modalText: "点击了第" + prama.currentTarget.id + "位 姓名：" + menuItem.name
    })
  },
  adminConfirm: function (e) {
    this.modifySubmit();
    this.setData({
      adminModalHidden: true
    })
    console.log('confirm');
  },

  adminCancel: function (e) {
    this.setData({
      adminModalHidden: true
    })
    console.log('cancel');
  },
  adminShow: function (e) {
    var menuItem = this.data.datas[parseInt(e.currentTarget.id)]
    console.log(e.currentTarget.id);
    this.setData({
      adminModalHidden: false,
      listname: menuItem.gname,
      id: e.currentTarget.id,
      totalnum: menuItem.totalnum,
      stock: menuItem.stock,
      description: menuItem.description
    })
    console.log('show');
  },
  modifySubmit: function (e) {
    var gname = this.data.datas[this.data.id].gname
    var that = this
    if (this.data.totalnum && this.data.stock && this.data.description) {
      wx.request({
        url: 'https://api.gentleleetommy.cn/modifyGoods',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data: {
          gname: gname,
          totalnum: that.data.totalnum,
          stock: that.data.stock,
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
              totalnum: null,
              stock: null,
              description: null
            })
            that.listGoods()
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
  addConfirm: function (e) {
    this.addSubmit();
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
  applyConfirm: function (e) {
    this.applySubmit()
    console.log('confirm');
  },
  applyCancel: function (e) {
    this.setData({
      applyHidden: true,
      starttime: '',
      startdate: '',
      enddate: '',
      endtime: '',
    })
    console.log('cancel');
  },
  applyShow: function (e) {
    var menuItem = this.data.datas[parseInt(e.currentTarget.id)]
    this.setData({
      applyHidden: false,
      id: e.currentTarget.id,
      listname: menuItem.gname,
      gname: menuItem.gname,
      stock: menuItem.stock,
      totalnum: menuItem.totalnum
    })
    console.log('show');
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
  getTotalNum: function (e) {
    this.setData({
      totalnum: e.detail.value
    })
  },
  getStock: function (e) {
    this.setData({
      stock: e.detail.value
    })
  },
  getDescription: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  getAddTotalNum: function (e) {
    this.setData({
      addtotalnum: e.detail.value
    })
  },
  getAddName: function (e) {
    this.setData({
      addgname: e.detail.value
    })
  },
  getAddStock: function (e) {
    this.setData({
      addstock: e.detail.value
    })
  },
  getAddDescription: function (e) {
    this.setData({
      adddescription: e.detail.value
    })
  },
  getInputNum: function (e) {
    this.setData({
      inputnum: e.detail.value
    })
  },
  getInputUsage: function (e) {
    this.setData({
      inputusage: e.detail.value
    })
  },
  addSubmit: function () {
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/addGoods',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        gname: that.data.addgname,
        totalnum: that.data.addtotalnum,
        stock: that.data.addstock,
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
            addgname: null,
            addtotalnum: null,
            addstock: null,
            adddescription: null
          })
          that.listGoods()
        } else {
          wx: wx.showToast({
            title: '该物资已存在',
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
      addgname: null,
      addtotalnum: null,
      addstock: null,
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
  deleteGoods: function (e) {
    var gname = this.data.datas[this.data.id].gname
    var that = this
    wx.request({
      url: 'https://api.gentleleetommy.cn/deleteGoods',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: {
        gname: gname,
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx: wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000,
          })
          that.setData({
            totalnum: null,
            stock: null,
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
      adminModalHidden: true,
    })
    this.listGoods()
    console.log('delete');
  },

})