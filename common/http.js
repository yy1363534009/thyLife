const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

const baseURL = 'http://localhost/thelife-webapp/api/';
const tokenStartWith = 'Bearer_';
/**
 * 网络请求封装方法
 *  参数1： method (string) 请求的类型 
 *  参数2： url (string) 请求的url地址
 *  参数3： params (json) 请求携带的参数
 *  参数4： message(string) 【loading=boolean】信息弹框内容
 *  参数5： success 成功函数
 *  参数6： fail失败函数
 */
function request(method, url, params, message, success, fail) {
  if (message != '') {
    wx.showLoading({
      title: message,
    })
  }
  try {
    console.log("aaaaaa微信小程序后端登录响应的结果-token", wx.getStorageSync('token'));
  } catch (e) {}
  // 请求头
  let header = {
    'content-type': method != GET ? 'application/json' : '',
    'Authorization': wx.getStorageSync('token') == null ? '' : tokenStartWith + wx.getStorageSync('token')
  };
  //请求
  wx.request({
    //写一个请求的域名 后期修改域名网址 统一修改
    url: baseURL + url,
    method: method,
    data: params,
    header: header,
    success: res => {
      if (res.data.status == 200) {
        //成功获取了数据
        success(res.data);
      } else {
        //没有数据
        fail(res.data);
      }
    },
    fail: function (res) {
      fail(res.data);
    },
    complete: function (res) {
      if (message != '') {
        wx.hideLoading();
      }
    }
  })

}

function requestexternal(method, url, params, message, success, fail) {
  if (message != '') {
    wx.showLoading({
      title: message,
    })
  }
  //请求
  wx.request({
    url: url,
    method: method,
    data: params,
    success: res => {
      success(res.data);
    },
    fail: function (res) {
      fail(res.data);
    },
    complete: function (res) {
      if (message != '') {
        wx.hideLoading();
      }
    }
  })
}

//暴露出去
module.exports = {
  request: request,
  requestexternal: requestexternal,
  GET,
  POST,
  PUT,
  FORM,
  DELETE
}; //{http:http}