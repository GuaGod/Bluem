function Blog(con,title, desc, author, time, read,blogClass,content,id){
   var blog=$('<li class="oneBlog"></li>');
   blog.html('<div class="blog-title"><a href="./lookotherBlog.html?id='+id+'" class="blog-title-con"></a> </div><div class="blog-desc"><span class="blog-desc-con"></span></div> <div class="blog-author"><span>作者：</span><span class="blog-author-con"></span></div><div class="blog-class"><span>类别：</span><span class="blog-class-con"></span></div> <div class="blog-time">   <span>时间：</span>   <span class="blog-time-con"></span> </div> <div class="blog-readNumber"><span>阅读量：</span><span class="blog-readNumber-con"></span></div>');
   con.append(blog); 
   blog.find('.blog-title-con').text(title);
   blog.find('.blog-desc-con').text(desc);
   blog.find('.blog-author-con').text(author);
   blog.find('.blog-time-con').text(time);
   blog.find('.blog-readNumber-con').text(read);
   blog.find('.blog-class-con').text(blogClass);
}

function DividePage(container,pageNum,contentList,isClass,returnValue){
  var num=pageNum;
  var $con=container;
  var pageNow=1;
  var $conList=contentList;
  var returnV=returnValue;
  this.isClass=isClass;
  var self=this;
  //添加一个分页
  var ul=$('<ul class="page-ul"></ul>');
  function init(){
    if(num!=0){
    ul.append('<div class="page-list">首页</div>');}
      if(num<5){
        for(var i=0;i<num;i++){
          if(i==0){
            ul.append($('<li class="page-list page-list-active">'+(i+1)+'</li>'));
          }else{
          ul.append($('<li class="page-list">'+(i+1)+'</li>'));}
        }
      }else{
        for(var i=0;i<5;i++){
           if(i==0){
            ul.append($('<li class="page-list page-list-active">'+(i+1)+'</li>'));
          }else{
          ul.append($('<li class="page-list">'+(i+1)+'</li>'));}
        }
      }
      if(num!=0){
      ul.append('<div class="page-list">尾页</div>');}
      $con.append(ul);
  }

  init();
  //根据数据修改当前页面
  function changePage(clickNow){
     if(self.isClass){
       $.ajax({
        url:'http://140.143.133.96:8080/servlet/SystemController?flag=findPageByClass',
        dataType:'json',
        data:{
          pageNum:clickNow,
          blogClass:returnV
        },
        success:function(data){
          $conList.html('');
          pageNow=clickNow;
        
          for(var i=0;i<data.list.length;i++){
            new Blog($('.blogSection'),data.list[i].title,data.list[i].articleGist,data.list[i].username,
                    data.list[i].date,data.list[i].readNum,data.list[i].blogClass,data.list[i].content,data.list[i].id)
            }
          if(sessionStorage.getItem('stateCode')==2){
                  $('.oneBlog').append('<div class="blog-delete">删除</div>');
                  $('.blog-delete').click(function(){
                       var string=$(this).siblings('.blog-title').children('a')[0].href
                       var pattern=/\?id=([1-9]+)/;
                       $.ajax({
                        url:'http://140.143.133.96:8080/servlet/UserController?flag=manageBlog&operation=delete',
                        data:{
                          id:pattern.exec(string)[1],
                        },
                        dataType:'json',
                        type:'POST',
                        success:function(){
                          location.reload();
                        }
                       })
                  })                
                }
          changeNav(clickNow);
        },
        error:function(){
          alert('网络异常！');
        }
       })}else{
        $.ajax({
        url:'http://140.143.133.96:8080/servlet/SystemController?flag=findBlogByKeyWord',
        dataType:'json',
        data:{
          pageNum:clickNow,
          keyWord:returnV
        },
        success:function(data){
          $conList.html('');
          console.log('clickNow'+clickNow);
          console.log(data);
          pageNow=clickNow;
          for(var i=0;i<data.list.length;i++){
            new Blog($conList,data.list[i].title,data.list[i].articleGist,data.list[i].username,
                    data.list[i].date,data.list[i].readNum,data.list[i].blogClass,data.list[i].content,data.list[i].id)
          }
          if(sessionStorage.getItem('stateCode')==2){
                  $('.oneBlog').append('<div class="blog-delete">删除</div>');
                  $('.blog-delete').click(function(){
                       var string=$(this).siblings('.blog-title').children('a')[0].href
                       var pattern=/\?id=([1-9]+)/;
                       $.ajax({
                        url:'http://140.143.133.96:8080/servlet/UserController?flag=manageBlog&operation=delete',
                        data:{
                          id:pattern.exec(string)[1],
                        },
                        dataType:'json',
                        type:'POST',
                        success:function(){
                          location.reload();
                        }
                       })
                  })                
                }
          changeNav(clickNow);
        },
        error:function(){
          alert('网络异常！');
        }
       })
       }   
  }
  //根据分页长度修改分页列表的显示
  function changeNav(clickNow){
    var $lis=$(ul).children('li');
        var len=$lis.length;//实际的li数量 小于等于5
        var start;
    for(var i=0;i<len;i++){
          $($lis[i]).removeClass('page-list-active');
        }
        if(num<5){
          if(clickNow=='首页'){
              $($lis[0]).addClass('page-list-active');
            }else if(clickNow=='尾页'){
              $($lis[num-1]).addClass('page-list-active');
            }else{
              $($lis[clickNow-1]).addClass('page-list-active');
            }
        }else{
          if(clickNow=='首页'){
              start=1;
               $($lis[0]).addClass('page-list-active');
          }else if(clickNow=='尾页'){
              start=num-4;
              $($lis[4]).addClass('page-list-active');
          }
            else if(clickNow<=2){
              start=1;  
              $($lis[clickNow-1]).addClass('page-list-active');
            }else if(clickNow>=num-1){
              start=num-4;
              if(clickNow==num-1){
                $($lis[3]).addClass('page-list-active');
              }else{
                $($lis[4]).addClass('page-list-active');
              }             
            }else{
              start=clickNow-2;
              $($lis[2]).addClass('page-list-active');
            }
            for(var i=0;i<5;i++){
              $($lis[i]).html(start++);
            }
        }
     }
    $(ul).click(function(e){
       var clickNow=e.target.innerHTML;
       if(clickNow=='首页'){
        clickNow=1;
       }else if(clickNow=='尾页'){
        clickNow=num;
       }else{
        clickNow=+clickNow;
       }
       changePage(clickNow);
    })
    this.turnToNew=function(pageNum,returnValue,isClass){
        $conList.html('');
        ul.html('');
        pageNow=1;
        num=pageNum;
        this.isClass=isClass;
        returnV=returnValue;
        init();
    }
}



