
var app = getApp();

/**
 * movieList {Array} 搜索结果列表
 * search {String} 搜索关键字
 * state {Object}
 *   {Boolean}
 *   -- loadMore 是否开启加载更多
 *   -- loading  是否开启加载提示
*    -- itemLens 请求列表总数量
 */
Page({
  data: {
    page: 1,
    count: 20,
    movieList: [],
    search: '',
    state: {
      loadMore: true,
      loading: false,
      itemLens: 0
    }
  },
  //加载更多
  loadMore() {
    var page = this.data.page++, count = this.data.count;
    var size = (page - 1) * count;
    app.douban.getMovies('search', { start: size, count: this.data.count, q: this.data.search }).then(res => {
      console.log(res);
      res = res.data;
      if (res.subjects.length === 0) {
        return this.setData({
          'state.loadMore': false,
          'state.itemLens': 0
        });
      }
      if (this.data.state.loading) {
        return this.setData({
          movieList: this.data.movieList.concat(res.subjects),
          'state.loadMore': true,
          'state.itemLens': this.data.movieList.length + res.subjects.length
        });
      }
      this.setData({
        movieList: res.subjects
      });
      console.log(this.data);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  queryMov(e) {
    if (!e.detail.value || (e.detail.value === this.data.search)) {
      return;
    }
    //搜索时重置
    this.setData({
      page: 1,
      count: 20,
      movieList: [],
      search: e.detail.value,
      'state.loading': true
    });
    this.loadMore();
  },
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
    console.log('触发上拉刷新');
    //wx.startPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
    console.log('触发下拉事件');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})