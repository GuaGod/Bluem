layer.config({
    skin:'layui-layer-molv'
})

//登录状态检测
function paraInHref() {
    var href = window.location.href;
    var paraString = href.split('?')[1];
    var paraObj = {};
    if (paraString !== undefined) {
        var paraArray = paraString.split('&');
        for (var i in paraArray) {
            var key = paraArray[i].split('=')[0];
            var value = paraArray[i].split('=')[1];
            paraObj[key] = value;
        }
    }
    return paraObj;
}

var paraObj = paraInHref();


(function($) {
    var imgs = $('img');
    var num = 0;
    var loadingPer = $('.loading-per');
    setTimeout(function(){
       $('.loading').fadeOut();
    },6000);
    imgs.each(function(i) {
        var oimg = new Image();
        $(oimg).on('load error', function() {
            oimg.onload = null;
            num++;
            loadingPer.html(Math.floor(num / imgs.length * 100) + "%");
            if (num == imgs.length) $('.loading').fadeOut();
        })
        oimg.src = imgs[i].src;
    })
})(jQuery);

//轮播图
var $imgs=$('#con img');
var $iContainer=$('#con');
var index=0;
var timer=setInterval(function(){
    $imgs.removeClass('playImg-active');
    $($imgs[index]).addClass('playImg-active');
    index++;
    if(index>=$imgs.length){
        index=0;
    }
},2500);

$iContainer.mouseenter(function(){
    clearInterval(timer);
})

$iContainer.mouseleave(function(){
    window.timer=setInterval(function(){
    $imgs.removeClass('playImg-active');
    $($imgs[index]).addClass('playImg-active');
    index++;
    if(index>=$imgs.length){
        index=0;
    }
    },2500);
});
var $leftBtn=$('#leftBtn');
$leftBtn.click(function(){
   index--;
   if(index<0){
    index=$imgs.length-1;
   }
    $imgs.removeClass('playImg-active');
   $($imgs[index]).addClass('playImg-active');
});

$('#rightBtn').click(function(){
   index++;
   if(index>=$imgs.length){
    index=0;
   }
   $imgs.removeClass('playImg-active');
   $($imgs[index]).addClass('playImg-active');
});
    
//翻转图片
(function($) {
    $('#sec-bestStudent').click(function(e) {
        target = $(e.target);
        if (target.prop('className') == 'student-img') {
            target.fadeOut();
            target.next().fadeIn();
        }
        if (target.prop('className') == 'student-desc') {
            target.fadeOut();
            target.prev().fadeIn();
        }
    })
})(jQuery);

//提取新闻通知
//图片隐藏
$('.new-button').click(function(){
    $(this).parent().animate({
        opacity:0
    },1000,function(){
        $(this).css({
            display:'none'
        })
    });
    loadNews();
});

$('.new-button2').click(function(){
    var stateCode=sessionStorage.getItem('stateCode');
    if(stateCode==undefined||stateCode==null||stateCode==0){
        layer.open({
            content:'尚未登录！',
            offset:'140px'
        })
        return false;
    }
    $(this).parent().animate({
        opacity:0
    },1000,function(){
        $(this).css({
            display:'none'
        })
    });
    loadNotices();
})

function New(title, content, date, id) {
    return $('<div class="col-xs-12 col-sm-4 col-md-3"><div class="new-container"><a target="_blank" href="./html/getNewDetail.html?id=' + id + '"><div class="new-title">' + title + '</div><div class="new-content">' + content + '</div><div class="new-date">' + date + '</div></a></div></div>');
}

function loadNews() {
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
        data: {
            pageNum: 1,
            newsClass: 'news'
        },
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            var container = $('.sec-inform');
            container.html('<button class="return-button btn btn-success">返回主页</button>');
            for (var i = 0; i < data.list.length && i < 8; i++) {
                container.append(new New(data.list[i].title, data.list[i].content, data.list[i].date, data.list[i].id))
            }
        }
    })
}


function loadNotices() {
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
        data: {
            pageNum: 1,
            newsClass: 'notice'
        },
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            var container = $('.sec-inform');
            container.html('<button class="return-button btn btn-success">返回主页</button>');
            for (var i = 0; i < data.list.length && i < 8; i++) {
                container.append(new New(data.list[i].title, data.list[i].content, data.list[i].date, data.list[i].id))
            }
        }
    })
}


$('.sec-inform').click(function(e){
    if($(e.target).html()=='返回主页'){
        $('.new-bg').animate({
        opacity:1,
    },1000,function(){
        $(this).css({
            display:'flex'
        })
    });
    }
})


