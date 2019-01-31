# wosi-demo

由 chameleon 实现的一款跨小程序、h5 和 native 端的背单词软件，

本代码无后端，接口均由 chameleon 自带的 mock 功能完成，所以，你可能无法使用软件的全部功能

运行方法：

`git clone https://github.com/Bowen7/wosi-demo.git`

`cd wosi-demo`

`npm install`

如没有全局安装 chameleon-tool，先安装 chameleon-tool：

`npm i -g chameleon-tool`

安装完成后：

`cml dev`启动项目

-   web 端可以点击模拟器内页面右上角打开新的浏览器窗口。
-   native 端可下载 weex playground app 预览
-   小程序端请使用微信开发者工具，打开项目根目录下的 `/dist/wx` 目录预览

注意：由于是 mock 的接口，微信小程序需点击开发者工具右上角`详情`，再勾选`不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书`选项，保证 mock 数据正常

### 页面截图

下面是运行在 h5、微信小程序、weex 的截图：

#### h5

![](https://blog-mars.oss-cn-hangzhou.aliyuncs.com/assets/wosi_demo_web_1.png)

![](http://blog-mars.oss-cn-hangzhou.aliyuncs.com/assets/wosi_demo_web_2.png)

![](http://blog-mars.oss-cn-hangzhou.aliyuncs.com/assets/wosi_demo_web_3.png)

#### 小程序

![](http://blog-mars.oss-cn-hangzhou.aliyuncs.com/assets/wosi_demo_wx_1.png)

![](http://blog-mars.oss-cn-hangzhou.aliyuncs.com/assets/wosi_demo_wx_2.png)

![](http://blog-mars.oss-cn-hangzhou.aliyuncs.com/assets/wosi_demo_wx_3.png)

#### weex

![](http://blog-mars.oss-cn-hangzhou.aliyuncs.com/assets/wosi_demo_weex_1.png)

![](http://blog-mars.oss-cn-hangzhou.aliyuncs.com/assets/wosi_demo_weex_2.png)

![](http://blog-mars.oss-cn-hangzhou.aliyuncs.com/assets/wosi_demo_weex_3.png)
