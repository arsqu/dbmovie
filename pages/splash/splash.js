'use strict';
var app = getApp();

/**
 * 页面的初始数据
 * movies {Array} 海报条数
 * expires {Number} 过期时间 (单位:day)
 */
Page({
  data: {
    movies: [],
    expires: 1
  },
  getCache() {
    return new Promise(function (resolve) {
      //海报列表保存在 main_data 字段中
      app.wechat.getStorage('main_data').then(res => {
        console.log(res);
        //海报过期时间
        var expires = wx.getStorageSync('main_data_expires');
        if (expires - new Date().getTime() <= 0) {
          console.log('大于一天');
          return resolve(null);
        };
        return resolve(res.data);
      }).catch(function (e) {
        return resolve(null);
      });
    });
  },
  enterPage() {
    //进入电影展示页
    wx.switchTab({ url: '../list/list' });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var me = this;
    this.getCache().then(cache => {
      console.log('读取缓存...');
      console.log(cache);
      if (cache) {
        console.log('已缓存');
        console.log(cache)
        return me.setData({
          movies: cache.data.subjects
        });
      }
      app.douban.getMovies('in_theaters', { 'start': 0, 'count': 3 }).then(res => {
        console.log(res);
        if (res.data.subjects.length > 0) {
          var d = new Date();
          //储存海报数据和过期后请求时间
          app.wechat.setStorage('main_data', res);
          app.wechat.setStorage('main_data_expires', new Date(d.setDate(d.getDate() + this.data.expires)).getTime());
          return me.setData({
            movies: res.data.subjects
          });
        }
        // console.log(me.data.movies);
      });
    });
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