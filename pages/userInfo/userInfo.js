// pages/userInfo/userInfo.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {

    },
    state:{
      button:{
        show:true
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getUsers() {
    var data;
    if (arguments[0]) {
      data = arguments[0].detail.userInfo;
      data.avatarUrl = data.avatarUrl || '/images/default.png';
      app.wechat.setStorage('userInfo', data);
      this.setData({
        userInfo: data,
        'state.button.show':false
      });
      return;
    }
    app.wechat.getStorage('userInfo').then(res => {
      console.log(res);
      if (res.data.nickName) {
        data = res.data;
        data.avatarUrl = data.avatarUrl || '/images/default.png';
        app.wechat.setStorage('userInfo', data);
        console.log('用户信息存入');
        this.setData({
          userInfo: data,
          'state.button.show': false
        });
      }
    });
  },
  onLoad: function (options) {
    this.getUsers();
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
    this.getUsers();
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