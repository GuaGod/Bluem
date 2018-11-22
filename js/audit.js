var content = {
    leftList: $('.content-left-list'),
    leftTitle: $('.content-left-title'),
    leftLists: $('.content-left-list').children('li'),
    right: $('.content-right'),
    rightLists: $('.content-right').children('div')
}
var appListCon = $('#audit-application-list');
content.leftTitle.click(function() {
    if (content.leftList.css('maxHeight') == '0px') {
        content.leftList.css({ 'maxHeight': '150px' });
    } else {
        content.leftList.css({ 'maxHeight': '0px' });
    }
});

//左侧点击显示不同的内容
function show(id) {
    for (var i = 0; i < content.rightLists.length; i++) {
        content.rightLists[i].style.display = 'none';
        if (content.rightLists[i].id == id) {
            content.rightLists[i].style.display = 'block';
        }
    }
}
content.leftList.click(function(e) {
    content.leftList.children().css({ 'background': 'rgb(255,255,255)' });
    $(e.target).css({ 'background': '#acf6ef' })
    show(e.target.id + '-con');
});

//开启或关闭报名
$('#openApp').click(function(){
    $.ajax({
    url:'http://140.143.133.96:8080/servlet/ManagerController?flag=openSignUp',
    data:{
        operation:1
    },
    dataType:'json',
    success:function(data){
      layer.open({
        offset:'140px',
        content:data.message
      })
    },
    error:function(e){
      console.log(e);
    }
   })
})

$('#closeApp').click(function(){
   $.ajax({
    url:'http://140.143.133.96:8080/servlet/ManagerController?flag=openSignUp',
    data:{
        operation:0
    },
    dataType:'json',
    success:function(data){
      layer.open({
        offset:'140px',
        content:data.message
      })
    },
    error:function(e){
       console.log(e);
    }
   })
})


//分页
function DividePage(pageNum, navClass, pages) {
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
                    ul.append($('<li class="page-list">' + (i + 1) + '</li>'));
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
        $(ul.children('li')[pages - 1]).addClass('page-list-active');
    }
    init();
    //绑定点击事件
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
        switch (navClass) {
            case 'newNav':
                $.ajax({
                    url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
                    data: {
                        pageNum: pageNow,
                        newsClass: 'news'
                    },
                    dataType: 'json',
                    success: function(data) {
                        $('#audit-news-nav').html('');
                        $('#audit-news-nav').append(new DividePage(data.totalPage, 'newNav', pageNow));
                        var table = $('.table-new');
                        table.html('<tr><th>标题</th><th colspan="3">操作</th></tr>');
                        for (var i = 0; i < data.list.length; i++) {
                            table.append(new New(data.list[i].title, data.list[i].id));
                        }
                    }
                });
                break;
            case 'noticeNav':
                $.ajax({
                    url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
                    data: {
                        pageNum: pageNow,
                        newsClass: 'notice'
                    },
                    dataType: 'json',
                    success: function(data) {
                        $('#audit-notice-nav').html('');
                        $('#audit-notice-nav').append(new DividePage(data.totalPage, 'noticeNav', pageNow));
                        var table = $('.table-notice');
                        table.html('<tr><th>标题</th><th colspan="3">操作</th></tr>');
                        for (var i = 0; i < data.list.length; i++) {
                            table.append(new Notice(data.list[i].title, data.list[i].id));
                        }
                    }
                });
                break;
            case 'productionNav':
                $.ajax({
                    url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageGoodWorks',
                    data: {
                        pageNum: pageNow,
                    },
                    dataType: 'json',
                    success: function(data) {
                        $('#audit-production-nav').html('');
                        $('#audit-production-nav').append(new DividePage(data.totalPage, 'productionNav', pageNow));
                        $('#audit-production-list').html('');
                        for (var i = 0; i < data.list.length; i++) {
                            $('#audit-production-list').append(new Production(data.list[i].title, data.list[i].author, data.list[i].id));
                        }
                    }
                });
                break;
            case 'AppNav':
                $.ajax({
                    url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageSignUp',
                    data: {
                        pageNum: pageNow
                    },
                    dataType: 'json',
                    success: function(data) {
                        $('#audit-application-nav').html('');
                        $('#audit-application-list').html('');
                        $('#audit-application-nav').append(new DividePage(data.totalPage, 'AppNav', 1));
                        for (var i = 0; i < data.list.length; i++) {
                            $('#audit-application-list').append(new Application(data.list[i].name, data.list[i]['stu_id'], data.list[i].phone, data.list[i].major));
                        }
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
                break;
            case 'regNav':
                $.ajax({
                    url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageRegister',
                    dataType: 'json',
                    data: {
                        pageNum:pageNow
                    },
                    success: function(data) {
                        $('#audit-register-list').html('');
                        $('#audit-register-nav').html('');
                        $('#audit-register-nav').append(new DividePage(data.totalPage, 'regNav', 1));
                        for (var i = 0; i < data.list.length; i++) {
                            $('#audit-register-list').append(new Register(data.list[i].name, data.list[i]['stu_id'], data.list[i].phone, data.list[i].position));
                        }
                    }
                })
        }
    })
    return ul;
}

