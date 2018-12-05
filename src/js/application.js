import 'babel-polyfill';

import '../less/universal.less';
import '../less/userHeadFoot.less';
import '../less/application.less';

function Img(uId,pId){
	var uImg=document.getElementById(uId);
	var pImg=document.getElementById(pId);
	function getURL(file){
		var url=null;
		if(window.createObjectURL){
			url=window.createObjectURL(file);
		}else if(window.URL.createObjectURL){
		    url=window.URL.createObjectURL(file);}
		else if(window.webkitURL.createObjectURL){
            url=window.webkitURL.createObjectURL(file);
		}
		return url;
	}
	pImg.addEventListener('change',function(){
		var url=getURL(this.files[0]);
		if(url!=null)
			uImg.src=url;
	})
}
var imgOnly=new Img('show-img','user-img');  

$('#subData').click(function(){
    var dataString=new FormData($('#appInfor')[0]);
    $.ajax({
      url:'http://140.143.133.96:8080/servlet/UserController?flag=signUp',
      data:dataString,
      dataType:'json',
      processData:false,
      contentType:false,
      type:'post',
      success:function(data){
        alert(data.message);
      },
      error:function(d){
        alert('信息不全');
      }
    })
  })
  