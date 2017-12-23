//index.js
const app = getApp()
Page({
  data: {
    imgurl: '../../res/icon_resource_default.png',
    datas: [],
    id:null,
    adminModalHidden: true,
    addHidden:true,
    applyHidden:true,
    hiddenView:true,
    totalnum:null,
    stock:null,
    description:null,
    addtotalnum:null,
    addstock:null,
    adddescription:null,
  },
  onShow:function(){
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
      totalnum:menuItem.totalnum,
      stock:menuItem.stock,
      description:menuItem.description
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
  getTotalNum:function(e){
    this.setData({
      totalnum:e.detail.value
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