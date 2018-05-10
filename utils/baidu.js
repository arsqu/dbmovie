'use strict';
var URI = 'https://api.map.baidu.com';
var fetch = require('./fetch');

function getMap(params) {
  return fetch(URI, '/geocoder/v2/', {
    output: "json",
    ak: '8m2oiSkaHXhG8pEePovwGGkWaSd1Kssb',
    location:params
  });
}

module.exports = { getMap: getMap };