function loadPro() {
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageGoodWorks',
        data: { pageNum: 1 },
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            for (var i = 0; i < data.list.length; i++) {
                $('.row-goodJob').append(new Photo(data.list[i].title, data.list[i].statement,data.list[i].id));
            }
            //初始化nav
              $('.photo-nav ul').append(new Nav(data.totalRecord));
            //初始化中心作品
            try{
            var $photos = $('.photo');
            var $lists = $('.photo-nav').find('li');
            var initPhoto = Math.floor(Math.random() * 9);
            }catch(e){
                console.error(e);
            }

            $photos[initPhoto].className += ' photo-center';
            $($lists[initPhoto]).addClass('nav-list-active');
            bindPhotoEvent();
        }

    })
}
function loadPro2() {
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageGoodWorks',
        data: { pageNum: 2 },
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            for (var i = 0; i < data.list.length; i++) {
                $('.row-goodJob').append(new Photo(data.list[i].title, data.list[i].statement,data.list[i].id));
            }
            loadPro();
        }

    })
}
loadPro2();



var count=1;
var WINDOW_WIDTH = document.body.clientWidth;
function Photo(title, desc,proId) {
    var $dom = $('<div class="photo" data-id="' + (count++) + '"> <div class = "photo-wrap photo-front" ><div class="side side-front"> <div class="image"><img src="./images/bg.jpg"></div><div class="caption">' + title + '</div></div><div class = "side side-back" ><p class="desc">' + desc + '</p><button class="btn btn-info btn-pro"><a target="_blank" href="./html/getProDetail.html?id='+proId+'">了解更多</a></button></div></div></div>')
    var DEG = Math.floor(Math.random()*90-45);
    var X = Math.floor(Math.random() * (WINDOW_WIDTH) - 330);
    var Y = Math.floor(Math.random() * 600 - 230);
    $dom.css({
        transform: 'rotate(' + DEG + 'deg) translate(' + X + 'px,' + Y + 'px)'
    })
    return $dom;
}

function Nav(num) {
  var string='';
  for(var i=1;i<=num;i++){
    string+=' <li data-id="'+i+'"></li>'
  }
  return $(string);
}




function bindPhotoEvent() {
    var $photos = $('.photo');
    var $lists = $('.photo-nav').find('li');
    $photos.click(function() {
        var $dom = $(this);
        var $swap = $dom.find('.photo-wrap');
        var len = $photos.length;
        if ($dom.hasClass('photo-center')) {
            if ($swap.hasClass('photo-front')) {
                $swap.removeClass('photo-front');
                $swap.addClass('photo-back');
                $($lists[$dom.data('id') - 1]).addClass('nav-list-back');
            } else {
                $swap.removeClass('photo-back');
                $swap.addClass('photo-front');
                $($lists[$dom.data('id') - 1]).removeClass('nav-list-back');
            }
        } else {
            for (var i = 0; i < len; i++) {
                if ($dom.data('id') == $($photos[i]).data('id')) {
                    $($photos[i]).addClass('photo-center');
                    continue;
                }
                var DEG = Math.floor(Math.random() * 180 - 90);
                var X = Math.floor(Math.random() * (WINDOW_WIDTH + 360) - 130);
                var Y = Math.floor(Math.random() * 920 - 160);
                $($photos[i]).css({
                    transform: 'rotate(' + DEG + 'deg) translate(' + X + 'px,' + Y + 'px)'
                })
                $($photos[i]).removeClass('photo-center');
            }
            //nav激活
            for (var i = 0; i < len; i++) {
                $($lists[i]).removeClass('nav-list-active');
            }
            $($lists[$dom.data('id') - 1]).addClass('nav-list-active');
        }
    });
    $('.photo-nav ul li').click(function(e) {
        var $dom = $(e.target);
        var $target = $('.photo-center').find('.photo-wrap');
        var len = $lists.length;
        if ($dom.hasClass('nav-list-active')) {
            if ($target.hasClass('photo-front')) {
                $target.removeClass('photo-front');
                $target.addClass('photo-back');
                $($lists[$dom.data('id') - 1]).addClass('nav-list-back');
            } else {
                $target.addClass('photo-front');
                $target.removeClass('photo-back');
                $($lists[$dom.data('id') - 1]).removeClass('nav-list-back');
            }
        } else {
            for (var i = 0; i < len; i++) {
                if ($dom.data('id') == $($photos[i]).data('id')) {
                    $($photos[i]).addClass('photo-center');
                    continue;
                }
                var DEG = Math.floor(Math.random() * 180 - 90);
                var X = Math.floor(Math.random() * (WINDOW_WIDTH + 360) - 130);
                var Y = Math.floor(Math.random() * 860 - 160);
                $($photos[i]).css({
                    transform: 'rotate(' + DEG + 'deg) translate(' + X + 'px,' + Y + 'px)'
                })
                $($photos[i]).removeClass('photo-center');
            }
            for (var i = 0; i < len; i++) {
                $($lists[i]).removeClass('nav-list-active');
            }
            $($lists[$dom.data('id') - 1]).addClass('nav-list-active');
        }
    });
}
