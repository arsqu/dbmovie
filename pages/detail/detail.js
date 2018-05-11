// pages/detail/detail.js
var app = getApp();

/**
 * 页面的初始数据
 * count {Number} 影人剧照
 * detail {Arr} 详情页信息
 * infos {Arr} 标签 预览图 作者
 * state {Object}
 *  -- show {boolean} 页面加载状态
 *  -- longTalk {Object}
 *     -- lens {Number} 影评显示条数
 */
Page({
  data: {
    count: 10,
    detail: [],
    infos: [],
    state: {
      show: true,
      pointTit: true,
      summary:false,
      longTalk: {
        lens: 5
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // options.id = 26683723; //测试用
    if (options.id) {
      app.douban.getOne(options.id).then(res => {
        res.rating.average = res.rating.average || '';
        var infos = {
          tags: res.tags,
          author: res.directors.concat(res.casts),
          photos: res.photos
        };
        console.log(infos);
        //星星数值
        res.popular_comments.map(res => {
          res.rating.stars = res.rating.value + '0';
        });
        res.popular_reviews.map(res => {
          res.rating.stars = res.rating.value + '0';
        });
        this.setData({
          detail: res,
          infos: infos,
          'state.show': false
        });
        console.log(this.data);
      });
    }
  },
  errorImg() {
    console.log('图片失败');
  },
  //查看更多简介
  summaryMore(e){ 
    console.log('被点击');
    this.setData({
       'state.summary':true
    });
    console.log(this.data);
  },
  //影人剧照预览
  previewImg(e) {
    var data = e.currentTarget.dataset;
    var current = data.src.avatars && data.src.avatars.small, ptos = [];
    if (!data.src.id) {
      return;
    }
    app.douban.getMovies('celebrity/' + data.src.id + '/photos', { count: this.data.count }).then(function (res) {
      res = res.data;
      if (res.total > 0) {
        res.photos.map(function (res) {
          ptos.push(res.image);
        });
        ptos.unshift(current);
        console.log(current, ptos);
        wx.previewImage({
          current: current,
          urls: ptos
        });
      }
      console.log(ptos);
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