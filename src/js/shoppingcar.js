require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "header","footer","cookie"], () => {
		
		if($.cookie("cart")!=null){
		$(".mycar").css({display:"block"});
		//通过cookie拼接购物车
		var arr = JSON.parse($.cookie("cart"));	
		calcPrice();
		var str ="";
		for(var value of arr){
				str += '<tr class="watch">'+
							'<td><a href="detail.html?id='+value.id+'"><img src="'+value.img+'"/><p>'+value.title+'</p></a></td>'+
							'<td><span>￥'+value.price+'</span></td>'+
							'<td><span class="min">-</span><input type="text" name="" class="Nwatch" value="'+value.num+'" /><span class="add">+</span></td>'+
							'<td>￥<span class="SingleCprice">'+value.cPrice+'</span><div class="del">移除商品</div></td>'+
						'</tr>';
				$(".tbody").html(str);
		}
			
		}else{
			$(".null").css({display:"block"});
			$(".box").css({display:"none"});
		}
		       

		$(".min").on("click",function(){
			var num = $(this).next().val();
			num--;
			var trNum = $(this).parent().parent().index();
			var thisCprice = $(this).parent().next().children(":first");	
			arr[trNum].num--;	
			calcPrice();
			thisCprice.html(arr[trNum].cPrice);
			$(this).next().val(num);
			if(arr[trNum].num < 1){
				alert("数量最小为1！");
				$(this).next().val(1);
				arr[trNum].num = 1;
				calcPrice();
				thisCprice.html(arr[trNum].cPrice);
			}
		})

		
		$(".add").on("click",function(){
			var num = $(this).prev().val();
			num++;
			var trNum = $(this).parent().parent().index();
			var thisCprice = $(this).parent().next().children(":first");
			arr[trNum].num++;
			calcPrice();
			thisCprice.html(arr[trNum].cPrice);
			$(this).prev().val(num);
		})
		
		$(".del").on("click",function(){			
			if(confirm("确认删除？")){
			var trNum = $(this).parent().parent().index();
				arr.splice(trNum,1);
				$(this).parent().parent().remove();
				console.log(arr);
				calcPrice();
				console.log($.cookie("cart"));
				if(arr.length === 0){
					$.cookie("cart",JSON.stringify(arr),{expires:-1});
					window.location.reload();
				}
			}			
		})
		
		$(".Nwatch").on("blur",function(){
			var thisCprice = $(this).parent().next().children(":first");
			var trNum = $(this).parent().parent().index();
			arr[trNum].num = $(this).val();
			arr[trNum].cPrice = ($(this).val())*(arr[trNum].price);
			calcPrice();
			thisCprice.html(arr[trNum].cPrice);
		})
		
		$(".js").on("click",function(){
			if(!$.cookie("user")){
				alert("您还没有登录，请先登录");
				window.location.href = " login.html ";
			}else{
				window.location.href = "settlement.html"	
			}
		})

		function calcPrice(){
			var shopNumber = arr.length;
			var cPrice = [];
			var all = 0;
			for(var i=0;i<arr.length;i++){
				var money = arr[i].num*arr[i].price;
				all += money;
				cPrice.push(money);
				arr[i].cPrice = money;
				$("#allspend").html(" ¥ "+all);
				$.cookie("cart",JSON.stringify(arr));
			}
			$(".watchNum").html( shopNumber );
			$("#allmoney").html(" ¥ "+ all);
			
			var carInform = {
				money:all,
				num:shopNumber
			}
			$.cookie("carLab",JSON.stringify(carInform));
			//console.log($.cookie("carLab"));	
		}
		
	})
})
