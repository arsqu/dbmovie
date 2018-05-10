'use strict';

var wechat = require('./utils/wechat.js');
var douban = require('./utils/douban.js');
var baidu = require('./utils/baidu.js');

App({
  data: {
    currentCity: ''
  },
  wechat: wechat,
  douban: douban,
  baidu: baidu,

  /* 
    当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  */
  onLaunch() {
    // var me = this;
    //地理位置
    wechat.getLocation().then(res => {
      var latitude = res.latitude,
        longitude = res.longitude;
      if (!res.latitude || !res.longitude) {
        return;
      }
      return baidu.getMap(latitude + ',' + longitude).then(res => {
        if (res.data.result) {
          this.data.currentCity = res.data.result
            .addressComponent.city;
          console.log(this.data.currentCity);
        }
      }).catch(err => {
        this.data.currentCity = '北京';
      });
    });


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 获取头像昵称
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: res => {
                  this.globalData.userInfo = res.userInfo
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          });
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})