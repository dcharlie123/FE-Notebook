;(function($){
    var Dialog=function(config){
        var _this=this;
        // 配置
        this.config={
            //宽高
            width:'auto',
            height:'auto',
            //信息
            messages:null,
            //按钮配置
            buttons:null,
            //类型
            type:'waiting',
            //延迟关闭
            delay:null,
            delayCallback:null,
            //遮罩透明度
            maskOpacity:null,
            //是否启动动画
            effect:true,
            //点击遮罩是否关闭
            maskClose:true
        };
        //默认参数扩展
        if(config&&$.isPlainObject(config)){
            $.extend(this.config,config);
        }else{
            this.isnoConfig=true;
        }
        
        //创建DOM
        this.body=$('body');
        //遮罩
        this.mask=$('<div class="g-dialog-container">');
        //弹窗
        this.win=$('<div class="dialog-window">');
        //header
        this.header=$('<div class="dialog-header">');
        //content
        this.content=$('<div class="dialog-content">');
        //footer
        this.footer=$('<div class="dialog-footer">'); 
        //渲染
        this.create();
        // this.mask.tap(function(e){
        //     _this.close();
        //      e.stopPropagation(true);
        // })
    };
    Dialog.zIndex=9999;
    Dialog.prototype={
        animate:function(){
            var _this_=this
            this.win.css('-webkit-transform','scale(0,0)');
            setTimeout(function() {
                _this_.win.css('-webkit-transform','scale(1,1)');       
            }, 100);
            
        },
        create:function(){
            var _this=this,
                config=this.config,
                mask=this.mask,
                win=this.win,
                header=this.header,
                content=this.content,
                footer=this.footer,
                body=this.body;
            //设置层级
            Dialog.zIndex++;
            this.mask.css('zIndex',Dialog.zIndex);
            if(this.isnoConfig){
                //没有传参数，弹waiting框
                win.append(header.addClass('waiting'));
                if(config.effect){
                    this.animate();
                };
                mask.append(win);
                body.append(mask);
            }else{
                header.addClass(config.type);
                win.append(header);
                if(config.messages){
                    win.append(content.html(config.messages));
                };
                if(config.buttons){   
                    this.creatButton(config.buttons)
                    win.append(footer);
                }
                if(config.width){
                    win.css('width',config.width);
                }
                if(config.height){
                    win.css('height',config.height);
                }
                if(config.maskOpacity){
                    mask.css('backgroundColor',"rgba(0,0,0,"+config.maskOpacity+")");
                }
                if(config.delay&&config.delay!=0){
                    window.setTimeout(
                        function(){
                            _this.close();
                            config.delayCallback&&config.delayCallback();
                        },config.delay)
                }
                if(config.effect){
                    this.animate();
                };
                if(config.maskClose){
                    mask.tap(function(){
                        _this.close();
                    })
                };
                mask.append(win);
                body.append(mask);
            }
        },
        close:function(){
           this.mask.remove();
        },
        creatButton:function(bs){
            var _this_=this;
            // for(var i=0;i<bs.length;i++){
            // // var button=''
            //     button='<button class='+bs[i].type+'>'+bs[i].text+'</button>'
            //     this.footer.append(button)
            // }
            $(bs).each(function(i){
                var type=this.type?this.type:'';
                var text=this.text?this.text:'按钮'+(++i);
                var callback=this.callback?this.callback:null;
                button=$('<button class='+type+'>'+text+'</button>')
                if(callback){
                    button.tap(function(e){
                        var isClose=callback();
                        //阻止冒泡
                        e.stopPropagation();
                        if(isClose!=false){
                            _this_.close();
                        }
                    })
                }else{
                    button.tap(function(){
                        _this_.close();
                    })
                }
                _this_.footer.append(button)
            });
        }
    };
    
    window.Dialog=Dialog;
    $.Dialog=function(config){
        return new Dialog(config);
    }
})(Zepto);