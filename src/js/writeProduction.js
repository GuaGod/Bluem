import 'babel-polyfill';

import '../less/universal.less';
import '../less/userHeadFoot.less';
import '../less/writeProduction.less';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';


var editor = UM.getEditor('content');

var descEditor = UM.getEditor('desc');

descEditor.setHeight(200);

$("#sub-btn").click(function() {
    if($('#author').val() === '') {
        layer.open({
            content:'作者不能为空！',
            offset:'140px'
        })
        return false;
    }
    if($('#title').val() === '') {
        layer.open({
            content:'标题不能为空！',
            offset:'140px'
        })
        return false;
    }
    if(descEditor.getContent() === '') {
        layer.open({
            content:'描述不能为空',
            offset:'140px'
        })
        return false;
    }
    if(editor.getContent() === '') {
        layer.open({
            content:'内容不能为空',
            offset:'140px'
        })
        return false;
    }

    $.ajax({
        url: "http://140.143.133.96:8080/servlet/ManagerController?flag=addGoodWorks",
        data:{
           title:$('#title').val(),
           author:$('#author').val(),
           statement:descEditor.getContent(),
           content:editor.getContent()
        },
        dataType: "json",
        type:'POST',
        success: function(data) {
            layer.open({
                offset: '140px',
                content: data.message
            });
        },
        error:function(error){
            layer.open({
                offset:'140px',
                content:'提交失败！'
            })
        }
    })


})
