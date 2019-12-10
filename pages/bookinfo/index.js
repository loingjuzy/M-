// pages/bookinfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wordList: '',
    levelitem: '',
    showitem: '陌生词',
    showwords: [1, 0, 0, 0, 0],
  },
  getBookInfo: function(parameter) { //获取书本列表信息
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/getBookList/' + parameter,
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
          wordList: res.data[0],
          levelitem: [
            ['陌生词', res.data[1].hard],
            ['熟悉中', res.data[1].normal],
            ['已精通', res.data[1].easy],
            ['已标记', res.data[1].mark]
          ],
        });
        console.log(res.data);
      },
      fail: function(err) {
        // console.log("查询失败");
      }, //请求失败
      complete: function() {}, //请求完成后执行的函数
    })
  },
  bindshow: function(event) { //切换菜单功能方法
    let classify = event.currentTarget.dataset.classify;
    let that = this;
    console.log(classify) //输出的结果就是你点击的
    switch (classify) {
      case '陌生词':
        that.setData({
          showwords: [1, 0, 0, 0, 0], //更新
        });
        break;
      case '熟悉中':
        that.setData({
          showwords: [0, 1, 1, 1, 0], //更新
        });
        break;
      case '已精通':
        that.setData({
          showwords: [0, 0, 0, 0, 1], //更新
        });
        break;
      case '已标记':
        that.setData({
          showwords: 1, //更新
        });
        break;
    }
    that.setData({
      showitem: classify, //更新
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.bookid)
    this.getBookInfo(options.bookid)
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