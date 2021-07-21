<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
var monView;
var monGridPager;
var monGrid;
var monColumns;

var addView;
var addGridPager;
var addGrid;
var addColumns;

var categoryGrid;
var categoryView;
var categoryGridPager;
var categorySelector;
var dupCheckItemFlag = false;

var excelGrid;
var excelView;
var excelSelector;

var addGrid;
var editGrid;
var editGridView;


function pageLoad(){
	$('#calculate').addClass("current");
	$('#calculate_process').addClass("current");
	
	tab_panel('panel_mon','panel_add');
	
	var today = _getFormatDate(new Date());
	$('#fromDate').val(today);
	$('#toDate').val(today);
	$('#fromDate').attr('max',today);
	$('#toDate').attr('max',today);
	
	loadGridMonList('init');
}

function tab_panel(showTab, hideTab){
	$('#'+showTab).css("display","block"); 
	$('#'+hideTab).css("display","none"); 
	
	$('#tab_'+showTab).addClass("on"); 
	$('#tab_'+hideTab).removeClass("on"); 
}


function enterkey(type) {
	if(window.event.keyCode == 13){
		if(type == "mon"){
			getMonList();
			
		}else if(type == "add"){
			getAddList();
			
		}
	}
}


//그리드 초기 셋팅
function loadGridMonList(type, result){
	  if(type == "init"){ 
		  //월관리
		   monView = new wijmo.collections.CollectionView(result, {
			   pageSize: 100
		       ,groupDescriptions: ['bldgNm']
		   });
		    
		   monGridPager = new wijmo.input.CollectionViewNavigator('#monGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: monView
		    });
		   
		   monColumns = [
			      { binding: 'areaNm', header: '지역', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'bldgCd', header: '건물코드', isReadOnly: true, width: 0, align:"center"  },
			      { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 100, align:"center"  },
			      { binding: 'manageCost', header: '관리비', isReadOnly: true, width: 150, align:"center" },
			      { binding: 'taxBill', header: '세금계산서', isReadOnly: true, width: 150, align:"center"  },
			      { binding: 'overCost', header: '추가금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum' },
			      { binding: 'outCost', header: '미수금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum'  },
			      { binding: 'overCost', header: '이월금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum' },
			      { binding: 'depositCost', header: '관리비입금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum' },
			      { binding: 'depositDt', header: '입금날짜', isReadOnly: true, width: 150, align:"center" },
			      { binding: 'depositor', header: '입금자명', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'pnum', header: '전화번호', isReadOnly: true, width: 150, align:"center" },
			      { binding: 'memo', header: '비고', isReadOnly: true, width: '*', align:"center" }
			];
		    
		   monGrid = new wijmo.grid.FlexGrid('#monGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: monColumns,
			    itemsSource: monView
			  });
			  
		   monGrid.columnFooters.rows.push(new wijmo.grid.GroupRow());
		   monGrid.bottomLeftCells.setCellData(0, 0, 'Σ');
		   
		   	_setUserGridLayout('monLayout', monGrid, monColumns);
		   	
		   	//행번호
		   	monGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };
	    
	        
			//부가수익 
		 	addView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		       ,groupDescriptions: ['bldgNm']
		   });
		    
		   addGridPager = new wijmo.input.CollectionViewNavigator('#addGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: addView
		    });
		   
		   addColumns = [
			      { binding: 'addDt', header: '일자', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'classifiNm', header: '분류', isReadOnly: true, width: 100, align:"center"  },
			      { binding: 'itemNm', header: '내역', isReadOnly: true, width: 60, align:"center" },
			      { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 60, align:"center"  },
			      { binding: 'quoteCost', header: '견적', isReadOnly: true, width: 120, align:"center", aggregate: 'Sum'  },
			      { binding: 'materCost', header: '재료비', isReadOnly: true, width: 100, align:"center", aggregate: 'Sum'  },
			      { binding: 'outscCost', header: '외주', isReadOnly: true, width: '*', align:"center", aggregate: 'Sum' },
			      { binding: 'depositCost', header: '입금', isReadOnly: true, width: '*', align:"center", aggregate: 'Sum' },
			      { binding: 'depositMt', header: '입금날짜', isReadOnly: true, width: '*', align:"center" },
			      { binding: 'depositor', header: '입금자명', isReadOnly: true, width: '*', align:"center" }
			];
		  
		   addGrid = new wijmo.grid.FlexGrid('#addGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: addColumns,
			    itemsSource: addView
			  });
			  
		   	_setUserGridLayout('addLayout', addGrid, addColumns);
		   	
		   	//행번호
		   	addGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };
	        
	        
	        //분류 추가 팝업 그리드
	        classifiView = new wijmo.collections.CollectionView(result, {
	            pageSize: 100
	        });
	    
	        classifiGridPager = new wijmo.input.CollectionViewNavigator('#classifiGridPager', {
	            byPage: true,
	            headerFormat: '{currentPage:n0} / {pageCount:n0}',
	            cv: classifiView
	        });
	        classifiGrid = new wijmo.grid.FlexGrid('#classifiGrid', {
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
	            itemsSource: classifiView,
	        });
	        classifiSelector = new wijmo.grid.selector.Selector(classifiGrid);
	        editGrid = new wijmo.grid.FlexGrid('#editGrid', {
	            itemsSource: classifiView.itemsEdited,
	            isReadOnly: true
	        });
	    
		   	
			  
	  }else if(type == "classifi"){
	        classifiView = new wijmo.collections.CollectionView(result, {
	            pageSize: 100,
	            trackChanges: true
	        });
	        classifiGridPager.cv = classifiView;
	        classifiGrid.itemsSource = classifiView;
	  }else{	
		  //월관리
		   monView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		       ,groupDescriptions: ['bldgNm']
		   });
		  monGridPager.cv = monView;
		  monGrid.itemsSource = monView;
		  
		  
		  //부가수익 
		   addView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		       ,groupDescriptions: ['bldgNm']
		   });
		  addGridPager.cv = addView;
		  addGrid.itemsSource = addView;
		  
	  }
	  
	  refreshPaging(monGrid.collectionView.totalItemCount, 1, monGrid, 'monGrid');  // 페이징 초기 셋팅
	  refreshPaging(addGrid.collectionView.totalItemCount, 1, addGrid, 'addGrid');  // 페이징 초기 셋팅 
	  
}


