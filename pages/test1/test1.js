// pages/4/4.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: {
      //播放地址  
      videoInfo: {
        dataUrl: '/images/phone.mp3'
      },
      state: {
        play: false
      },
      //图片地址  
      videoImgs: {
        defImg: '',
        startImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523944600657&di=30fcd708525196fef4c56b9c9f3fd774&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd52a2834349b033bf72c57e61ece36d3d539bd62.jpg',
        pauseImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523944625899&di=244a5fdfdf91cda114c1beb4967b9aa8&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F4034970a304e251f56f938d0ac86c9177f3e5388.jpg'
      }
    }
  },
  playMusic: function (event) {
    if (this.data.isPlayingMusic.state.play) {
      console.log('暂停播放');
      this.audioCtx.pause()
      return this.setData({
        'isPlayingMusic.state.play': false,
        'isPlayingMusic.videoImgs.defImg': this.data.isPlayingMusic.videoImgs.startImg
      });
    }
    this.audioCtx.play();
    this.setData({
      'isPlayingMusic.state.play': true,
      'isPlayingMusic.videoImgs.defImg' :this.data.isPlayingMusic.videoImgs.pauseImg
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.audioCtx = wx.createAudioContext('myAudio');
    var imgs = this.data.isPlayingMusic.videoImgs;
    if (!imgs.defImg) {
      this.setData({
        'isPlayingMusic.state.play': true,
        'isPlayingMusic.videoImgs.defImg': imgs.pauseImg
      });
    }
    this.audioCtx.play();
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