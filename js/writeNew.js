layer.config({
    skin: 'layui-layer-molv'
})

var editor=UM.getEditor('content');

$('#submit-btn').click(function() {
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
        /*提交新闻内容*/
        var newClass;
        if ($('#class').val() == '新闻') {
            newClass = 'news';
        } else {
            newClass = 'notice';
        }
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
                $('#content').val('');
                $('#title').val('');
                $('#class').val('新闻');
            },
            error: function(e,d) {
                console.log(e,d);
                layer.open({
                    offset: '140px',
                    content: '提交失败，请稍后重新尝试'
                })
            }
         })
    }
})

