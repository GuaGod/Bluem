import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export class Pagination {
    //config : 分页名称，分页控制的对象
    //fn : 点击分页 刷新完数据后， 数据的呈现

    constructor(config, fn, ul) {
        this.name = config.name;
        this.control = config.control;
        this.fn = fn;
        this.totalPage = -1;
        this.ul = ul;
        this.url = this.urlHooks(this.name);
        this.dataBase = this.dataHooks(this.name);
    }

    urlHooks(name) {
        var hooks = {
            'news': 'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
            'notices': 'http://140.143.133.96:8080/servlet/ManagerController?flag=findNewsPageByDate',
            'production': 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageGoodWorks',
            'application': 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageSignUp',
            'register': 'http://140.143.133.96:8080/servlet/ManagerController?flag=findPageRegister'
        }
        return hooks[name];
    }
    
    dataHooks(name) {
        var hooks = {
            'news' : {newsClass:'news'},
            'notices': {newsClass:'notice'},
            'application' : {},
            'register' : {},
            'production' : {}
        }
        return hooks[name];
    }
    
    update(data) {
        var that = this;
        var _data_ = $.extend(that.dataBase,data);

        $.ajax({
            url: that.url,
            data: _data_,
            dataType: 'json',
            success: function (data) {
                that.control.update(data);
                that.fn();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
   
    //向外暴露一个初始化的接口
    init(data) {
        var that = this;
        var _data_ = $.extend(this.dataBase, data);
        $.ajax({
            url: that.url,
            data: _data_,
            dataType: 'json',
            success: function (data) {
                that.control.update(data);
                that.totalPage = data.totalPage;

                that.rendor(that.totalPage);
                that.bindEvent(that.ul);
                that.fn();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    //分页渲染
    rendor(totalPage) {
      var _pages_ = totalPage >= 5 ? 5 : totalPage;
      var html = `<li data-id="1">首页</li>`
      for(let i = 1; i <= _pages_; i++) {
          if(i === 1) {
          html += `<li class="active" data-id=${i}>${i}</li>`;
          continue;
          };
          html += `<li data-id=${i}>${i}</li>` 
      } 
      html += `<li data-id=${totalPage}>尾页</li>`
      this.ul.html(html);
    }

    bindEvent(ul) {
      var that = this;
      var totalPage = that.totalPage;
      var changeColor = function(target) {
          var _lists_ = that.ul.children('li');
          var _len_ = _lists_.length;
          for(var i = 0; i < _len_; i++) {
              _lists_.eq(i).removeClass('active');
          }
          if(target.html() === '首页') {
             _lists_.eq(1).addClass('active');
          } else if (target.html() === '尾页') {
              _lists_.eq(-2).addClass('active');
          } else {
              target.addClass('active');
          }
      }
      ul.click(function(e) {
        var $target = $(e.target);
        var pageNum = $target.data('id');
        changeColor($target);
        that.update({'pageNum':pageNum});
        var start;
        if(totalPage <= 5) {
            return ;
        }

        if(pageNum <= 2) {
           start = 1;
        } 
        
        if(pageNum >= totalPage - 1) {
           start = totalPage - 4;
        }
        
        if(pageNum > 2 && pageNum <totalPage - 1) {
            start = pageNum - 2;
        }
        
        var html = `<li data-id="1">首页</li>`;
        for(var i = 0; i < 5; i++) {
            html += `<li data-id=${start}>${start}</li>`;
            start++;
        }
        html += `<li data-id=${totalPage}>尾页</li>`;

        that.ul.html(html);
      })
    }
}