function getMonList(){
	var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
		, fromDate : $('#fromDate').val()
		, toDate : $('#toDate').val()
	};
	
	$.ajax({
      type : 'POST',
      url : '/calculate/getMonList',
      dataType : null,
      data : param,
      success : function(result) {
      	console.log("getMonList success");
      	loadGridMonList('search', result);
      },
      error: function(request, status, error) {
      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

      }
  });
	
	$.ajax({
	      type : 'POST',
	      url : '/calculate/getMonlableCost',
	      dataType : null,
	      data : param,
	      success : function(result) {
	      	console.log(result);
	        $("#lableAddCost").text(result.addcost+ "원");
	        $("#lableDepositCost").text(result.depositcost+ "원");
	        $("#lableOutCost").text(result.outcost+ "원");

	      },
	      error: function(request, status, error) {
	      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

	      }
	  });
}

function getAddList(){
	var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
		, fromDate : $('#fromDate').val()
		, toDate : $('#toDate').val()
		, subcon : $('#subcon').val()
	};
	
	$.ajax({
	      type : 'POST',
	      url : '/calculate/getAddList',
	      dataType : null,
	      data : param,
	      success : function(result) {
	      	console.log("getAddList success");
	      	loadGridAddList('search', result);
	      },
	      error: function(request, status, error) {
	      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

	      }
	  });
		
		$.ajax({
		      type : 'POST',
		      url : '/calculate/getMonlableCost',
		      dataType : null,
		      data : param,
		      success : function(result) {
		      	console.log(result);
		        $("#lableMaterCost").text(result.matercost+ "원");
		        $("#lableDepositCost").text(result.outsccost+ "원");
		        $("#lableOutscCost").text(result.depositcost+ "원");
		        $("#lableQuoteCost").text(result.quotecost+ "원");
		        $("#lableAddCost").text(result.addcost+ "원");
		        $("#lableOverCost").text(result.overcost+ "원");
		      },
		      error: function(request, status, error) {
		      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

		      }
		  });
}

function getClassifiList(){
    $.ajax({
           url : "/stock/getClassifiList",
           async : false, // 비동기모드 : true, 동기식모드 : false
           type : 'POST',
           success : function(result) {
        	loadGridMonList('classifi', result);

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
        $('#classifi1')
            .empty()
            .append('<option selected="selected" value="all" selected>전체</option>');
   /*      $('#category2')
            .empty()
            .append('<option selected="selected" value="all" selected>전체</option>'); */
        getClassifiDtl();
        $("#classifi1").val("all");
        $("#classifi2").val("all");
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
    classifiGrid.allowAddNew = add;
}
// 행추가
function addRow(type){
    add = true;
    if(type == 'classifi'){
        classifiGrid.allowAddNew = add;
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
    }else if(type == 'classifi'){
        var item = classifiGrid.rows.filter(r => r.isSelected);
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
                    url : "/stock/deleteClassifi",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(rows),
                    success : function(result) {
                        alert("삭제되었습니다.");
                        getCategyList('classifi', result);
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
            }
        }
    }   
}

function monExportExcel(){
	var gridView = monGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

  //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
  monGrid.beginUpdate();
  monView.pageSize = 0;

  wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(monGrid, {includeCellStyles: true, includeColumnHeaders: true}, '월관리청소.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	monGrid.endUpdate();
	      }, null
	 );
}

function addExportExcel(){
	var gridView = addGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

  //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
  addGrid.beginUpdate();
  addView.pageSize = 0;

  wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(monGrid, {includeCellStyles: true, includeColumnHeaders: true}, '부가수익.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	addGrid.endUpdate();
	      }, null
	 );
}

