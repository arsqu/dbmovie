// pages/list/list.js
var app = getApp();
/**
 * 页面的初始数据
 * tags  {Arr} 电影标签
 * allMovies {Arr} 请求电影信息地址
 * state {Object}
 *   --point 是否显示数字评分
 *   --show  是否开启加载提示
 */
Page({
  data: {
    tags: ["经典", "冷门佳片", "豆瓣高分", "动作", "喜剧", "爱情", "悬疑", "恐怖", "科幻", "治愈", "文艺", "成长", "动画", "华语", "欧美", "韩国", "日本"],
    state: {
      point: false,
      show: true,
    },
    allMovies: [{ key: 'coming_soon' }, { key: 'in_theaters' }, { key: "weekly" }, { key: 'top250' }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //电影标签分类
  target_href(e) {
    console.log(e);
    var dataset = e.currentTarget.dataset;
    var key = dataset.key,
      url = '../tagMov/tagMov?',
      idx = dataset.idx;
    url += key ? 'tag=' + key
      : 'url=' + this.data.allMovies[idx]['key'];
    console.log(url);
    wx.navigateTo({
      url: url
    });
  },
  onLoad(options) {
    console.log(this);
    var data = this.data.allMovies;
    var result = this.data.allMovies.map(all => {
      return app.douban.getMovies(all.key, { 'start': 0, 'count': 10, "city": getApp().data.currentCity.replace(/市/g, '') }).then(res => {
        var arr = [];  //多一级subject的储存
        console.log(res);
        res = res.data;
        if (res.subjects.length > 0) {
          all.title = res.title;  //标题
          all.movies = res.subjects; //电影列表
          all.movies.map(function (res) {
            if (res.subject) {
              arr.push(res.subject);
            }
          });
          if (arr.length > 0) {
            all.movies = arr;//如果多一级subject就用arr去替换
          }
          return all;
        }
      });
    });
    //拿到所有异步结果
    Promise.all(result).then(res => {
      this.setData({ allMovies: res, 'state.show': false });
      console.log(this.data);
    });
  },

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
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