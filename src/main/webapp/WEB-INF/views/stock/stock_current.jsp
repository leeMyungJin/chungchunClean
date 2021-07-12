<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">

var currentView;
var currentGridPager;
var currentGrid;
var currentColumns;
var currentSelector;
var editGrid;
var editGridView;
var categyList;
var itemList;

function pageLoad(){
	$('#stock').addClass("current");
	$('#stock_current').addClass("current");
	
	var today = _getFormatDate(new Date());
	$('#fromDate').val(today);
	$('#toDate').val(today);
	$('#fromDate').attr('max',today);
	$('#toDate').attr('max',today);
	
	loadGridCurrentList('init');
}

function enterkey() {
    if (window.event.keyCode == 13) {
    	getCurrentList();
    }
}


function loadGridCurrentList(type, result){
	  if(type == "init"){
		  
		   currentView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		    
		   currentGridPager = new wijmo.input.CollectionViewNavigator('#currentGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: currentView
		    });
		   
		   //var categyMap = new wijmo.grid.DataMap(getCategoryDtl(), 'lCategyCd', 'lCategyNm');
		  
		  /* {
		          binding: 'lCategyCd', header: '카테고리', dataMap: categyMap, width: 100,
		          cellTemplate: '<span id="lCategyCd_${col.dataMap.getDataItem(value).lCategyCd}">${lCategyNm}</span>'
		     }, */
		     
		   var lCategyList = new wijmo.grid.DataMap(getCategoryList(), 'id', 'name');
		   var classifiList = new wijmo.grid.DataMap(getClassifiList(), 'id', 'name');
		   var itemList = new wijmo.grid.DataMap(getItemList(), 'id', 'name');
		  /* itemList.getDisplayValues = function (dataItem) {
			    let validItem = getItemList().filter(itemNm => itemNm.lCategyCd == dataItem.lCategyCd);
			    return validCities.map(itemNm => itemNm.itemNm);
			}; */
		     
		   currentColumns = [
			   { isReadOnly: true, width: 35, align:"center"},
			   	  { binding: 'cateSarSeq', header: 'seq', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'cretDt', header: '일자', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'cretNm', header: '담당자', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'classifiCd', header: '분류', isReadOnly: false, width: 100, align:"center", dataMap: classifiList, dataMapEditor: 'DropDownList' },
			      { binding: 'lCategyCd', header: '카테고리', isReadOnly: false, width: 100, align:"center", dataMap: lCategyList, dataMapEditor: 'DropDownList' },
			      { binding: 'itemCd', header: '물품코드', isReadOnly: false, width: 100, align:"center" },
			      { binding: 'itemNm', header: '물품명', isReadOnly: false, width: 100, align:"center", dataMap: itemList, dataMapEditor: 'DropDownList'},
			      { binding: 'cost', header: '원가', isReadOnly: false, width: 100, align:"center" },
			      { binding: 'sarQuantity', header: '입출고수량', isReadOnly: false, width: 100, align:"center" },
			      { binding: 'returnQuantity', header: '반품수량', isReadOnly: false, width: 100, align:"center" },
			      { binding: 'quantity', header: '재고수량', isReadOnly: false, width: 100, align:"center" },
			      { binding: 'updtDt', header: '수정일자', isReadOnly: true, width: 100, align:"center" }
			];
		   
		   currentGrid = new wijmo.grid.FlexGrid('#currentGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: currentColumns,
			    itemsSource: currentView
			  });
		   	
		   	//행번호
		   	currentGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };
	        
	     // 체크박스 생성
	      currentSelector = new wijmo.grid.selector.Selector(currentGrid);
	    // currentSelector = new wijmo.grid.selector.Selector(currentGrid, {itemChecked: () => {}});
	    // currentSelector.column = currentGrid.columns[0];
	    
	      currentGrid.formatItem.addHandler(function (s, e) {
            //  "sarQuantity, returnQuantity" 열에 대한 커스텀 렌더링
            if (e.panel == s.cells) {
	            var col = s.columns[e.col];
	            var classifiCd = s.getCellData(e.row, e.col);
	            var html;
                if (e.row > 0 && col.binding == 'classifiCd') {
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
	        
	        editGrid = new wijmo.grid.FlexGrid('#editGrid', {
	            itemsSource: currentView.itemsEdited,
	            isReadOnly: true
	        });
	        
	        _setUserGridLayout('currentLayout', currentGrid, currentColumns);
			  
	  }else{		  
		   currentView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		  currentGridPager.cv = currentView;
		  currentGrid.itemsSource = currentView;
	  }
	  
	  refreshPaging(currentGrid.collectionView.totalItemCount, 1, currentGrid, 'currentGrid');  // 페이징 초기 셋팅
	  
}

//카테고리 동적으로 가져오기
function getCategoryList() {
	var returnVal;
	
    $.ajax({
            url : "/stock/getLCategoryList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
                if(result.length > 0){
                	var gategory = [];
                	
                	for(var i =0; i<result.length; i++){
                		gategory[i] = { id: result[i].lCategyCd, name: result[i].lCategyNm };	
                	}
                	returnVal = gategory;
                	
                }
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
    
    return returnVal;
}

//아이템 동적으로 가져오기
function getItemList() {
	var returnVal;
	
    $.ajax({
            url : "/stock/getItemList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
                if(result.length > 0){
                	console.log(result);
                	var item = [];
                	
                	for(var i =0; i<result.length; i++){
                		item[i] = { id: result[i].itemCd, name: result[i].itemNm, lCategyCd: result[i].lCategyCd };	
                	}
                	console.log(item);
                	returnVal = item;
                	
                }
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
    
    return returnVal;
}

//분류 동적으로 가져오기
function getClassifiList() {
	var returnVal;
	
    $.ajax({
            url : "/stock/getClassifiList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
                if(result.length > 0){
                	var classifi = [];
                	
                	for(var i =0; i<result.length; i++){
                		classifi[i] = { id: result[i].cd, name: result[i].nm };	
                	}
                	console.log(classifi);
                	returnVal = classifi;
                	
                }
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
    
    return returnVal;
}


function getCurrentList(){
	var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
		, fromDate : $('#fromDate').val()
		, toDate : $('#toDate').val()
	};
	
	$.ajax({
        type : 'POST',
        url : '/stock/getStockCurrentList',
        dataType : null,
        data : param,
        success : function(result) {
        	console.log("getCurrentList success");
        	loadGridCurrentList('search', result);
        },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

        }
    });
}

function exportExcel(){
	var gridView = currentGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

    //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
    currentGrid.beginUpdate();
    currentView.pageSize = 0;

    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(currentGrid, {includeCellStyles: true, includeColumnHeaders: true}, 'stockCurrentList.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	currentGrid.endUpdate();
	      }, null
	 );
}

//행추가
function addRow(){
	currentGrid.allowAddNew = true;
}

function deleteRows(){
    var item = currentGrid.rows.filter(r => r.isSelected); 
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
                url : "/stock/deleteStockCurrent",
                async : false, // 비동기모드 : true, 동기식모드 : false
                type : 'POST',
                contentType: 'application/json',
                data: JSON.stringify(rows),
                success : function(result) {
                    alert("삭제되었습니다.");
                    getCurrentList();
                },
                error : function(request,status,error) {
                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });
        }
    }
}

function saveGrid(){
	var editItem = currentView.itemsEdited;
    var addItem  = currentView.itemsAdded;
    var rows = [];
    for(var i =0; i< editItem.length; i++){
            rows.push(editItem[i]);
    }
    for(var i=0; i< addItem.length; i++){
        rows.push(addItem[i]);
    }

    wijmo.Control.getControl("#editGrid").refresh(true);
    if(confirm("변경한 내용을 저장 하시겠습니까??")){
        $.ajax({
            url : "/stock/saveStockCurrent",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rows),
            success : function(result) {
                alert("저장되었습니다.");
                getCurrentList();
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
                <h2 class="admin_title">입출이력</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>금일 입고수량</dt>
                        <dd><%=request.getAttribute("todayStore")%>개</dd>
                    </dl>
                    <dl>
                        <dt>금일 출고수량</dt>
                        <dd><%=request.getAttribute("todayRelease")%>개</dd>
                    </dl>
                    <dl>
                        <dt>금일 반품입고수량</dt>
                        <dd><%=request.getAttribute("todayReturnStore")%>개</dd>
                    </dl>
                    <dl>
                        <dt>금일 반품출고수량</dt>
                        <dd><%=request.getAttribute("todayReturnRelease")%>개</dd>
                    </dl>
                </div>
                <div class="admin_utility">
                    <form action="#" method="post">
                        <label for>조회일</label>
                         <input type="date" id="fromDate" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey();">
                        -
                        <input type="date" id="toDate" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey();">
                        <button type="button" class="admin_utility_btn" onClick="getCurrentList();">조회</button>
                    </form>
                    <div class="admin_btn">
                        <button class="btn" onClick="exportExcel();">엑셀 다운로드</button>
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
                                <option value="product">물품명</option>
                                <option value="person">담당자</option>
                            </select>
                            <label for="inq" onkeyup="enterkey();"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능">
                            <button type="button" onClick="getCurrentList();">조회</button>
                        </form>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                    	<button type="button" class="stroke left" onClick="addRow()">+ 추가</button>
                    	<button type="button" class="stroke left" onClick="saveGrid()">저장</button>
                    	<button type="button" class="stroke left" onClick="deleteRows()">삭제</button>
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('currentLayout', currentGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('currentLayout', currentGrid, currentColumns);">칼럼초기화</button>
                        </div>
                        <div class="grid_wrap">
                        	<div id="currentGrid"  style="height:500px;"></div>
                        	<div id="currentGridPager" class="pager"></div>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('currentLayout', currentGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('currentLayout', currentGrid, currentColumns);">칼럼초기화</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <div class="grid_wrap" id="addDiv" style="display:none;">
        <div id="addGrid"  style="height:500px;"></div>
    </div>
    <div class="grid_wrap" id="editDiv" style="display:none;">
        <div id="editGrid"  style="height:500px;"></div>
    </div>
</body>
</html>