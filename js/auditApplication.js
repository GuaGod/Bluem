$('.container').css({
  height:document.documentElement.scrollHeight+'px'
})
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
      url:'http://140.143.133.96:8080/servlet/ManagerController?flag=getApplicantDetail',
      data:{
         'stu_id':paraObj.id
      },
      dataType:'json',
      success:function(data){
          $('#user-name').val(data.name);
          $('#user-job').val(data.major);
          $('#user-sex').val(data.sex);
          $('#user-grade').val(data.grade);
          $('#user-interview').val(data['job_interview']);
          $('#user-age').val(data.age);
          $('#user-stuId').val(data['stu_id']);
          $('#user-phone').val(data.phone);
          $('#user-qq').val(data.qq);
          $('#user-email').val(data.email);
          $('#user-dormitory').val(data.dormitory);
          $('#user-intro').html(data['self_info']);
          $('#user-skill').html(data.skill);
      }
   })
}
load();