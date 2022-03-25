<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
    <script src="/ckeditor5/build/ckeditor.js"></script>
    <link rel="stylesheet" type="text/css" href="/ckeditor5/sample/styles.css">
    <style type="text/css">
        .ck-content {height: 50vh;}
    </style>
</head>
<script type="text/javascript">
    var staffId = "<%=session.getAttribute("staffId")%>";

    function pageLoad(){
        sessionCheck(staffId);

        var fromDate = new Date()
        fromDate.setDate(fromDate.getDate() - 30);
        var fromday = _getFormatDate(fromDate);
        var today = _getFormatDate(new Date());
        $('#fromDate').val(fromday);
        $('#toDate').val(today);
        $('#toDate').val(today);
        $('#fromDate').attr('max',today);
        $('#toDate').attr('max',today);
    }

</script>
<body onload="pageLoad()">
<div class="admin_wrap">
    <%@ include file="../include/nav.jsp" %>
    <div class="admin_container">
        <section class="admin_section">
            <h2 class="admin_title">공지관리</h2>
            <div class="admin_summary">
                <dl>
                    <dt>공지 수</dt>
                    <dd><%=request.getAttribute("totalNotice")%>개</dd>
                </dl>
                <dl>
                    <dt>필독공지 수</dt>
                    <dd><%=request.getAttribute("mustNotice")%>개</dd>
                </dl>
                <a href="javascript:void(0);" onclick="showPop('add_notice');">공지 추가</a>
            </div>
            <div class="admin_utility">
                <form action="#" method="post">
                    <label for>조회일</label>
                    <input type="date" id="fromDate" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey();">
                    -
                    <input type="date" id="toDate" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey();">
                    <button type="button" class="admin_utility_btn" onClick="getNoticeList();">조회</button>
                </form>
            </div>
            <div class="admin_content">
                <!-- 필터 영역 admin_filter-->

                <!-- 보드 영역 admin_dashboard-->
                <div class="admin_dashboard">
                    <select name="noticeGridPageCount" id="noticeGridPageCount" onchange="getNoticeList();">
                        <option value="30" selected>30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <select name="subcon" id="subcon" onchange="getNoticeList();">
                        <option value="all" selected="selected">전체</option>
                        <option value="Y">활성화</option>
                        <option value="N">비활성화</option>
                    </select>
                    <div class="btn_wrap">
                        <button type="button" class="stroke">칼럼위치저장</button>
                        <button type="button" class="stroke">칼럼초기화</button>
                    </div>
                    <div class="grid_wrap">
                        <div id="noticeGrid"></div>
                        <div id="noticeGridPager" class="pager"></div>
                    </div>
                    <div class="btn_wrap">
                        <button type="button" class="stroke">칼럼위치저장</button>
                        <button type="button" class="stroke">칼럼초기화</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
<!-- 팝업 -->
<!-- 팝업 : 공지 추가 -->
<div class="popup" id="add_notice">
    <div class="popup_container">
        <div class="popup_head">
            <p class="popup_title">공지 추가</p>
            <button type="button" class="popup_close" onClick="closePop();">x</button>
        </div>
        <div class="popup_inner">
            <dfn>필수항목 *</dfn>
            <form id="newNoticeForm" name="newNoticeForm" action="#" method="post">
                <div class="row">
                    <label for="new_active">활성화</label>
                    <input type="checkbox" id="new_active" name="new_active" checked>체크 시, 활성화
                </div>
                <div class="row">
                    <label for="new_must">필독공지</label>
                    <input type="checkbox" id="new_must" name="new_must" checked>체크 시, 필독
                </div>
                <div class="row">
                    <label for="new_title">제목<i>*</i></label>
                    <input type="text" id="new_title" name="new_title" style="width:455px;" required>
                </div>
                <div class="row" style="display:flex;">
                    <label for="new_editor">내용<i>*</i></label>
                    <div style="width:476px;"><textarea name="new_editor" id="new_editor"></textarea></div>
                </div>
            </form>
            <div class="popup_btn_area" style="margin-top:12px;">
                <button id="saveNotice" type="button" class="popup_btn confirm">작성</button>
            </div>
        </div>
    </div>
