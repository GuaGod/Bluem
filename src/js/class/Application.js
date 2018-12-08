export class Application {
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
            html += `<li class="application-item">
                         <ul>
                            <li class="photo">
                               <img src="../${list[i].photo}">
                            </li>
                            <li class="name">${list[i].name}</li>
                            <li class="major">${list[i].major}</li>
                            <li class="job">${list[i].job_interview}</li>
                            <li class="id">${list[i].stu_id}</li>
                            <li class="phone">${list[i].phone}</li>
                            <li class="more">
                                <a href="./applicationDetail.html?id=${list[i].stu_id}" target="_blank">查看详情</a>
                            </li>
                           </ul>
                     </li>` 
        }
        return html;
    }
    
    open() {
        $.ajax({
            url:'http://140.143.133.96:8080/servlet/ManagerController?flag=openSignUp',
            data:{
                operation:1
            },
            dataType:'json',
            success:function(data){
                layer.open({
                    content:data.message,
                    offset: '140px;'
                })
            },
            error:function(e){
              console.log(e);
            }
           })
    }
    
    close() {
        $.ajax({
            url:'http://140.143.133.96:8080/servlet/ManagerController?flag=openSignUp',
            data:{
                operation:0
            },
            dataType:'json',
            success:function(data){
                layer.open({
                    content:data.message,
                    offset: '140px;'
                })
            },
            error:function(e){
               console.log(e);
            }
           }) 
    }

}