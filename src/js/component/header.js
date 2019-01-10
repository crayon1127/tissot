define(["jquery","cookie"], () => {
	class Header{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			new Promise((resolve, reject) => {
				$("header").load("/html/component/header.html", () => {
					resolve();
				})
			}).then(() => {
				this.carinform();
				this.nav();
				this.slide();
				this.tab();
				this.shop();
				this.car();
				this.top();
			})
			
		}
		nav(){
			$("nav").on("mouseenter", "li", function(){
				//alert($(this).html());
				$(".shop").css({display:"block"});
				
			});
			
			$("nav").on("mouseleave", "li" ,function(){
				if(!$(".shop").hasClass("noshow")){
					setTimeout(function(){$(".shop").css({display:"none"});},100);
				}else{
					$(".shop").css({display:"none"});
				}
			})
		}
		
		car(){
			
			$("#car").on("click",function(){
				if($("#box").css("display") == 'none'){
					$("#box").css({display:"block"});
					$("#box").animate({height:180},{
		         		easing: "swing",
		         		duration: 500
		        	});
				}else{
					setTimeout(function(){$("#box").css({display:"none"});},500)
					$("#box").animate({height:0},{
		         		easing: "swing",
		         		duration: 500
		        	});
		        	
				}
				
			})
		}
		
		tab(){
			$("#tab li").on("mouseover", function(){
				$(this).parent().next().children().eq($(this).index()).addClass("ac").siblings().removeClass("ac");
			});
		}
		
		shop(){
			$(".shop").on("mouseover",function(){
				$(".shop").css({display:"block"});
			});
			$(".shop").on("mouseleave",function(){
				$(".shop").css({display:"none"});
			})
		}

		slide(){
			$(function () { 
				var scrollTop = $(window).scrollTop();//scrollTop()垂直位置的
			        if(scrollTop > 80){
	        	 		//hasClass()是判断是否有fixed 
			        	if(!$(".top").hasClass("fixed")){
			        		$(".top").addClass("fixed");
			        		$(".logo").addClass("del");
			        		$("header").css("border","none");	
			        		$("#box").css({display:"none"});
			        	}
			        }else{
			        	$(".top").removeClass("fixed");
			        	$(".logo").removeClass("del");
			        	$("header").css("border-bottom","1px solid");	
			        }
			
			
			
			$(window).on("scroll",function(){
					var scrollTop = $(window).scrollTop();//scrollTop()垂直位置的
					
			        if(scrollTop > 80){
			        	
	        	 		//hasClass()是判断是否有fixed 
			        	if(!$(".top").hasClass("fixed")){
			        		$(".top").addClass("fixed");
			        		$(".logo").addClass("del");
			        		$("header").css("border","none");
			        		setTimeout(function(){$("#box").css({display:"none"});},500)
			        		$("#box").animate({height:0},{
		         				easing: "swing",
		         				duration: 500
		        			});
			        	}
			        }else{
			        	$(".top").removeClass("fixed");
			        	$(".logo").removeClass("del");
			        	$("header").css("border-bottom","1px solid");
			        	
			        }		  		
		  		})
			
			});
		}
		
		
		
		
		top(){
			//当滚动条的位置处于距顶部200像素以下时，跳转链接出现，否则消失
			$(window).on("scroll",function(){
				var scrollTop = $(window).scrollTop();//scrollTop()垂直位置的
				if(scrollTop > 200){
					//console.log(1);
					$("#totop").fadeIn(500);
				}else{
					//console.log(0);
					$("#totop").fadeOut(500);
				}
				//当点击跳转链接后，回到页面顶部位置
			})
			
			$("#totop").on("click",function(){
					
					$("body,html").animate({scrollTop:0},500);
					
			})

		}
		
		carinform(){
				if($.cookie("carLab")){
					var cLab = JSON.parse($.cookie("carLab"));
					console.log(cLab);
					$(".watchNum").html( cLab.num );
					$("#allmoney").html(" ¥ "+ cLab.money);
				}
				
				if($.cookie("user")){
					var userName = JSON.parse($.cookie("user"));
					$("#myid").html(userName.id);
					$("#gotologin").attr('href','#');
					$("#exit").css({display:"inline-block"});
					$("#exit").on("click",function(){
						if(confirm("您要退出账号吗？")){
							$.cookie("user",JSON.stringify(userName),{ expires: -1});
							window.location.reload();
						}
					})
				}
		}

		
	}
	return new Header();
})

