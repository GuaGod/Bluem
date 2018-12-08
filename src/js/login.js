import 'babel-polyfill';

import '../less/userHeadFoot.less';
import '../less/universal.less';
import '../less/login.less';


$('#login').click(function() {
    if($('#user').val() === '') {
        layer.open({
            offset:'140px',
            content:'账号不能为空'
        });
        return false;
    }

    if($('#password').val() === '') {
        layer.open({
            offset:'140px',
            content: '密码不能为空'
        })
        return false;
    } 

    $.ajax({
        url:'http://140.143.133.96:8080/servlet/UserController?flag=login',
        data: {
            username:$('#user').val(),
            password:$('#password').val()
        },
        dataType:'json',
        type:'POST',
        success: function(data) {
            layer.open({
                content:data.message,
                offset:'140px'
            })
        },
        error:function(error) {
            layer.open({
                content:"登录失败！请稍后重新尝试",
                offset:'140px'
            });
            console.log(error);
        }
    })

})

$('#register').click(function() {
    window.location.href="./register.html";
})