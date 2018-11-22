layer.config({
    skin: 'layui-layer-molv'
})
var loginBtn=$('#login-btn');
var user=$('#user'); 
var password=$('#password');
loginBtn.click(function(){
	if(password.val()===''||user.val()===''){
		alert("账号密码不能为空");
	}else{
		$.ajax({
			url:'http://140.143.133.96:8080/servlet/UserController?flag=login',
			data:{
              username:$('#user').val(),
              password:$('#password').val()
			},
			type:'POST',
			dataType:'json',
            success:function(data){
               layer.open({
               	content:data.message,
               	offset:'140px'
               })
               if(data.stateCode!=0){
                sessionStorage.setItem('name',data.name);
                sessionStorage.setItem('stateCode',data.stateCode);
                sessionStorage.setItem('stuId',data['stu_id']);
                window.location.href="../mainPage.html";
               }
            },
            error:function(){

            },
		})
	}
})