let mainDiv = $('#main');
let libList = $('#libs');
let docList = $('#docs');

+ function($) {
    'use strict';

    // UPLOAD CLASS DEFINITION
    // ======================

    var dropZone = document.getElementById('drop-zone');
    var uploadForm = document.getElementById('js-upload-form');

    var startUpload = function(files) {
        console.log(files)
    }

    uploadForm.addEventListener('submit', function(e) {
        var uploadFiles = document.getElementById('js-upload-files').files;
        e.preventDefault()

        startUpload(uploadFiles)
    })

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

function showLUpload(ltable) {
    // 文件拖入时隐藏列表显示上传
    let lupload = $('#lupload');
    lupload.attr('lid', $(ltable).attr('lid'));
    $(ltable).hide();
    lupload.show();
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

function down(button) {
    let did = $(button).parent().parent().parent().attr('did');
    // window.open('document-download-list'+did);
    alert('锐意开发中');
}

function remFromLib(button) {
    // 从分类中移除一篇文献
    let did = $(button).parent().parent().parent().attr('did');
    alert('锐意开发中');
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
    alert('锐意开发中');
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
