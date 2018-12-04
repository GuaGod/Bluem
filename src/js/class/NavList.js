export class NavList {
    constructor(proxy, page) {
        this.active = 1;
        this.proxy = proxy;
        this.list = proxy.children('li');
        this.page = page;  
      
        this.bindEvent(this.proxy);
    }

    bindEvent(proxy) {
       var that = this;
       proxy.click(function(e) {
          var _len_ = that.list.length;
          var $target = $(e.target); 
          var pageNow = $target.data('page');
  
          for(let i = 0; i < _len_; i++) {
              $(that.list[i]).removeClass('active');
              $(that.page[i]).removeClass('page-active');
          }

          $target.addClass('active');

          for(let i = 0; i < _len_; i++) {
              if($(that.page[i]).data('page') === pageNow) {
                  $(that.page[i]).addClass('page-active');
                  break;
              }
          }
       });
    }
}