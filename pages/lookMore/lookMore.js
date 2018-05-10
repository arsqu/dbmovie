// pages/detail/detail.js
var app = getApp();

/**
 * 页面的初始数据
 * id {String} 电影id值
 * detail {Object} 
 *   -- popular_comments {Array} 短评列表
 *   -- popular_reviews  {Array} 影片列表
 * 
 * state {Object}
 *    {boolean}
 *    -- show  是否显示加载进度
 *    -- loadMore 加载更多时是否开启文字提示
 *    -- pointTit 评分为空时是否显示文字提示
 *    -- itemLens {Number} 当前条数
 *    -- types {String}  点击的类型(comments、reviews)
 */

Page({
  data: {
    page: 1,
    count: 20,
    id: '',
    detail: {
      'popular_comments': [],
      'popular_reviews': []
    },
    state: {
      show: true,
      loadMore: false,
      pointTit: true,
      itemLens: 0,
      types: ''
    }
  },
  /**
   * 生命周期函数--监听页面加载
   * size {Number} 当前起始数量
   */
  getMore(id) {
    var page, size, count, types;
    count = this.data.count;
    if (!id) {
      page = this.data.page;
    }
    types = this.data.state.types;
    page = this.data.page++ ,
      size = (page - 1) * count;
    app.douban.getMovies('subject/' + this.data.id + '/' + types, { start: size, count: count }).then(res => {
      console.log('请求成功');
      res = res.data;
      if (!res[types]) {
        console.log('空值');
        return;
      }
      res[types].map(res => {
        res.rating.stars = res.rating.value + '0';
      });
      var key = 'detail.popular_' + types;
      var data = this.data.detail['popular_' + types];

      this.setData({
        [key]: data.concat(res[types]),
        'state.loadMore': false,
        'state.show': false,
        'state.itemLens': data.length + res[types].length
      });
      console.log(this.data);
    });
  },
  onLoad(options) {
    // options.id = 26640371; //测试用
    // options.type = 'comments'; //测试用
    console.log(options);
    if (!options.id) { return; }
    this.setData({
      id: options.id,
      'state.types': options.type
    });
    console.log('页面加载');
    this.getMore(options.id);
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
    this.setData({
      'state.loadMore': true
    });
    this.getMore();
    console.log('滚动到底部');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})