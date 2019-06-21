// 坑爹的js把format删掉了，我给他手写一个
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

var _Mlib = // 分类的DOM模板
'<li class="waves-effect list-group-item d-flex \
    justify-content-between align-items-center" lid="{lib_id}" ltype="{type}" \
    ondragover="allowDrop(this, event)" ondragleave="docOut(this);" \
    ondrop="receiveDoc(this, event);" onclick="showDocsIn(this);">\
        {lib_name}\
    <span class="badge badge-primary badge-pill">{doc_count}</span>\
    <button type="button" class="btn btn-outline-danger waves-effect px-1 py-0 m-0 mr-1 mt-1" \
    onclick="delLib(this);"\
    data-toggle="tooltip" title="移除此分类" style="display: none;">\
    <i class="fas fa-trash"></i>\
    </button>\
</li>';

var _Mlib_0 = // 特殊分类（待读）的DOM模板
'<li class="waves-effect list-group-item d-flex \
    justify-content-between align-items-center" lid="{lib_id}" ltype="{type}" \
    ondragover="allowDrop(this, event)" ondragleave="docOut(this);" \
    ondrop="receiveDoc(this, event);" onclick="showDocsIn(this);">\
        {lib_name}\
    <span class="badge badge-primary badge-pill">{doc_count}</span>\
</li>';

var _Mlib_1 = // 特殊分类（全部）的DOM模板（不能拖入文件）
'<li class="waves-effect list-group-item d-flex \
    justify-content-between align-items-center" lid="{lib_id}" ltype="{type}" \
    onclick="showDocsIn(this);">\
        {lib_name}\
    <span class="badge badge-primary badge-pill">{doc_count}</span>\
</li>';

var _Mdoc = // 文章列表的DOM模板
'<tr did="{document_id}">\
    <td class="waves-effect" onclick="changeMark(this);">\
    <div onmousemove="border(this);" onmouseout="deborder(this);" \
    style="width:20px;height:20px;border-radius:50%;background-color:{mark};">\
    </div></td>\
    <td class="waves-effect" data-toggle="tooltip" title="点击以阅读" \
    ondragstart="dragDoc(this, event);" ondragend="dragDocOk(event);" \
    draggable="true">{title}</td>\
    <td>{fst_author}</td>\
    <td>{source}</td>\
    <td>{year}</td>\
    <td><div class="row m-0 p-0 align-middle" style="width: 124px;">\
        <button type="button" class="btn btn-outline-primary waves-effect px-1 py-0 m-0 mr-1 mt-1" \
        onclick="showinfo(this);" data-toggle="tooltip" title="信息">\
        <i class="fas fa-info-circle"></i>\
        </button>\
        <button type="button" class="btn btn-outline-secondary waves-effect px-1 py-0 m-0 mr-1 mt-1" \
        onclick="addToReadLater(this);" data-toggle="tooltip" title="待读">\
        <i class="fas fa-flag"></i>\
        </button>\
        <button type="button" class="btn btn-outline-info waves-effect px-1 py-0 m-0 mr-1 mt-1" \
        onclick="down(this);" data-toggle="tooltip" title="下载">\
        <i class="fas fa-arrow-down"></i>\
        </button>\
        <button type="button" class="btn btn-outline-default waves-effect px-1 py-0 m-0 mr-1 mt-1" \
        onclick="remFromLib(this);" data-toggle="tooltip" title="从分类中移除">\
        <i class="fas fa-trash"></i>\
        </button>\
    </div></td>\
</tr>';


// 调试用假数据
var dumbLibs = {
    'libs':[
        {
            'lib_id':'121424',
            'lib_name':'分类1',
            'doc_count':'3',
            'type':'2'
        },
        {
            'lib_id':'121343',
            'lib_name':'分类2',
            'doc_count':'6',
            'type':'2'
        },
        {
            'lib_id':'114514',
            'lib_name':'分类3',
            'doc_count':'12',
            'type':'2'
        },
        {
            'lib_id':'123412',
            'lib_name':'分类4',
            'doc_count':'5',
            'type':'2'
        },
        {
            'lib_id':'242435',
            'lib_name':'rel',
            'doc_count':'3',
            'type':'0'
        },
        {
            'lib_id':'544531',
            'lib_name':'分类5',
            'doc_count':'8',
            'type':'2'
        },
        {
            'lib_id':'234413',
            'lib_name':'asd',
            'doc_count':'34',
            'type':'1'
        },
        {
            'lib_id':'243924',
            'lib_name':'分类7',
            'doc_count':'2',
            'type':'2'
        }
    ]
};