//报名审核页面
$('#audit-application-list').click(function(e){
   switch($(e.target).html()){
    case '查看':window.open('./auditApplication.html?id='+$(e.target).data('id'));
   }
})
function Application(name, stuId, phone, major) {
    return $('<li class="application-list"><ul><li>' + name + '</li><li>' + stuId + '</li><li>' + phone + '</li><li>' + major + '</li><li class="application-look" data-id="'+stuId+'">查看</li></ul></li>')
}

function loadApplication() {
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageSignUp',
        data: {
            pageNum: 1
        },
        dataType: 'json',
        success: function(data) {
            $('#audit-application-nav').append(new DividePage(data.totalPage, 'AppNav', 1));
            for (var i = 0; i < data.list.length; i++) {
                $('#audit-application-list').append(new Application(data.list[i].name, data.list[i]['stu_id'], data.list[i].phone, data.list[i].major));
            }
        },
        error: function(e) {
            console.log(e);
        }
    })
}
loadApplication();
//注册审核页面
function Register(name, stuId, phone, major, id) {
    return $('<li class="register-list"><ul><li>' + name + '</li><li>' + stuId + '</li><li>' + phone + '</li><li>' + major + '</li><li data-id="' + stuId + '">查看</li><li data-id="' + stuId + '">通过</li><li data-id="' + stuId + '">不通过</li></ul></li>')
}

$('#audit-register-list').click(function(e) {
    switch ($(e.target).html()) {
        case '查看':
            window.open('./auditRegister.html?id=' + $(e.target).data('id'));
            break;
        case '通过':
            $.ajax({
                url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=examineRegister&operation=pass',
                data: {
                    'stu_id': $(e.target).data('id')
                },
                dataType: 'json',
                success: function() {

                }
            });
            break;
        case '不通过':
            $.ajax({
                url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=examineRegister&operation=refuse',
                data: {
                    'stu_id': $(e.target).data('id')
                },
                dataType: 'json',
                success: function() {

                }
            });
            break;
    }
})

function loadRegister() {
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageRegister',
        dataType: 'json',
        data: {
            pageNum: 1
        },
        success: function(data) {
            $('#audit-register-nav').append(new DividePage(data.totalPage, 'regNav', 1));
            for (var i = 0; i < data.list.length; i++) {
                $('#audit-register-list').append(new Register(data.list[i].name, data.list[i]['stu_id'], data.list[i].phone, data.list[i].position));
            }
        }
    })
}

loadRegister();


//新闻管理页面
function New(title, id) {
    return $('<tr><td class="new-title">' + title + '</td><td class="new-detail" data-id="' + id + '">查看</td><td class="new-change" data-id="' + id + '">修改</td><td class="new-delete" data-id="' + id + '">删除</td></tr>')
}

function deleteNew(dom) {
    layer.open({
        'content': '确认删除该新闻？',
        'btn': ['确定', '取消'],
        yes: function() {
            layer.closeAll();
            $.ajax({
                url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=deleteNews',
                data: {
                    id: dom.data('id')
                },
                dataType: 'json',
                success: function() {
                    $.ajax({
                        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
                        data: {
                            pageNum: 1,
                            newsClass: 'news'
                        },
                        dataType: 'json',
                        success: function(data) {
                            $('#audit-news-nav').html('');
                            $('#audit-news-nav').append(new DividePage(data.totalPage, 'newNav', 1));
                            var table = $('.table-new');
                            table.html('<tr><th>标题</th><th colspan="3">操作</th></tr>');
                            for (var i = 0; i < data.list.length; i++) {
                                table.append(new New(data.list[i].title, data.list[i].id));
                            }
                        }
                    })
                },
                error: function(e) {
                    console.log(e);
                }
            })
        }
    })
}

$('#addNew').click(function() {
    window.open('./writeNew.html');
})

$('.table-new').click(function(e) {
    var dom = $(e.target);
    switch (dom.html()) {
        case '查看':
            window.open('./getNewDetail.html?id=' + dom.data('id'));
            break;
        case '修改':
            window.open('./changeNew.html?id=' + dom.data('id'));
            break;
        case '删除':
            deleteNew(dom);
            break;
    }
})

