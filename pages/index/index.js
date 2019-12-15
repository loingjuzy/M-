// pages/index/index.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  getUserInfo: function (e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  insertUerInfo: function(args) {
    let that = this; //由于this调用的是加载后的数据，需要重新指向当前需要更新的数据
    wx.request({
      url: 'https://www.0752gh.com/insertUserInfo', //请求地址
      data: args,
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: "GET", //get为默认方法/POST
      success: function(res) {},
      fail: function(err) {}, //请求失败
      complete: function() {
        console.log('插入成功！')
      }, //请求完成后执行的函数
    });
  },
  bindGetUserInfo: function(event) {
    if (event.detail.userInfo) {
      // 获取到用户的信息了，打印到控制台上看下
      console.log(event.detail.userInfo);
      this.insertUerInfo(event.detail.userInfo);
      app.globalData.userInfo = event.detail.userInfo;
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      wx.switchTab({
        url: '/pages/examine/index',
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        // title: '警告',
        content: '您点击了拒绝授权，无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权'
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.hideHomeButton()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})