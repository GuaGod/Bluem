export class Production {
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

    rendor(list){
        var _len_ = list.length;
        var html = '';
        for (let i = 0; i < _len_; i++) {
            html += `<li class="production-item">
            <ul>
                <li>${list[i].title}</li>
                <li>${list[i].author}</li>
                <li>${list[i].date}</li>
                <li class="option">
                    <button>查看</button>
                    <button>修改</button>
                    <button>删除</button>
                </li>
            </ul>
        </li>`
        }
        return html;
    }
}