</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        

        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">정산처리</h2>
                <!-- 탭 메뉴 -->
                <div role="tablist" class="admin_tab">
                    <a id="tab_panel_mon" href="javascript:tab_panel('panel_mon','panel_add');" role="tab" class="on">월관리청소</a>
                    <a id="tab_panel_add" href="javascript:tab_panel('panel_add','panel_mon');" role="tab">부가수익</a>
                </div>
                <!-- 탭 패널 : 월관리청소 -->
                <div id="panel_mon" role="tabpanel" class="tabpanel">
                    <div class="admin_summary">
                        <dl>
                            <dt>총 누적미수금(이월금)</dt>
                            <dd>${totalCost.outcost}원</dd>
                        </dl>
                        <dl>
                            <dt>총 입금금액</dt>
                            <dd>${totalCost.depositcost}원</dd>
                        </dl>
                        <dl>
                            <dt>총 추가금</dt>
                            <dd>${totalCost.addcost}원</dd>
                        </dl>
                        <dl>
                            <dt>문자 잔액</dt>
                            <dd>0000원</dd>
                        </dl>
                    </div>
                    <div class="admin_utility">
                        <form action="#" method="post">
                            <label for="Date">조회일</label>
                            <input type="date" id="date" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey('mon');">
                            <button class="admin_utility_btn">조회</button>
                        </form>
                        <div class="admin_btn">
                            <button class="btn">엑셀 업로드</button>
                            <button class="btn">엑셀 다운로드</button>
                        </div>
                    </div>
                    <div class="admin_content">
                        <!-- 필터 영역 admin_filter-->
                        <div class="admin_filter">
                            <form action="#" id="search_form" name="search_form">
                                <label for="con">검색조건</label>
                                <select name="con" id="con">
                                    <option value="all" selected="selected">전체</option>
                                    <option value="site">지역</option>
                                    <option value="building">건물명</option>
                                    <option value="depositor">입금자명</option>
                                </select>
                                <label for="inq"></label>
                                <input type="text" id="inq" placeholder=",로 다중검색 가능" onkeyup="enterkey('mon');">
                                <button type="button" onClick="getMonList();">조회</button>
                            </form>
                            <div class="summary">
                                <dl>
                                    <dt>미수금</dt>
                                    <dd id="lableOutCost">0000원</dd>
                                </dl>
                                <dl>
                                    <dt>입금금액</dt>
                                    <dd id="lableDepositCost">0000원</dd>
                                </dl>
                                <dl>
                                    <dt>추가금</dt>
                                    <dd id="lableAddCost">0000원</dd>
                                </dl>
                            </div>
                        </div>
                        <!-- 보드 영역 admin_dashboard-->
                        <div class="admin_dashboard">
                            <div class="btn_wrap">
                                <button type="button" class="stroke"  onClick="_getUserGridLayout('monLayout', monGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('monLayout', monGrid, monColumns);">칼럼초기화</button>
                                <button type="button">문구수정</button>
                                <button type="button">문자발송</button>
                                <button type="button">저장</button>
                            </div>
                            <div class="grid_wrap">
                                <div id="monGrid"  style="height:500px;"></div>
                        		<div id="monGridPager" class="pager"></div>
                            </div>
                            <div class="btn_wrap">
                                <button type="button" class="stroke"  onClick="_getUserGridLayout('monLayout', monGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('monLayout', monGrid, monColumns);">칼럼초기화</button>
                                <button type="button">문구수정</button>
                                <button type="button">문자발송</button>
                                <button type="button">저장</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 탭 패널 : 부가수익 -->
                <div id="panel_add" role="tabpanel" class="tabpanel">
                    <div class="admin_summary">
                        <dl>
                            <dt>총 입금금액</dt>
                            <dd>${totalAddCost.depositcost}원</dd>
                        </dl>
                        <dl>
                            <dt>총 이월금</dt>
                            <dd>${totalAddCost.outcost}원</dd>
                        </dl>
                        <a href="#add_category">분류명생성</a>
                        <a href="#add_breakdown">내역생성</a>
                    </div>
                    <div class="admin_utility">
                        <form action="#" method="post">
                            <label for="Date">방문일</label>
                            <input type="date" id="date" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey('add');">
                            <button class="admin_utility_btn" onClick="getAddList();">조회</button>
                        </form>
                        <div class="admin_btn">
                            <button class="btn">거래명세서 출력</button>
                            <button class="btn">엑셀 업로드</button>
                            <button class="btn" onClick="addExportExcel();">엑셀 다운로드</button>
                        </div>
                    </div>
                    <div class="admin_content">
                        <!-- 필터 영역 admin_filter -->
                        <div class="admin_filter">
                            <form action="#" id="search_form" name="search_form">
                                <label for="con">검색조건</label>
                                <select name="con" id="con">
                                    <option value="all" selected="selected">전체</option>
                                    <option value="site">지역</option>
                                    <option value="building">건물명</option>
                                    <option value="depositor">입금자명</option>
                                </select>
                                <label for="inq" onkeyup="enterkey('add');"></label>
                                <input type="text" placeholder=",로 다중검색 가능" onkeyup="enterkey('add');">
                                <button type="button" onClick="getAddList();">조회</button>
                            </form>
                            <div class="summary" style="position: relative; top:10px;">
                                <dl>
                                    <dt>견적</dt>
                                    <dd id="lableQuoteCost">0000원</dd>
                                </dl>
                                <dl>
                                    <dt>추가금</dt>
                                    <dd id="lableAddCost">0000원</dd>
                                </dl>
                                <dl>
                                    <dt>재료비</dt>
                                    <dd id="lableMaterCost">0000원</dd>
                                </dl>
                                <dl>
                                    <dt>외주비</dt>
                                    <dd id="lableOutscCost">0000원</dd>
                                </dl>
                                <dl>
                                    <dt>미수금</dt>
                                    <dd id="lableOverCost">0000원</dd>
                                </dl>
                                <dl>
                                    <dt>입금금액</dt>
                                    <dd id="lableDepositCost">0000원</dd>
                                </dl>
                            </div>
                        </div>
                        <!-- 보드 영역 admin_dashboard -->
                        <div class="admin_dashboard">
                            <button type="button" class="stroke left">+ 건물추가</button>
                            <div class="btn_wrap">
                                <button type="button" class="stroke" onClick="_getUserGridLayout('addLayout', addGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('addLayout', addGrid, addColumns);">칼럼초기화</button>
                                <button type="button">저장</button>
                                <button type="button">삭제</button>
                            </div>
                            <div class="grid_wrap">
                                <div id="addGrid"  style="height:500px;"></div>
                        		<div id="addGridPager" class="pager"></div>
                            </div>
                            <div class="btn_wrap">
                                <button type="button" class="stroke" onClick="_getUserGridLayout('addLayout', addGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('addLayout', addGrid, addColumns);">칼럼초기화</button>
                                <button type="button">저장</button>
                                <button type="button">삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <!-- 팝업 -->
    <!-- 팝업 : 분류명생성 -->
    <div class="popup" id="add_category">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">분류명추가</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_inner">
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn" onclick="deleteRows('classifi');">삭제</button>
                        <button type="button" class="popup_btn" onclick="saveGrid('classifi')">저장</button>
                    </div>
                </div>
                <div class="popup_grid_area">
                   <button class="btn" onclick="addRow('classifi');">+ 행 추가</button>
                    <div id="classifiGrid"></div>
                    <div id="classifiGridPager" class="pager"></div>
                    <div>
                    <button class="btn" onclick="addRow('classifi');">+ 행 추가</button>
                </div>
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn" onclick="deleteRows('classifi');">삭제</button>
                        <button type="button" class="popup_btn" onclick="saveGrid('classifi');">저장</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--분류명생성 팝업 영역 끝 -->
    <!-- 팝업 : 내역생성 -->
    <div class="popup" id="add_breakdown">
        <div class="popup_container" > 
            <div class="popup_head">
                <p class="popup_title">내역추가</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form action="#" method="post">
                    <div class="row">
                        <label for="sort">분류명<i>*</i></label>
                        <select name="sort" id="sort">
                            <option value="all" selected="selected">전체</option>
                            <option value="">하자보수</option>
                            <option value="">공실청소</option>
                        </select>
                    </div>
                    <div class="row">
                        <label for="breakdown">내역명<i>*</i></label>
                        <input type="text" id="breakdown" name="breakdown" required><br>
                        <input type="text" id="breakdown" name="breakdown" style="margin:10px 0 0 103px;" required><br>
                        <input type="text" id="breakdown" name="breakdown" style="margin:10px 0 0 103px;" required>
                        <button type="button" class="popup_btn att">추가</button>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn confirm">추가</button>
                </div>
            </div>
        </div>
    </div>
    <!--내역생성 팝업 영역 끝 -->
</body>
</html>