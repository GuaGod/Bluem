layer.config({
	skin:'layui-layer-molv'
})

var editor=UM.getEditor('blog-content');

$('#publish-btn').click(function(){
	if($('#blog-title').val()==''){
		layer.open({
			offset:'140px',
			content:"标题不能为空！"
		})
	}else if(editor.getContent()==''){
		layer.open({
			offset:'140px',
			content:"内容不能为空！"
		})
	}else{
	$.ajax({
		url:'http://140.143.133.96:8080/servlet/DoFilter?flag=addBlog',
		data:{
          title:$('#blog-title').val(),
          content:editor.getContent(),
          blogClass:$('#blog-class').val(),
		},
		type:'POST',
		dataType: 'json',
		crossDomain: true,
		success:function(data){
			if(data.stateCode==1){
           layer.open({
           	    offset:'100px',
              	content:'提交成功！'
           })
                $('#blog-title').val('');
            	editor.txt.html('');
            	$('#blog-class').val('前端');
            }else{
            	layer.open({
            		offset:'100px',
            		content:data.message,
            		btns:['确定'],
            		yes:function(){
            			window.location.href="./blogs.html";
            		}
            	})
            }
		},
		error:function(x,e){
			layer.open({
           	    offset:'100px',
              	content:'网络异常！'
           })
		}
	})
}
})
