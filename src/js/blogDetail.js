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

