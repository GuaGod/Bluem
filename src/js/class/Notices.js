export class Notices {
    constructor() {
        this.pages;
        this.numbers;
        this.pageNum;
        this.list;
        this.html;
    }

    update(config) {
        this.pages = config.totalPage;
        this.numbers = config.totalRecord;
        this.pageNum = config.pageNum;
        this.list = config.list;
        this.html = this.rendor(this.list);
    }

    rendor(list) {
        var _len_ = list.length;
        var html = '';
        for (let i = 0; i < _len_; i++) {
            html += `<li class="notices-item" data-id="${list[i].id}">
                         <ul>
                           <li>${list[i].title}</li>
                           <li>${list[i].date}</li>
                           <li>
                              <button>查看</button>
                              <button>修改</button>
                              <button>删除</button>
                           </li>
                         </ul>
                     </li>`
        }
        return html;
    }
    
    add(target) {
        target.click(function(){
            window.open();
        })
    }
    
   delete(target) {

   }

   change(target) {

   }

   look(target) {
       
   }
}