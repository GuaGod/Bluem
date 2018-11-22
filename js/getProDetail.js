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

function load(){
   $.ajax({
      url:'http://140.143.133.96:8080/servlet/ManagerController?flag=getGoodWorksDetails',
      data:{
         id:paraObj.id
      },
      dataType:'json',
      success:function(data){
         $('.detail-title').html(data.title);
         $('.detail-desc').html(data.statement);
         $('.detail-content').html(data.content);
         $('.detail-author').html(data.author);
         $('.detail-date').html(data.date); 
      }
   })
}
load();