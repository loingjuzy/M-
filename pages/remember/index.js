// pages/remember/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: '',
    stepStatus: 0,
    answer: true,
    originStudyInfo: [],
    userStudyInfo: '',
    studyNum: 0,
    total: 0,
    currentQuestion: 0,
    examData: [],
    checked: false,
    checkedValue: '',
    rightNumber: 0
  },
  btnFindanswer: function() {
    this.setData({
      answer: !this.data.answer
    });
  },
  getStudyQuestion: function(event) {
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/getStudyQuestion',
      data: event,
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({ //如果在sucess直接写this就变成了wx.request()的this了

          userStudyInfo: res.data,
          total: res.data.length,
          originStudyInfo: that.data.originStudyInfo.concat(res.data),
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
  changeQuestion: function(event) {
    let that = this;
    let index = event.currentTarget.dataset.index;
    this.setData({
      answer: 1
    });
    if (index == '3') {
      if (this.data.currentQuestion < this.data.userStudyInfo.length - 1) {
        that.setData({ //如果在sucess直接写this就变成了wx.request()的this了
          currentQuestion: this.data.currentQuestion + 1,
        });
      } else {
        that.setData({ //如果在sucess直接写this就变成了wx.request()的this了
          currentQuestion: 0,
        });
      };
    } else {
      let detachData = that.data.userStudyInfo.splice(this.data.currentQuestion, 1);
      that.setData({ //如果在sucess直接写this就变成了wx.request()的this了
        userStudyInfo: that.data.userStudyInfo,
        studyNum: this.data.studyNum + 1
      });
      if (that.data.currentQuestion >= this.data.userStudyInfo.length - 1) {
        that.setData({ //如果在sucess直接写this就变成了wx.request()的this了
          currentQuestion: 0,
        });
      }
      if (this.data.studyNum == this.data.total) {
        this.setData({
          stepStatus: 1
        });
      };
      if (index == '2') {
        console.log(detachData[0].answer);
        that.setData({ //加入一组元素
          examData: this.data.examData.concat(this.getExamItems(detachData))
        });
        console.log(this.data.examData);
      } else {
        detachData[0].level = 4;
        this.upDataLevel(detachData[0]);
      }
    }
  },
  upDataLevel: function(event) {
    console.log(event);
    let that = this;
    wx.request({
      url: 'https://www.0752gh.com/updateLevel',
      data: event,
      header: { //请求头
        "Content-Type": "applciation/json"
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log('更新数据成功！');
      },
      fail: function(err) {
        // console.log("查询失败");
      }, //请求失败
      complete: function() {}, //请求完成后执行的函数
    })
  },
  getExamItems: function(event) {
    let i = 0;
    let originStudyInfo = this.data.originStudyInfo;
    let valueArray = [event[0].answer];
    while (i < 3) {
      let num = Math.floor(Math.random() * this.data.total);
      if (valueArray.includes(originStudyInfo[num].answer) == false) {
        valueArray.push(originStudyInfo[num].answer);
        i++;
      }
    }
    event[0].answerItems = valueArray.sort();
    return event
  },
  startExamine: function() {
    this.setData({
      stepStatus: 2,
      studyNum: 1,
      total: this.data.examData.length
    })
  },
  nextQuestion: function(event) {
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = true;
    console.log(this.data.examData[this.data.studyNum - 1].level);
    if (this.data.checkedValue == this.data.examData[this.data.studyNum - 1].answer) {
      innerAudioContext.src = '/pages/images/right.mp3'
      wx.showToast({
        title: '答对了',
        icon: 'success',
        duration: 600, //提示的延迟时间，单位毫秒，默认：1500 
        mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false 
      });
      this.data.examData[this.data.studyNum - 1].level = this.data.examData[this.data.studyNum - 1].level + 1;
      this.upDataLevel(this.data.examData[this.data.studyNum - 1]);
      this.setData({
        rightNumber: this.data.rightNumber + 1
      });
    } else {
      innerAudioContext.src = '/pages/images/wrong.mp3'
      wx.showToast({
        title: '答错了',
        image: '/pages/images/wrong.png',
        duration: 600, //提示的延迟时间，单位毫秒，默认：1500 
        mask: false, //是否显示透明蒙层，防止触摸穿透，默认：false 
      })
    };
    if (this.data.studyNum == this.data.total) {
      setTimeout(this.getComplete, 1000)
    } else {
      this.setData({
        studyNum: this.data.studyNum + 1,
        checked: false,
        checkedValue: ''
      });
    }
  },
  getAnswerChange: function(event) {
    console.log(event.detail.value);
    this.setData({
      checkedValue: event.detail.value
    })
  },
  getComplete: function() {
    this.setData({
      stepStatus: 3
    });
  },
  continueStudy: function() {
    this.setData({
      stepStatus: 0,
      originStudyInfo: [],
      studyNum: 0,
      currentQuestion: 0,
      examData: [],
      rightNumber: 0
    })
    this.getStudyQuestion(this.data.options);
  },
  backExamine: function() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options: options
    })
    this.getStudyQuestion(options);
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