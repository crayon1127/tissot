define(["jquery"], () => {
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
				this.nav();
				this.slide();
				this.tab();
				this.shop();
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
			$(window).on("scroll",function(){
		  		var scrollTop = $(window).scrollTop();//scrollTop()垂直位置的
		        if(scrollTop > 60){
        	 		//hasClass()是判断是否有fixed 
		        	if(!$(".top").hasClass("fixed")){
		        		$(".top").addClass("fixed");
		        		$(".logo").addClass("del");
		        		$("header").css("border","none");	
		        	}
		        }else{
		        	$(".top").removeClass("fixed");
		        	$(".logo").removeClass("del");
		        	$("header").css("border-bottom","1px solid");	
		        }
		  	})
		}

	}
	return new Header();
})

