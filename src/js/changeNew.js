import 'babel-polyfill';

import '../less/universal.less';
import '../less/userHeadFoot.less';
import '../less/changeNew.less';

import { Href } from './class/Href.js';

window.editor=UM.getEditor('content');

var href = (new Href()).data;

$.ajax({
    url:'http://140.143.133.96:8080/servlet/ManagerController?flag=getNewsDetailById',
    data: {
        id: href.id
    },
    dataType:'json',
    success: function(data) {
      $('#title').val(data.title);
      window.newsClass = data.newsClass;
      $('#newsClass').val(data.newsClass == 'news' ? '新闻' : '通知');
      editor.setContent(data.content);
    }
})




$('#sub-btn').click(function() {
    if ($('#title').val() == '') {
        layer.open({
            offset: '140px',
            content: "标题不能为空！"
        })
    } else if (editor.getContent() == '') {
        layer.open({
            offset: '140px',
            content: "内容不能为空！"
        })
    } else {
        $.ajax({
            url:'http://140.143.133.96:8080/servlet/ManagerController?flag=updateNews',
            data: {
                title: $('#title').val(),
                content: editor.getContent(),
                id: href.id,
                newsClass: newsClass
            },
            dataType: 'json',
            type:'POST',
            success: function(data) {
                layer.open({
                    offset: '140px',
                    content: data.message,
                 })
            },
            error: function(e,d) {
                layer.open({
                    offset: '140px',
                    content: '提交失败，请稍后重新尝试'
                })
            }
         })
    }
})

