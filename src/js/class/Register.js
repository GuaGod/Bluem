export class Register {
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
            html += `<li class="register-item">
                         <ul>
                           <li>${list[i].name}</li>
                           <li>${list[i].grade}</li>
                           <li>${list[i].position}</li>
                           <li>${list[i].stu_id}</li>
                           <li>${list[i].phone}</li>
                           <li class="more">
                                <a href="#${list[i].stu_id}">查看详情</a>
                            </li>
                          </ul>
                      </li>`
        }
        return html;
    }
}