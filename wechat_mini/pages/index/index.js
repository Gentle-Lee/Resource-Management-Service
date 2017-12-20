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
  }

})