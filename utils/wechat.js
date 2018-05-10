'use strict';

function getStorage(key) {
  return new Promise(function (resolve, reject) {
    wx.getStorage({
      key: key,
      success: resolve,
      fail: reject
    })
  })
}

function setStorage(key, value) {
  return new Promise(function (resolve, reject) {
    wx.setStorage({
      key: key,
      data: value,
      success: resolve,
      fail: reject
    })
  })
}

function getLocation(type) {
  return new Promise(function (resolve, reject) {
    wx.getLocation({
      type: type,
      success: resolve,
      fail: reject
    })
  })
}

module.exports = {
  setStorage: setStorage,
  getStorage: getStorage,
  getLocation: getLocation
};