# test
##前端学习——cookie总结
######cookie : 存储数据，当用户访问了某个网站（网页）的时候，我们就可以通过cookie来像访问者电脑上存储数据
	1. 不同的浏览器存放的cookie位置不一样，也是不能通用的
	2. cookie的存储是以域名形式进行区分的
	3. cookie的数据可以设置名字的
	4. 一个域名下存放的cookie的个数是有限制的，不同的浏览器存放的个数不一样
	5 .每个cookie存放的内容大小也是有限制的，不同的浏览器存放大小不一样
我们通过document.cookie来获取当前网站下的cookie的时候，得到的字符串形式的值，他包含了当前网站下所有的cookie。他会把所有的cookie通过一个分号+空格的形式串联起来。如果我们想长时间存放一个cookie。需要在设置这个cookie的时候同时给他设置一个过期的时间。cookie默认是临时存储的，当浏览器关闭进程的时候自动销毁。
####原生js封装setCookie和getCookie
#####setCookie:
```javascript
var setCookie=function(key,value,time){
	var d = new Date();
	d.setTime(d.getTime()+(time*24*3600*1000));
	var expires = 'expires='+d.toUTCString();
	document.cookie = key + '=' + value + ';' +expires;
}
```
#####getCookie:
```javascript
var getCookie=function(key) {
	var arr1 = document.cookie.split('; ');
	for (var i=0; i<arr1.length; i++) {
		var arr2 = arr1[i].split('=');
		if ( arr2[0] == key ) {
			return decodeURI(arr2[1]);
		}
	}
}
var removeCookie=function(key) {
	setCookie(key, '', -1);
}
```
####jquery.cookie中的操作：jquery.cookie.js是一个基于jquery的插件
##### 读取
```javascript
$.cookie('cookieName');
```
#####创建
```javascript
$.cookie('cookieName','cookieValue');
```
注：当没有指明cookie时间时，所创建的cookie有效期默认到用户浏览器关闭止，故被称为会话cookie。
##### 存储
```javascript
$.cookie('cookieName','cookieValue',{expires:7});//存储一个带7天期限的 cookie 
```
#####创建一个存储7天并带有效路径的cookie
```javascript
$.cookie('cookieName','cookieValue',{expires:7,path:'/'});//注：如果不设置有效路径，在默认情况下，只能在cookie设置当前页面读取该cookie，cookie的路径用于设置能够读取cookie的顶级目录。
```
#####创建一个持久并带有效路径和域名的cookie
```javascript
$.cookie('cookieName','cookieValue',{expires:7,path:'/',domain:'chuhoo.com',secure:false,raw:false});
/*注：domain：创建cookie所在网页所拥有的域名；secure：默认是false，如果为true，cookie的传输协议需为https；raw：默认为false，读取和写入时候自动进行编码和解码（使用encodeURIComponent编码，使用decodeURIComponent解码），关闭这个功能，请设置为true。*/
```
#####删除cookie
```javascript
$.cookie('cookieName',null);
//注：如果想删除一个带有效路径的cookie，如下：$.cookie('cookieName',null,{path:'/'});
```



#####————————dcharlie123整理于2016年10月16日
