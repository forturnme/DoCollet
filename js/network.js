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

function postFile (upload) {
    // 投递文献
    $.ajax({
        type: "post",
        url: "http://39.108.137.227/upload",
        cache: false,//上传文件不需要缓存
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        data: upload,
        success: promptSuccess('文献上传成功'),
        error: function (err, res) {
            if(err.status==200)promptSuccess('文献上传成功')();
            else networkWarn();
        }
    });
}

function getInfoFor(did) {
    // 请求id为did的文献信息
    var info = null;
    $.ajax({
        type: "post",
        url: masterURL+'getinfo',
        data: JSON.stringify({'document_id':did}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            info = response;
        },
        error: function (err, res) {
            if(err.status==200)info = res;
            else if(err)console.error(err);
        }
    });
    return info;
}

function post_addToReadLater(did) {
    // 将did加到待读列表
    $.ajax({
        type: "post",
        url: masterURL+'addreadlater',
        data: JSON.stringify({'document_id':did}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        dataType: "dataType",
        success: promptSuccess('已加入待读列表'),
        error: networkWarn
    });
}