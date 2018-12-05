import 'babel-polyfill';

import '../less/universal.less';
import '../less/userHeadFoot.less';
import '../less/writeNew.less';


window.editor=UM.getEditor('content');

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
        var newClass = $('#newsClass').val() == '新闻' ? 'news' : 'notice';
        $.ajax({
            url:'http://140.143.133.96:8080/servlet/ManagerController?flag=addNews',
            data: {
                title: $('#title').val(),
                content: editor.getContent(),
                newsClass: newClass
            },
            crossDomain:true,
            dataType: 'json',
            type:'POST',
            success: function(data) {
                layer.open({
                    offset: '140px',
                    content: '提交成功',
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

