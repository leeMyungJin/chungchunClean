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

function pageLoad(){
	$('#calculate').addClass("current");
	$('#calculate_history').addClass("current");
	
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
		   });
		    
		   addGridPager = new wijmo.input.CollectionViewNavigator('#addGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: addView
		    });
		   
		   addColumns = [
			      { binding: 'areaCd', header: '지역', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 100, align:"center"  },
			      { binding: 'manageCost', header: '관리비', isReadOnly: true, width: 60, align:"center" },
			      { binding: 'taxBill', header: '세금계산서', isReadOnly: true, width: 60, align:"center"  },
			      { binding: 'bldgNm', header: '추가금', isReadOnly: true, width: 120, align:"center"  },
			      { binding: 'outCost', header: '미수금', isReadOnly: true, width: 100, align:"center"  },
			      { binding: 'overCost', header: '이월금', isReadOnly: true, width: '*', align:"center" },
			      { binding: 'depositCost', header: '관리비입금', isReadOnly: true, width: '*', align:"center" },
			      { binding: 'depositMt', header: '입금날짜', isReadOnly: true, width: '*', align:"center" },
			      { binding: 'depositor', header: '입금자명', isReadOnly: true, width: '*', align:"center" },
			      { binding: 'pnum', header: '전화번호', isReadOnly: true, width: '*', align:"center" },
			      { binding: 'memo', header: '비고', isReadOnly: true, width: '*', align:"center" }
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
      url : '/history/getAddList',
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
                <h2 class="admin_title">정산이력</h2>
                <!-- 탭 메뉴 -->
                <div role="tablist" class="admin_tab">
                    <a id="tab_panel_mon" href="javascript:tab_panel('panel_mon','panel_add');" role="tab" class="on">월관리청소</a>
                    <a id="tab_panel_add" href="javascript:tab_panel('panel_add','panel_mon');" role="tab">부가수익</a>
                </div>
                <!-- 탭 패널 : 월관리청소 -->
                <div id="panel_mon" role="tabpanel" class="tabpanel">
                    <div class="admin_summary">
                        <dl>
                            <dt>금년 누적미수금</dt>
                            <dd>${totalCost.outcost}원</dd>
                        </dl>
                        <dl>
                            <dt>금년 입금금액(부가세포함)</dt>
                            <dd>${totalCost.depositcost}원</dd>
                        </dl>
                        <dl>
                            <dt>금년 추가금</dt>
                            <dd>${totalCost.addcost}원</dd>
                        </dl>
                    </div>
                    <div class="admin_utility">
                        <form action="#" method="post">
                            <label for>조회일</label>
                            <input type="date" id="fromDate" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey('mon');">
                     	   	-
                       		<input type="date" id="toDate" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey('mon');">
                            <button type="button" class="admin_utility_btn" onClick="getMonList();">조회</button>
                        </form>
                        <div class="admin_btn">
                            <button class="btn" onClick="monExportExcel();">엑셀 다운로드</button>
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
                                <label for="inq" onkeyup="enterkey('mon');"></label>
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
                                <button type="button" class="stroke" onClick="_getUserGridLayout('monLayout', monGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('monLayout', monGrid, monColumns);">칼럼초기화</button>
                            </div>
                            <div class="grid_wrap">
                                <div id="monGrid"  style="height:500px;"></div>
                        		<div id="monGridPager" class="pager"></div>
                            </div>
                            <div class="btn_wrap">
                                <button type="button" class="stroke" onClick="_getUserGridLayout('monLayout', monGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('monLayout', monGrid, monColumns);">칼럼초기화</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 탭 패널 : 부가수익 -->
                <div id="panel_add" role="tabpanel" class="tabpanel">
                    <div class="admin_summary">
                        <dl>
                            <dt>금년 견적(매출)</dt>
                            <dd>0000원</dd>
                        </dl>
                        <dl>
                            <dt>금년 입금금액</dt>
                            <dd>0000원</dd>
                        </dl>
                        <dl>
                            <dt>금년 이월금</dt>
                            <dd>0000원</dd>
                        </dl>
                        <dl>
                            <dt>금년 추가금</dt>
                            <dd>0000원</dd>
                        </dl>
                    </div>
                    <div class="admin_utility">
                        <form action="#" method="post">
                            <label for="Date">조회일</label>
                            <input type="date" id="Date" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey('add');">
                            <button class="admin_utility_btn" onClick="getAddList();">조회</button>
                        </form>
                        <div class="admin_btn">
                            <button class="btn" onClick="addExportExcel();">엑셀 다운로드</button>
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
                                <label for="inq" onkeyup="enterkey('add');"></label>
                                <input type="text" placeholder=",로 다중검색 가능" onkeyup="enterkey('add');">
                                <button type="button" onClick="getAddList();">조회</button>
                            </form>
                            <div class="summary" style="position: relative; top:10px;">
                                <dl>
                                    <dt>계약금</dt>
                                    <dd>0000원</dd>
                                </dl>
                                <dl>
                                    <dt>추가금</dt>
                                    <dd>0000원</dd>
                                </dl>
                                <dl>
                                    <dt>재료비</dt>
                                    <dd>0000원</dd>
                                </dl>
                                <dl>
                                    <dt>외주비</dt>
                                    <dd>0000원</dd>
                                </dl>
                                <dl>
                                    <dt>미수금</dt>
                                    <dd>0000원</dd>
                                </dl>
                                <dl>
                                    <dt>입금금액</dt>
                                    <dd>0000원</dd>
                                </dl>
                            </div>
                        </div>
                        <!-- 보드 영역 admin_dashboard-->
                        <div class="admin_dashboard">
                            <div class="btn_wrap">
 	                           	<button type="button" class="stroke" onClick="_getUserGridLayout('addLayout', addGrid);">칼럼위치저장</button>
	                            <button type="button" class="stroke" onClick="_resetUserGridLayout('addLayout', addGrid, addColumns);">칼럼초기화</button>
                            </div>
                            <div class="grid_wrap">
                                <div id="addGrid"  style="height:500px;"></div>
                        		<div id="addGridPager" class="pager"></div>
                            </div>
                            <div class="btn_wrap">
 	                           	<button type="button" class="stroke" onClick="_getUserGridLayout('addLayout', addGrid);">칼럼위치저장</button>
	                            <button type="button" class="stroke" onClick="_resetUserGridLayout('addLayout', addGrid, addColumns);">칼럼초기화</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</body>
</html>