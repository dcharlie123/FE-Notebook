##前端‘学习’？？？
###Jekyll博客搭建踩坑记！！！
######——————基于window10平台
####ruby安装
上[rubyinstaller](http://rubyinstaller.org/downloads/)下载ruby</br>
默认路径安装（**记得勾选上添加到环境变量**）</br>
等待安装完成,在命令行输入`ruby -v`,显示版本号说明安装完成;</br>
####Devkit安装
在[rubyinstaller](http://rubyinstaller.org/downloads/)下载并解压</br>
进入解压的文件夹,打开命令行,输入`ruby dk.rb init`生成config.yml配置文件</br>
打开文件看是否已添加ruby的安装路径,没有则手动添加,格式*-空格ruby的安装目录*</br>
然后执行命令`ruby dk.rb install`;</br>
####安装rubygems
先上步骤后吐槽~~
在[RubyGems](https://rubygems.org/pages/download/)下载zip并解压</br>
进入解压目录,打开命令行输入`ruby steup.rb`等待安装完成
`gem -v`查看版本！！！</br>
####吐槽
看jekyll教程万脸懵逼~为什么最新的ruby自带的gem才2.5x,教程上要求gem版本至少`2.60`以上。。。
这里是个坑。。。然后导致我yekyll安装不了。。。然后百度一下说更改淘宝源
<pre><code>
//删除默认的官方源
gem sources -r https://rubygems.org/
//添加淘宝源
gem sources -a https://ruby.taobao.org/
//查看当前源
gem sources -l  
</code></pre>
what???这里我弄了好久。。。</br>
把原来的源删了。。。</br>
成功了。。。</br>
新的源添加不进去</br>
把旧的源还不回去...</br>
???</br>
又百度了一下https要换http？？？
。。。没啥卵用
后来才知道淘宝的源关闭了
找到一个*ruby中文社区？？？*</br>
按他的方法更改源
`gem source -a https://gems.ruby-china.org`
是不是source少了个s？？？
我不知道~~反正这样我电脑改不了。。。</br>
然后我又按它的方法安装**gems**
<pre>`gem update --system`</pre>
但是没啥卵用
最后在segmentfault找了一篇ruby安装教程才搞定gems的安装
###对啦，我的源还是空的呢
所以，用又用之前的`gem sources -a url`
######可是，还是用不了，一样中文社区的源添不进、原来的源还不回。。。
######在我把问题写好截图想发上segmentfault时，发现发不上去了。。。segmentfault又挂了/(ㄒoㄒ)/~~挂的真是时候
######就在这时机智的我想的上面淘宝源那个https、http有两种,https://gems.ruby-china.org我只试了https，于是我输入
<pre><code>gem sources -a http://gems.ruby-china.org</code></pre>
好了！！！！！！！！！！
~~~搭个博客的这么多坑凸(艹皿艹 )
