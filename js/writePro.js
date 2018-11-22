layer.config({
    skin: 'layui-layer-molv'
})

var editor=UM.getEditor('content');

$('#submit-pro').click(function() {
    if ($('.pro-title').val() == '') {
        layer.open({
            offset: '140px',
            content: "标题不能为空！"
        })
    } else if ($('.pro-author').val() == '') {
        layer.open({
            offset: '140px',
            content: "作者不能为空！"
        })
    } else if ($('.pro-desc').val() == '') {
        layer.open({
            offset: '140px',
            content: "描述不能为空！"
        })
    } else if (editor.getContent() == '') {
        layer.open({
            offset: '140px',
            content: "内容不能为空！"
        })
    } else {
        $.ajax({
            url: "http://140.143.133.96:8080/servlet/ManagerController?flag=addGoodWorks",
            data:{
               title:$('.pro-title').val(),
               author:$('.pro-author').val(),
               statement:$('.pro-desc').val(),
               content:editor.getContent()
            },
            dataType: "json",
            type:'POST',
            success: function(data) {
                console.log(data);
                layer.open({
                    offset: '140px',
                    content: data.message
                });
            },
            error:function(error){
                console.log(error);
            }
        })
    }
});
