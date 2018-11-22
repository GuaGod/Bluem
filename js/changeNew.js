function paraInHref(){
   var href=window.location.href;
   var paraString=href.split('?')[1];
   var paraObj={};
   if(paraString!==undefined){
   var paraArray=paraString.split('&');
   for(var i in paraArray){
      var key=paraArray[i].split('=')[0];
      var value=paraArray[i].split('=')[1];
      paraObj[key]=value;
   }
}
   return paraObj;
}
var editor=UM.getEditor('content');
var paraObj=paraInHref();
layer.config({
	skin:'layui-layer-molv'
})
function load(){
	$.ajax({
		url:'http://140.143.133.96:8080/servlet/ManagerController?flag=getNewsDetailById',
		data:{
			id:paraObj.id,
		},
		dataType:'json',
		success:function(data){
          console.log(data);
          window.nClass=data.newsClass;
          $('#title').val(data.title);
          $('#content').val(data.content);
		},
		error:function(e){
           console.log(e);
		}
	})
}
load();
$('#change-btn').click(function(){
    if($('#title').val()==''){
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
		layer.open({
			offset:'140px',
			content:'确认修改?',
			btn:['确定','取消'],
			yes:function(){
			  layer.closeAll();
			  $.ajax({
			  	url:'http://140.143.133.96:8080/servlet/ManagerController?flag=updateNews',
			  	data:{
			  		id:paraObj.id,
			  		newsClass:nClass,
			  		title:$('#title').val(),
			  		content:editor.getContent()
			  	},
			  	dataType:'json',
			  	success:function(data){
			  		console.log(data);
			  	},
			  	error:function(e){
			  		console.log(e)
			  	}
			  })
			}
		})
	}
})