</div>
<!--공지 추가 팝업 영역 끝-->
<!-- 팝업 : 공지 수정 -->
<div class="popup" id="modify_notice">
    <div class="popup_container">
        <div class="popup_head">
            <p class="popup_title">공지 수정</p>
            <button type="button" class="popup_close" onClick="closePop();">x</button>
        </div>
        <div class="popup_inner">
            <dfn>필수항목 *</dfn>
            <form id="modifyNoticeForm" name="modifyNoticeForm" action="#" method="post">
                <div class="row">
                    <label for="modify_active">활성화</label>
                    <input type="checkbox" id="modify_active" name="modify_active" checked>체크 시, 활성화
                    <input type="hidden" id="notice_index" name="notice_index">
                </div>
                <div class="row">
                    <label for="modify_must">필독공지</label>
                    <input type="checkbox" id="modify_must" name="modify_must" checked>체크 시, 필독
                </div>
                <div class="row">
                    <label for="modify_title">제목<i>*</i></label>
                    <input type="text" id="modify_title" name="modify_title" style="width:455px;" required>
                </div>
                <div class="row" style="display:flex;">
                    <label for="modify_editor">내용<i>*</i></label>
                    <div style="width:476px;"><textarea name="modify_editor" id="modify_editor"></textarea></div>
                </div>
            </form>
            <div class="popup_btn_area" style="margin-top:12px;">
                <button id="modifyNotice" type="button" class="popup_btn stroke">수정</button>
                <button id="deleteNotice" type="button" class="popup_btn fill">삭제</button>
            </div>
        </div>
    </div>
