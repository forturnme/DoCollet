var masterURL = './../';
var did = '';
$(()=>{
    // 页面加载完成后，获得笔记
    did = sessionStorage.getItem('did');
    $.ajax({
        type: "post",
        async: false,
        url: masterURL+'getnote',
        data: JSON.stringify({'document_id':did}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: (res)=>{
            renderNote(res.note);
        },
        error: (err, res)=>{
            if(err.status==200)renderNote(res.note);
            else console.error(err);
        }
    });
});

function save(){
    // 保存笔记
    let note = editor.getValue();
    $.ajax({
        type: "post",
        url: masterURL+'savenote',
        data: JSON.stringify({'document_id':did,'note_content':note}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert('保存成功。');
        },
        error: (err, res)=>{
            if(err.status==200)alert('保存成功。');
            else alert('网络错误，请稍后再试。')
        }
    });
}

function renderNote(note) {
    // 渲染笔记到md编辑器
    editor.setValue(note);
}