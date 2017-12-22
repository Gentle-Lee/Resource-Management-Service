//index.js
const app = getApp()
Page({
  data: {
    datas: [
      {
        imgurl:'../../res/icon_place_default.png',
        rname:'104',
        capacity:50
      },
      {
        imgurl: '../../res/icon_place_default.png',
        rname: '104',
        capacity: 50
      },
      {
        imgurl: '../../res/icon_place_default.png',
        rname: '104',
        capacity: 50
      },
      {
        imgurl: '../../res/icon_place_default.png',
        rname: '104',
        capacity: 50
      },
      {
        imgurl: '../../res/icon_place_default.png',
        rname: '104',
        capacity: 50
      },
      {
        imgurl: '../../res/icon_place_default.png',
        rname: '104',
        capacity: 50
      },
      {
        imgurl: '../../res/icon_place_default.png',
        rname: '104',
        capacity: 50
      },
      
    ],
    modalHidden: true,
    addHidden:true,
    applyHidden:true,
    modalText: "",
    hiddenView:true,
  },

  //view加载
  onLoad: function () {
    console.log('onLoad')
  },
  onShow: function(){
    var that = this
    let user = app.globalData.userData
    if (user) {
      if (user[0].authname == 'admin') {
        this.setData({
          hiddenView: false
        })
      }
    }
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
  }

})