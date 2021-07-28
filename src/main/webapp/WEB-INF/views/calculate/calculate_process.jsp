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
var monSelector;

var addView;
var addGridPager;
var addGrid;
var addColumns;
var addSelector;

var classifiGrid;
var classifiView;
var classifiGridPager;
var classifiSelector;
var dupCheckItemFlag = false;

var itemGrid;
var itemView;
var itemGridPager;
var itemSelector;
var classifiList;

var excelGrid;
var excelView;
var excelSelector;

var editGrid;
var editGridView;

var staffId = "<%=session.getAttribute("staffId")%>";

function pageLoad(){
	sessionCheck(staffId);
	
	$('#calculate').addClass("current");
	$('#calculate_process').addClass("current");
	
	tab_panel('panel_mon','panel_add');
	
	var today = _getFormatDate(new Date());
	$('#fromDate').val(today);
	$('#toDate').val(today);
	$('#fromDate').attr('max',today);
	$('#toDate').attr('max',today);
	
	loadGridList('init');
	getMonTotalCost();
	getAddTotalCost();
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
function loadGridList(type, result){
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
 			  	  { isReadOnly: true, width: 35, align:"center"},
 			  	  { binding: 'monMt', header: '월', isReadOnly: true, width: 100, align:"center"},
 			   	  { binding: 'areaCd', header: '지역', isReadOnly: true, width: 100, align:"center", visible: false },
 			   	  { binding: 'areaNm', header: '지역', isReadOnly: true, width: 100, align:"center" },
 			   	  { binding: 'zone', header: '구분', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'bldgCd', header: '건물코드', isReadOnly: true, width: 0, align:"center", visible: false},
			      { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'conCost', header: '관리비', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum'  },
			      { binding: 'surtax', header: '부가세', isReadOnly: true, width: 150, align:"center" , aggregate: 'Sum' },
			      { binding: 'taxBill', header: '세금계산서', isReadOnly: false, width: 150, align:"center"  },
			      { binding: 'addCost', header: '추가금', isReadOnly: false, width: 150, align:"center", aggregate: 'Sum' },
			      { binding: 'outCost', header: '미수금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum'  },
			      { binding: 'overCost', header: '이월금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum' },
			      { binding: 'overCostTemp', header: '이월금 Temp', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum' , visible: false},
			      { binding: 'depositCost', header: '관리비입금', isReadOnly: false, width: 150, align:"center", aggregate: 'Sum' },
			      { binding: 'depositDt', header: '입금날짜', isReadOnly: false, width: 150, align:"center" },
			      { binding: 'depositor', header: '입금자명', isReadOnly: false, width: 100, align:"center" },
			      { binding: 'pnum', header: '전화번호', isReadOnly: true, width: 150, align:"center" },
			      { binding: 'memo', header: '비고', isReadOnly: false, width: 200, align:"center" }
			];
		    
 		   
 		  var depositDtEditor = new wijmo.input.InputDate(document.createElement("div"));
		   monGrid = new wijmo.grid.FlexGrid('#monGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: monColumns,
			    itemsSource: monView,
	            beginningEdit: function (s, e) {
	                s.columns.getColumn("depositDt").editor = depositDtEditor;
	                let depositDt = e.getRow().dataItem.depositDt;
	                if (!depositDt) {
	                    return;
	                }
	            },
	            cellEditEnding: function (s, e) {
	                var col = s.columns[e.col];
	                var inven = s.columns[e.col - 1];
	                if (col.binding == 'addCost' || col.binding == 'depositCost') {
	                    var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
	                    if( !wijmo.isNumber(value)){
	                        e.cancel = true;
	                        e.stayInEditMode = false;
	                        alert('숫자로만 입력 가능합니다.');
	                        return false;
	                    }
	                    
	                }
	                
	                if(col.binding == "depositCost"){
	                	//미수금 = 관리비(계약금) + 부가세 +  추가금 - 관리비입금
	                    e.getRow().dataItem.outCost = Number((e.getRow().dataItem.conCost == null ? 0 : e.getRow().dataItem.conCost))
	                    							+ Number((e.getRow().dataItem.surtax == null ? 0 : e.getRow().dataItem.surtax))
	                    							+ Number((e.getRow().dataItem.addCost == null ? 0 : e.getRow().dataItem.addCost))
	                    							- Number((s.activeEditor.value == null ? 0 : s.activeEditor.value));
	                	
	                	//이월금 = 누적미수금
	                    e.getRow().dataItem.overCost = e.getRow().dataItem.overCostTemp + e.getRow().dataItem.outCost;
	                    if(e.getRow().dataItem.outCost < 0)e.getRow().dataItem.outCost = 0;
	                	
	                }else if(col.binding == "addCost"){
	                	//미수금 = 관리비(계약금) + 부가세 + 추가금 - 관리비입금
	                    e.getRow().dataItem.outCost = Number((e.getRow().dataItem.conCost == null ? 0 : e.getRow().dataItem.conCost))
													+ Number((e.getRow().dataItem.surtax == null ? 0 : e.getRow().dataItem.surtax))
													+ Number((s.activeEditor.value  == null ? 0 : s.activeEditor.value))
													- Number((e.getRow().dataItem.depositCost == null ? 0 : e.getRow().dataItem.depositCost));
	                	
	                	//이월금 = 누적미수금
	                    e.getRow().dataItem.overCost = e.getRow().dataItem.overCostTemp + e.getRow().dataItem.outCost;
	                    if(e.getRow().dataItem.outCost < 0)e.getRow().dataItem.outCost = 0;
	                	
	                }else if(col.binding == "depositDt"){
	                    e.getRow().dataItem.depositDt = s.activeEditor.value;
	                    
	                }
	            } 
			  });
			  
		   monGrid.columnFooters.rows.push(new wijmo.grid.GroupRow());
		   monGrid.bottomLeftCells.setCellData(0, 0, 'Σ');
	  	
		   monGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };
		   	
	     	_setUserGridLayout('monLayout', monGrid, monColumns);
	     	// 체크박스 생성
	     	monSelector = new wijmo.grid.selector.Selector(monGrid);
	     	monSelector.column = monGrid.columns[0];
	        
			//부가수익 
		 	addView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		    
		   addGridPager = new wijmo.input.CollectionViewNavigator('#addGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: addView
		    });
		   
		   classifiList = new wijmo.grid.DataMap(getClassifiList('drop'), 'id', 'name');
		   itemList = new wijmo.grid.DataMap(getItemList('drop'), 'id', 'name');
		   itemList.getDisplayValues = function (dataItem) {
			    let validItem = getItemList('drop').filter(itemCd => itemCd.classifiCd == dataItem.classifiCd);
			    return validItem.map(itemCd => itemCd.name);
			}; 
		    
		   addColumns = [
			   	  { isReadOnly: true, width: 35, align:"center"},
			      { binding: 'addSeq', header: '시퀀스', isReadOnly: true, width: 150, align:"center", visible: false},
			   	  { binding: 'addDt', header: '일자', isReadOnly: true, width: 150, align:"center" },
			      { binding: 'classifiCd', header: '분류', isReadOnly: false, width: 150, align:"center" , dataMap: classifiList, dataMapEditor: 'DropDownList' },
			      { binding: 'classifiNm', header: '분류명', isReadOnly: false, width: 100, align:"center", visible: false},
			      { binding: 'itemCd', header: '내역', isReadOnly: false, width: 150, align:"center" , dataMap: itemList, dataMapEditor: 'DropDownList'},
			      { binding: 'itemNm', header: '내역명', isReadOnly: false, width: 150, align:"center", visible: false},
			      { binding: 'areaNm', header: '지역', isReadOnly: false, width: 150, align:"center"},
			      { binding: 'bldgNm', header: '건물명', isReadOnly: false, width: 200, align:"center"},
			      { binding: 'quoteCost', header: '견적', isReadOnly: false, width: 120, align:"center", aggregate: 'Sum'  },
			      { binding: 'materCost', header: '재료비', isReadOnly: false, width: 120, align:"center", aggregate: 'Sum'  },
			      { binding: 'outscCost', header: '외주', isReadOnly: false, width: 120, align:"center", aggregate: 'Sum' },
			      { binding: 'depositCost', header: '입금', isReadOnly: false, width: 120, align:"center", aggregate: 'Sum' },
			      { binding: 'outCost', header: '미수금', isReadOnly: true, width: 120, align:"center", aggregate: 'Sum'},
			      { binding: 'depositDt', header: '입금날짜', isReadOnly: false, width: 150, align:"center" },
			      { binding: 'depositor', header: '입금자명', isReadOnly: false, width: 100, align:"center" }
			];
		   var depositDtEditor = new wijmo.input.InputDate(document.createElement("div"));
		   addGrid = new wijmo.grid.FlexGrid('#addGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: addColumns,
			    itemsSource: addView,
			    beginningEdit: function (s, e) {
	                s.columns.getColumn("depositDt").editor = depositDtEditor;
	                let depositDt = e.getRow().dataItem.depositDt;
	                if (!depositDt) {
	                    return;
	                }
	            },
	            cellEditEnding: function (s, e) {
	                var col = s.columns[e.col];
	                var inven = s.columns[e.col - 1];
	                if (col.binding == 'quoteCost' || col.binding == 'materCost' || col.binding == 'outscCost' || col.binding == 'depositCost') {
	                    var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
	                    if( !wijmo.isNumber(value)){
	                        e.cancel = true;
	                        e.stayInEditMode = false;
	                        alert('숫자로만 입력 가능합니다.');
	                        return false;
	                    }
	                    
	                   //미수금 
	                   if (col.binding == 'quoteCost') {
	                	   e.getRow().dataItem.outCost = s.activeEditor.value - e.getRow().dataItem.depositCost;
	                	   if(isNaN(e.getRow().dataItem.outCost)) e.getRow().dataItem.outCost = 0;
	                   }else if(col.binding == 'depositCost'){
	                	   e.getRow().dataItem.outCost = e.getRow().dataItem.quoteCost - s.activeEditor.value;
	                	   if(isNaN(e.getRow().dataItem.outCost)) e.getRow().dataItem.outCost = 0;
	                   }
	                   
	                }else if(col.binding == "depositDt"){
	                    e.getRow().dataItem.depositDt = s.activeEditor.value;
	                    
	                }else if(col.binding == "classifiCd"){
	                    e.getRow().dataItem.classifiNm = s.activeEditor.value;
	                    
	                }else if(col.binding == "itemCd"){
	                    e.getRow().dataItem.itemNm = s.activeEditor.value;
	                    
	                }
	            } 
			  });
		
			addGrid.columnFooters.rows.push(new wijmo.grid.GroupRow());
			addGrid.bottomLeftCells.setCellData(0, 0, 'Σ');
		   	
		   	addGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };
	        
	     	// 체크박스 생성
	     	addSelector = new wijmo.grid.selector.Selector(addGrid);
	     	addSelector.column = addGrid.columns[0];
	        
		   	_setUserGridLayout('addLayout', addGrid, addColumns);
	        
	        
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
	                { binding: 'classifiCd', header: '분류코드', isReadOnly: false, width: 230, align:"center"},
	                { binding: 'classifiNm', header: '분류명', isReadOnly: false,  width: '*', align:"center"},
	                { binding: 'cretDt', header: '등록일시', isReadOnly: true, width: 230, align:"center"  }
	            ],
	            beginningEdit: function (s, e) {
	                var col = s.columns[e.col];
	                var item = s.rows[e.row].dataItem;
	                if(item.cretDt != undefined){
	                    if (col.binding == 'classifiCd') {
	                        e.cancel = true;
	                        alert("분류코드는 신규 행일때만 입력이 가능합니다.");
	                    }
	                }
	            },
	            cellEditEnding: function (s, e) {
	                var col = s.columns[e.col];
	                if (col.binding == 'classifiCd') {
	                    var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.String, col.format);
	                    if (value.length != 3) {
	                        e.cancel = true;
	                        alert('분류코드는 3자리 입니다.');
	                        return false;
	                    }
	                    value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
	                    if( !wijmo.isNumber(value) || value < 0){
	                        e.cancel = true;
	                        alert('분류코드는 숫자로만 입력 가능합니다.');
	                        return false;
	                    }

	                }
	            },
	            itemsSource: classifiView,
	        });
	        
	        classifiSelector = new wijmo.grid.selector.Selector(classifiGrid);
	        
	        
	      //분류 내역 추가 팝업 그리드
	        itemView = new wijmo.collections.CollectionView(result, {
	            pageSize: 100
	        });
	    
	        itemGridPager = new wijmo.input.CollectionViewNavigator('#itemGridPager', {
	            byPage: true,
	            headerFormat: '{currentPage:n0} / {pageCount:n0}',
	            cv: itemView
	        });
	        
	        classifiList = new wijmo.grid.DataMap(getClassifiList('itemPop'), 'id', 'name');
	        itemGrid = new wijmo.grid.FlexGrid('#itemGrid', {
	            autoGenerateColumns: false,
	            alternatingRowStep: 0,
	            columns: [
	            	{ binding: 'classifiCd', header: '내역코드', isReadOnly: false, width: 230, align:"center" , dataMap: classifiList, dataMapEditor: 'DropDownList'},
	            	{ binding: 'itemCd', header: '내역코드', isReadOnly: false, width: 230, align:"center"},
	                { binding: 'itemNm', header: '내역명', isReadOnly: false,  width: '*', align:"center"},
	                { binding: 'cretDt', header: '등록일시', isReadOnly: true, width: 230, align:"center"  }
	            ],
	            beginningEdit: function (s, e) {
	                var col = s.columns[e.col];
	                var item = s.rows[e.row].dataItem;
	                if(item.cretDt != undefined){
	                    if (col.binding == 'itemCd') {
	                        e.cancel = true;
	                        alert("내역코드는 신규 행일때만 입력이 가능합니다.");
	                        
	                    }else if (col.binding == 'classifiCd') {
	                        e.cancel = true;
	                        alert("분류코드는 신규 행일때만 입력이 가능합니다.");
	                    }
	                }
	            },
	            cellEditEnding: function (s, e) {
	                var col = s.columns[e.col];
	                if (col.binding == 'itemCd') {
	                    var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.String, col.format);
	                    if (value.length != 4) {
	                        e.cancel = true;
	                        alert('내역코드는 4자리 입니다.');
	                        return false;
	                    }
	                    value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
	                    if( !wijmo.isNumber(value) || value < 0){
	                        e.cancel = true;
	                        alert('내역코드는 숫자로만 입력 가능합니다.');
	                        return false;
	                    }

	                }
	            },
	            itemsSource: itemView,
	        });
	        
	        itemSelector = new wijmo.grid.selector.Selector(itemGrid);
	        
	        //수정용 그리드
	        editGrid = new wijmo.grid.FlexGrid('#editGrid', {
	            itemsSource: classifiView.itemsEdited,
	            isReadOnly: true
	        });
	        
			  
	  }else if(type == "mon"){
		//월관리
		   monView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		       ,groupDescriptions: ['areaNm']
		   		,trackChanges: true
		   });
		  monGridPager.cv = monView;
		  monGrid.itemsSource = monView;
		  
	  }else if(type == "add"){	  
		  //부가수익 
		   addView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		       ,groupDescriptions: ['bldgNm']
	   			,trackChanges: true
		   });
		  addGridPager.cv = addView;
		  addGrid.itemsSource = addView;
		  
	  }else if(type == "classifi"){
	        classifiView = new wijmo.collections.CollectionView(result, {
	            pageSize: 100,
	            trackChanges: true
	        });
	        classifiGridPager.cv = classifiView;
	        classifiGrid.itemsSource = classifiView;
	        
	  }else if(type == "item"){
		    classifiList = new wijmo.grid.DataMap(getClassifiList('itemPop'), 'id', 'name');
	        itemView = new wijmo.collections.CollectionView(result, {
	            pageSize: 100,
	            trackChanges: true
	        });
	        itemGridPager.cv = itemView;
	        itemGrid.itemsSource = itemView;
	        
	  }
	  
	  // 페이징 초기 셋팅
	  refreshPaging(monGrid.collectionView.totalItemCount, 1, monGrid, 'monGrid');  
	  refreshPaging(addGrid.collectionView.totalItemCount, 1, addGrid, 'addGrid');  
	  refreshPaging(classifiGrid.collectionView.totalItemCount, 1, classifiGrid, 'classifiGrid');  
	  refreshPaging(itemGrid.collectionView.totalItemCount, 1, itemGrid, 'itemGrid'); 
	  
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
	
	if($('#date').val() == null || $('#date').val() == ""){
		alert("조회월은 필수 검색조건입니다.");
		return false;
	}
	
	$.ajax({
      type : 'POST',
      url : '/calculate/getMonList',
      async : false, // 비동기모드 : true, 동기식모드 : false
      dataType : null,
      data : param,
      success : function(result) {
	      	console.log("getMonList success");
	      	loadGridList('mon', result);
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
	        
	        getMonTotalCost();

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
	
	$.ajax({
	      type : 'POST',
	      url : '/calculate/getAddList',
	      async : false, // 비동기모드 : true, 동기식모드 : false
	      dataType : null,
	      data : param,
	      success : function(result) {
	      	console.log("getAddList success");
	      	loadGridList('add', result);
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

// 행추가
function addRow(type){
    if(type == 'mon'){
    	monGrid.allowAddNew = true;
    	
    }else if(type == 'add'){
    	addGrid.allowAddNew = true;
    	
    }else if(type == 'classifi'){
        classifiGrid.allowAddNew = true;
        
    }else if(type == 'item'){
        itemGrid.allowAddNew = true;
    }
}

//행 삭제
function deleteRows(type){
   if(type == 'add'){
    	var item = addGrid.rows.filter(r => r.isSelected); 
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
                    url : "/calculate/deleteAdd",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(rows),
                    success : function(result) {
                        alert("삭제되었습니다.");
                        getAddList();
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
                    url : "/calculate/deleteClassifi",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(rows),
                    success : function(result) {
                        alert("삭제되었습니다.");
                        getClassifiList('list');
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
            }
        }
    }else if(type == 'item'){
        var item = itemGrid.rows.filter(r => r.isSelected);
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
                    url : "/calculate/deleteItem",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(rows),
                    success : function(result) {
                        alert("삭제되었습니다.");
                        getItemList('list');
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
            }
        }
    }      
}


//데이터 저장
function saveGrid(type){
  if(type == "mon"){
	  
      var allItem  = monGrid.collectionView.items;
      var rows = [];
      for(var i =0; i< allItem.length ; i++){
    	  if(!saveVal(type, allItem[i])) return false;
          rows.push(allItem[i]);
      }

      wijmo.Control.getControl("#editGrid").refresh(true);
      if(confirm("저장 하시겠습니까?")){
          $.ajax({
              url : "/calculate/saveMon",
              async : false, // 비동기모드 : true, 동기식모드 : false
              type : 'POST',
              contentType: 'application/json',
              data: JSON.stringify(rows),
              success : function(result) {
                  alert("저장되었습니다.");
                  getMonList();
              },
              error : function(request,status,error) {
                  alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
              }
          });
      }
  }else if(type == 'add'){
      if(addView.itemCount > 0){
    	  var addItem  = addView.itemsAdded;
    	    var addItem  = addView.itemsAdded;
    	    var editItem = addView.itemsEdited;
    	    var addRows = [];
    		var editRows = [];
    		var rows = [];

    	    for(var i=0; i< addItem.length; i++){
    	    	if(!saveVal(type, addItem[i])) return false;
    	    	
    	    	addRows.push(addItem[i]);
    	    	rows.push(addItem[i]);
    	    }
    		
    		for(var i =0; i< editItem.length; i++){
    			if(!saveVal(type, editItem[i])) return false;
    			
    	    	editRows.push(editItem[i]);
    	    	rows.push(editItem[i]);
    	    }
    		
          wijmo.Control.getControl("#editGrid").refresh(true);
          if(confirm("저장 하시겠습니까?")){
        	  $.ajax({
        	        url : "/calculate/saveAdd",
        	        async : false, // 비동기모드 : true, 동기식모드 : false
        	        type : 'POST',
        	        contentType: 'application/json',
        	        data: JSON.stringify(addRows),
        	        success : function(result) {
        	        	$.ajax({
        	                url : "/calculate/saveUpdateAdd",
        	                async : false, // 비동기모드 : true, 동기식모드 : false
        	                type : 'POST',
        	                contentType: 'application/json',
        	                data: JSON.stringify(editRows),
        	                success : function(result) {
        	                    alert("저장되었습니다.");
        	                    getAddList();
        	                },
        	                error : function(request,status,error) {
        	                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        	                }
        	            });
        	        },
        	        error : function(request,status,error) {
        	            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        	        }
        	    });
          }
      }
     }else if(type == 'classifi'){
   	  if(classifiView.itemCount > 0){
   			var dupChk;
		  	var dupChkList = getClassifiList('dupChk');
   		  
             var editItem = classifiView.itemsEdited;
             var addItem  = classifiView.itemsAdded;
             var rows = [];
             for(var i =0; i< editItem.length ; i++){
            	 if(!saveVal(type, editItem[i])) return false;
                 rows.push(editItem[i]);
             }
             for(var i=0; i< addItem.length; i++){
            	 if(!saveVal(type, addItem[i])) return false;
            	 
            	 dupChk = dupChkList.filter(function(element){
          	        return element.classifiCd == addItem[i].classifiCd;
          	    });
 	         	  
 	         	if(dupChk.length > 0){
 	         		alert( '분류코드 : '+addItem[i].classifiCd+ ' - 생성이력이 존재하는 분류코드입니다.');
 	         		return false;
 	         	}
 	         	 
                rows.push(addItem[i]);
             }
             wijmo.Control.getControl("#editGrid").refresh(true);
             if(confirm("저장 하시겠습니까?")){
                 $.ajax({
                     url : "/calculate/saveClassifi",
                     async : false, // 비동기모드 : true, 동기식모드 : false
                     type : 'POST',
                     contentType: 'application/json',
                     data: JSON.stringify(rows),
                     success : function(result) {
                         alert("저장되었습니다.");
                         getClassifiList('list');
                     },
                     error : function(request,status,error) {
                         alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                     }
                 });
             }
   	  	}
     }else if(type == 'item'){
      	  if(itemView.itemCount > 0){
      		  var dupChk;
      		  var dupChkList = getItemList('dupChk');
              var editItem = itemView.itemsEdited;
              var addItem  = itemView.itemsAdded;
              var rows = [];
              for(var i =0; i< editItem.length ; i++){
            	  if(!saveVal(type, editItem[i])) return false;
                  rows.push(editItem[i]);
              }
              for(var i=0; i< addItem.length; i++){
            	  if(!saveVal(type, addItem[i])) return false;
            	  
            	  dupChk = dupChkList.filter(function(element){
            	      return element.itemCd == (addItem[i].classifiCd + addItem[i].itemCd);
            	  });
            	  
	   	          if(dupChk.length > 0){
	   	              alert( '내역코드 : '+addItem[i].itemCd+ ' - 해당 분류에 생성이력이 존재하는 내역코드입니다.');
	   	         	  return false;
	   	          }
            	  
	   	       	  addItem[i].itemCd = addItem[i].classifiCd + addItem[i].itemCd;
                  rows.push(addItem[i]);
              }
              wijmo.Control.getControl("#editGrid").refresh(true);
              if(confirm("저장 하시겠습니까?")){
                  $.ajax({
                      url : "/calculate/saveItem",
                      async : false, // 비동기모드 : true, 동기식모드 : false
                      type : 'POST',
                      contentType: 'application/json',
                      data: JSON.stringify(rows),
                      success : function(result) {
                          alert("저장되었습니다.");
                          getItemList('list');
                      },
                      error : function(request,status,error) {
                          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                      }
                  });
              }
    	  	}
      }else if(type == 'monExcel'){// 엑셀 업로드 저장하기
         var item  = monGrid.rows;
         var rows = [];
         var params;
         for(var i=0; i< item.length; i++){
             var value = wijmo.changeType(excelGrid.collectionView.items[i].원가, wijmo.DataType.Number, null);
             if(!wijmo.isNumber(value)){
                 alert("원가는 숫자만 입력 가능합니다.");
                 return false;
             }
             params={
                 lCategyCd :  excelGrid.collectionView.items[i].물품코드.substring(0,3),
                 itemCd : excelGrid.collectionView.items[i].물품코드,
                 itemNm : excelGrid.collectionView.items[i].물품명,
                 cost : excelGrid.collectionView.items[i].원가
             }
             rows.push(params);
         }
         if(confirm("저장 하시겠습니까?")){
             $.ajax({
                 url : "/stock/saveStock",
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
     }else if(type == 'addExcel'){// 엑셀 업로드 저장하기
         var item  = monGrid.rows;
         var rows = [];
         var params;
         for(var i=0; i< item.length; i++){
             var value = wijmo.changeType(excelGrid.collectionView.items[i].원가, wijmo.DataType.Number, null);
             if(!wijmo.isNumber(value)){
                 alert("원가는 숫자만 입력 가능합니다.");
                 return false;
             }
             params={
                 lCategyCd :  excelGrid.collectionView.items[i].물품코드.substring(0,3),
                 itemCd : excelGrid.collectionView.items[i].물품코드,
                 itemNm : excelGrid.collectionView.items[i].물품명,
                 cost : excelGrid.collectionView.items[i].원가
             }
             rows.push(params);
         }
         if(confirm("저장 하시겠습니까?")){
             $.ajax({
                 url : "/stock/saveStock",
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
}

function saveVal(type, item){
	if(type == "mon"){
		if( (item.taxBill != null && item.taxBill != '') && ( item.taxBill == null || item.taxBill == '' ) ){
			alert("부가세가 존재하는 경우, 세금계산서 방식을 입력해주세요.");
			return false;
			
		}else if(item.depositCost != null && item.depositCost != ''){
			if(item.depositDt == null || item.depositDt == ''){
				alert("입금날짜를 입력해주세요.");
				return false;
				
			}else if(item.depositor == null || item.depositor == ''){
				alert("입금자명을 입력해주세요.");
				return false;
			}
		}
	}else if(type == "add"){
		
		console.log(item.depositCost );
		console.log(item);
		
		if(item.classifiCd == null || item.classifiCd == ''){
			alert("분류를 입력해주세요.");
			return false;
		}else if(item.itemNm == null || item.itemNm == ''){
			alert("내역을 입력해주세요.");
			return false;
		}else if(item.bldgNm == null || item.bldgNm == ''){
			alert("건물명을 입력해주세요.");
			return false;
		}else if(item.quoteCost == null || item.quoteCost == ''){
			alert("견적비를 입력해주세요.");
			return false;
		}else if(item.depositCost == null || item.depositCost == ''){
			alert("입금비를 입력해주세요.");
			return false;
		}else if(item.depositDt == null || item.depositDt == ''){
			alert("입금날짜를 입력해주세요.");
			return false;
		}else if(item.depositor == null || item.depositor == ''){
			alert("입금자명을 입력해주세요.");
			return false;
		}
		
	}else if(type == "classifi"){
		if(item.classifiCd == null || item.classifiCd == ''){
			alert("분류를 입력해주세요.");
			return false;
		}else if(item.classifiNm == null || item.classifiNm == ''){
			alert("분류명을 입력해주세요.");
			return false;
		}
		
	}else if(type == "item"){
		if(item.classifiCd == null || item.classifiCd == ''){
			alert("분류를 선택해주세요.");
			return false;
			
		}else if(item.itemCd == null || item.itemCd == ''){
			alert("내역코드를 입력해주세요.");
			return false;
			
		}else if(item.itemNm == null || item.itemNm == ''){
			alert("내역명을 입력해주세요.");
			return false;
		}
	}
	
	return true;
}

function getClassifiList(type){
	var returnVal;
	var param = { type : type };
	
    $.ajax({
           url : "/calculate/getClassifiList",
           async : false, // 비동기모드 : true, 동기식모드 : false
           type : 'POST',
           data : param,
           success : function(result) {
        	   if(type == 'list'){
        		   loadGridList('classifi', result);
        		   
        	   }else if(type == 'itemPop' || type == 'drop'){
        		   if(result.length > 0){
	                   	var classifi = [];
	                   	
	                   	for(var i =0; i<result.length; i++){
	                   		classifi[i] = { id: result[i].classifiCd, name: result[i].classifiNm };	
	                   	}
	                   	console.log(classifi);
	                   	returnVal = classifi;
	                   	
                   }
        		   
        	   }else if(type == 'dupChk'){
        		   returnVal = result;
        		   
        	   }
           },
           error : function(request,status,error) {
            	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
           }
       });
    
    if(type != 'list') return returnVal;
}


function getItemList(type){
	var returnVal;
	var param = { type : type };
	
    $.ajax({
           url : "/calculate/getItemList",
           async : false, // 비동기모드 : true, 동기식모드 : false
           type : 'POST',
           data : param,
           success : function(result) {
        	   if(type == 'list'){
        		   loadGridList('item', result);
        		   
        	   }else if(type == 'dupChk'){
        		   returnVal = result;
        	   
        	   }else if(type == 'drop'){
        		   var item = [];
               	
	               for(var i =0; i<result.length; i++){
	            	   item[i] = { id: result[i].itemCd, name: result[i].itemNm, classifiCd: result[i].classifiCd };	
	               }
	               returnVal = item;
        	   }

           },
           error : function(request,status,error) {
            	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
           }
         });
    
    if(type != 'list') return returnVal;
    
}

//카테고리 동적으로 가져오기
function getBldgList() {
	var returnVal;
	
    $.ajax({
            url : "/calculate/getBldgList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
                if(result.length > 0){
                	var bldg = [];
                	
                	for(var i =0; i<result.length; i++){
                		bldg[i] = { id: result[i].bldgCd, name: result[i].bldgNm,  areaCd: result[i].areaCd,  areaNm: result[i].areaNm, zone: result[i].zone };	
                	}
                	returnVal = bldg;
                	console.log(returnVal);
                }
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
    
    return returnVal;
}


//팝업 오픈
function showPop(pop){
	if(pop == "add_category"){
		getClassifiList('list');
		
	}else if(pop == "add_breakdown"){
		getItemList('list');
	}
	
	$('#'+pop).addClass('is-visible');
}

//팝업 종료
function closePop(type){
	if(type == 'classifi'){
		classifiGrid.allowAddNew = false;
	}else if(type == 'item'){
		itemGrid.allowAddNew = false;
	}
	$('.popup').removeClass('is-visible');
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

function popSpecification(){
	var idx = addView._idx;
    var bldgNm;
    if(idx == null || idx == undefined){
        alert("거래명세서를 출력할 건물을 선택하시기 바랍니다.");
        return false;
        
    }else{
        if(addView.items[addView._idx] == undefined){
            alert("거래명세서를 출력할 건물을 선택하시기 바랍니다.");
            return false;
        }
        bldgNm = addView.items[addView._idx].bldgNm;
        
    }
    
    var win = window.open("/calculate/getPopSpecification?bldgNm="+bldgNm, "pop", "width=830,height=630");
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
                            <dd id="totalOutcost">0원</dd>
                        </dl>
                        <dl>
                            <dt>총 입금금액</dt>
                            <dd id="totalDepositcost">0원</dd>
                        </dl>
                        <dl>
                            <dt>총 추가금</dt>
                            <dd id="totalAddcost">0원</dd>
                        </dl>
                        <dl>
                            <dt>문자 잔액</dt>
                            <dd>0000원</dd>
                        </dl>
                    </div>
                    <div class="admin_utility">
                        <label for="date">조회월</label>
                        <input type="month" id="date" onfocusout="_fnisMonth(this.value, this.id)" onkeyup="enterkey('mon');">
                        <button class="admin_utility_btn"  onClick="getMonList();">조회</button>
                        <div class="admin_btn">
                            <button class="btn">엑셀 업로드</button>
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
                                <label for="inq"></label>
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
                            <div class="btn_wrap">
                                <button type="button" class="stroke"  onClick="_getUserGridLayout('monLayout', monGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('monLayout', monGrid, monColumns);">칼럼초기화</button>
                                <button type="button">문구수정</button>
                                <button type="button">문자발송</button>
                                <button type="button" onClick="saveGrid('mon')">저장</button>
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
                                <button type="button" onClick="saveGrid('mon')">저장</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 탭 패널 : 부가수익 -->
                <div id="panel_add" role="tabpanel" class="tabpanel">
                    <div class="admin_summary">
                        <dl>
                            <dt>총 입금금액</dt>
                            <dd id="totalAddDepositcost">${totalAddCost.depositcost}원</dd>
                        </dl>
                        <dl>
                            <dt>총 미수금</dt>
                            <dd id="totalAddOutcost">${totalAddCost.outcost}원</dd>
                        </dl>
                        <a href="javascript:void(0);" onclick="showPop('add_category');">분류명생성</a>
                    	<a href="javascript:void(0);" onclick="showPop('add_breakdown');">내역생성</a>
                    </div>
                    <div class="admin_utility">
                        <label for="date2">조회일</label>
                        <input type="month" id="date2" onfocusout="_fnisMonth(this.value, this.id)" onkeyup="enterkey('add');">
                        <button class="admin_utility_btn" onClick="getAddList();">조회</button>
                        <div class="admin_btn">
                            <button class="btn" onClick="popSpecification();">거래명세서 출력</button>
                            <button class="btn">엑셀 업로드</button>
                            <button class="btn" onClick="addExportExcel();">엑셀 다운로드</button>
                        </div>
                    </div>
                    <div class="admin_content">
                        <!-- 필터 영역 admin_filter -->
                        <div class="admin_filter">
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
                        <!-- 보드 영역 admin_dashboard -->
                        <div class="admin_dashboard">
                            <button type="button" class="stroke left" onClick="addRow('add');">+ 건물추가</button>
                            <div class="btn_wrap">
                                <button type="button" class="stroke" onClick="_getUserGridLayout('addLayout', addGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('addLayout', addGrid, addColumns);">칼럼초기화</button>
                                <button type="button" onclick="saveGrid('add')">저장</button>
                            <button type="button" onclick="deleteRows('add')">삭제</button>
                            </div>
                            <div class="grid_wrap">
                                <div id="addGrid"  style="height:500px;"></div>
                        		<div id="addGridPager" class="pager"></div>
                            </div>
                            <div class="btn_wrap">
                                <button type="button" class="stroke" onClick="_getUserGridLayout('addLayout', addGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('addLayout', addGrid, addColumns);">칼럼초기화</button>
                                <button type="button" onclick="saveGrid('add')">저장</button>
                            <button type="button" onclick="deleteRows('add')">삭제</button>
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
                <button type="button" class="popup_close" onClick="closePop('classifi');">x</button>
            </div>
            <div class="popup_grid">
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
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">내역추가</p>
                <button type="button" class="popup_close" onClick="closePop('item');">x</button>
            </div>
            <div class="popup_grid">
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn" onclick="deleteRows('item');">삭제</button>
                        <button type="button" class="popup_btn" onclick="saveGrid('item')">저장</button>
                    </div>
                </div>
                <div class="popup_grid_area">
                   <button class="btn" onclick="addRow('item');">+ 행 추가</button>
                    <div id="itemGrid"></div>
                    <div id="itemGridPager" class="pager"></div>
                    <button class="btn" onclick="addRow('item');">+ 행 추가</button>
                </div>
                <div class="popup_btn_area">
	                <div class="right">
	                    <button type="button" class="popup_btn" onclick="deleteRows('item');">삭제</button>
	                    <button type="button" class="popup_btn" onclick="saveGrid('item');">저장</button>
	                </div>
	            </div>
            </div>
        </div>
    </div>
    
    
    
   <!--  <div class="popup" id="add_breakdown">
        <div class="popup_container" > 
            <div class="popup_head">
                <p class="popup_title">내역추가</p>
                <button type="button" class="popup_close" onClick="closePop('item');">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form action="#" method="post">
                    <div class="row">
                        <label for="classifi1">분류명<i>*</i></label>
                        <select name="classifi1" id="classifi1">
                        </select>
                    </div>
                    <div class="row" id = "itemInput">
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn confirm" onClick="saveClassifiItem();">추가</button>
                </div>
            </div>
        </div>
    </div>
     -->
    
    <!--내역생성 팝업 영역 끝 -->
        <!--물품추가 팝업 영역 끝-->
    <!-- 추가된 행 / 수정된 행 처리용 그리드 -->
    <div class="grid_wrap" id="editDiv" style="display:none;">
        <div id="editGrid"  style="height:500px;"></div>
    </div>
</body>
</html>