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

var staffId = "<%=session.getAttribute("staffId")%>";

function pageLoad(){
	sessionCheck(staffId);
	
	$('#calculate').addClass("current");
	$('#calculate_history').addClass("current");
	
	tab_panel('panel_mon','panel_add');
	
	var today = _getFormatDate(new Date(), 'm');
	$('#date').val(today);
	$('#date2').val(today);
	
	loadGridMonList('init');
	getMonTotalCost();
	getAddTotalCost();
	
	getMonList();
	getAddList();
	
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
		   });
		    
		   monGridPager = new wijmo.input.CollectionViewNavigator('#monGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: monView
		    });
		   
		   monColumns = [
			  	  { binding: 'monMt', header: '월', isReadOnly: true, width: 100, align:"center"},
 			   	  { binding: 'areaCd', header: '지역', isReadOnly: true, width: 100, align:"center", visible: false },
 			   	  { binding: 'areaNm', header: '지역명', isReadOnly: true, width: 100, align:"center" },
 			   	  { binding: 'zone', header: '구역', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'bldgCd', header: '건물코드', isReadOnly: true, width: 0, align:"center", visible: false},
			      { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 100, align:"center" },
				  { binding: 'clientNm', header: '입금자명', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'conCost', header: '관리비', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum'  },
			      { binding: 'surtax', header: '부가세', isReadOnly: true, width: 150, align:"center" , aggregate: 'Sum' },
			      { binding: 'taxBill', header: '세금계산서', isReadOnly: true, width: 150, align:"center"  },
			      { binding: 'addCost', header: '추가금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum' },
			      { binding: 'outCost', header: '미수금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum'  },
			      { binding: 'overCost', header: '이월금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum' },
			      { binding: 'overCostTemp', header: '이월금 Temp', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum' , visible: false},
			      { binding: 'depositCost', header: '관리비입금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum' },
			      { binding: 'depositDt', header: '입금날짜', isReadOnly: true, width: 150, align:"center" },
			      { binding: 'pnum', header: '전화번호', isReadOnly: true, width: 150, align:"center" },
			      { binding: 'memo', header: '비고', isReadOnly: true, width: 200, align:"center" }
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
			   { binding: 'addSeq', header: '시퀀스', isReadOnly: true, width: 150, align:"center", visible: false},
			   	  { binding: 'addDt', header: '일자', isReadOnly: true, width: 150, align:"center" },
			      { binding: 'classifiNm', header: '분류명', isReadOnly: true, width: 100, align:"center"},
			      { binding: 'itemNm', header: '내역명', isReadOnly: true, width: 150, align:"center"},
			      { binding: 'areaNm', header: '지역', isReadOnly: true, width: 150, align:"center"},
			      { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 200, align:"center"},
			      { binding: 'quoteCost', header: '견적', isReadOnly: true, width: 120, align:"center", aggregate: 'Sum'  },
			      { binding: 'surtax', header: '부가세', isReadOnly: true, width: 150, align:"center" , aggregate: 'Sum' },
			      { binding: 'materCost', header: '재료비', isReadOnly: true, width: 120, align:"center", aggregate: 'Sum'  },
			      { binding: 'outscCost', header: '외주', isReadOnly: true, width: 120, align:"center", aggregate: 'Sum' },
			      { binding: 'depositCost', header: '입금', isReadOnly: true, width: 120, align:"center", aggregate: 'Sum' },
			      { binding: 'outCost', header: '미수금', isReadOnly: true, width: 120, align:"center", aggregate: 'Sum'},
			      { binding: 'depositDt', header: '입금날짜', isReadOnly: true, width: 150, align:"center" },
			      { binding: 'depositor', header: '입금자명', isReadOnly: true, width: 100, align:"center" }
			];
		  
		   addGrid = new wijmo.grid.FlexGrid('#addGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: addColumns,
			    itemsSource: addView
			  });
			  
			addGrid.columnFooters.rows.push(new wijmo.grid.GroupRow());
			addGrid.bottomLeftCells.setCellData(0, 0, 'Σ');
		   
		   	_setUserGridLayout('addLayout', addGrid, addColumns);
		   	
		   	//행번호
		   	addGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };
	    
		   	
			  
	  }else if(type == "mon"){
		//월관리
		   monView = new wijmo.collections.CollectionView(result, {
		       pageSize: Number($('#monGridPageCount').val())
		       ,groupDescriptions: ['monMt','areaNm','zone']
		   });
		  monGridPager.cv = monView;
		  monGrid.itemsSource = monView;
		   
		  
	  }else{
		  //부가수익 
		   addView = new wijmo.collections.CollectionView(result, {
		       pageSize: Number($('#addGridPageCount').val())
		       ,groupDescriptions: ['areaNm']
		   });
		  addGridPager.cv = addView;
		  addGrid.itemsSource = addView;
		  
	  }
	  
	  refreshPaging(monGrid.collectionView.totalItemCount, 1, monGrid, 'monGrid');  // 페이징 초기 셋팅
	  refreshPaging(addGrid.collectionView.totalItemCount, 1, addGrid, 'addGrid');  // 페이징 초기 셋팅 
	  
}

