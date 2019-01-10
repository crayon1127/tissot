require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery","url","header","footer","cookie"], ($,url) => {
			//注册成功标记
			var flagone = false,flagtwo = false,flagthree = false,flagfour = false;
			//正则
				var regName = /^\w+$/;
				var regPsone = /^.{6,}$/;
				var regTel =  /^1\d{10}$/;
			
			//验证用户名
			$("#userName").on("blur",function(){
				var name = $("#userName").val();
				if(!regName.test(name)){
					$("#name").css({opacity:"1"});
					flagone = false;
				}else{
					flagone = true;
					$("#name").css({opacity:"0"});
				}
			})
			
			//验证密码
			$("#passWord").on("blur",function(){
				var pswordone = $("#passWord").val();
				console.log(pswordone);
				if(!regPsone.test(pswordone)){
					$("#passwd").css({opacity:"1"});
					flagtwo = false;
				}else{
					$("#passwd").css({opacity:"0"});
					flagtwo = true;
				}
			})
			
			//确认密码
			$("#wordAgain").on("blur",function(){
				var pswordone = $("#passWord").val();
				var pswordtwo = $("#wordAgain").val();	
				if(pswordone != pswordtwo){
					$("#wordag").css({opacity:"1"});
					flagthree = false;
				}else{
					$("#wordag").css({opacity:"0"});
					flagthree = true;
				}
			})
			
			//验证手机
			$("#telNum").on("blur",function(){
				var telnum = $("#telNum").val();
				console.log(telnum);
				if(!regTel.test(telnum)){
					$("#tel").css({opacity:"1"});
					flagfour = false;
				}else{
					$("#tel").css({opacity:"0"});
					flagfour = true;
				}
			})
			
			
			//无数据库时的注册
			
			/*$("#zc").on("click" , function(e){
				//判断是否注册成功
				e.preventDefault();
				if(flagone&&flagtwo&&flagthree&&flagfour){
					//取用户名密码邮箱存入cookie
					var name = $("#userName").val(),
						pswordone = $("#passWord").val();
					var obj ={
						name:name,
						psword:pswordone,
					};
					$.cookie("id",JSON.stringify(obj));
					console.log($.cookie("id"));
					alert("注册成功");
					window.location.href="login.html";
				}
			})*/
			
			
			//依赖数据库的注册
			
			$("#zc").on("click",function(e){
				e.preventDefault();
				if(flagone&&flagtwo&&flagthree&&flagfour){
					//用ajax提交
					$.ajax({
						type:"post",
						url:url.baseUrlPhp + "/api/v1/register.php",
						data: {
							"username": $("#userName").val(),
							"password": $("#passWord").val()
						},
						success: function(res){
							if(res.res_code){
								if(confirm("注册成功，去登录")){
									//取用户名密码存入cookie
									var name = $("#userName").val(),
										pswordone = $("#passWord").val();
									var obj ={
										name:name,
										psword:pswordone,
									};
									$.cookie("id",JSON.stringify(obj));
									window.location.href = "/login.html";
								}
							}else{
								alert("用户已存在");
							}
						},
						dataType:"json"
					})
				}
				return false;
			})
				
							
	})
})
		
			