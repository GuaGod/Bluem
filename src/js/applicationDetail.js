import 'babel-polyfill';

import '../less/universal.less';
import '../less/userHeadFoot.less';
import '../less/application.less';

import {Href} from './class/Href';

var href = (new Href()).data;

$.ajax({
    url:'http://140.143.133.96:8080/servlet/ManagerController?flag=getApplicantDetail',
    data:{
       'stu_id':href.id
    },
    dataType:'json',
    success:function(data){
        $('#user-name').val(data.name);
        $('#user-job').val(data.major);
        $('#user-sex').val(data.sex);
        $('#user-grade').val(data.grade);
        $('#user-interview').val(data['job_interview']);
        $('#user-age').val(data.age);
        $('#user-stuId').val(data['stu_id']);
        $('#user-phone').val(data.phone);
        $('#user-qq').val(data.qq);
        $('#user-email').val(data.email);
        $('#user-dormitory').val(data.dormitory);
        $('#user-intro').html(data['self_info']);
        $('#user-skill').html(data.skill);
        $('#show-img').attr('src','../img/'+data.photo);
    }
 })

