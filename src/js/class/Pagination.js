export class Pagination {
    //config : 分页名称，分页控制的对象
    //fn : 点击分页 刷新完数据后， 数据的呈现

    constructor(config, fn) {
        this.name = config.name;
        this.control = config.control;
        this.fn = fn;

        this.url = this.urlHooks(this.name);
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
    
    update(data) {
        var that = this;
        $.ajax({
            url: that.url,
            data: data,
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
        $.ajax({
            url: that.url,
            data: data,
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
}