//index.js
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
  },

  //view加载
  onLoad: function () {
    console.log('onLoad')
    var that = this

    //网络请求
    // wx.request({
    //   url: 'https://api.douban.com/v2/user',
    //   header: {
    //     "Content-Type": "application/json"
    //   },
    //   method: "GET",
    //   success: function (res) {
    //     //获取到了数据
    //     var newData = res.data;
    //     console.log(newData.users);
    //     that.setData({
    //       datas: newData.users
    //     })
    //     that.update()
    //   }
    // });
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

})