import 'babel-polyfill';

import '../less/universal.less';
import '../less/userHeadFoot.less';
import '../less/blogDetail.less';

import {Href} from './class/Href';
import {Comment} from './class/Comment';



var href = (new Href()).data;

//根据id 获取文章
$.ajax({
    url:'http://140.143.133.96:8080/servlet/UserController?flag=getBlogDetail',
    data: {
        id: href.id
    },
    dataType:'json',
    success: function(data) {
      $('#title').html(data.title);
      $('#date').html(`日期：${data.date}`);
      $('#content').html(data.content);
      $('#author').html(`作者:${data.username}`);
      $('#blogClass').html(`${data.blogClass}`);
    }
});

//右侧热门博客
$.ajax({
    url:'http://140.143.133.96:8080/servlet/SystemController?flag=findPageByClass',
    data: {
        pageNum: 1,
        blogClass: 'hit'
    },
    dataType:'json',
    success:function(data) {
       var _len_ = data.list.length;
       var html = '';
       for(var i = 0; i < _len_; i++) {
           html += `<li><a href="./blogDetail.html?id=${data.list[i].id}">${data.list[i].title}</a></li>`
       }
       $('#blogs-ul').append(html);
    }
})



$.ajax({
    url:'http://140.143.133.96:8080/servlet/UserController?flag=getComment',
    data: {
        id:href.id,
        pageNum:1
    },
    dataType:'json',
    success: function(data){
        var _list_ = data.list;
        var _len_ = _list_.length;
        for(let i = 0; i < _len_; i++){
           let _comment_ = new Comment();
           _comment_.init(_list_[i],function(html) {
             $('#comment-ul').append(html);
           });
        };
    }
});

window.editor=UM.getEditor('comment-content');


$('#comment-submit').click(function() {
    if(editor.getContent() === '') {
        layer.open({
            offset:'140px',
            content:'评论内容不可为空！'
        })
        return false;
    }

    $.ajax({
        url:'http://140.143.133.96:8080/servlet/DoFilter?flag=addComment',
        data:{
            id:href.id,
            content:editor.getContent()
        },
        type:'POST',
        dataType:'json',
        success: function(data){
            layer.open({
                offset:'140px',
                content:data.message
            });
        },
        error: function(error) {
            layer.open({
                offset:'140px',
                content:'提交失败！请稍后重新尝试'
            });
            console.log(error);
        }
    }
    )
})