let mainDiv = $('#main');
let libList = $('#libs');
let docList = $('#docs');
let docTable = $('#docTable');
let libListArea = $('#libList');

var masterURL = 'http://39.108.137.227/';

var dragImg = new Image(); 
dragImg.src = './img/file.jpg'; 

let adev =()=>alert('锐意开发中');

function getCurrentLibId() {
    // 获取现在的libid
    return libListArea.children('.active').attr('lid');
}

function getCurrentLibType() {
    // 获取现在的libid
    return libListArea.children('.active').attr('ltype');
}

function updateLibs () {
    // 获取liblist列表并绘制
    var libs = post_getLib();
    if(!libs)return;
    renderLibTable(libs);
}

function getDocsIn(lid, ltype) {
    // 获得lid中的文档并绘制
    var docs = post_getDoc(lid, ltype);
    if(!docs)return;
    renderDocumentTable(docs);
}

+ function($) {
    // 拖放文件上传
    'use strict';

    var dropZone = document.getElementById('drop-zone');

    var startUpload = function(files) {
        var upload = new FormData();
        upload.append('data',files[0]);
        postFile(upload);
        $('#lupload').hide();
        $('#ltable').show();
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
// TODO: ajax、模板渲染 (ok)

function showinfo(button) {
    // 点击详情，显示文献信息
    let infoModal = $('#infoModal');
    let infoBody = $('#infoBody');
    let info = getInfoFor($(button).parent().parent().parent().attr('did'));
    if(!info){
        networkWarn();
        return;
    }
    info.author_parsed = parseAuthors(info.author);
    info += parseTopics(info);
    info += parseScore(info.score);
    info.id_parsed = parseid(info.paper_id);
    infoBody.append($(_Minfo.format(info)));
    infoModal.modal('show');
}

function editInfo (e) {
    // 点选信息，开始编辑
    $(e).hide();
    $(e).next().show();
}

function hideLUpload(lupload) {
    // 文件没拖入时隐藏上传显示列表
    $(lupload).hide();
    $('#ltable').show();
}

function networkWarn () {
    // 显示一个网络错误的对话框
    $('#neterrModal').modal('show');
}

function promptSuccess(prompt) {
    // 返回一个提示操作已经成功的函数，提示词prompt
    return ()=>{
        let ban = $('successBan');
        ban.html(prompt);
        ban.slideDown('slow');
        setTimeout(()=>ban.slideUp('slow'), 1000);
    }
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

$(function () {
    $('#dtDynamicVerticalScrollExample').DataTable(dttLocale);
    $('.dataTables_length').addClass('bs-select');
});

$(function(){
    renderLibTable(dumbLibs.libs);
    renderDocumentTable(dumbDocs.docs);
});

function dataTableTrun () {
    // 清空datatable
    let dtt = $('#dtDynamicVerticalScrollExample').dataTable();
    dtt.fnClearTable();
    dtt.fnDestroy();
}

function dataTableInit () {
    // 重新渲染datatable
    $('#dtDynamicVerticalScrollExample').dataTable(dttLocale);
    $('.dataTables_length').addClass('bs-select');
}

function createLib(btn) {
    // 添加分类
    var libname = $('#libName').val();
    post_createLib(libname);
}

function addToReadLater(btn) {
    // 加到待读列表
    let did = $(button).parent().parent().parent().attr('did');
    post_addToReadLater(did);
}

function showDocsIn (li) {
    // 点击lib时，激活此li并显示lib内容到右侧
    libListArea.children('li').removeClass('active');
    $(li).addClass('active');
    getDocsIn($(li).attr('lid'), $(li).attr('ltype'));
}

function changeMark(td) {
    let markModal = $('#markModal');
    markModal.attr('did', $(td).parent().attr('did'));
    markModal.modal('show');
}

function delLib (btn) {
    // 删除library
    let lid = $(btn).parent().attr('lid');
    let m = $('#warnDelLibModal');
    m.attr('lid',lid);
    m.modal('show');
    hideDelLibBtn('#showDelLibBtn');
}

function delLibConfirmed (btn) {
    let lid = $(btn).parent().parent().parent().parent().attr('lid');
    // 实际操作删除分类
    post_delLib(lid);
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
    post_addDocToLib(did, lid);
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
    // 下载文献
    let did = $(button).parent().parent().parent().attr('did');
    window.open(masterURL+'getdoc/'+did);
}

function remFromLib(button) {
    // 从分类中移除一篇文献
    if(getCurrentLibType=='1')return;
    let did = $(button).parent().parent().parent().attr('did');
    var lid = getCurrentLibId();
    post_remDocFromLib(did, lid);
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
    post_removeDoc(did);
    $('#warnRemDocModal').modal('hide');
    $('#infoModal').modal('hide');
}

function renderLibTable(larray) {
    // 把列表larray渲染到分类目录
    libListArea.empty(); // 先清空dom
    var list = [];
    var all, rl; // 全部和待读
    for (let i = 0; i < larray.length; i++) {
        const lib = larray[i];
        if(lib.type==0){
            lib.lib_name = '<i class="fas fa-flag"></i>待读列表';
            rl = $(_Mlib_0.format(lib));
        }
        else if(lib.type==1){
            lib.lib_name = '<i class="fas fa-folder-open"></i>所有文献';
            all = $(_Mlib_1.format(lib));
        }
        else {
            var li = $(_Mlib.format(lib));
            list.push(li);
        }
    }
    libListArea.append(all);
    libListArea.append(rl);
    libListArea.append(list);
    tooltipInit();
}

function renderDocumentTable(darray) {
    // 把文献列表渲染到docTable
    docTable.empty();
    dataTableTrun();
    for (let i = 0; i < darray.length; i++) {
        const doc = darray[i];
        doc.mark = markColours[doc.mark];
        docTable.append($(_Mdoc.format(doc)));
    }
    dataTableInit();
    tooltipInit();
}