function loadBlog() {
        $.ajax({
            url:'http://140.143.133.96:8080/servlet/SystemController?flag=findPageByClass',
            data:{
              pageNum:1,
              blogClass:"前端"
            },
            dataType:'json',
            success: function(data) {
               for(var i=0;i<data.list.length;i++){
                  new Blog($('.blogSection'),data.list[i].title,data.list[i].articleGist,data.list[i].username,
                    data.list[i].date,data.list[i].readNum,data.list[i].blogClass,data.list[i].content,data.list[i].id)
                 }
                window.dividePage=new DividePage($('.divide-page-con'),data.totalPage,$('.blogSection'),true,'前端')
                if(sessionStorage.getItem('stateCode')==2){
                  $('.oneBlog').append('<div class="blog-delete">删除</div>');
                  $('.blog-delete').click(function(){
                       var string=$(this).siblings('.blog-title').children('a')[0].href
                       var pattern=/\?id=([1-9]+)/;
                       $.ajax({
                        url:'http://140.143.133.96:8080/servlet/UserController?flag=manageBlog&operation=delete',
                        data:{
                          id:pattern.exec(string)[1],
                        },
                        dataType:'json',
                        type:'POST',
                        success:function(){
                          location.reload();
                        }
                       })
                  })                
                }
            },
            error: function(e) {
                console.log(e);
            }
        })
    }
loadBlog();
$('.classify').click(function(e){
   if($(e.target).hasClass('btn')){
      $.ajax({
        url:'http://140.143.133.96:8080/servlet/SystemController?flag=findPageByClass',
        data:{
           pageNum:1,
           blogClass:$(e.target).html()
        },
        dataType:'json',
        success:function(data){
           console.log('classData');
           console.log(data);
           dividePage.turnToNew(data.totalPage,$(e.target).html(),true);
           for(var i=0;i<data.list.length;i++){
            new Blog($('.blogSection'),data.list[i].title,data.list[i].articleGist,data.list[i].username,
                    data.list[i].date,data.list[i].readNum,data.list[i].blogClass,data.list[i].content,data.list[i].id)
          }
          if(sessionStorage.getItem('stateCode')==2){
                  $('.oneBlog').append('<div class="blog-delete">删除</div>');
                  $('.blog-delete').click(function(){
                       var string=$(this).siblings('.blog-title').children('a')[0].href
                       var pattern=/\?id=([1-9]+)/;
                       $.ajax({
                        url:'http://140.143.133.96:8080/servlet/UserController?flag=manageBlog&operation=delete',
                        data:{
                          id:pattern.exec(string)[1],
                        },
                        dataType:'json',
                        type:'POST',
                        success:function(){
                          location.reload();
                        }
                       })
                  })                
                }
        },
        error:function(e){
          console.log(e);
        }
      })
     }
})

$('#search-btn').click(function(){
  var con=$('#search-con');
  if(con.val()==''){
    return;
  }
  $.ajax({
    url:'http://140.143.133.96:8080/servlet/SystemController?flag=findBlogByKeyWord',
    dataType:'json',
    data:{
      pageNum:1,
      keyWord:con.val() 
    },
    success:function(data){
      console.log('keyWordData:');
      console.log(data);
      dividePage.turnToNew(data.totalPage,con.val(),false);
      for(var i=0;i<data.list.length;i++){
                  new Blog($('.blogSection'),data.list[i].title,data.list[i].articleGist,data.list[i].username,
                    data.list[i].date,data.list[i].readNum,data.list[i].blogClass,data.list[i].content,data.list[i].id)
      }
      if(sessionStorage.getItem('stateCode')==2){
                  $('.oneBlog').append('<div class="blog-delete">删除</div>');
                  $('.blog-delete').click(function(){
                       var string=$(this).siblings('.blog-title').children('a')[0].href
                       var pattern=/\?id=([1-9]+)/;
                       $.ajax({
                        url:'http://140.143.133.96:8080/servlet/UserController?flag=manageBlog&operation=delete',
                        data:{
                          id:pattern.exec(string)[1],
                        },
                        dataType:'json',
                        type:'POST',
                        success:function(){
                          location.reload();
                        }
                       })
                  })                
                }
    }
  })
})