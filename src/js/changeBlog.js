import 'babel-polyfill';

import '../less/universal.less';
import '../less/userHeadFoot.less';
import '../less/changeBlog.less';

import { Href } from './class/Href.js';

window.editor=UM.getEditor('content');

var href = (new Href()).data;

var editor = UM.getEditor('content');

$.ajax({
	url:"http://140.143.133.96:8080/servlet/UserController?flag=getBlogDetail",
	data:{
		id:href.id
	},
	dataType:'json',
    type:'POST',
	success:function(data){
         $('#title').val(data.title);
         editor.setContent(data.content);
         $('#blogClass').val(data.blogClass);
	},
	error:function(error){
        layer.open({
          content:"网络出错了，请稍后重新尝试！",
          offset:'140px'});
	}
});

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
            url:'http://140.143.133.96:8080/servlet/UserController?flag=manageBlog&operation=update',
            data: {
                title: $('#title').val(),
                content: editor.getContent(),
                blogClass: $('#blogClass').val(),
                id:href.id
            },
            type:'POST',
            dataType:'json',
            success: function(data) {
                layer.open({
                    offset: '140px',
                    content: data.message
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