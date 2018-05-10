'use strict';

module.exports = function (api, path, params) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: api + path,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    });
  })
}