// pages/examine/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStudyInfo: '',
    userInfo: ''

  },
  getUserStudy: function(event) { //获取书本列表信息
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/getUserStudy',
      data: event,
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({ //如果在sucess直接写this就变成了wx.request()的this了
          userStudyInfo: res.data
        });
        console.log(res.data);
      },
      fail: function(err) {
        // console.log("查询失败");
      }, //请求失败
      complete: function() {
        wx.hideLoading()
      }, //请求完成后执行的函数
    })
  },
  startStudy: function() {
    wx.navigateTo({
      url: '/pages/remember/index?bookid=' + this.data.userStudyInfo.studying + '&userid=' + this.data.userStudyInfo.userid
    })
  },
  getSysytemInfo: function() {
    let that = this;
    return new Promise(function(resolve, reject) {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo
          })
          resolve(res.userInfo);
        }
      })

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    });
    this.getSysytemInfo().then(res => {
      this.getUserStudy(res);
    })
    // wx.showLoading({
    //   title: '加载中',
    // });
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo
    //   })
    //   wx.hideLoading();
    //   console.log('1')
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo
    //     })
    //     wx.hideLoading();
    //     console.log('2')
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo
    //       })
    //       wx.hideLoading();
    //       console.log('3');
    //       // console.log(this.data.userInfo);
    //     }
    //   })
    // }


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