const app = getApp()
// const team = []
// const index = 0
Page({
  data: {
    items: [
      { name: '男', value: '男', checked: null},
      { name: '女', value: '女', checked: null}
    ],
    team:[],
    index:0,
    authorization:"",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onShow:function(){
    let user = app.globalData.userData
    if (user !=null) {
      if(user[0].authname=='admin'){
        this.setData({
          auth: '管理员',
          authorized: 'authorized'
        })
      }else{
        this.setData({
          auth: '已认证',
          authorized: 'authorized'
        })
      }
      console.log(user[0].email)
      this.setData({
        uname:user[0].realname,
        uemail:user[0].email,
        uphone:user[0].phone,
      })
      if(user[0].gender =='男'){
        var uitems = this.data.items[0].checked;
        console.log(uitems)
        this.setData({
          uitems:'true'
        })
        console.log(uitems)
      }
    } else {
      this.setData({
        auth: '未认证',
        authorized: 'unauthorized'
      })
    }
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var that = this;
    wx.request({
      url: 'https://api.gentleleetommy.cn/listTeam', 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var team = [];
        for(var i = 0 ; i < res.data.length; i++){
          team.push(res.data[i].tname)
        }
        that.setData({
          index:0,
          array: team
        })    
      }
    })

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log(e);
    if (e.detail.value.name.length == 0 || e.detail.value.phone.length == 0 || e.detail.value.gender.length == 0 || e.detail.value.email.length == 0 || e.detail.value.team.length == 0 || e.detail.value.code.length == 0) {
      wx.showToast({
        title: '请填写全部内容!',
        image:"/res/icon_warn.png",
        duration: 1500
      })
    } else if (e.detail.value.phone.length!=11){
      wx.showToast({
        title: '手机号错误!',
        image: "/res/icon_warn.png",
        duration: 1500
      })
    } 
    else {
      wx.request({
        url: 'https://api.gentleleetommy.cn/addUser',
        data: { 
          wechatname: app.globalData.userInfo.nickName, realname: e.detail.value.name, gender: e.detail.value.gender,phone: e.detail.value.phone, email: e.detail.value.email, tname: e.detail.value.team, code: e.detail.value.code },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        }, // 设置请求的 header
        success: function (res) {
          if(res.data.code == 200){
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            try {
              wx.setStorageSync('phone', e.detail.value.phone);
              let mphone = wx.getStorageSync('phone') || ''
              console.log("mphone:" + mphone )
              wx.request({
                url: 'https://api.gentleleetommy.cn/getUser',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                method: 'POST',
                data: {
                  phone: mphone
                },
                success: function (res) {
                  app.globalData.userData = res.data.user
                  console.log("zhucedeshih")
                  console.log(app.globalData.userData)
                  
                }
              })
            } catch (e) {
            }
          }
          else if(res.data.code == 201){
            wx.showModal({
              title: '提示',
              content: '该电话号码已被使用'
            })
          }
          else if(res.data.code == 202){
            wx.showToast({
              title: '密钥错误',
              image: "/res/icon_warn.png",
              duration: 2000
            })
          }
        },
        fail: function (res) {
          console.log(res);
          // fail
          wx.showToast({
            title: '网络错误',
            image:"/res/icon_warn.png",
            duration: 2000
          })
        }
      })
    }
  }
})