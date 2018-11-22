layer.config({
    skin: 'layui-layer-molv'
})
//移动端处理header
var $headerRight = $('.header-right');
var $header = $('header');
$('.header-btn').click(function() {
    if ($header.css('height') == '50px') {
        $header.css({ 'height': '100px' });
    } else {
        $header.css({ 'height': '50px' });
    }
});
//检测用户的状态
var $login = $('#login');
//点击出现圆球

$(document).bind('click', function(event) {
    var ball = $('<div></div>');
    var bColor = ['#4e72b8', '#d64f44', '#45b97c', '#f173ac', '#C0FF3E', '#9370DB', '#303030'];
    ball.css({
        left: event.pageX - 25 + 'px',
        top: event.pageY - 25 + 'px',
        background: bColor[Math.floor(Math.random() * 7)],
    });
    ball.addClass('clickBall');
    $(document.body).append(ball);
    setTimeout(function() {
        ball.remove();
    }, 400)
})

//获取用户状态
var name = sessionStorage.getItem('name');
var stateCode = sessionStorage.getItem('stateCode');
var isMainPage = /mainPage/.test(window.location.href);

function loadHeader() {
    if (stateCode !== null) {
        switch (stateCode) {
            case '0':
                if (isMainPage)
                    $('.header-ul').prepend($('<li><a href="./html/login.html" id="login"><span class="glyphicon glyphicon-user"></span>&nbsp;登录</a></li>'));
                else
                    $('.header-ul').prepend($('<li><a href="./login.html" id="login"><span class="glyphicon glyphicon-user"></span>&nbsp;登录</a></li>'));
                break;
            case '1':
                $('.header-ul').prepend($('<li><a>欢迎您！' + name + '</a></li>'));
                $('.header-ul').append($('<li><a>退出</a></li>'));
                break;
            case '2':
                if (isMainPage)
                $('.header-ul').append($('<li><a href="./html/audit.html"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;管理员</a></li>'));
                else
                $('.header-ul').append($('<li><a href="./audit.html"><span class="glyphicon glyphicon-eye-open"></span>&nbsp;管理员</a></li>'));  
                $('.header-ul').prepend($('<li><a>超级管理员</a></li>'));
                $('.header-ul').append($('<li><a>退出</a></li>'));
                break;
        }
    } else {
        if (isMainPage)
            $('.header-ul').prepend($('<li><a href="./html/login.html" id="login"><span class="glyphicon glyphicon-user"></span>&nbsp;登录</a></li>'));
        else
            $('.header-ul').prepend($('<li><a href="./login.html" id="login"><span class="glyphicon glyphicon-user"></span>&nbsp;登录</a></li>'));
    }
}
loadHeader();
$('.header-ul').click(function(e){
     $.ajax({
        url:'http://140.143.133.96:8080/servlet/UserController?flag=loginOut',
        dataType:'json',
        success:function(data){
            if(data.stateCode==1){
            layer.open({
                content:data.message,
                offset:'140px',
                yes:function(){
                   layer.closeAll();
                   sessionStorage.clear();
                   location.reload();
                },
                cancel:function(){
                   sessionStorage.clear();
                   location.reload();
                }
            })
            }else{
                layer.open({
                    offset:'140px',
                    content:'退出失败！'
                })
            }
        },
        error:function(e){
           console.log(e);
        }

     })
})