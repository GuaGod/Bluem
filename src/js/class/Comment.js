export class Comment {
    constructor(comment_id) {
        this.url = 'http://140.143.133.96:8080/servlet/SystemController?flag=findPageReply';
        this.comment_id;
        this.pageNum = 1;
        this.totalPage = -1;
        this.ul;
        this.more;
        this.reply;
    }
     
    init(data, fn) {
        this.comment_id = data.comment_id;
        var html = `<li class="comment">
        <div class="comment-main">
            <div class="main-left">
                <img src="../images/logo.jpg">
                <div>${data.username}</div>
            </div>
            <div class="main-right">
                <div class="content">
                        ${data.content}
                </div>
                <ul>

                </ul>
                <div class="more" data-comment_id=${data.comment_id}>更多回复</div>
            </div>
        </div>
      </li>`
        var $dom = $(html);
        fn($dom);

        this.ul = $dom.find('ul');
        this.more = $dom.find('.more');

        this.bindMore(this.more);
        this.more.trigger('click');
        this.bindReply(this.ul);
       
        return html;
    }
    
    bindMore(more) {
        var that = this;
        more.click(function() {
            if(that.totalPage == -1 || that.pageNum <= that.totalPage){
               that.moreSonComment();
            } else{
               that.clearSonComment();
            }
        })
    }

    moreSonComment() {
        var that = this;
        $.ajax({
            url: that.url,
            data: {
                comment_id: that.comment_id,
                pageNum: this.pageNum
            },
            dataType: 'json',
            success: function (data) {
                var html = '';
                var _list_ = data.list;
                var _len_ = _list_.length;
                for (let i = 0; i < _len_; i++) {
                    html += `<li class="comment-item">
                                <div>
                                  <span class="former">${_list_[i].fromer}</span>
                                  <span>回复</span>
                                  <span class="toer">${_list_[i].toer}</span>
                                </div>
                                <div>
                                    ${_list_[i].content}
                                   <span class="reply">回复</span>
                                   <textarea></textarea>
                                   <span class="reply-btn" data-id=${_list_[i].id} data-comment_id=${_list_[i].comment_id}>确认</span>
                                </div>
                             </li>`
                }
                that.ul.append(html);
                that.totalPage = data.totalPage;
                that.pageNum++;
                if(that.pageNum === that.totalPage + 1) {
                     that.more.html('收起回复');
                }
            }
        })
    }

    clearSonComment() {
        this.pageNum = 1;
        this.ul.html('');
        this.more.html('更多回复');
    }
    
    reply(content, id, comment_id) {
       $.ajax({
           url:"http://140.143.133.96:8080/servlet/DoFilter?flag=replyComment",
           data: {
               comment_id: comment_id,
               content: content,
               id:id
           },
           dataType:'json',
           success:function(data) {
               window.location.reload();
           },
           error: function(error) {
               console.log(error);
           }
       })
    }
    
    bindReply(ul) {
        var that = this;
        ul.click(function(e) {
            var $target = $(e.target);
          
            if($target.hasClass('reply')) {
                $target.siblings('textarea').toggleClass('active');
                $target.siblings('.reply-btn').toggleClass('active');
            }

            if($target.hasClass('reply-btn')) {
                var content = $target.siblings('textarea').val();
                var id = $target.data('id');
                var comment_id = $target.data('comment_id');
                that.reply(content, id, comment_id);
            }
        })
    }
}