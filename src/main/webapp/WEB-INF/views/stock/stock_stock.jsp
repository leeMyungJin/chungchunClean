<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
var stockMngView;
var stockMngGridPager;
var stockMngGrid;
var stockMngColumns;
var excelGrid;
var excelView;

var staffId = "<%=session.getAttribute("staffId")%>";

function pageLoad(){
	sessionCheck(staffId);
	
	$('#stock').addClass("current");
	$('#stock_stock').addClass("current");
    loadGridStockList('init');
    //엑셀 업로드
    $("#importFile").on('change', function (params) {
        importExcel();
    });
    $("#essential").trigger("click");
    
    getStockList();
}

function sessionCheck(){
    if("<%=session.getAttribute("staffId")%>"=="null"){
        alert("세션이 종료되어 로그인화면으로 이동합니다.");
        location.href = "/";
        return false;
    }else
        return true;
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
        $("#saveBtn").hide();
        stockMngView = new wijmo.collections.CollectionView(result, {
            pageSize: 100,
            groupDescriptions: ['lCategyNm']
        });
		// 페이지 이동
        stockMngGridPager = new wijmo.input.CollectionViewNavigator('#stockMngGridPager', {
            byPage: true,
            headerFormat: '{currentPage:n0} / {pageCount:n0}',
            cv: stockMngView
        });

        stockMngColumns =  [
                { binding: 'status', header: '상태', isReadOnly: true, width: 60, align:"center"},
                { binding: 'lCategyCd', header: '카테고리코드', isReadOnly: true, visible: false, width: 200, align:"center"},
                { binding: 'lCategyNm', header: '카테고리명', isReadOnly: true, width: 230, align:"center"},
                { binding: 'itemNm', header: '물품명', isReadOnly: true, width: '*', align:"center"  },
                { binding: 'itemCd', header: '코드번호', isReadOnly: true, width: 200, align:"center"},
                { binding: 'cost', header: '원가', isReadOnly: true, width: 200, align:"center"},
                { binding: 'quantity', header: '재고수량', isReadOnly: true, width: 200, align:"center"},
                { binding: 'add', header: '추가입고', isReadOnly: false, format: 'c0', width: 200, align:"center"}
            ]
		  
		// hostElement에 Wijmo의 FlexGird 생성
        // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
        // autoGenerateColumns: false >> 컬럼 사용자 정의 
        stockMngGrid = new wijmo.grid.FlexGrid('#stockMngGrid', {
            autoGenerateColumns: false,
            alternatingRowStep: 0,
            columns : stockMngColumns,
            itemsSource: stockMngView,
            cellEditEnding: function (s, e) {
                if(sessionCheck()){
                    var col = s.columns[e.col];
                    var inven = s.columns[e.col - 1];
                    if (col.binding == 'add') {
                        var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
                        if( !wijmo.isNumber(value)){
                            e.cancel = true;
                            e.stayInEditMode = false;
                            alert('숫자로만 입력 가능합니다.');
                            return false;
                        }else{
                            if(e.getRow().dataItem.quantity + value >= 0){
                                e.getRow().dataItem.quantity += value;// 입력값 재고수량에 계산
                                if(e.getRow().dataItem.quantity > 10){
                                    e.getRow().dataItem.status = 'O';
                                }else{
                                    e.getRow().dataItem.status = 'X';
                                }
                                var params = {
                                    lCategyCd   : e.getRow().dataItem.lCategyCd,
                                    itemCd      : e.getRow().dataItem.itemCd,
                                    quantity    : e.getRow().dataItem.quantity ,
                                }
                                $.ajax({
                                    url : "/stock/saveQuantity",
                                    async : false, // 비동기모드 : true, 동기식모드 : false
                                    type : 'POST',
                                    contentType: 'application/json',
                                    data: JSON.stringify(params),
                                    success : function(result) {
                                        getQuantityInfo();
                                    },
                                    error : function(request,status,error) {
                                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                                    }
                                });
                                s.activeEditor.value = 0; // 입력값 0으로 초기화
                            }else{
                                alert("재고수량은 0보다 커야 합니다.");
                                s.activeEditor.value = 0; // 입력값 0으로 초기화
                                return false;
                            }
                        }
                    }
                }
            }
        });

        _setUserGridLayout('stockMngLayout', stockMngGrid, stockMngColumns );

        //행번호 표시하기
        stockMngGrid.itemFormatter = function (panel, r, c, cell) { 
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
            }
        };

        stockMngGrid.formatItem.addHandler(function (s, e) {
            // 열 헤더에 대한 중앙 정렬 
            if (e.panel == s.columnHeaders) {
            e.cell.innerHTML = '<div class="v-center">' +
                e.cell.innerHTML + '</div>';
            }
            //  "status" 열에 대한 커스텀 렌더링
            if (e.panel == s.cells) {
            var col = s.columns[e.col];
            var status = s.getCellData(e.row, e.col);
                if (col.binding == 'status' && (status == 'O' || status == 'X')) {
                    //셀 서식
                    var html = '<div class="mark_{status}"/>';
                    if(status == 'O') {
                        html = html.replace('{status}', 'enough');
                    }else if(status == 'X') {
                        html = html.replace('{status}', 'short');
                    }
                    e.cell.innerHTML = html;                    
                }
            }
        });

		// hostElement에 Wijmo의 FlexGird 생성
        // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
        // autoGenerateColumns: false >> 컬럼 사용자 정의 
        excelGrid = new wijmo.grid.FlexGrid('#excelGrid', {
            autoGenerateColumns: false,
            alternatingRowStep: 0,
            columns : stockMngColumns,
            itemsSource: excelView
        });

        //행번호 표시하기
        excelGrid.itemFormatter = function (panel, r, c, cell) { 
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
            }
        };
        // 체크박스 생성
        excelSelector = new wijmo.grid.selector.Selector(excelGrid, {
            itemChecked: () => {
            }
        });
        excelSelector.column = excelGrid.columns[0];
    }else{
        stockMngView = new wijmo.collections.CollectionView(result, {
            pageSize: 100,
            groupDescriptions: ['lCategyNm']
        });
        stockMngGrid.columns[0].width = 50;
        stockMngGridPager.cv = stockMngView;
        stockMngGrid.itemsSource = stockMngView;
	  }
      refreshPaging(stockMngGrid.collectionView.totalItemCount, 1, stockMngGrid, 'stockMngGrid');
}


