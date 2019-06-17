let mainDiv = $('#main');
let libList = $('#libs');
let docList = $('#docs');

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

function showinfo(td) {
    console.log($(td).parent().parent().html());
    $('#infoModal').modal('show');
}

function changeMark(td) {
    $('#markModal').modal('show');
}

function down(td) {
    console.log($(td).parent().parent().html());
    alert('锐意开发中');
}

function border(div) {
    // 鼠标移到色标上时描绘边框
    $(div).css({'border':'2px solid'});
}

function deborder(div) {
    // 鼠标移出色标时取消描绘边框
    $(div).css({'border':'none'});
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
