let mainDiv = $('#main');
let libList = $('#libs');
let docList = $('#docs');

var dragImg = new Image(); 
dragImg.src = './img/file.jpg'; 

let adev =()=>alert('锐意开发中');

+ function($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    // var uploadForm = document.getElementById('js-upload-form');

    var startUpload = function(files) {
        var upload = new FormData();
        upload.append('data',files[0]);
        $.ajax({
            type: "post",
            url: "http://39.108.137.227/upload",
            cache: false,//上传文件不需要缓存
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            data: upload,
            success: function (response) {
                console.log(response);
                $('#lupload').hide();
                $('#ltable').show();
            },
            error: function (err, res) {
                console.log(res);
                $('#lupload').hide();
                $('#ltable').show();
            }
        });
    }

    dropZone.ondrop = function(e) {
        e.preventDefault();
        this.className = 'upload-drop-zone';

        startUpload(e.dataTransfer.files)
    }

    dropZone.ondragover = function() {
        this.className = 'upload-drop-zone drop';
        return false;
    }

    dropZone.ondragleave = function() {
        this.className = 'upload-drop-zone';
        return false;
    }

}(jQuery);

function border(div) {
    // 鼠标移到色标上时描绘边框
    $(div).css({'border':'2px solid gray'});
}

function deborder(div) {
    // 鼠标移出色标时取消描绘边框
    $(div).css({'border':'none'});
}

function showLUpload(ltable, event) {
    // 文件拖入时隐藏列表显示上传
    console.log(event);
    if(event.dataTransfer.effectAllowed == 'copy')return;
    let lupload = $('#lupload');
    lupload.attr('lid', $(ltable).attr('lid'));
    $(ltable).hide();
    lupload.show();
}

// TODO: 加上创建分类的对话框 (ok)
// TODO: 加上删除分类时要显示的按钮 (ok)
// TODO: 加上上传文件失败时付费的提示 (exceedLimitModal) (ok)
// TODO: 加上删除分类时的确认 (ok)
// TODO: 加上退出登录的确认和方法 (ok, and ajax to be added)
// TODO: 在详情页面加上一点击对应的元素就变为文本框编辑  (ok)
// TODO: 添加session storage传递用户名、文件查看id、文件标题的信息
// TODO: 完善MD编辑器 (ok)
// TODO: 加上保存笔记的按钮
// TODO: ajax、模板渲染

function editInfo (e) {
    // 点选信息，开始编辑
    $(e).hide();
    $(e).next().show();
}

function logout () {
    // 登出
    // TODO: fill this
    console.log('bye');
}

function hideLUpload(lupload) {
    // 文件没拖入时隐藏上传显示列表
    $(lupload).hide();
    $('#ltable').show();
}

function tooltipInit () {
    $('[data-toggle="tooltip"]').tooltip()
}

function maintaince () {
    let mheight = mainDiv.innerHeight();
    libList.height(mheight);
    docList.height(mheight);
    docList.width(mainDiv.innerWidth()-libList.outerWidth()-8);
    tooltipInit();
}

$(()=>{$('#lupload').hide();});

$(maintaince);

$(window).resize(maintaince);

$(()=>{
    $('#dtDynamicVerticalScrollExample').DataTable({
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "每页显示 _MENU_ 篇文献",
            "sZeroRecords": "没有匹配文献",
            "sInfo": "显示第 _START_ 至 _END_ 篇文献，共 _TOTAL_ 项",
            "sInfoEmpty": "没有文献可供显示",
            "sInfoFiltered": "(由 _MAX_ 篇文献过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "没有文献可供显示",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        }
    });
    $('.dataTables_length').addClass('bs-select');
});

function showinfo(button) {
    let infoModal = $('#infoModal');
    infoModal.attr('did', $(button).parent().parent().parent().attr('did'));
    infoModal.modal('show');
}

function changeMark(td) {
    let markModal = $('#markModal');
    markModal.attr('did', $(td).parent().attr('did'));
    markModal.modal('show');
}

