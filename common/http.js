const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';

// 内部后端请求URL
const baseURL = 'http://localhost/thelife-webapp/api/';
// token前缀
const tokenStartWith = 'Bearer ';

/**
 * 内部资源网络请求
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
    console.log('>>>header.Authorization', tokenStartWith + wx.getStorageSync('token'));
  } catch (e) {}
  // 请求头
  let header = {
    'content-type': 'application/json', // 默认值
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
      // 响应状态码=200 → 成功
      if (res.data.status == 200) {
        //成功获取了数据
        success(res.data);
      } else {
        // 响应状态码<>200 → 系统抛出异常、打印异常信息
        wx.showLoading({
          title: res.data.message,
        })
        fail(res.data);
      }
    },
    fail: function (res) {
      wx.showLoading({
        title: res.data.message,
      })
      fail(res.data);
    },
    complete: function (res) {
      if (message != '') {
        wx.hideLoading();
      }
      if (res.data.status != 200) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
      }
    }
  })

}

/**
 * 外部资源网络请求
 *  参数1： method (string) 请求的类型 
 *  参数2： url (string) 请求的url地址
 *  参数3： params (json) 请求携带的参数
 *  参数4： message(string) 【loading=boolean】信息弹框内容
 *  参数5： success 成功函数
 *  参数6： fail失败函数
 */
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