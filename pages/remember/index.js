// pages/remember/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: 1,
    userStudyInfo:'',
    studyNum:0,
    total:0,
    currentQuestion:0,
  },
  btnFindanswer: function() {
    this.setData({
      answer: !this.data.answer
    });
  },
  getStudyQuestion: function(options) {
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/getStudyQuestion',
      data: options,
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({ //如果在sucess直接写this就变成了wx.request()的this了
          userStudyInfo: res.data,
          total: res.data.length
        });
        console.log(res.data);
      },
      fail: function(err) {
        // console.log("查询失败");
      }, //请求失败
      complete: function() {}, //请求完成后执行的函数
    })
  },
  deleteQuestion:function(){
    let that = this
    that.data.userStudyInfo.splice(this.data.currentQuestion, 1)
    that.setData({ //如果在sucess直接写this就变成了wx.request()的this了
      userStudyInfo: this.data.userStudyInfo,
      studyNum:this.data.studyNum+1
    });
    console.log(this.data.userStudyInfo);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getStudyQuestion(options)
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
   if(this.data.studyNum==15){
     console.log('你已经学习完成')
   }
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