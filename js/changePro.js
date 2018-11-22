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
var editor=UM.getEditor('change-content');
layer.config({
    skin: 'layui-layer-molv'
})
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
            url: "http://140.143.133.96:8080/servlet/ManagerController?flag=updateGoodWorks",
            data: {
               id:paraObj.id,
               content:editor.getContent(),
               author:$('.pro-author').val(),
               title:$('.pro-title').val(),
               statement:$('.pro-desc').val()
            },
            dataType:'json',
            success:function(data){
              layer.open({
                offset:'140px',
                content:data.message
              })
            },
            error:function(e){
              console.log(e);
            }
        })
    }
});

function load(){
   $.ajax({
      url:'http://140.143.133.96:8080/servlet/ManagerController?flag=getGoodWorksDetails',
      data:{
         id:paraObj.id
      },
      dataType:'json',
      success:function(data){
       $('.pro-content').val(data.content);
       $('.pro-desc').val(data.statement);
       $('.pro-author').val(data.author);
       $('.pro-title').val(data.title);
      }
   })
}
load();