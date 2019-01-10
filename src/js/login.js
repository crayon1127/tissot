require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery","url","header","footer","cookie"], ($,url) => {
			
			$(function(){
				var flag = false;
				console.log(flag);
				//如果已经有cookie则将用户名与密码放入input框中
				if($.cookie("id")!=null){
					var arr = JSON.parse($.cookie("id"));
					console.log(arr.name);
					$("#name").val(arr.name);
					$("#password").val(arr.psword);
				}else{
					if(confirm("没有账号？先注册吧")){
						window.location.href = "/register.html";
					}
				}
				
				
				//无数据库时候的登录
				//登录按钮确认用户名密码是否匹配正确
				/*$("#login").on("click",function(e){
					e.preventDefault();
					var id = $("#name").val() ,
						psword = $("#password").val();					
					var arr = JSON.parse($.cookie("id"));
					if(id == arr.name && psword == arr.psword){
						flag = true;
					}else{
						flag = false;
					}
					//如果flag为真则正确
					if(flag){
						alert("登录成功！去购物吧！");
						
						var onlineUser = {
							id:id
						}
						$.cookie("user",JSON.stringify(onlineUser),{path: '/' });
						console.log($.cookie("user"));
						window.location.href="/index.html"
					}else{
						alert("请输入正确的账号密码");
					}
				})	*/	
					
					
				//依赖数据库的登录
				
				$("#login").on("click",function(e){
					$.ajax({
					type: "post",
					url: url.baseUrlPhp + "/api/v1/login.php",
					data: {
						"username": $("#name").val(),
						"password": $("#password").val()
					},
					success: function(res){
						if(res.res_code){
							if(confirm("登录成功，去首页")){
								var id = $("#name").val();
								var onlineUser = {
									id:id
								}
								$.cookie("user",JSON.stringify(onlineUser));
								window.location.href = "/index.html";
							}
						}else{
							console.log(res);
						}
					},
					dataType:"json"
				})
				e.preventDefault();
				return false;
				})
					
				
					
					
			
		})
	})
})