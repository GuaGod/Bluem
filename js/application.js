

/*1.该对象用于展示用户要上传的图片
  2.传入两个参数，第一个是图片展示的块的id，第二个是input标签（传给后台的那个input
  的id）*/
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
//该对象代表报名信息 
$('#subData').click(function(){
  dataString=new FormData($('#appInfor')[0]);
  $('#subData').hide('1000');
  $.ajax({
    url:'http://140.143.133.96:8080/servlet/UserController?flag=signUp',
    data:dataString,
    dataType:'json',
    processData:false,
    contentType:false,
    type:'post',
    success:function(data){
      console.log(data);
    },
    error:function(d){
      $('subData').show(1000);
    }
  })
})

$('.container').css({
  height:document.documentElement.scrollHeight+'px'
})