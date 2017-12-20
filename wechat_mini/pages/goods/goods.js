//index.js
Page({
  data: {
    datas: [
      {
        imgurl: '../../res/icon_resource_default.png',
        gname: '小推车',
        totalnum: 50,
        stock:5
      },
      

    ],
    adminModalHidden: true,
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
  adminConfirm: function (e) {
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
    this.setData({
      adminModalHidden: false
    })
    console.log('show');
  }

})