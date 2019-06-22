function logout () {
    // 登出
    let logoutredir = function () {
        console.log('bye');
        window.location.href = './gateway.html';
        return;
    }
    $.ajax({
        type: "post",
        url: masterURL+'logout',
        success: logoutredir,
        error: function (err, res) {
            if(err.status==200)logoutredir();
            return;
        }
    });
}

