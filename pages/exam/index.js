// pages/exam/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item1: ["定义声音内容。", "不赞成使用。定义页面中文本的默认字体、颜色或尺寸。", "定义文字方向。", "定义大号文本。"],
    item2: ["一居", "二居", "三居", "四居以上"],
    shopitem: '一居',   //默认显示的
  },
  bindshop1: function (event) {
    let classify = event.currentTarget.dataset.classify;
    let that = this;
    console.log(classify)  //输出的结果就是你点击的
    that.setData({
      shopitem: classify , //更新
    });
    setTimeout(function () {
      that.setData({
        item1: that.data.item2
    })},1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})