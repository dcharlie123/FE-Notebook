##Ajax
###一、js原生Ajax
####1.创建
IE7及其以上版本用`var oAjax=new XMLHttpRequest();`
IE6用`var oAjax=new ActiveXObject('Microsoft.XMLHTTP');`
####2.连接和发送
```javascript
oAjax.open(type,url,true)
```
1.要发送的请求类型（get，post等）</br>
<backquote>
######get方法：
		1.缓存 在url？后面连接一个随机数，时间戳
		2.乱码 编码encodeURI
</backquote></br>
```javascript
oAjax.open('get','2.get.php?username='+encodeURI('刘伟')+'&age=30&' + new Date().getTime(),true);
```
2.请求的url</br>
3.是否异步发送</br>
oAjax.send() 方法接收一个参数，作为请求主体发送的数据。如果不需要通过请求主体发送数据，这里必须传入 null ，因为这个参数对有些浏览器来说是必需的。调用 send() 之后，请求就会被分派到服务器。
####3.接收
```javascript
oAjax.onreadystatechange=function(){
	do something
}
```
####完整封装
```javascript
ajax({
        url: "./TestXHR.aspx",              //请求地址
        type: "POST",                       //请求方式
        data: { name: "super", age: 20 },        //请求参数
        dataType: "json",
        success: function (response, xml) {
            // 此处放成功后执行的代码
        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
    });

    function ajax(options) {
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);

//创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
//连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }

//接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }
    }
//格式化参数
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace(".",""));
        return arr.join("&");
    }

```
###二、jquery Ajax
一.load()方法
```javascript
	$(selector).load(URL,[data],[callback],[type]);
	type:text|html|json|script
```
######demo1：
html部分：
```javascript
	<div id="div1"></div>
```
数据部分：
```javascript
			<h2>jQuery and AJAX is FUN!!!</h2>
			<p id="p1">This is some text in a paragraph.</p>
```
js部分：
			1.加载全部
```javascript
			$("#div1").load("demo_test.txt");
```
			2.加载指定
```javascript
			$("#div1").load("demo_test.txt #p1");
			$("#div1").load('demo_test.txt',{type:xxx},function(){})
```
	可选的 callback 参数规定当 load() 方法完成后所要允许的回调函数。回调函数可以设置不同的参数：
		responseTxt - 包含调用成功时的结果内容
		statusTXT - 包含调用的状态
		xhr - 包含 XMLHttpRequest 对象
demo2：
```javascript
		$("button").click(function(){
		  $("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
		    if(statusTxt=="success")
		      alert("外部内容加载成功！");
		    if(statusTxt=="error")
		      alert("Error: "+xhr.status+": "+xhr.statusText);
		  });
		});
```
二.get()方法
	$.get(URL,callback);

	demo3：
		$("button").click(function(){
		  $.get("test.php",'url=',function(data,status){
		    alert("Data: " + data + "\nStatus: " + status);
		  });
		});
	demo:
		$(function () {
			$("input").click(function () {
				$.get('test.php?url=baidu.com', function (response,status,xhr) {
					$('#box').html(response);
				 })
			})
		});
三.post()方法
	$.post(URL,data,callback);
	必需的 URL 参数规定您希望请求的 URL。
	可选的 data 参数规定连同请求发送的数据。
	可选的 callback 参数是请求成功后所执行的函数名。

	demo4：
		$("button").click(function(){
		  $.post("demo_test_post.asp",
		  {
		    name:"Donald Duck",
		    city:"Duckburg"
		  },
		  function(data,status){
		    alert("Data: " + data + "\nStatus: " + status);
		  });
		});
	demo:
		$(function () {
			$("input").click(function () {
				$.post('test.php',{
					url:'baidu.com'//post提交可以使用对象键值对
				}, function (response,status,xhr) {
				$('#box').html(response);
				})
			})
		});
四.ajax()方法
```javascript
	$.ajax({
		url:url,
		type:'post',
		data:sendData,
		success:function(data){
			if(data=='true'){

			}else{

			}
		}
	})
```
```javascript
	$(document).ajaxStart(function(){
		do something;
	}).ajaxStop(function(){
		do something;
	})
```
	表单获取用$('form').serialize();

