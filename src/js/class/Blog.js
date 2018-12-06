export class Blog {
    constructor(type) {
        this.url = 'http://140.143.133.96:8080/servlet/SystemController?flag=findPageByClass';
        this.type = {blogClass: '前端'};
        this.html;
    }

    urlHooks(type) {
        var url = '';
        url = type['keyWord'] === undefined ? 
                             'http://140.143.133.96:8080/servlet/SystemController?flag=findPageByClass'
                            :'http://140.143.133.96:8080/servlet/SystemController?flag=findBlogByKeyWord';
                            return url;
                }
    
    update(data, fn) {
       var that = this;
         that.type =  data['keyWord'] === undefined ?  {blogClass :data['blogClass']} :
                                                        {keyWord: data['keyWord']}
         that.url = this.urlHooks(that.type);
      
       $.ajax({
           url:that.url,
           data:data,
           dataType:'json',
           success:function(data) {
            let list = data.list;
            let _len_ = list.length;
            let html = '';
            for(let i = 0; i < _len_; i++) {
                html += `<li>
                <div class="logo">
                    <img src="../images/logo.jpg">
                </div>
                <div class="first-line">
                        <div class="class">${list[i].blogClass}</div>
                        <a class="title">${list[i].title}</a>
                </div>
                <div class="second-line">
                        <div class="author">${list[i].username}</div>
                        <div class="date">${list[i].date}</div>
                        <div class="desc">${list[i].articleGist}</div>
                        <div class="readNum">阅读量：${list[i].readNum}</div>
                </div>
                </li>`;
            }
            that.html = html;
            fn(html, data);
           }
       })
    }


}