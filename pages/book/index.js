// pages/book/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeitem: ["Python", "Web", "小程序", "其他"],
    showitem: 'Python', //默认显示的菜单选项
    bookList: '',
    bookCount:'',
  },
  getBookInfo: function(event) { //获得书本详细信息
    console.log(event)
    let bookid = event.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: '/pages/bookinfo/index?bookid=' + bookid,
    })
  },

  bindshow: function (event) { //切换菜单功能方法
    let classify = event.currentTarget.dataset.classify;
    let that = this;
    that.getBookList(classify);
    console.log(classify) //输出的结果就是你点击的
    that.setData({
      showitem: classify, //更新
    });
  },

  getBookList: function(parameter) { //获取书本列表信息
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/getBookList',
      data: {
        subgroup: parameter,
      },
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({ //如果在sucess直接写this就变成了wx.request()的this了
          bookList: res.data,
          bookCount: res.data.length
        });
        console.log(res.data);
      },
      fail: function(err) {
        // console.log("查询失败");
      }, //请求失败
      complete: function() {}, //请求完成后执行的函数
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBookList(this.data.showitem);
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