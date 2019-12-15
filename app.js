//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 登录
    // wx.login({
    //   success: res => {
    //     console.log(res);
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     wx.request({
    //       // 自行补上自己的 APPID 和 SECRET
    //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx28f2629788a2bf60&secret=d9257c01670efce17c31a74c80deec9c&js_code=' + res.code + '&grant_type=authorization_code',
    //       success: res => {
    //         // 获取到用户的 openid
    //         this.globalData.openid = res.data.openid;
    //         console.log(res.data.openid);
    //       }
    //     });
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // console.log(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          });
        } else {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      }
    })
  },
  GetUserData: function (name) {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://www.0752gh.com:9092/UserFind',//请求地址
        data: {//发送给后台的数据
          user_name: name
        },
        header: {//请求头
          "Content-Type": "applciation/json"
        },
        method: "GET",//get为默认方法/POST
        success: function (res) {
          // that.setData({//如果在sucess直接写this就变成了wx.request()的this了
          //   cardInfo: res.data
          // });
          that.globalData.cardInfo = res.data;
          // resolve(res.data[0].user_vip);
          resolve(res.data);
        },
        fail: function (err) { console.log("查询失败"); },//请求失败
        complete: function () { },//请求完成后执行的函数
      });
    });
  },
  globalData: {
    userInfo: null,
    cardInfo: null,
    appointItem: null,
    user_card: null
  }
})