function getMonTotalCost(){
	$.ajax({
	      type : 'POST',
	      url : '/calculate/getMonTotalCost',
	      async : false, // 비동기모드 : true, 동기식모드 : false
	      dataType : null,
	      success : function(result) {
	      	console.log(result);
	        $("#totalOutcost").text(Number(result.outcost).toLocaleString('ko-KR')+ "원");
	        $("#totalDepositcost").text(Number(result.depositcost).toLocaleString('ko-KR')+ "원");
	        $("#totalAddcost").text(Number(result.addcost).toLocaleString('ko-KR')+ "원");

	      },
	      error: function(request, status, error) {
	      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

	      }
	  });
}

function getAddTotalCost(){
	$.ajax({
	      type : 'POST',
	      url : '/calculate/getAddTotalCost',
	      async : false, // 비동기모드 : true, 동기식모드 : false
	      dataType : null,
	      success : function(result) {
	      	console.log(result);
	        $("#totalAddQuotecost").text(Number(result.quotecost).toLocaleString('ko-KR')+ "원");
	        $("#totalAddDepositcost").text(Number(result.depositcost).toLocaleString('ko-KR')+ "원");
	        $("#totalAddOutcost").text(Number(result.outcost).toLocaleString('ko-KR')+ "원");

	      },
	      error: function(request, status, error) {
	      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

	      }
	  });
}

function getMonList(){
	var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
		, date : $('#date').val()
	};
	
	$.ajax({
      type : 'POST',
      url : '/calculate/getMonList',
      async : false, // 비동기모드 : true, 동기식모드 : false
      dataType : null,
      data : param,
      success : function(result) {
      	console.log("getMonList success");
      	loadGridMonList('mon', result);
      },
      error: function(request, status, error) {
      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

      }
  });
	
	$.ajax({
	      type : 'POST',
	      url : '/calculate/getMonlableCost',
	      async : false, // 비동기모드 : true, 동기식모드 : false
	      dataType : null,
	      data : param,
	      success : function(result) {
	      	console.log(result);
	      	$("#lableAddCost").text(Number(result.addcost).toLocaleString('ko-KR')+ "원");
	        $("#lableDepositCost").text(Number(result.depositcost).toLocaleString('ko-KR')+ "원");
	        $("#lableOutCost").text(Number(result.outcost).toLocaleString('ko-KR')+ "원");
	        
	        getAddTotalCost();

	      },
	      error: function(request, status, error) {
	      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

	      }
	  });
}