function loadNews() {
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
        data: {
            pageNum: 1,
            newsClass: 'news',
        },
        dataType: 'json',
        success: function(data) {
            var tableNew = $('.table-new');
            $('#audit-news-nav').append(new DividePage(data.totalPage, 'newNav', 1));
            for (var i = 0; i < data.list.length; i++) {
                tableNew.append(new New(data.list[i].title, data.list[i].id));
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
}
loadNews();
/*通知管理*/
function Notice(title, id) {
    return $('<tr><td class="notice-title">' + title + '</td><td class="notice-detail" data-id="' + id + '">查看</td><td class="notice-change" data-id="' + id + '">修改</td><td class="notice-delete" data-id="' + id + '">删除</td></tr>')
}

function deleteNotice(dom) {
    layer.open({
        'content': '确认删除该通知？',
        'btn': ['确定', '取消'],
        yes: function() {
            layer.closeAll();
            $.ajax({
                url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=deleteNews',
                data: {
                    id: dom.data('id')
                },
                dataType: 'json',
                success: function() {
                    $.ajax({
                        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
                        data: {
                            pageNum: 1,
                            newsClass: 'notice'
                        },
                        dataType: 'json',
                        success: function(data) {
                            $('#audit-notice-nav').html('');
                            $('#audit-notice-nav').append(new DividePage(data.totalPage, 'noticeNav', 1));
                            var table = $('.table-notice');
                            table.html('<tr><th>标题</th><th colspan="3">操作</th></tr>');
                            for (var i = 0; i < data.list.length; i++) {
                                table.append(new Notice(data.list[i].title, data.list[i].id));
                            }
                        }
                    })
                },
                error: function(e) {
                    console.log(e);
                }
            })
        }
    })
}




$('#addNotice').click(function() {
    window.open('./writeNew.html');
})

$('.table-notice').click(function(e) {
    var dom = $(e.target);
    switch (dom.html()) {
        case '查看':
            window.open('./getNewDetail.html?id=' + dom.data('id'));
            break;
        case '修改':
            window.open('./changeNew.html?id=' + dom.data('id'));
            break;
        case '删除':
            deleteNotice(dom);
            break;
    }
})



function loadNotice() {
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
        data: {
            pageNum: 1,
            newsClass: 'notice',
        },
        dataType: 'json',
        success: function(data) {
            var tableNotice = $('.table-notice');
            for (var i = 0; i < data.list.length; i++) {
                tableNotice.append(new Notice(data.list[i].title, data.list[i].id));
            }
            $('#audit-notice-nav').append(new DividePage(data.totalPage, 'noticeNav', 1));
        },
        error: function(e) {
            console.log(e);
        }
    });
}
loadNotice();

/*优秀作品管理*/
/*一条作品*/
function Production(title, author, id) {
    return $('<li><ul class="pro-container"><li class="pro-title">' + title + '</li><li class="pro-author">' + author + '</li><li class="pro-look" data-id="' + id + '">查看</li><li class="pro-change" data-id="' + id + '">修改</li><li class="pro-delete" data-id="' + id + '">删除</li>');
}

function deletePro(dom) {
    layer.open({
        'content': '确认删除该作品？',
        'btn': ['确定', '取消'],
        yes: function() {
            layer.closeAll();
            $.ajax({
                url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=deleteGoodWorks',
                data: {
                    id: dom.data('id')
                },
                dataType: 'json',
                success: function() {
                    $.ajax({
                        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageGoodWorks',
                        data: {
                            pageNum: 1,
                        },
                        dataType: 'json',
                        success: function(data) {
                            console.log(data);
                            $('#audit-production-list').html('');
                            for (var i = 0; i < data.list.length; i++) {
                                $('#audit-production-list').append(new Production(data.list[i].title, data.list[i].author, data.list[i].id));
                            }
                            $('#audit-production-nav').html('');
                            $('#audit-production-nav').append(new DividePage(data.totalPage, 'productionNav', 1));
                        }
                    })
                },
                error: function(e) {
                    console.log(e);
                }
            })

        }
    })
}

$('#addPro').click(function() {
    window.open('./writeProduction.html');
});

$('#audit-production-list').click(function(e) {
    var dom = $(e.target);
    switch (dom.html()) {
        case '查看':
            window.open('./getProDetail.html?id=' + dom.data('id'));
            break;
        case '修改':
            window.open('./changeProduction.html?id=' + dom.data('id'));
            break;
        case '删除':
            deletePro(dom);
            break;
    }
})



function loadPro() {
    $.ajax({
        url: 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageGoodWorks',
        data: { pageNum: 1 },
        dataType: 'json',
        success: function(data) {
            for (var i = 0; i < data.list.length; i++) {
                $('#audit-production-list').append(new Production(data.list[i].title, data.list[i].author, data.list[i].id));
            }
            $('#audit-production-nav').append(new DividePage(data.totalPage, 'productionNav', 1));
        }

    })
}
loadPro();