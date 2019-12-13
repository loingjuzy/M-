// pages/examine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStudyInfo: '',
    userInfo: {
      "birthday": null,
      "cratetime": "Thu, 12 Dec 2019 23:34:57 GMT",
      "education": null,
      "name": "萌芽的小石头",
      "occupation": null,
      "school": null,
      "studying": 1,
      "topimage": "/images/01.jpg",
      "userid": 1
    },
  },
  getUserStudy: function() { //获取书本列表信息
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/getUserStudy',
      data: {

      },
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
      complete: function() {}, //请求完成后执行的函数
    })
  },
  startStudy: function() {
    console.log(this.data.userInfo.studying, this.data.userInfo.userid);
    wx.navigateTo({
      url: '/pages/remember/index?bookid=' + this.data.userInfo.studying + '&userid=' + this.data.userInfo.userid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserStudy();
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