function getAddList(){
	var param = {
		con 	: $('#con2').val()
		, inq 	: $('#inq2').val()
		, date : $('#date2').val()
	};
	
	console.log(param);
	
	$.ajax({
	      type : 'POST',
	      url : '/calculate/getAddList',
	      async : false, // 비동기모드 : true, 동기식모드 : false
	      dataType : null,
	      data : param,
	      success : function(result) {
	      	console.log("getAddList success");
	      	loadGridMonList('search', result);
	      },
	      error: function(request, status, error) {
	      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

	      }
	  });
		
		$.ajax({
		      type : 'POST',
		      url : '/calculate/getAddlableCost',
		      async : false, // 비동기모드 : true, 동기식모드 : false
		      dataType : null,
		      data : param,
		      success : function(result) {
		      	console.log(result);
		      	$("#addlableMaterCost").text(Number(result.matercost).toLocaleString('ko-KR')+ "원");
		        $("#addlableDepositCost").text(Number(result.depositcost).toLocaleString('ko-KR')+ "원");
		        $("#addlableOutscCost").text(Number(result.outsccost).toLocaleString('ko-KR')+ "원");
		        $("#addlableQuoteCost").text(Number(result.quotecost).toLocaleString('ko-KR')+ "원");
		        $("#addlableAddCost").text(Number(result.addcost).toLocaleString('ko-KR')+ "원");
		        $("#addlableOutCost").text(Number(result.outcost).toLocaleString('ko-KR')+ "원");
		        
		        getAddTotalCost();
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

  wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(addGrid, {includeCellStyles: true, includeColumnHeaders: true}, '부가수익.xlsx',
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
                            <dd id="totalOutcost">0원</dd>
                        </dl>
                        <dl>
                            <dt>금년 입금금액(부가세포함)</dt>
                            <dd id="totalDepositcost">0원</dd>
                        </dl>
                        <dl>
                            <dt>금년 추가금</dt>
                            <dd id="totalAddcost">0원</dd>
                        </dl>
                    </div>
                    <div class="admin_utility">
                         <label for="date">조회월</label>
                         <input type="month" id="date" onfocusout="_fnisMonth(this.value, this.id)" onkeyup="enterkey('mon');">
                         <button type="button" class="admin_utility_btn" onClick="getMonList();">조회</button>
                        
                        <div class="admin_btn">
                            <button class="btn" onClick="monExportExcel();">엑셀 다운로드</button>
                        </div>
                    </div>
                    <div class="admin_content">
                        <!-- 필터 영역 admin_filter-->
                        <div class="admin_filter">
                            <form action="#" id="search_form" name="search_form" onsubmit="return false;">
                                <label for="con">검색조건</label>
                                <select name="con" id="con">
                                    <option value="all" selected="selected">전체</option>
                                    <option value="site">지역</option>
									<option value="zone">구역</option>
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
                                    <dd id="lableOutCost">0원</dd>
                                </dl>
                                <dl>
                                    <dt>입금금액</dt>
                                    <dd id="lableDepositCost">0원</dd>
                                </dl>
                                <dl>
                                    <dt>추가금</dt>
                                    <dd id="lableAddCost">0원</dd>
                                </dl>
                            </div>
                        </div>
                        <!-- 보드 영역 admin_dashboard-->
                        <div class="admin_dashboard">
                        	<select id="monGridPageCount" onchange="getMonList()">
								<option value="30">30</option>
								<option value="50">50</option>
								<option value="100" selected="selected">100</option>
							</select>
                            <div class="btn_wrap">
                                <button type="button" class="stroke" onClick="_getUserGridLayout('monLayout', monGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('monLayout', monGrid, monColumns);">칼럼초기화</button>
                            </div>
                            <div class="grid_wrap">
                                <div id="monGrid" ></div>
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
                            <dd id="totalAddQuotecost">${totalAddCost.quotecost}원</dd>
                        </dl>
                        <dl>
                            <dt>총 입금금액</dt>
                            <dd id="totalAddDepositcost">${totalAddCost.depositcost}원</dd>
                        </dl>
                        <dl>
                            <dt>총 미수금</dt>
                            <dd id="totalAddOutcost">${totalAddCost.outcost}원</dd>
                        </dl>
                    </div>
                    <div class="admin_utility">
                        <label for="date2">조회월</label>
                        <input type="month" id="date2" onfocusout="_fnisMonth(this.value, this.id)" onkeyup="enterkey('add');">
                        <button class="admin_utility_btn" onClick="getAddList();">조회</button>
                        
                        <div class="admin_btn">
                            <button class="btn" onClick="addExportExcel();">엑셀 다운로드</button>
                        </div>
                    </div>
                    <div class="admin_content">
                        <!-- 필터 영역 admin_filter-->
                        <div class="admin_filter">
                            <form action="#" id="search_form" name="search_form" onsubmit="return false;">
                                <label for="con2">검색조건</label>
                                <select name="con2" id="con2">
                                    <option value="all" selected="selected">전체</option>
                                    <option value="site">지역</option>
                                    <option value="building">건물명</option>
                                    <option value="depositor">입금자명</option>
                                </select>
                                <label for="inq2" onkeyup="enterkey('add');"></label>
                                <input type="text" id="inq2" placeholder=",로 다중검색 가능" onkeyup="enterkey('add');">
                                <button type="button" onClick="getAddList();">조회</button>
                            </form>
                            <div class="summary" style="position: relative; top:10px;">
                                <dl>
                                    <dt>견적금</dt> 
                                    <dd id="addlableQuoteCost">0원</dd>
                                </dl>
                                <dl>
                                    <dt>재료비</dt>
                                    <dd id="addlableMaterCost">0원</dd>
                                </dl>
                                <dl>
                                    <dt>외주비</dt>
                                    <dd id="addlableOutscCost">0원</dd>
                                </dl>
                                <dl>
                                    <dt>미수금</dt>
                                    <dd id="addlableOutCost">0원</dd>
                                </dl>
                                <dl>
                                    <dt>입금금액</dt>
                                    <dd id="addlableDepositCost">0원</dd>
                                </dl>
                            </div>
                        </div>
                        <!-- 보드 영역 admin_dashboard-->
                        <div class="admin_dashboard">
                        	<select id="addGridPageCount" onchange="getMonList()">
								<option value="30">30</option>
								<option value="50">50</option>
								<option value="100" selected="selected">100</option>
							</select>
                            <div class="btn_wrap">
 	                           	<button type="button" class="stroke" onClick="_getUserGridLayout('addLayout', addGrid);">칼럼위치저장</button>
	                            <button type="button" class="stroke" onClick="_resetUserGridLayout('addLayout', addGrid, addColumns);">칼럼초기화</button>
                            </div>
                            <div class="grid_wrap">
                                <div id="addGrid" ></div>
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