</div>
<!--공지 수정 팝업 영역 끝-->
</body>
</html>
<script>
    var noticeView;
    var noticeGrid;
    var noticeGridPager;
    var noticeColumns;
    var saveBtn = document.getElementById("saveNotice");
    var updateBtn = document.getElementById("modifyNotice");
    var deleteBtn = document.getElementById("deleteNotice");

    saveBtn.addEventListener('click',saveNewNotice);
    updateBtn.addEventListener('click',updateNotice);
    deleteBtn.addEventListener('click',deleteNotice);

    function loadGridNoticeList(type, result) {
        if(type == "init"){
            noticeView = new wijmo.collections.CollectionView(result, {
                pageSize: 100
            });

            //페이지 이동
            noticeGridPager = new wijmo.input.CollectionViewNavigator('#noticeGridPager', {
                byPage : true,
                headerFormat: '{currentPage:n0} / {pageCount:n0}',
                cv: noticeView
            });

            noticeColumns = [
                { binding: 'index', header: '공지번호', isReadOnly: true, width: 200, align:"center"},
                { binding: 'title', header: '제목', isReadOnly: true, width: 350, align:"center"  },
                { binding: 'cretDt', header: '작성날짜', isReadOnly: true, width: 200, align:"center"},
                { binding: 'updtDt', header: '수정날짜', isReadOnly: true, width: 200, align:"center"},
                { binding: 'mustYn', header: '필독활성화', isReadOnly: true, width: 200, align:"center"},
                { binding: 'content', header: '콘텐츠', isReadOnly: true, width: 200, visible:false, align:"center"},
                { binding: 'activeYn', header: '활성화', isReadOnly: true, width: 100, align:"center"},
                { binding: 'edit', header: '공지수정', width: 130, align:"center",
                    cellTemplate: wijmo.grid.cellmaker.CellMaker.makeButton({
                        text: '<b>수정</b>',
                        click: (e, ctx) => {
                            showPop("modify_notice")
                        }
                    })
                },
                { binding: 'content', header: '내용', isReadOnly: true, width: 200, align:"center", visible: false}
            ]

            noticeGrid = new wijmo.grid.FlexGrid('#noticeGrid', {
                autoGenerateColumns: false,
                alternatingRowStep: 0,
                columns : noticeColumns,
                itemsSource: noticeView,
                loadedRows: function(s, e) {
                    s.autoSizeColumns();
                },
                cellEditEnded: function(s, e) {
                    s.autoSizeColumn(e.col);
                },
                rowEditEnded: function(s, e) {
                    s.autoSizeColumns();
                }
            });

            _setUserGridLayout('noticeLayout', noticeGrid, noticeColumns);

            //행번호 표시하기
            noticeGrid.itemFormatter = function (panel, r, c, cell) {
                if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                    cell.textContent = (r + 1).toString();
                }
            };
        }else {
            noticeView = new wijmo.collections.CollectionView(result, {
                pageSize: Number($('#noticeGridPageCount').val()),
                trackChanges: true,
            });
            noticeGridPager.cv = noticeView;
            noticeGrid.itemsSource = noticeView;
        }
        refreshPaging(noticeGrid.collectionView.totalItemCount, 1, noticeGrid, 'noticeGrid');
    }

    //공지 조회
    function getNoticeList(){
        var param = {
            searchDtTo : $('#toDate').val()
            , searchDtFr : $('#fromDate').val()
            , subcon : $('#subcon').val()
        };

        $.ajax({
            type : 'GET',
            url : '/notice/getNoticeList',
            dataType : null,
            data : param,
            success : function(result) {
                console.log("getNoticeList success");
                loadGridNoticeList('search', result);
            },
            error: function(request, status, error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

            }
        });
    }

    //공지 추가
    function saveNewNotice(){
        if(newNoticeForm.new_title.value == ""){
            alert("제목을 입력해주세요.");
            newNoticeForm.new_title.focus();
            return false;
        }else if(editor1.getData() == ""){
            alert("내용을 입력해주세요.");
            newNoticeForm.new_editor.focus();
            return false;
        }
        var params = {
            title : newNoticeForm.new_title.value
            ,content : editor1.getData()
            ,activeYn:(newNoticeForm.new_active.checked ? 'Y' : 'N' )
            ,mustYn:(newNoticeForm.new_must.checked ? 'Y' : 'N' )
        }

        $.ajax({
            url : "/notice/saveNewNotice",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : 'text',
            data : params,
            success : function(data) {
                alert('저장되었습니다.');
                closePop();
                getNoticeList();
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    }

    //공지 수정
    function updateNotice(){
        if(modifyNoticeForm.modify_title.value == ""){
            alert("제목을 입력해주세요.");
            modifyNoticeForm.modify_title.focus();
            return false;
        }else if(editor2.getData() == ""){
            alert("내용을 입력해주세요.");
            modifyNoticeForm.modify_editor.focus();
            return false;
        }

        var params = {
            index : modifyNoticeForm.notice_index.value
            ,title : modifyNoticeForm.modify_title.value
            ,content : editor2.getData()
            ,activeYn : (modifyNoticeForm.modify_active.checked ? 'Y' : 'N' )
            ,mustYn : (modifyNoticeForm.modify_must.checked ? 'Y' : 'N' )
        }

        $.ajax({
            url : "/notice/updateNotice",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'PUT',
            cache : false,
            dataType : 'text',
            data : params,
            success : function(data) {
                alert('수정되었습니다.');
                closePop();
                getNoticeList();
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    }

    //공지 삭제
    function deleteNotice(){
        if(confirm("삭제하시겠습니까?")){
            var params = {
                index : modifyNoticeForm.notice_index.value
            };

            $.ajax({
                url : '/notice/deleteNotice',
                async : false, // 비동기모드 : true, 동기식모드 : false
                type : 'DELETE',
                cache : false,
                dataType : null,
                data : params,
                success : function(data) {
                    alert('정상적으로 삭제되었습니다.');
                    closePop();
                    getNoticeList();
                },
                error : function(request,status,error) {
                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });
        }
    }

    //팝업 오픈
    function showPop(pop){
        if(pop == "add_notice"){
            newNoticeForm.new_title.value = "";
            newNoticeForm.new_must.checked = false;
            editor1.setData("");
        }else {
            modifyNoticeForm.notice_index.value = noticeGrid.collectionView.currentItem["index"];
            modifyNoticeForm.modify_active.checked = (noticeGrid.collectionView.currentItem["activeYn"] == 'Y' ? true : false );
            modifyNoticeForm.modify_must.checked = (noticeGrid.collectionView.currentItem["mustYn"] == 'Y' ? true : false );
            modifyNoticeForm.modify_title.value = noticeGrid.collectionView.currentItem["title"];
            editor2.setData(noticeGrid.collectionView.currentItem["content"]);
        }

        $('#'+pop).addClass('is-visible');

    }

    //팝업 종료
    function closePop(){
        $('.popup').removeClass('is-visible');
        // add = false;
        // categoryGrid.allowAddNew = add;
        // categorySelectCnt = 0;
    }

    //이미지업로드
    class UploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        upload() {
            return this.loader.file.then( file => new Promise(((resolve, reject) => {
                this._initRequest();
                this._initListeners( resolve, reject, file );
                this._sendRequest( file );
            })))
        }

        abort() {
            if ( this.xhr ) { this.xhr.abort(); }
        }

        _initRequest() {
            const xhr = this.xhr = new XMLHttpRequest();
            xhr.open('POST', '/notice/uploadImg', true);
            xhr.responseType = 'json';
        }

        _initListeners(resolve, reject, file) {
            const xhr = this.xhr;
            const loader = this.loader;
            const genericErrorText = '파일을 업로드 할 수 없습니다. \n파일용량은 3MB를 초과할수 없습니다.'

            xhr.addEventListener('error', () => {reject(genericErrorText)})
            xhr.addEventListener('abort', () => reject())
            xhr.addEventListener('load', () => {
                const maxSize = 3500000;
                const response = xhr.response
                console.log(response);
                if(!response || response.error ||file.size > maxSize) {
                    return reject( response && response.error ? response.error.message : genericErrorText );
                }

                resolve({
                    default: response.url //업로드된 파일 주소
                })
            })
        }

        _sendRequest(file) {
            const data = new FormData()
            data.append('file', file);
            this.xhr.send(data)
        }
    }

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader)
        }
    }

    $(document.body).ready(function() {
        $('#notice').addClass("current");
        loadGridNoticeList('init');
        ClassicEditor
            .create( document.querySelector( '#new_editor' ), {
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'outdent',
                        'indent',
                        '|',
                        'imageUpload',
                        'blockQuote',
                        'insertTable',
                        'undo',
                        'redo',
                        'fontColor',
                        'fontBackgroundColor',
                        'fontSize',
                        'underline',
                        'specialCharacters',
                        'horizontalLine',
                        'htmlEmbed'
                    ]
                },
                language: 'ko',
                image: {
                    toolbar: [
                        'imageTextAlternative',
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side'
                    ]
                },
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells'
                    ]
                },
                extraPlugins: [MyCustomUploadAdapterPlugin],
                licenseKey: '',



            } )
            .then( editor => {
                editor1 = editor;
                editor1.setData("");
                editor1.plugins.get('FileRepository').createUploadAdapter = (loader)=>{
                    return new UploadAdapter(loader);
                };

            } )
            .catch( error => {
                console.error( 'Oops, something went wrong!' );
                console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
                console.warn( 'Build id: eed83e2ex4oz-pejoxvy7ffif' );
                console.error( error );
            } );
        ClassicEditor
            .create( document.querySelector( '#modify_editor' ), {
                toolbar: {
                    items: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        'link',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'outdent',
                        'indent',
                        '|',
                        'imageUpload',
                        'blockQuote',
                        'insertTable',
                        'undo',
                        'redo',
                        'fontColor',
                        'fontBackgroundColor',
                        'fontSize',
                        'underline',
                        'specialCharacters',
                        'horizontalLine',
                        'htmlEmbed'
                    ]
                },
                language: 'ko',
                image: {
                    toolbar: [
                        'imageTextAlternative',
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side'
                    ]
                },
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells'
                    ]
                },
                extraPlugins: [MyCustomUploadAdapterPlugin],
                licenseKey: '',



            } )
            .then( editor => {
                editor2 = editor;
                editor2.plugins.get('FileRepository').createUploadAdapter = (loader)=>{
                    return new UploadAdapter(loader);
                };

            } )
            .catch( error => {
                console.error( 'Oops, something went wrong!' );
                console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
                console.warn( 'Build id: eed83e2ex4oz-pejoxvy7ffif' );
                console.error( error );
            } );
    });
</script>
