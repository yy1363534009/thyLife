var http = require('./http.js');
var app = getApp();

/**
 * 根据经纬度获取详细地址
 * @param {*} latitude 纬度
 * @param {*} longitude 经度
 * @param {*} success 成功回调函数
 * @param {*} fail 失败回调函数
 */
function reverse_geocoding(latitude, longitude, success, fail) {
  var ak = app.globalData.ak;
  var location = latitude + "," + longitude;
  var output = "json";
  var coordtype = "wgs84ll";
  var param = {
    ak,
    location: location,
    output: output,
    coordtype: coordtype
  }
  var url = "https://api.map.baidu.com/reverse_geocoding/v3";
  http.requestexternal('get', url, param, '', success, fail);
}

function geocoding(address, success, fail) {
  var ak = app.globalData.ak;
  var output = "json";
  var param = {
    ak,
    address: address,
    output: output
  }
  var url = "https://api.map.baidu.com/geocoding/v3";
  http.requestexternal('get', url, param, '', success, fail);
}

module.exports = {
  reverse_geocoding: reverse_geocoding,
  geocoding: geocoding
}