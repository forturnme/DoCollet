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

function post_getLib () {
    // 获得文献列表
    var libs = null;
    $.ajax({
        type: "post",
        url: masterURL+'getlib',
        success: function (response) {
            libs = response.libs;
        },
        error: function (err, res) {
            if(err.status==200)libs=res.libs;
            else networkWarn();
        }
    });
    return libs;
}

function postFile (upload) {
    // 投递文献
    var suc = (res)=>{
        promptSuccess('文献上传成功')();
        // 把上传的文献加到现在的分类
        var ltype = getCurrentLibType();
        var lid = getCurrentLibId();
        if(ltype=='1'){getDocsIn(lid, ltype);return;}
        post_addDocToLib(res.id, lid, ()=>{
            getDocsIn(lid, ltype);
        });
    };
    $.ajax({
        type: "post",
        url: "http://39.108.137.227/upload",
        cache: false,//上传文件不需要缓存
        processData: false, // 告诉jQuery不要去处理发送的数据
        contentType: false, // 告诉jQuery不要去设置Content-Type请求头
        data: upload,
        success: suc,
        error: function (err, res) {
            if(err.status==200)suc(res);
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
    var suc = ()=>{
        promptSuccess('已加入待读列表')();
        updateLibs();
    };
    $.ajax({
        type: "post",
        url: masterURL+'addreadlater',
        data: JSON.stringify({'document_id':did}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: suc,
        error: function (err, res) {
            if(err.status==200)suc();
            else networkWarn();
        }
    });
}

function post_addDocToLib (did, lid, func) {
    // 将文章did加入lid
    var suc = ()=>{
        promptSuccess('文献已加入分类')();
        updateLibs();
        func();
    };
    $.ajax({
        type: "post",
        url: masterURL+'addtolib',
        data: JSON.stringify({'document_id':did,'lib_id':lid}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: suc,
        error: function (err, res) {
            if(err.status==200)suc();
            else networkWarn();
        }
    });
}

function post_getDoc(lid, ltype) {
    // 获得lid中的文献列表
    var docs = null;
    $.ajax({
        type: "post",
        url: masterURL+'getdocsinlib/'+ltype,
        data: JSON.stringify({'lib_id':lid}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            docs = response.docs;
        },
        error: function (err, res) {
            if(err.status==200)docs = response.docs;
            else networkWarn();
        }
    });
    return docs;
}

function post_remDocFromLib(did, lid){
    // 从分类中移除一个文献
    let suc = ()=>{
        promptSuccess('文献已从分类中移除')();
        var lt = getCurrentLibType();
        getDocsIn(lid, lt);
    }
    $.ajax({
        type: "post",
        url: masterURL+'removefromlib',
        data: JSON.stringify({'document_id':did,'lib_id':lid}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: suc,
        error: (err, res)=>{
            if(err.status==200)suc();
            else networkWarn();
        }
    });
}

function post_removeDoc(did) {
    // 永久删除文献
    var suc = ()=>{
        var lid = getCurrentLibId();
        var lt  = getCurrentLibType();
        promptSuccess('文献已经删除')();
        getDocsIn(lid, lt);
        updateLibs();
    }
    $.ajax({
        type: "post",
        url: masterURL+'removedoc',
        data: JSON.stringify({'document_id':did}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: suc,
        error: (err, res)=>{
            if(err.status==200)suc();
            else networkWarn();
        }
    });
}

function post_createLib(libname){
    // 创建新分类
    var suc = ()=>{
        $('#newLibModal').modal('hide');
        updateLibs();
    };
    $.ajax({
        type: "post",
        url: masterURL+'addlib',
        data: JSON.stringify({'lib_name':libname}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: suc,
        error: (err, res)=>{
            if(err.status==200)suc();
            else networkWarn();
        }
    });
}

function post_delLib(lid){
    // 删除分类
    var suc = ()=>{
        $('#warnDelLibModal').modal('hide');
        updateLibs();
    }
    $.ajax({
        type: "post",
        url: masterURL+'deletelib',
        data: JSON.stringify({'lib_id':lid}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: suc,
        error: (err, res)=>{
            if(err.status==200)suc();
            else networkWarn();
        }
    });
}