'use strict';

//var URI = 'https://api.douban.com/v2/movie/';
var URI = 'https://douban.uieee.com/v2/movie/';
//var URI = 'http://t.yushu.im/v2/movie/';
var fetch = require('./fetch');

//获取数据列表
function getMovies(path, params) {
  return fetch(URI, path, params).then(function (res) {
    return { key: path, data: res.data };
  });
}

//获取详情列表
function getOne(id) {
  return fetch(URI + 'subject/', id).then(function (res) {
    return res.data;
  });
}

module.exports = {
  getMovies: getMovies,
  getOne: getOne
};
