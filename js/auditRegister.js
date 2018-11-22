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
  	url:'http://140.143.133.96:8080/servlet/ManagerController?flag=getRegisterDetail',
    data:{
    	'stu_id':paraObj.id
    },
    dataType:'json',
    type:'POST',
    success:function(data){
       $('#username').val(data.username);
       $('#password').val(data.password);
       $('#passwordSecond').val(data.password);
       $('#name').val(data.name);
       $('#sex').val(data.sex);
       $('#grade').val(data.grade);
       $('#stu_id').val(data['stu_id']);
       $('#phone').val(data.phone);
       $('#position').val(data.position);
    }  	
  })
}
load();