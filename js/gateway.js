// 预加载函数
$();

let loading = $("#loading");

function login(u, p) {
    
}

function register(u, p) {
    
}

$("#登录>button").click((e) => {
    e.preventDefault();
    loading.removeClass("d-none");
    var username = $("#username").val();
    var passwd = $("#passwd").val();
    login(username, passwd);
});

$("#注册>button").click((e) => { 
    e.preventDefault();
    loading.removeClass("d-none");
    var username = $("#usernamer").val();
    var passwd = $("#passwdr").val();
    register(username, passwd);
});

// 测试用
loading.click((e) => {
    e.preventDefault();
    loading.addClass("d-none");
});