var formVerify={
  'username':$('#username'),
  'password':$('#password'),
  'passwordSecond':$('#passwordSecond'),
  'name':$('#name'),
  'sex':$('#sex'),
  'grade':$('#grade'),
  'stu_id':$('#stu_id'),
  'phone':$('#phone'),
  'position':$('#position'),
}
layer.config({
  skin:'layui-layer-molv'
})

$('.con-submit').click(function(){
  var isAccess=true;
  for(var i in formVerify){
     var color=formVerify[i].parent().css('borderColor');
     if(color!='rgb(0, 128, 0)'){
      isAccess=false;
     }
  }
    if(!isAccess){
    layer.open({
      content:"请正确填写信息!",
      offset:'140px'})
    return false;
  }
  $(this).hide();
  var self=this;
  $.ajax({
		url:'http://140.143.133.96:8080/servlet/UserController?flag=register',
    type:'POST',
		data:{
          'username':formVerify.username.val(),
          'password':formVerify.password.val(),
          'name':formVerify.name.val(),
          'sex':formVerify.sex.val(),
          'grade':formVerify.grade.val(),
          'stu_id':formVerify.stu_id.val(),
          'phone':formVerify.phone.val(),
          'position':formVerify.position.val()
		},
    dataType:'json',
    success:function(data){
      if(data.stateCode==0){
        $(self).show();
      }
      layer.open({
        offset:'140px',
        content:data.message
      })
    },
    error:function(){
      $(self).show();

    }
	});
});
function checkDoublePassword(){
   var pattern=/^\w{6,18}$/;
   if(formVerify.password.val()!=''&&formVerify.password.val()==formVerify.
      passwordSecond.val()&&pattern.test(formVerify.password.val())){
      formVerify.passwordSecond.parent().css({'borderColor':'green'});
   }else{
      formVerify.passwordSecond.parent().css({'borderColor':'red'});
   }
}
$('input').keyup(function(){
  var parent=$(this).parent();
  var pattern;
  switch(this.id){
    case 'username':
    case 'password':pattern=/^\w{6,18}$/;break;
    case 'name':pattern=/^.{1,20}$/;break;
    case 'sex':pattern=/^['男'|'女']{1}$/;break;
    case 'grade':pattern=/^[0-9]{1,4}$/;break;
    case 'stu_id':pattern=/^[0-9]{10}$/;break;
    case 'phone':pattern=/^[0-9]+$/;break;
    case 'position':pattern=/^.+$/;break;
    case 'passwordSecond':checkDoublePassword();return;
    default:pattern=undefined;
  }
 if(pattern===undefined)return false;
 if(!pattern.test($(this).val())){
    parent.css({'borderColor':'red'});
 }else{
  parent.css({'borderColor':'rgb(0,128,0)'});
 }
})