// 预加载函数
function bgsize() {
    $('body').css('background-size','100% '+$(window).height());
}
$(bgsize);
window.onresize=bgsize;

var masterURL = './';

let loading = $("#loading");

function preLogin(u) {
    // 验证用户名，获取盐
    var ret;
    $.ajax({
        type: "post",
        async: false,
        url: masterURL+'login1',
        data: JSON.stringify({
            'username':u
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            ret = response.id;
        },
        error: function (err, res) {
            if(err.status == 403){
                $('#usrnotexistmod').modal('show');
                ret = null;
            }
            else{
                $('#neterr').modal('show');
                ret = null;
            }
        }
    });
    return ret;
}

function login(u, p, pu) {
    // 向服务器传送加密的用户名和密码来登录，登录成功后重定向至主页
    let sf = function () {
        sessionStorage.setItem('username', pu);
        window.location.href='./index.html';
        return;
    };
    $.ajax({
        type: "post",
        url: masterURL+'login2',
        data: JSON.stringify({'username':u,'passwd':p}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: sf,
        error: function (err, res) {
            if(err.status == 200)sf();
            loading.addClass('d-none');
            $('#loginfailmod').modal('show');
            return;
        }
    });
}

function register(u, p) {
    // 使用用户名和散列的密码注册
    let sf = function () {
        loading.addClass('d-none');
        $('#registerokmod').modal('show');
        return;
    };
    $.ajax({
        type: "post",
        url: masterURL+'register',
        data: JSON.stringify({'username':u,'passwd':p}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: sf,
        error:function (err, res) {
            if(err.status == 200)sf();
            if(err.status == 403){
                loading.addClass('d-none');
                $('#usernameused').modal('show');
                return;
            }
            else{
                $('#neterr').modal('show');
                return;
            }
        }
    });
}

$("#登录>button").click((e) => {
    // 处理登录
    loading.removeClass("d-none");
    var username = $("#username").val();
    var plain_username = username;
    // username = md5(username);
    var s = preLogin(username);
    if(!s){
        loading.addClass('d-none');
        return;
    }
    var passwd = md5($("#passwd").val());
    passwd = md5(passwd+s);
    login(username, passwd, plain_username);
});

$("#regis").click((e) => {
    // 处理注册
    loading.removeClass("d-none");
    var username = $("#usernamer").val();
    var passwd = $("#passwdr").val();
    if(passwd.length < 9 || /[^0123456789]/.test(passwd)==false){
        loading.addClass("d-none");
        $('#badenter').modal('show');
        return;
    }
    // username = md5(username);
    passwd = md5(passwd);
    register(username, passwd);
    return;
});

function login_r(){
    // 注册后直接登录
    loading.removeClass("d-none");
    var username = $("#usernamer").val();
    var s = preLogin(username);
    if(!s){
        loading.addClass('d-none');
        return;
    }
    var passwd = $("#passwdr").val();
    passwd = md5(passwd);
    passwd = md5(passwd+s);
    login(username, passwd, username);
}
