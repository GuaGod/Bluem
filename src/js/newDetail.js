import 'babel-polyfill';

import '../less/universal.less';
import '../less/userHeadFoot.less';
import '../less/newDetai.less';

import {Href} from './class/Href';

var href = (new Href()).data;

$.ajax({
    url:'http://140.143.133.96:8080/servlet/ManagerController?flag=getNewsDetailById',
    data: {
        id: href.id
    },
    dataType:'json',
    success: function(data) {
      $('#title').html(data.title);
      $('#date').html(`日期：${data.date}`);
      $('#content').html(data.content);
    }
})

$.ajax({
    url:'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
    data: {
        pageNum: 1,
        newsClass: 'news'
    },
    dataType:'json',
    success:function(data) {
       var _len_ = data.list.length;
       var html = '';
       for(var i = 0; i < _len_; i++) {
           html += `<li><a href="./newDetail.html?id=${data.list[i].id}">${data.list[i].title}</a></li>`
       }
       $('#news-ul').append(html);
    }
})