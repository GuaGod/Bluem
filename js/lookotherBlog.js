var dividePage = null;
layer.config({
    skin: 'layui-layer-molv'
})

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

function createArticleData(data) { //博客的具体内容 一旦载入不会再改变
    $('.blog-title-con').html(data.title);
    $('.blog-author-con').html(data.username);
    $('.blog-class-con').html(data.blogClass);
    $('.blog-time-con').html(data.date);
    $('.blog-content-con').html(data.content);
}

function BlogComment() { //生成一条blog评论

}

function DividePage(pageNum) {
    var num = pageNum;
    var ul = $('<ul class="page-ul"></ul>');
    //根据分页长度生出分页
    function init() {
        if (num != 0) {
            ul.append('<div class="page-list">首页</div>');
        }
        if (num < 5) {
            for (var i = 0; i < num; i++) {
                if (i == 0) {
                    ul.append($('<li class="page-list page-list-active">' + (i + 1) + '</li>'));
                } else {
                    ul.append($('<li class="page-list">' + (i + 1) + '</li>'));
                }
            }
        } else {
            for (var i = 0; i < 5; i++) {
                if (i == 0) {
                    ul.append($('<li class="page-list page-list-active">' + (i + 1) + '</li>'));
                } else {
                    ul.append($('<li class="page-list">' + (i + 1) + '</li>'));
                }
            }
        }
        if (num != 0) {
            ul.append('<div class="page-list">尾页</div>');
        }
    }
    init();
    $(ul).click(function(e) {
        var dom = $(e.target);
        var pageNow;
        if (dom.html() == '首页') {
            pageNow = 1;
        } else if (dom.html() == '尾页') {
            pageNow = pageNum;
        } else {
            pageNow = dom.html();
        }

        $.ajax({
            url: 'http://140.143.133.96:8080/servlet/UserController?flag=getComment',
            data: {
                pageNum: pageNow,
                id: paraObj.id
            },
            dataType: 'json',
            success: function(data) {
                $('.other-comment-ul').html('');
                $('li.page-list').removeClass('page-list-active');
                $($('li.page-list')[pageNow-1]).addClass('page-list-active');
                for (var i = 0; i < data.list.length; i++) {
                    $('.other-comment-ul').append(new Comment(data.list[i].content, data.list[i].username));
                }
    
            }
        });
    })
    return ul;
}

$('#comment-submit').click(function() {
    if ($('#comment-self').val() != '') {
        $.ajax({
            url: 'http://140.143.133.96:8080/servlet/DoFilter?flag=addComment',
            data: {
                id: paraObj.id,
                content: $('#comment-self').val()
            },
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                layer.open({
                    content: data.message,
                    offset: '140px',
                    cancel:function(){
                       window.location.reload();
                    },
                    yes:function(){
                        layer.closeAll();
                        window.location.reload();
                    }
                })
            }
        })
    }
})
//评论
function Comment(content, username) {
    return $('<li class="other-comment-li"><div class="other-content"><span class="glyphicon glyphicon-book"></span>&nbsp;' + content + '</div><div class="other-name"><span class="glyphicon glyphicon-user"></span>&nbsp;' + username + '</div></li>');
}


function load() {
    //请求blog的详情内容
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/UserController?flag=getBlogDetail',
        data: {
            id: paraObj.id
        },
        dataType: 'json',
        type: 'POST',
        success: function(data) {
            createArticleData(data);
        },
        error: function(e) {
            console.log(e);
        }
    })
    //请求评论的内容
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/UserController?flag=getComment',
        data: {
            id: paraObj.id,
            pageNum: 1,
        },
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.list.length; i++) {
                $('.other-comment-ul').append(new Comment(data.list[i].content, data.list[i].username));
            }
            $('.dividePage').append(new DividePage(data.totalPage));
        },
        error: function(e) {
            console.log(e);
        }
    })
}
load();