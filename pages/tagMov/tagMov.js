var app = getApp();

Page({
  /**
   * 页面的初始数据
   * movieList {Array} 保存的列表
   * title {String} 当前标题
   * item {Object}  
   *   -- key {String} 模板输出的变量名
   * 
   * param {Object}   
   *   {String}
   *   -- tag 标签名,根据标签请求列表(经典、动作)
   *   -- urls 请求地址(标签、查看更多)
   */
  data: {
    start: 0,
    count: 18,
    title: "",
    item: {
      key: ''
    },
    param: {
      tag: '',
      urls: ''
    },
    state: {
      point: true,
      loadMore: false,
      loading: true,
      itemLens: 0
    },
    movieList: []
  },
  /**
   * size {Number} 当前条数
   * urls {String} 请求地址
   * tag  {String} 请求参数
   */
  loadMore(options) {
    var size, page, urls;
    page = this.data.start++;
    size = page * this.data.count;
    console.log(size);
    if (options) {
      if (options.tag) {
        this.setData({
          'param.tag': options.tag,
          'param.urls': 'search'
        });
      } else if (options.url) {
        console.log(options);
        this.setData({
          'param.tag': '',
          'item.key': options.url,
          'param.urls': options.url,
        });
      }
    }
    if (!this.data.param.tag && !this.data.param.urls) {
      console.log('标签名或地址为空');
      return;
    }
    this.setData({
      'state.loadMore': true,
      'state.loading': true
    });
    //city为获取当前城市
    app.douban.getMovies(this.data.param.urls, { start: size, count: this.data.count, city: getApp().data.currentCity.replace(/市/g, ''), tag: this.data.param.tag }).then(res => {
      var arr = [], movies;  //多一级subject的储存
      res = res.data;
      if (res.subjects.length === 0) {
        return this.setData({
          'state.loadMore': false,
          'state.loading': false,
          'state.itemLens': 0
        });
      }
      res.subjects.map(res => {
        if (res.subject) {
          arr.push(res.subject);
        }
      });
      movies = res.subjects;
      if (arr.length > 0) {
        movies = arr;
      }
      this.setData({
        title: res.title,
        movieList: this.data.movieList.concat(movies),
        'state.loadMore': false,
        'state.loading': false,
        'state.itemLens': this.data.movieList.length + movies.length
      });
      console.log(this.data.movieList);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore(options);
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})