//재고 검색
function getStockList(){
    $("#excelDiv").hide();
    $("#saveBtn").hide();
    $("#stockDiv").show();
    var params = {
            inq : $("#inq").val(),
            con : $("#con").val(),
            esn : $("#essential").is(":checked").toString() 
    	}
    	$.ajax({
            url : "/stock/getStockList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            data : params,
            success : function(result) {
        	    loadGridStockList('search', result);
                getQuantityInfo();
            },
            error : function(request,status,error) {
             	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
          });
}

//엑셀 다운로드
function exportExcel(){
	
	var gridView = stockMngGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

    //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
    stockMngGrid.beginUpdate();
    stockMngView.pageSize = 0;

    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(stockMngGrid, {includeCellStyles: true, includeColumnHeaders: true}, '재고현황.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	stockMngGrid.endUpdate();
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
    $("#saveBtn").show();
    stockMngView = new wijmo.collections.CollectionView(null, {
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
    window.location.assign("<%=request.getContextPath()%>" + "/template/재고현황양식.xlsx");
}

// 상단 정보 표기
function getQuantityInfo(){
    $.ajax({
        url : "/stock/getQuantityInfo",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        success : function(result) {
            $("#tot_quantity").text(result.tot_quantity.toLocaleString('ko-KR') + "개");
            $("#add_warehousing").text(result.add_warehousing.toLocaleString('ko-KR') + "개");
            $("#tot_asset").text(result.tot_asset.toLocaleString('ko-KR') + "원");
           
        },
        error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
        });
    
}

//엑셀 업로드 저장
function saveGrid(){
    
    if(sessionCheck() && confirm("저장 하시겠습니까?")){
        var item  = excelGrid.rows;
            var rows = [];
            var params;
            for(var i=0; i< item.length; i++){
                var value = wijmo.changeType(excelGrid.collectionView.items[i].재고수량, wijmo.DataType.Number, null);
                if(!wijmo.isNumber(value)){
                    alert("재고수량은 숫자만 가능합니다.");
                    return false;
                }
                params={
                    lCategyCd :  excelGrid.collectionView.items[i].물품코드.substring(0,3),
                    itemCd : excelGrid.collectionView.items[i].물품코드,
                    quantity : excelGrid.collectionView.items[i].재고수량
                }
                rows.push(params);
            }
        $.ajax({
            url : "/stock/saveQuantityList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rows),
            success : function(result) {
                alert("총 " + result + "건이 저장되었습니다.");
                getStockList();
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
            });
    }
}

</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        

        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">재고현황</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>총 재고수량</dt>
                        <dd id="tot_quantity">00개</dd>
                    </dl>
                    <dl>
                        <dt>추가입고 필요항목</dt>
                        <dd id="add_warehousing">00개</dd>
                    </dl>
                    <dl>
                        <dt>총 재고자산</dt>
                        <dd id="tot_asset">0000원</dd>
                    </dl>
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
                        <form action="#" id="search_form" name="search_form" onsubmit="return false;">
                            <label for="con">검색조건</label>
                            <select name="con" id="con">
                                <option value="all" selected="selected">전체</option>
                                <option value="category">카테고리명</option>
                                <option value="item">물품명</option>
                            </select>
                            <label for="inq"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능" onkeyup="enterkey();">
                            <button type="button" onclick ="getStockList();">조회</button>
                            <input type="checkbox" id="essential" name="essential" onChange = "getStockList();">
                            <label for="essential">추가입고 필요항목만 보기</label>
                        </form>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                        <div class="mark">
                            <span><dfn class="mark_enough"></dfn> 충분</span>
                            <span><dfn class="mark_short"></dfn> 부족</span>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('stockMngLayout', stockMngGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('stockMngLayout', stockMngGrid, stockMngColumns);">칼럼초기화</button>
                            <button type="button" id="saveBtn" onclick="saveGrid()">저장</button>
                        </div>
                        <div class="grid_wrap" id = "stockDiv" style="position:relative;">
                            <div id="stockMngGrid"  style="height:500px;"></div>
                        	<div id="stockMngGridPager" class="pager"></div>
                        </div>
                        <div class="grid_wrap" id="excelDiv" style="position:relative;">
                        	<div id="excelGrid"  style="height:500px;"></div>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('stockMngLayout', stockMngGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('stockMngLayout', stockMngGrid, stockMngColumns);">칼럼초기화</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</body>
</html>