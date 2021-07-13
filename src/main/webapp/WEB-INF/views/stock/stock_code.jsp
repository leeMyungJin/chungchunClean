<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
var stockView;
var stockGridPager;
var stockGrid;
var stockColumns;
var categoryGrid;
var categoryView;
var categoryGridPager;
var add = false;
var stockSelector;
var categorySelector;
var categorySelectCnt = 0;
var dupCheckItemFlag = false;
var excelGrid;
var excelView;
var excelGridPager;
var excelSelector;
var addGrid;
var editGrid;
var editGridView;

function pageLoad(){
	$('#stock').addClass("current");
	$('#stock_code').addClass("current");
    loadGridStockList('init');
    $("#totalItemCnt").text("${totalItemCnt}".toLocaleString('ko-KR') + "개");

    //엑셀 업로드
    $("#importFile").on('change', function (params) {
        importExcel();
    });
}

function enterkey() {
    if (window.event.keyCode == 13) {
    	getStockList();
    }
}


//그리드 초기 셋팅
function loadGridStockList(type, result){
    if(type == "init"){
        $("#excelDiv").hide();
        stockView = new wijmo.collections.CollectionView(result, {
            pageSize: 100,
            groupDescriptions: ['lCategyNm']
        });
		// 페이지 이동
        stockGridPager = new wijmo.input.CollectionViewNavigator('#stockGridPager', {
            byPage: true,
            headerFormat: '{currentPage:n0} / {pageCount:n0}',
            cv: stockView
        });

        stockColumns =  [
                { isReadOnly: true, width: 35, align:"center"},
                { binding: 'lCategyCd', header: '카테고리코드', isReadOnly: true, width: 300, align:"center"},
                { binding: 'lCategyNm', header: '카테고리명', isReadOnly: true, width: 300, align:"center"},
                { binding: 'itemCd', header: '물품코드', isReadOnly: false, width: 300, align:"center"  },
                { binding: 'itemNm', header: '물품명', isReadOnly: false, width: 300, align:"center"  },
                { binding: 'cost', header: '원가', isReadOnly: false, width: '*', align:"center"}
            ]
		  
		// hostElement에 Wijmo의 FlexGird 생성
        // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
        // autoGenerateColumns: false >> 컬럼 사용자 정의 
        stockGrid = new wijmo.grid.FlexGrid('#stockGrid', {
            autoGenerateColumns: false,
            alternatingRowStep: 0,
            columns : stockColumns,
            itemsSource: stockView
        });

       _setUserGridLayout('stockLayout', stockGrid, stockColumns);

                  //행번호 표시하기
        stockGrid.itemFormatter = function (panel, r, c, cell) { 
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
            }
        };

        // 체크박스 생성
        stockSelector = new wijmo.grid.selector.Selector(stockGrid, {
            itemChecked: () => {
            }
        });

        stockSelector.column = stockGrid.columns[0];

        categoryView = new wijmo.collections.CollectionView(result, {
            pageSize: 100
        });
        //카테고리 추가용 그리드 설정
        categoryGridPager = new wijmo.input.CollectionViewNavigator('#categoryGridPager', {
            byPage: true,
            headerFormat: '{currentPage:n0} / {pageCount:n0}',
            cv: categoryView
        });
        categoryGrid = new wijmo.grid.FlexGrid('#categoryGrid', {
            autoGenerateColumns: false,
            alternatingRowStep: 0,
            columns: [
                { binding: 'lCategyCd', header: '카테고리코드', isReadOnly: false, width: 230, align:"center"},
                { binding: 'lCategyNm', header: '카테고리명', isReadOnly: false,  width: '*', align:"center"},
                { binding: 'regDate', header: '등록일시', isReadOnly: true, width: 230, align:"center"  }
            ],
            beginningEdit: function (s, e) {
                var col = s.columns[e.col];
                var item = s.rows[e.row].dataItem;
                if(item.regDate != undefined){
                    if (col.binding == 'lCategyCd') {
                        e.cancel = true;
                        alert("카테고리코드는 신규 행일때만 입력이 가능합니다.");
                    }
                }
            },
            cellEditEnding: function (s, e) {
                var col = s.columns[e.col];
                if (col.binding == 'lCategyCd') {
                    var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.String, col.format);
                    if (value.length != 3) {
                        e.cancel = true;
                        alert('카테고리코드는 3자리 입니다.');
                        return false;
                    }
                    value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
                    if( !wijmo.isNumber(value) || value < 0){
                        e.cancel = true;
                        alert('카테고리코드는 숫자로만 입력 가능합니다.');
                        return false;
                    }

                }
            },
            itemsSource: categoryView,
        });
        categorySelector = new wijmo.grid.selector.Selector(categoryGrid);
        editGrid = new wijmo.grid.FlexGrid('#editGrid', {
            itemsSource: categoryView.itemsEdited,
            isReadOnly: true
        });

        //엑셀 업로드용 그리드 
            excelGridPager = new wijmo.input.CollectionViewNavigator('#excelGridPager', {
            byPage: true,
            headerFormat: '{currentPage:n0} / {pageCount:n0}',
            cv: excelView
        });

		// hostElement에 Wijmo의 FlexGird 생성
        // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
        // autoGenerateColumns: false >> 컬럼 사용자 정의 
        excelGrid = new wijmo.grid.FlexGrid('#excelGrid', {
            autoGenerateColumns: false,
            alternatingRowStep: 0,
            columns : stockColumns,
            itemsSource: excelView
        });

        //행번호 표시하기
        excelGrid.itemFormatter = function (panel, r, c, cell) { 
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
            }
        };
    }else if(type == "category"){
        categoryView = new wijmo.collections.CollectionView(result, {
            pageSize: 100,
            trackChanges: true
        });
        categoryGridPager.cv = categoryView;
        categoryGrid.itemsSource = categoryView;
	}else{
        stockView = new wijmo.collections.CollectionView(result, {
            pageSize: 100,
            trackChanges: true,
            groupDescriptions: ['lCategyNm']
        });
        stockGrid.columns[0].width = 50;
        stockGridPager.cv = stockView;
        stockGrid.itemsSource = stockView;
	  }
      refreshPaging(stockGrid.collectionView.totalItemCount, 1, stockGrid, 'stockGrid');
      refreshPaging(categoryGrid.collectionView.totalItemCount, 1, categoryGrid, 'categoryGrid');
}

