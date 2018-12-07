import 'babel-polyfill';

import '../less/universal.less';
import '../less/userHeadFoot.less';
import '../less/blogs.less';

import { Blog } from './class/Blog.js';
import { BlogPage } from './class/BlogPage.js';

$.ajax({
    url: ' http://140.143.133.96:8080/servlet/SystemController?flag=findPageByClass',
    data: {
        pageNum: 1,
        blogClass: 'hit'
    },
    dataType: 'json',
    success: function (data) {

        let html = '';
        let list = data.list;
        let _len_ = list.length;

        for (let i = 0; i < _len_; i++) {
            html += `<li><a href="./blogDetail.html?id=${list[i].id}">${list[i].title}</a></li>`;
        }

        $('#hot-ul').append($(html));

        _len_ = _len_ > 4 ? 4 : _len_;
        html = '';
        for (let i = 0; i < _len_; i++) {
            html += `<li>
            <div class="logo">
                <img src="../images/logo.jpg">
            </div>
            <div class="first-line">
                    <div class="class">${list[i].blogClass}</div>
                    <a class="title">${list[i].title}</a>
            </div>
            <div class="second-line">
                    <div class="author">${list[i].username}</div>
                    <div class="date">${list[i].date}</div>
                    <div class="desc">${list[i].articleGist}</div>
                    <div class="readNum">阅读量：${list[i].readNum}</div>
            </div>
        </li>`
        }

        $('#setTop-ul').append(html);
    },
    error: function (error) {
        console.log(error);
    }
})


var blog = new Blog();
var blogPage = new BlogPage();


blog.update({pageNum:1, blogClass:'前端'}, function(html, data) {
    $('#main-ul').html(html);
    blogPage.init(data);
    $('#page-ul').html(blogPage.html);
})

var changeBtnColor = function(elem) {
    var _buttons_ = $('.button-ul').children('li');
    var _len_ = _buttons_.length; 
    for(var i = 0; i < _len_; i++){
        _buttons_.eq(i).removeClass('active');
    }
    if(elem === undefined) return;
    elem.addClass('active');
}

$('#before-btn').click(function() {
    var $elem = $(this);
    blog.update({pageNum:1, blogClass:'前端'}, function(html, data) {
        $('#main-ul').html(html);
        changeBtnColor($elem);
        blogPage.init(data);
        $('#page-ul').html(blogPage.html);
    })
});

$('#after-btn').click(function() {
    var $elem = $(this);
    blog.update({pageNum:1, blogClass:'后端'}, function(html, data) {
        $('#main-ul').html(html);
        changeBtnColor($elem);
        blogPage.init(data);
        $('#page-ul').html(blogPage.html);
    })
})

$('#hot-btn').click(function() {
    var $elem = $(this);
    blog.update({pageNum:1, blogClass:'hit'}, function(html, data) {
        $('#main-ul').html(html);
        changeBtnColor($elem);
        blogPage.init(data);
        $('#page-ul').html(blogPage.html);
    })
})

$('#search-btn').click(function() {
    var _content_ = $('#search-content').val();
    if(_content_ === '') {
        layer.open({
            content:'关键字不能为空',
            offset:'140px'
        })
    } else {
       blog.update({pageNum:1,keyWord:_content_}, function(html, data) {
         $('#main-ul').html(html);
         changeBtnColor();
         blogPage.init(data);
         $('#page-ul').html(blogPage.html);
       })
    }
})

var changePageColor = function(pageNum ,lists) {
    var _len_ = lists.length;
    for(let i = 0; i < _len_; i++) {
        var _tmp_ = lists.eq(i);
        _tmp_.removeClass('active');
        if(_tmp_.data('id') === pageNum) {
            _tmp_.addClass('active');
        }
    }
}

$('#page-ul').click(function(e) {
    var $target = $(e.target);
    var pageNum = $target.data('id');
    
    var data = $.extend({'pageNum':pageNum},blog.type);
    blog.update(data, function(html, data) {
        $('#main-ul').html(html);
        blogPage.update(pageNum);
        $('#page-ul').html(blogPage.html);
        changePageColor(pageNum ,$('#page-ul').children('.page-li'));
    })
    
})