layer.config({
    skin:'layui-layer-molv'
})

function Blog(con, title, time, id) {
    var blog = $('<li class="oneBlog" data-id=' + id + '></li>');
    blog.html('<div class="blog-title"><a href="./lookselfBlog.html?id=' + id + '" class="blog-title-con"></a></div><div class="blog-time"><span>时间：</span>   <span class="blog-time-con"></span></div><div class="blog-btn-delete">删除</div>');
    con.append(blog);
    blog.find('.blog-title-con').text(title);
    blog.find('.blog-time-con').text(time);
}

function DividePage(container, pageNum, content) {
    var num = pageNum;
    var $con = container;
    var pageNow = 1;
    var $contentCon = content;
    var ul = $('<ul class="page-ul"></ul>');
    //添加一个分页
    function init() {
        ul.append('<div class="page-list">首页</div>');
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
        ul.append('<div class="page-list">尾页</div>');
        $con.append(ul);
    }
    init();
    //根据数据修改当前页面
    function changePage(clickNow) {
        $.ajax({
            url: 'http://140.143.133.96:8080/servlet/UserController?flag=getSelfBlog', //传输第几页
            data: {
                user_id:sessionStorage.getItem('stuId'),
                pageNum: clickNow
            },
            dataType: 'json',
            type:'POST',
            success: function(data) {
                changeNav(clickNow);
                $contentCon.html('');
                for (var i = 0; i < data.list.length; i++) {
                    new Blog($('.blogSection'), data.list[i].title, data.list[i].date, data.list[i].id)
                }
            },
            error: function() {
                layer.open({
                    content:"网络异常，请稍后重新尝试！",
                    offset:'140px'

                })
            }
        })

    }
    //根据分页长度修改分页列表的显示
    function changeNav(clickNow) {
        var $lis = $(ul).children('li');
        var len = $lis.length; //实际的li数量 小于等于5
        var start;
        for (var i = 0; i < len; i++) {
            $($lis[i]).removeClass('page-list-active');
        }
        if (num < 5) {
            if (clickNow == '首页') {
                $($lis[0]).addClass('page-list-active');
            } else if (clickNow == '尾页') {
                $($lis[num - 1]).addClass('page-list-active');
            } else {
                $($lis[clickNow - 1]).addClass('page-list-active');
            }
        } else {
            if (clickNow == '首页') {
                start = 1;
                $($lis[0]).addClass('page-list-active');
            } else if (clickNow == '尾页') {
                start = num - 4;
                $($lis[4]).addClass('page-list-active');
            } else if (clickNow <= 2) {
                start = 1;
                $($lis[clickNow - 1]).addClass('page-list-active');
            } else if (clickNow >= num - 1) {
                start = num - 4;
                if (clickNow == num - 1) {
                    $($lis[3]).addClass('page-list-active');
                } else {
                    $($lis[4]).addClass('page-list-active');
                }
            } else {
                start = clickNow - 2;
                $($lis[2]).addClass('page-list-active');
            }
            for (var i = 0; i < 5; i++) {
                $($lis[i]).html(start++);
            }
        }
    }
    $(ul).click(function(e) {
        clickNow = e.target.innerHTML;
        if (clickNow == '首页') {
            clickNow = 1;
        } else if (clickNow == '尾页') {
            clickNow = num;
        }
        changePage(clickNow);
    })
}

$('.blogSection').click(function(e) {
            var $clickNow = $(e.target);
            if ($clickNow.html() == '删除') {
                layer.open({
                    content:'确定删除？',
                    btn:['确定','取消'],
                    yes:function(){
                        layer.closeAll();
                        $.ajax({
                            url:'http://140.143.133.96:8080/servlet/UserController?flag=manageBlog&operation=delete',
                            data:{
                                id:$clickNow.parent().data('id')
                            },
                            dataType:'json',
                            type:'POST',
                            success:function(){
                                location.reload();
                            },
                            error:function(){

                            }
                        })
                    }
                })
                }
            })
        //加载数据
        function loadBlog() {
            $.ajax({
                url: 'http://140.143.133.96:8080/servlet/DoFilter?flag=getSelfBlog',
                data: {
                    stu_id:sessionStorage.getItem('stuId'),
                    pageNum: 1
                },
                dataType: "json",
                type:'POST',
                success: function(data) {
                    if(stateCode!=0&&stateCode!=undefined){
                    for (var i = 0; i < data.list.length; i++) {
                        new Blog($('.blogSection'), data.list[i].title, data.list[i].date, data.list[i].id)
                    }
                    new DividePage($('.divide-page-con'), data.totalPage, $('.blogSection'));
                    }else{
                        layer.open({
                            content:data.message,
                            offset:'140px',
                            btns:['确认'],
                            yes:function(){
                                window.location.href="./blogs.html";
                            }
                        })
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            })
        }
        loadBlog();