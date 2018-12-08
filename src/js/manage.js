import 'babel-polyfill';

import '../less/manage.less';
import '../less/universal.less';

import {HeaderList} from './class/HeaderList.js';
import {NavList} from './class/NavList.js';
import {User} from './class/User.js';
import {Application} from './class/Application';
import {Register} from './class/Register';
import {News} from './class/News';
import {Notices} from './class/Notices';
import {Pagination} from './class/Pagination';

//左侧管理，调整不同模块的显示
var navList = new NavList($('#manage-nav'), $('.page'));


var application = new Application(), 
    register = new Register(),
    news = new News(),
    notices = new Notices(), 
    production = null;


$('#app-open').click(function() {
  application.open();
})

$('#app-close').click(function() {
  application.close();
})

var application_nav = new Pagination({name:'application',control:application}, function() {
                                      $('#app-people').html(`已报名人数：${application.numbers}`);
                                      $('#application-ul').html(application.html);
                                    }, $('#application-nav'))

var news_nav = new Pagination({name:'news',control:news}, function() {
                                      $('#news-num').html(`新闻条数：${news.numbers}`);
                                      $('#news-ul').html(news.html);
                                    },$('#news-nav'));
var notices_nav = new Pagination({name:'notices', control:notices}, function() {
                                      $('#notices-num').html(`通知条数：${notices.numbers}`);
                                      $('#notices-ul').html(notices.html);
                               },$('#notices-nav'))
var register_nav = new Pagination({name:'register', control:register}, function() {
                                     $('#register-people').html(`待审核人数：${register.numbers}`);
                                     $('#register-ul').html(register.html);
},$('#register-nav'));

application_nav.init({pageNum:1});

news_nav.init({pageNum:1});

notices_nav.init({pageNum:1});

register_nav.init({pageNum:1});