//코드 검색
function getStockList(){
    $("#excelDiv").hide();
    $("#stockDiv").show();
    var params = {
            inq : $("#inq").val(),
            con : $("#con").val()
    	}
    	$.ajax({
            url : "/stock/getStockList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            data : params,
            success : function(result) {
        	    loadGridStockList('search', result);
            },
            error : function(request,status,error) {
             	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
          });
}

function getCategyList(){
     $.ajax({
            url : "/stock/getCategoryList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
        	    loadGridStockList('category', result);

            },
            error : function(request,status,error) {
             	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
          });
}

//팝업 오픈
function showPop(pop){
	if(pop == "add_category"){
        getCategyList();
	}else if(pop == "add_product"){
        $('#category1')
            .empty()
            .append('<option selected="selected" value="all" selected>전체</option>');
   /*      $('#category2')
            .empty()
            .append('<option selected="selected" value="all" selected>전체</option>'); */
        getCategoryDtl();
        $("#category1").val("all");
        $("#category2").val("all");
        $("#product").val("");
        $("#cost").val("");
        $("#code").val("");
	}
	 $('#'+pop).addClass('is-visible');
    
}

//팝업 종료
function closePop(){
	$('.popup').removeClass('is-visible');
    add = false;
    categoryGrid.allowAddNew = add;
    categorySelectCnt = 0;
}
// 행추가
function addRow(type){
    add = true;
    if(type == 'category'){
        categoryGrid.allowAddNew = add;
    }
}

//행 삭제
function deleteRows(type){
    if(type == 'stock'){
        var item = stockGrid.rows.filter(r => r.isSelected); 
        var rows = [];
        var params;
         if(item.length == 0){
            alert("선택된 행이 없습니다.");
            return false;
        }else{
            for(var i =0; i< item.length ; i++){
                rows.push(item[i].dataItem);
            }
            if(confirm("선택한 행들을 삭제 하시겠습니까??")){
                $.ajax({
                    url : "/stock/deleteItem",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(rows),
                    success : function(result) {
                        alert("삭제되었습니다.");
                        getStockList();
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
            }
        }
    }else if(type == 'category'){
        var item = categoryGrid.rows.filter(r => r.isSelected);
        var rows = [];
        var params;
         if(item.length == 0){
            alert("선택된 행이 없습니다.");
            return false;
        }else{
            for(var i =0; i< item.length ; i++){
                rows.push(item[i].dataItem);
            }
            if(confirm("선택한 행들을 삭제 하시겠습니까??")){
                $.ajax({
                    url : "/stock/deleteCategory",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(rows),
                    success : function(result) {
                        alert("삭제되었습니다.");
                        getCategyList('category', result);
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
            }
        }
    }   
}

// 카테고리 동적으로 가져오기
function getCategoryDtl() {
    $.ajax({
            url : "/stock/getLCategoryList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
                if(result.length > 0){
                    for(var i =0; i<result.length; i++)
                        $("#category1").append("<option value='" + result[i].lCategyCd + "'>" + result[i].lCategyNm + "</option>");
                }       
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
}
    
//데이터 저장
function saveGrid(type){
    if(type == "category"){
        var editItem = categoryView.itemsEdited;
        var addItem  = categoryView.itemsAdded;
        var rows = [];
        for(var i =0; i< editItem.length ; i++){
                rows.push(editItem[i]);
        }
        for(var i=0; i< addItem.length; i++){
            rows.push(addItem[i]);
        }

        wijmo.Control.getControl("#editGrid").refresh(true);
        if(confirm("변경한 내용을 저장 하시겠습니까??")){
            $.ajax({
                url : "/stock/saveCategory",
                async : false, // 비동기모드 : true, 동기식모드 : false
                type : 'POST',
                contentType: 'application/json',
                data: JSON.stringify(rows),
                success : function(result) {
                    alert("저장되었습니다.");
                    loadGridStockList('category', result);
                },
                error : function(request,status,error) {
                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });
        }
    }else if(type == 'stock'){
        if(stockView.itemCount > 0){
            var editItem = stockView.itemsEdited;
            var addItem  = stockView.itemsAdded;
            var rows = [];
            for(var i =0; i< editItem.length ; i++){
                    rows.push(editItem[i]);
            }
            for(var i=0; i< addItem.length; i++){
                rows.push(addItem[i]);
            }
            if(confirm("저장 하시겠습니까??")){
                $.ajax({
                    url : "/stock/saveStock",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(rows),
                    success : function(result) {
                        alert("저장되었습니다.");
                        getStockList();
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
            }
        }else{ // 엑셀 업로드 저장하기
            var item  = excelGrid.rows;
            var rows = [];
            var params;
            for(var i=0; i< item.length; i++){
                var value = wijmo.changeType(excelGrid.collectionView.items[i].원가, wijmo.DataType.Number, null);
                if(!wijmo.isNumber(value)){
                    alert("원가는 숫자만 입력 가능합니다.");
                    return false;
                }
                params={
                    lCategyCd :  excelGrid.collectionView.items[i].물품코드.substring(0,2),
                    itemCd : excelGrid.collectionView.items[i].물품코드.substring(2),
                    itemNm : excelGrid.collectionView.items[i].물품명,
                    cost : excelGrid.collectionView.items[i].원가
                }
                rows.push(params);
            }
            if(confirm("저장 하시겠습니까??")){
                $.ajax({
                    url : "/stock/saveStock",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(rows),
                    success : function(result) {
                        alert("저장되었습니다.");
                        getStockList();
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
            }
        }
        
    }
}

// 물품 중복 체크
function dupCheckItem() {
    if($("#category1").val() == "all"){
        alert("카테고리를 선택하시기 바랍니다.");
        return false;
    }else if($("#product").val().trim().length == 0){
        alert("상품명을 입력하시기 바랍니다.");
        return false;
    }else if($("#code").val().length < 4){
        alert("코드는 4자리 입니다.ex)0001");
        return false;
    }else if($("#cost").val().length < 1){
        alert("원가를 입력하시기 바랍니다.");
        return false;
    }
    
    var params = {
        lCategyCd : $("#category1").val(),
        itemCd : $("#category1").val() + $("#code").val(),
        itemNm : $("#product").val(),
        cost : $("#cost").val()
    };
    $.ajax({
        url : "/stock/dupCheckItem",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        data: params,
        success : function(result) {
            if(result != "" ){
                alert("이미 등록된 물품코드 입니다.");
                dupCheckItemFlag = false;
            }else{
                alert("등록 가능한 물품코드 입니다.");
                dupCheckItemFlag = true;

            }
        },
        error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}
// 물품 추가하기
function addItem(){
    if(!dupCheckItemFlag){
        alert("중복확인을 먼저 하시기 바랍니다.");
        return false;
    }else{
        var params = {
            lCategyCd : $("#category1").val(),
            itemCd : $("#category1").val() + $("#code").val(),
            itemNm : $("#product").val(),
            cost : $("#cost").val()
        };
        $.ajax({
            url : "/stock/addItem",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            contentType: 'application/json',
            data: JSON.stringify(params),
            success : function(result) {
                    alert("등록 되었습니다.");
                    dupCheckItemFlag = false;
                    $("#totItemCnt").val(parseInt($("#totItemCnt").val()) + 1);
                    $("#totalItemCnt").text($("#totItemCnt").val().toLocaleString('ko-KR') + "개");
                    closePop();
                    getStockList();
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    }
}
//엑셀 다운로드
function exportExcel(){
	
	var gridView = stockGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

    //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
    stockGrid.beginUpdate();
    stockView.pageSize = 0;

    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(stockGrid, {includeCellStyles: true, includeColumnHeaders: true}, 'stockList.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	staffGrid.endUpdate();
	      }, null
	 );
}

//업로드 파일 찾기
function findFile(){
    $("#importFile").val("");
    document.all.importFile.click();
}

//엑셀 업로드
function importExcel(){
    $("#stockDiv").hide();
    stockView = new wijmo.collections.CollectionView(null, {
            pageSize: 100,
            groupDescriptions: ['lCategyNm']
    });
    $("#excelDiv").show();
        var inputEle =  document.querySelector('#importFile');
        if (inputEle.files[0]) {
            wijmo.grid.xlsx.FlexGridXlsxConverter.loadAsync(excelGrid, inputEle.files[0],{includeColumnHeaders: true}, (w) => {
        // 데이터 바인딩할 함수 호출
        bindImportedDataIntoModel()
        excelGrid.columns.forEach(col => {
          col.width = 300,
          col.align = "center"
        })
      });
    }
         // 체크박스 생성
        excelSelector = new wijmo.grid.selector.Selector(excelGrid);
        excelSelector.column = excelGrid.columns[0];
}

function bindImportedDataIntoModel() {
    const newData = (getImportedCVData());
    excelGrid.columns.clear();
    data = new wijmo.collections.CollectionView(newData);
    excelGrid.autoGenerateColumns = true;
    excelGrid.itemsSource = data;
}

function getImportedCVData() {
    const arr = [];
    let nullRow = true;
    for (let row = 0; row < excelGrid.rows.length; row++) {
        const item = {};
        for (let column = 0; column < excelGrid.columns.length; column++) {
            const cellValue = excelGrid.getCellData(row, column, false);
            //병합된 헤더 처리 
            // let header = grid.columns[column].header ? grid.columns[column].header : grid.columns[column - 1].header + '-2';
        // 만약 열 헤더가 있으면
            if (excelGrid.columns[column].header){
            var header =  excelGrid.columns[column].header
            } else{
    //           만약 열 헤더가 없으면 본래 병합된 값으로 판단
                for(var i = column-1; i >= 0; i--){
                    if (excelGrid.columns[i].header){
                        var header =  excelGrid.columns[i].header + " - "+column+" index"
                        break;
                    }
                }
            }
        var binding = _convertHeaderToBinding(header);
        item[binding] = cellValue;
        }
      arr.push(item);
    }
    return arr;
}

function _convertHeaderToBinding(header) {
    return header.replace(/\s/, '').toLowerCase();
}

//엑셀 양식 다운로드
function downTemplate(){
    window.location.assign("<%=request.getContextPath()%>" + "/template/물품관리양식.xlsx");
}

</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">물품관리</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>총 물품 수</dt>
                        <dd id ="totalItemCnt">0000개</dd>
                        <input type="hidden" id = "totItemCnt" value="${totalItemCnt}">
                    </dl>
                    
                    <a href="javascript:void(0);" onclick="showPop('add_category');">카테고리 추가</a>
                    <a href="javascript:void(0);" onclick="showPop('add_product');">물품 추가</a>
                </div>
                <div class="admin_utility">
                    <div class="admin_btn">
                        <input type="file" class="form-control" style="display:none" id="importFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12" />
                        <button class="btn" id="excelTemplate" name = "excelTemplate" onclick="downTemplate();">엑셀 템플릿</button>
                        <button class="btn" id="importExcel" name = "importExcel" onclick="findFile();">엑셀 업로드</button>
                        <button class="btn" id="exportExcel" name = "exportExcel" onclick="exportExcel();">엑셀 다운로드</button>
                    </div>
                </div>
                <div class="admin_content">
                    <!-- 필터 영역 admin_filter-->
                    <div class="admin_filter">
                        <form action="#" id="search_form" name="search_form">
                            <label for="con">검색조건</label>
                            <select name="con" id="con">
                                <option value="all" selected="selected">전체</option>
                                <option value="category">카테고리명</option>
                                <option value="item">물품명</option>
                            </select>
                            <label for="inq"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능" onkeyup="enterkey();">
                            <button type="button" onClick="getStockList();">조회</button>
                        </form>
                        <div class="summary">
                            <dl>
                                <dt>미수금</dt>
                                <dd>0000원</dd>
                            </dl>
                            <dl>
                                <dt>입금금액</dt>
                                <dd>0000원</dd>
                            </dl>
                            <dl>
                                <dt>추가금</dt>
                                <dd>0000원</dd>
                            </dl>
                        </div>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('stockLayout', stockGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('stockLayout', stockGrid,stockColumns);">칼럼초기화</button>
                            <button type="button">QR출력</button>
                            <button type="button" onclick="saveGrid('stock')">저장</button>
                            <button type="button" onclick="deleteRows('stock')">삭제</button>
                        </div>
                        <div class="grid_wrap" id="stockDiv" style="position:relative;">
                        	<div id="stockGrid"  style="height:500px;"></div>
                        	<div id="stockGridPager" class="pager"></div>
                        </div>
                        <div class="grid_wrap" id="excelDiv" style="position:relative;">
                        	<div id="excelGrid"  style="height:500px;"></div>
                        	<div id="excelGridPager" class="pager"></div>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onclick="_getUserGridLayout('stockLayout', stockGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('stockLayout', 'stockLayout', stockGrid);" >칼럼초기화</button>
                            <button type="button">QR출력</button>
                            <button type="button" onclick="saveGrid('stock')">저장</button>
                            <button type="button" onclick="deleteRows('stock')">삭제</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <!-- 팝업 -->
    <!-- 팝업 : 카테고리추가-->
    <div class="popup" id="add_category">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">카테고리추가</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_grid">
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn">삭제</button>
                        <button type="button" class="popup_btn" onclick="saveGrid('category')">저장</button>
                    </div>
                </div>
                <div class="popup_grid_area">
                    <button class="btn" onclick="addRow('category');">+ 행 추가</button>
                    <div id="categoryGrid"></div>
                    <div id="categoryGridPager" class="pager"></div>
                    <div>
                    <button class="btn" onclick="addRow('category');">+ 행 추가</button>
                    </div>
                </div>
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn" onclick="deleteRows('category');">삭제</button>
                        <button type="button" class="popup_btn" onclick="saveGrid('category');">저장</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--카테고리추가 팝업 영역 끝-->
    <!-- 팝업 : 물품추가 -->
    <div class="popup" id="add_product">
        <div class="popup_container"> 
            <div class="popup_head">
                <p class="popup_title">물품추가</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form action="#" method="post">
                    <div class="row">
                        <label for="category1">카테고리<i>*</i></label>
                            <select name="category1" id="category1">
                            </select>
                    </div>
                    <div class="row">
                        <label for="product">상품명<i>*</i></label>
                        <input type="text" id="product" name="product" required>
                    </div>
                    <div class="row">
                        <label for="code">코드<i>*</i></label>
                        <input type="text" id="code" name="code"  maxlength = "4"  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>
                    </div>
                    <div class="row">
                        <label for="cost">원가<i>*</i></label>
                        <input type="number
                        " id="cost" name="cost" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn fill" onclick = "dupCheckItem();">중복확인</button>
                    <button type="button" class="popup_btn fill" onclick = "addItem();">추가</button>
                </div>
            </div>
        </div>
    </div>
    <!--물품추가 팝업 영역 끝-->
    <!-- 추가된 행 / 수정된 행 처리용 그리드 -->
    <div class="grid_wrap" id="addDiv" style="display:none;">
        <div id="addGrid"  style="height:500px;"></div>
    </div>
    <div class="grid_wrap" id="editDiv" style="display:none;">
        <div id="editGrid"  style="height:500px;"></div>
    </div>
</body>
</html>