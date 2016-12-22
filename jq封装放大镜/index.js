;(function($){
    var Zoom =function(el,config){
        var _this=this;
        
        // 配置
        $(el).mouseenter(function(e){
             var Xrate,Yrate;
            _this.create();
            
            $(this).mousemove(function(e){
                var X=e.pageX - $(this).offset().left - $('#win').width()/2;
                var Y= e.pageY-$(this).offset().top-$('#win').height()/2;
                Xrate=$('#bigPic>img').width()/$('#smPic>img').width()
                Yrate=$('#bigPic>img').height()/$('#smPic>img').height();
                if(X<0){
                    X=0;
                }else if(X>$(this).width()-$('#win').width()){
                    X=$(this).width()-$('#win').width();
                }
                if(Y<0){
                    Y=0;
                }else if(Y>$(this).height()-$('#win').height()){
                    Y=$(this).height()-$('#win').height()
                }
                $('#win').css({'top':Y,'left':X,'backgroundColor':'rgba(255,255,255,0.3)'});
                $('#bigPic>img').css({'top':-Yrate*Y,'left':-Xrate*X});
            });
            
        });
        
        $(el).mouseleave(function(){
            _this.remove();
        });
        this.config={
            width:'200',
            height:'200',
            Pic:'./800.jpg'
        };
        
        if(config&&$.isPlainObject(config)){
            $.extend(this.config,config);
        }else{
            this.isnoConfig=true;
        }
        this.body=$('body');
        this.bigPic=$('<div id="bigPic"><img src="'+this.config.Pic+'" alt=""></div>');
        this.win=$('<div id="win"></div>')
        
    };
    Zoom.prototype={
        create:function(){
           
            var mask=$('<div id="mask">')
            $('#smPic').append(mask);
            var _this_=this,
                body=this.body,
                bigPic=this.bigPic,
                win=this.win;
            win.css({'width':this.config.width,'height':this.config.height});
            mask.append(win);
            body.append(bigPic);
            bigPic.css({'left':$('#smPic').width()+$('#smPic').offset().left+20,'top':$('#smPic').offset().top+40})
           
        },
        remove:function(){
            $('#bigPic').remove();
            $('#mask').remove();
            $('#win').remove();
        }
    };
    $.fn.Zoom = function (config) {
        return new Zoom(this,config);
    };
})(jQuery);