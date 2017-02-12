;(function($,window,document,undefined) {
   function FullPage(elements,opt) {
   	  this.elements = elements;//全屏切换DOM的最外层容器
      this.defaults = {//默认的配置参数
        fullpagebox: '.fullpage-pagebox',//全屏页面的父容器
        fulleachpage: '.fullpage-page-vertical',//全屏页面
        index: 0, //存储页面编号
        duration: 500,//全屏页面的切换时间
        easing: "swing",//切换时的Timming Function，与jQuery的animate()方法的取值一样
        loop: false,//是否允许循环切换
        callback: null,//每一屏切换完成时的回调函数
        paginable: true //是否添加分页模块
      };
      this.options = $.extend({},this.defaults,opt || {});
   }
   
   FullPage.prototype = {
   	   //初始化函数，插件中的方法都在该函数里调用
   	   initialize: function() {
   	   	    this.fullpagebox = this.elements.find(this.options.fullpagebox);
   	   	    this.fulleachpage = this.elements.find(this.options.fulleachpage);
   	   	    this.pagesnumber = this.fulleachpage.length;
   	   	    this.index = this.options.index;
   	   	    this.slidable = true;//起到优化滚轮事件的作用
   	   	    this.pagination();
   	   	    this.bindEvent();

   	   	    var position = this.fulleachpage.eq(this.index).position();
   	   	    this.fullpagebox.css({top: -position.top + "px"});
   	   	    //alert(this.pagesnumber);
   	   },

       //插件中的事件绑定都由该函数完成
   	   bindEvent: function() {
   	   	    var that = this;
   	   	    //鼠标滚轮事件
   	   	    this.elements.on("mousewheel DOMMouseScroll",function(event) {
   	   	    	if(that.slidable) {
   	   	    		//移除分页样式
   	   	    		if(that.options.paginable) {
   	   	    		    that.pagination.find('.fullpage-point').eq(that.index).removeClass('fullpage-active');
   	   	    	    }
     	            event = event || window.event;
     	            var delta = (event.originalEvent.wheelDelta && (event.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                                (event.originalEvent.detail && (event.originalEvent.detail > 0 ? -1 : 1));              // firefox
                    if (delta > 0) {  // 向上滚
                        if(that.index === 0) {
                           if(that.options.loop) {
                       	       that.index = that.pagesnumber - 1;
                       	       //that.slide();
                           } 
                        } else if(that.index > 0 && that.index < that.pagesnumber) {
                    	    that.index--;
                    	    //that.slide();
                        }
                    } else if (delta < 0) {  // 向下滚
                    
                        if(that.index === that.pagesnumber - 1) {
                    	    if(that.options.loop) {
                       	       that.index = 0;
                       	       //that.slide();
                            }
                        } else if(that.index >= 0 && that.index < that.pagesnumber-1) {
                               that.index++;
                       	       //that.slide();
                        }
                    }
                
                	that.slide();
                	//添加分页样式
                	if(that.options.paginable) {
                        that.pagination.find('.fullpage-point').eq(that.index).addClass('fullpage-active');
                    }
                    //console.log(that.index);
                }
            });
            //分页点击事件
            if(this.options.paginable) {
                this.pagination.find('.fullpage-point').click(function() {
            	    that.pagination.find('.fullpage-point').eq(that.index).removeClass('fullpage-active');
                    that.index = $(this).index('.fullpage-point');
                    //alert(that.index);
                    //alert($(this).index('.fullpage-point'));
                    that.slide();
                    that.pagination.find('.fullpage-point').eq(that.index).addClass('fullpage-active');
                });
            }

            //窗口resize事件
            $(window).on('resize',function() {
                //var count = that.index;
                //that.pagination.find('.fullpage-point').eq(that.index).addClass('fullpage-active');
                var position = that.fulleachpage.eq(that.index).position();
   	   	        that.fullpagebox.css({top: -position.top + "px"});
            });
           
   	   },

   	   //滑动动画函数，实现页面向前或向后滑动
   	   slide: function() {
   	   	    var that = this;
   	   	    that.slidable = false;
   	   	    //获取目标屏的位置
   	   	    var position = this.fulleachpage.eq(this.index).position();
   	   	    //(selector).animate({styles},speed,easing,callback)
   	   	    this.fullpagebox.animate({top: -position.top + "px"},this.options.duration,this.options.easing, function() {
   	   	   	    that.slidable = true;
   	   	   	    if(that.options.callback && Object.prototype.toString.call(that.options.callback)=== '[object Function]') {
   	   	   	   	    that.options.callback();
   	   	   	    }
   	   	    });
   	   },

   	   //分页功能
   	   pagination: function() {
            if(this.options.paginable) {
            	var paginationHTML = '';
            	for (var i = 0; i < this.pagesnumber; i++) {
            		paginationHTML+='<li class="fullpage-pagination-item"><a href="#"><span class="fullpage-point"></span></a></li>';
            	}
            	this.pagination = $('<ul class="fullpage-pagination">'+paginationHTML+'</ul>');
            	this.pagination.appendTo(this.elements);
            	//分页居中
            	var margintop = -parseInt(this.pagination.css('height'))/2;
            	this.pagination.css('margin-top',margintop+'px');
            	//alert(pagination.css('margin-top'));
                this.pagination.find('.fullpage-point').eq(this.index).addClass('fullpage-active');
            	
            }
   	   }  
   };

   $.fn.fullpage = function(cfg) {
     var a = new FullPage(this,cfg);
     //this.cfg = $.extend({},this.options,cfg||{});
     a.initialize();
     console.log(this);
   };
//使用该组件时直接用该组件的最外层容器调用fullpage(obj)方法即可
//obj是一个对象字面量，接受构造函数中列举的默认配置参数
})(jQuery,window,document)