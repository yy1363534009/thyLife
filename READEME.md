https://github.com/tntsl/api

The api Project（小程序服务端示例）
About
前后端分离框架，使用shiro+jwt实现权限控制，并集成微信登录注册功能，提供小程序的开发脚手架
加入使用微信code登录并预存登录信息，发送短信验证码，补全个人资料

##使用的开源框架
1、springboot 2、shiro 3、mybatisplus

Prerequisites
Java 1.8+
Maven 3.3+
MySQL 5.6+

Installation
1、已添加路径路由转发，支持请求参数传入v=1.0或者/v1.0/你的路径
Fill out with installation instructions for your project.

License
This software is licensed under the BSD License. For more information, read the file LICENSE.




onlaunch：当小程序初始化完成时，会触发 onLaunch（全局只触发一次）（app.js）；
onLoad: 页面加载
小程序注册完成后，加载页面，触发onLoad方法。一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数（页面js）。
onShow: 页面显示
页面载入后触发onShow方法，显示页面。每次打开页面都会调用一次（比如当小程序有后台进入到前台运行或重新进入页面时）。
onReady: 首次显示页面，页面初次渲染完成，会触发onReady方法，渲染页面元素和样式，一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。
onHide: 页面隐藏
当navigateTo、底部tab切换、上传文件选择图片时调用。
onUnload: 页面卸载
当返回上一页wx.navigateBack、wx.relanch、wx.redirectTo时都会被调用(这里的坑有点深)。
基本上可以说执行顺序为onLaunch–onLoad–onShow–onReady–onHide.
虽然说onLaunch在onLoad之前执行，但是在onLaunch里请求获取是否有权限，等待返回值的时候Page里的onLoad事件就已经执行了。

解决办法：
在APP里面onLanch中的网络请求中设置判断
 if (this.userInfoReadyCallback) {
    this.userInfoReadyCallback(res)
}

在page的onLoad中设置一个回调
app.userInfoReadyCallback = res => {
	if (res != '') {
		console.log("app.globalData.userInfo")
	}
}