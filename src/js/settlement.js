require(["./requirejs.config"], () => {
	//引入list需要依赖的模块
	require(["jquery","header","footer","cookie"], () => {
		$(function(){
			if($.cookie("user")){
				var allMoney = JSON.parse($.cookie("carLab")).money;			
				console.log(allMoney);
				var arr = JSON.parse($.cookie("cart"));
				console.log(arr);
				var str ="";
				for(var value of arr){
					str += '<tr>'+
								'<td><p>'+value.title+'</p></td>'+
								'<td><span>¥ '+value.price+'</span></td>'+
								'<td><span>'+value.num+'</span></td>'+
								'<td><span>￥'+value.cPrice+'</span></td>'+
							'</tr>'
					
					
					$(".tbody").html(str);
				}
				
				$("#allspend").html("￥"+allMoney);
				$(".buy").on("click",function(){
					alert("购买成功");
				})
			}else{
				window.location.href="/index.html";
			}
			
			
		})
		
		
	})
})