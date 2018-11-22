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
var paraObj=paraInHref();

var E=window.wangEditor;
        var editor=new E('#blog-content-change');
        editor.create();
        editor.customConfig.uploadImgServer = '/upload';

$.ajax({
	url:"http://140.143.133.96:8080/servlet/UserController?flag=getBlogDetail",
	data:{
		id:paraObj['id']
	},
	dataType:'json',
   type:'POST',
	crossDomain: true,
	success:function(data){
         $('#blog-title').val(data.title);
         editor.txt.html(data.content);
         $('#blog-class').val(data.blogClass);
	},
	error:function(error){
        layer.open({
          content:"网络出错了，请稍后重新尝试！",
          offset:'140px'});
	}
});
$('#publish-btn').click(function(){
   $.ajax({
      url:'http://140.143.133.96:8080/servlet/UserController?flag=manageBlog&operation=update',
      data:{
          title:$('#blog-title').val(),
          content:editor.txt.html(),
          blogClass:$('#blog-class').val(),
          id:paraObj['id']
      },
      type:'POST',
      dataType: 'json',
      crossDomain: true,
      success:function(data){
                layer.open({
                  content:data.message
                });
      },
      error:function(x,e){
         layer.open({
          content:"网络出错了，请稍后重新尝试！",
          offset:'140px'});
      }
   })
})