function delLib (btn) {
    // 删除library
    let lid = $(btn).parent().attr('lid');
    let m = $('#warnDelLibModal')
    m.attr('lid',lid);
    m.modal('show');
    hideDelLibBtn('#showDelLibBtn');
}

function delLibConfirmed (btn) {
    let lid = $(btn).parent().parent().parent().parent().attr('lid');
    // 实际操作删除分类
    adev();
}

function dragDoc(tr, event) {
    // 开始拖动文献
    event.dataTransfer.setData('Text',$(event.target).parent().attr('did'));
    event.dataTransfer.effectAllowed = 'copy';
    event.dataTransfer.setDragImage(dragImg, 64, 64);
    event.target.style.backgroundColor = 'cyan';
}

function dragDocOk (event) {
    event.target.style.backgroundColor = '';
}

function allowDrop(li, event) {
    $(li).css('border','2px solid');
    event.preventDefault();
}

function docOut (li) {
    $(li).css('border', '1px solid rgba(0,0,0,.125)');
}

function receiveDoc (li, event) {
    // 文献被拖到新的分类
    let lid = $(li).attr('lid');
    var did = event.dataTransfer.getData("Text");
    docOut(li);
    console.log(lid);
    console.log(did);
}

function saveNote() {
    $.ajax({
        type: "post",
        url: "http://39.108.137.227/savenote",
        data: {document_id:"5d08ea3da444cde42d4e6d66", note_content:"Hey There\n"},
        success: function (response) {
            console.log(response);
        }
    });
}

function getNote() {
    $.ajax({
        type: "post",
        url: "http://39.108.137.227/getnote",
        data: {document_id:"5d08ea3da444cde42d4e6d66"},
        success: function (response) {
            console.log(response);
        }
    });
}

function down(button) {
    let did = $(button).parent().parent().parent().attr('did');
    // window.open('document-download-list'+did);
    window.open('http://39.108.137.227/getdoc/5d08ea3da444cde42d4e6d66');
    adev();
}

function remFromLib(button) {
    // 从分类中移除一篇文献
    let did = $(button).parent().parent().parent().attr('did');
    adev();
}

function showDelLibBtn (btn) {
    // 显示删除分类的按钮
    $('#libList').children('li').children('button').show();
    $(btn).removeClass('btn-outline-secondary');
    $(btn).addClass('btn-danger');
    $(btn).attr('onclick','hideDelLibBtn(this);');
}

function hideDelLibBtn (btn) {
    // 隐藏删除分类的按钮
    $('#libList').children('li').children('button').hide();
    $(btn).removeClass('btn-danger');
    $(btn).addClass('btn-outline-secondary');
    $(btn).attr('onclick','showDelLibBtn(this);');
}

function delDoc(delBtn){
    // 彻底删除文献
    let warnModal = $('#warnRemDocModal');
    warnModal.attr('did', $(delBtn).parent().parent().parent().parent().attr('did'));
    warnModal.modal('show');
}

function delDocConfirmed(btn) {
    // 处理删除文献
    let did = $(btn).parent().parent().parent().parent().attr('did');
    $('#warnRemDocModal').modal('hide');
    $('#infoModal').modal('hide');
    adev();
}

function renderLibTable(larray) {
    var list = '';
    for (let i = 0; i < larray.length; i++) {
        const lib = larray[i];
        list += '<li class="list-group-item d-flex justify-content-between align-items-center" lid="{0}">{1}<span class="badge badge-primary badge-pill">{2}</span></li>'.format(lib.lib_id ,lib.lib_name, lib.doc_count);
    }
    return list;
}

function renderDocumentTable(darray) {
    var list = '';
    for (let i = 0; i < darray.length; i++) {
        const document = darray[i];
        list += '<tr did="{0}"><td onclick="alert(this)">{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td></tr>'.format(document.document_id ,document.mark, document.title, document.fst_author, document.source, document.year);
    }
    return list;
}
