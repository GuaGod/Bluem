export class BlogPage {
    constructor() {
       this.active;
       this.pageNum;
       this.type;
       this.url;
       this.html;
    }

    urlHooks(type) {
        var url = '';
        url = type['keyWord'] === undefined ? 
                            'http://140.143.133.96:8080/servlet/SystemController?flag=findPageByClass'
                            :'http://140.143.133.96:8080/servlet/SystemController?flag=findBlogByKeyWord';
        return url;
    }
     
    //点击前端，后端，热度时，初始化，这样缓存在点击分页时需要传输的数据
    init(data) {
       this.pageNum = 1;
       this.totalPage = data.totalPage;
       this.type = data['keyWord'] === undefined ?  {blogClass :data['blogClass']} :
                  {keyWord: data['keyWord']};
       this.url = this.urlHooks(this.type);
       var html = `<li data-id="1">首页</li>`;
       var _totalPage_ = this.totalPage >=5 ? 5 : this.totalPage;
       for(let i = 1; i <= _totalPage_; i++) {
           if(i === 1) {
               html += `<li class="page-li active" data-id=${i}>${i}</li>`;
               continue;
           }
           html += `<li class="page-li" data-id=${i}>${i}</li>`;
       }
       html += `<li data-id=${this.totalPage}>尾页</li>`
       this.html = html ;
    }

    update(pageNum) {
        var _total_ = this.totalPage;
        var html = `<li data-id="1">首页</li>`;
        var start;
        var _showPage_ = this.totalPage >=5 ? 5 : this.totalPage;
        
        if(_showPage_ < 5) {
            return false;
        }
        console.log(pageNum);
        if(_total_ - pageNum > 2) {
            start = pageNum;
        } else {
            start = _total_ - 4;
        }

        for(let i = 1; i <= 5 ;i++) {
            html += `<li data-id=${start}>${start}</li>`;
            start++;
        }
        html += `<li data-id=${_total_}>尾页</li>`;
        this.html = html;
    }
}