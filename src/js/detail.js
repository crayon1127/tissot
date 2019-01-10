require(["./requirejs.config"], () => {
  require(["jquery", "url", "header","footer","cookie"], ($, url) => {
    $(function(){
      //获取id
      let arrSearch = location.search.slice(1).split("=");
      let searchObj = {};
      searchObj[arrSearch[0]] = arrSearch[1];
      
			
			
      $.ajax({
        url:url.baseUrlRap+"/detail",
        type:"GET",
        data: searchObj,
        dataType:"json",
        success: function(res){

          var monthpay = Number(res.res_body.price/12).toFixed(2);
          $("#title").html(res.res_body.title);
          $("#type").html(res.res_body.type);
          $("#price").html(res.res_body.price);
          $(".watch").attr("src",res.res_body.img);
          $(".watchone").attr("src",res.res_body.img1);
          $(".watchtwo").attr("src",res.res_body.img2);
          $(".watchthree").attr("src",res.res_body.img3);
          $("#monthpay").html(monthpay);

          var obj = {
          	id:searchObj.id,
          	title:res.res_body.title,
          	price:res.res_body.price,
          	img:res.res_body.img
          }
          console.log(obj);
          //放大镜
          $("#watchshow li").on("mouseover", function(){
						$(this).parent().prev().children().eq($(this).index()).addClass("bigmigshow").siblings().removeClass("bigmigshow");
					})

           $(".addcar").on("click",function(){
           	
           	var arr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
           	obj.num = $("#num").val();
           	var flag = true; //标志位思想
						for(var i = 0; i < arr.length; i++){
							if(arr[i].id === searchObj.id){
								arr[i].num = Number(arr[i].num) + Number(obj.num);
								flag = false;
								break;
							}
						}
						if(flag){
							//flag为true的话代表一次都没有进入if
							arr.push(obj);
						}
						if(i === arr.length){
							//如果i跟length相等，说明没有遇到break
							arr.push(obj);
						}
						
			 	 		$.cookie("cart",JSON.stringify(arr));
	         	console.log($.cookie("cart"));
	         	alert("添加成功,去查看");
	         	window.location.href="shoppingcar.html";
	         	$("#num").val(1);
		  })
        }
		
      })
      
	 
	  
    })
  })
})
