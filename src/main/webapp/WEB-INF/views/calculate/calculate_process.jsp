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

var monErrorView;
var monErrorGridPager;
var monErrorGrid;
var monErrorColumns;
var monErrorSelector;

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

var monExcelGrid;
var monExcelView;
var monExcelSelector;

var monErrorExcelGrid;
var monErrorExcelView;
var monErrorExcelSelector;

var addExcelGrid;
var addExcelView;
var addExcelSelector;

var editGrid;
var editGridView;

var staffId = "<%=session.getAttribute("staffId")%>";

function pageLoad(){
	sessionCheck(staffId);
	
	$('#calculate').addClass("current");
	$('#calculate_process').addClass("current");
	
	tab_panel('panel_mon','panel_add');
	
	var today = _getFormatDate(new Date(), 'm');
	$('#date').val(today);
	$('#date2').val(today);
	
	loadGridList('init');
	getMonTotalCost();
	getAddTotalCost();
	getMsgremainCash();
	getMsgTemplate();
	
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
function loadGridList(type, result){
	  if(type == "init"){ 
		  //******************************월관리
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
			      { binding: 'overCostTemp', header: '이월금 Temp', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum', visible: false},
			      { binding: 'depositCost', header: '관리비입금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum' },
			      { binding: 'add', header: '추가입금', isReadOnly: false, width: 150, align:"center" },
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
	                
	                if(col.binding == "add"){
	                	//관리비입금
	                	e.getRow().dataItem.depositCost = Number((e.getRow().dataItem.depositCost == null ? 0 : e.getRow().dataItem.depositCost))
	                									  + Number((s.activeEditor.value  == null ? 0 : s.activeEditor.value));
	                	
	                	//미수금 = 관리비(계약금) + 부가세 +  추가금 - 관리비입금
	                    e.getRow().dataItem.outCost = Number((e.getRow().dataItem.conCost == null ? 0 : e.getRow().dataItem.conCost))
	                    							+ Number((e.getRow().dataItem.surtax == null ? 0 : e.getRow().dataItem.surtax))
	                    							+ Number((e.getRow().dataItem.addCost == null ? 0 : e.getRow().dataItem.addCost))
	                    							- Number((e.getRow().dataItem.depositCost == null ? 0 : e.getRow().dataItem.depositCost));
	                	
	                	//이월금 = 누적미수금
	                    e.getRow().dataItem.overCost = Number((e.getRow().dataItem.overCostTemp == null ? 0 : e.getRow().dataItem.overCostTemp))
														+ Number((e.getRow().dataItem.outCost == null ? 0 : e.getRow().dataItem.outCost))
						
	                    if(e.getRow().dataItem.outCost < 0)e.getRow().dataItem.outCost = 0;
	                    
	                    s.activeEditor.value = null;
	                	
	                }else if(col.binding == "addCost"){
	                	//미수금 = 관리비(계약금) + 부가세 + 추가금 - 관리비입금
	                    e.getRow().dataItem.outCost = Number((e.getRow().dataItem.conCost == null ? 0 : e.getRow().dataItem.conCost))
													+ Number((e.getRow().dataItem.surtax == null ? 0 : e.getRow().dataItem.surtax))
													+ Number((s.activeEditor.value  == null ? 0 : s.activeEditor.value))
													- Number((e.getRow().dataItem.depositCost == null ? 0 : e.getRow().dataItem.depositCost));
	                	
	                	//이월금 = 누적미수금
	                    e.getRow().dataItem.overCost = Number((e.getRow().dataItem.overCostTemp == null ? 0 : e.getRow().dataItem.overCostTemp))
														+ Number((e.getRow().dataItem.outCost == null ? 0 : e.getRow().dataItem.outCost))
	                	
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
	     	
	     	
	     	//************************************월관리 오입금
		   monErrorView = new wijmo.collections.CollectionView(result, {
			   pageSize: 100
		   });
		    
		   monErrorGridPager = new wijmo.input.CollectionViewNavigator('#monErrorGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: monErrorView
		    });
		    
 		   monErrorColumns = [
 			  	  { isReadOnly: true, width: 35, align:"center"},
 			  	  { binding: 'ammeSeq', header: '시퀀스', isReadOnly: true, width: 150, align:"center", visible: false},
 			  	  { binding: 'depositCost', header: '입금금액', isReadOnly: false, width: 150, align:"center" },
			      { binding: 'depositDt', header: '입금날짜', isReadOnly: false, width: 150, align:"center" },
			      { binding: 'depositor', header: '입금자명', isReadOnly: false, width: 100, align:"center" },
			      { binding: 'memo', header: '비고', isReadOnly: false, width: "*", align:"center" }
			];
		    
		   monErrorGrid = new wijmo.grid.FlexGrid('#monErrorGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: monErrorColumns,
			    itemsSource: monErrorView,
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
	                if (col.binding == 'depositCost') {
	                    var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
	                    if( !wijmo.isNumber(value)){
	                        e.cancel = true;
	                        e.stayInEditMode = false;
	                        alert('숫자로만 입력 가능합니다.');
	                        return false;
	                    }
	                    
	                }
	                
	                if(col.binding == "depositDt"){
	                    e.getRow().dataItem.depositDt = s.activeEditor.value;
	                    
	                }
	            } 
			  });
	
	     	// 체크박스 생성
	     	monErrorSelector = new wijmo.grid.selector.Selector(monErrorGrid);
	     	monErrorSelector.column = monErrorGrid.columns[0];
        
	     	
		     	
			//*************************************부가수익 
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
			      { binding: 'surtax', header: '부가세', isReadOnly: false, width: 150, align:"center" , aggregate: 'Sum' },
			      { binding: 'materCost', header: '재료비', isReadOnly: false, width: 120, align:"center", aggregate: 'Sum'  },
			      { binding: 'outscCost', header: '외주', isReadOnly: false, width: 120, align:"center", aggregate: 'Sum' },
			      { binding: 'depositCost', header: '입금', isReadOnly: true, width: 120, align:"center", aggregate: 'Sum' },
			      { binding: 'add', header: '추가입금', isReadOnly: false, width: 150, align:"center" },
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
	                if (col.binding == 'quoteCost' || col.binding == 'materCost' || col.binding == 'outscCost' || col.binding == 'add' || col.binding == 'surtax') {
	                    var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
	                    if( !wijmo.isNumber(value)){
	                        e.cancel = true;
	                        e.stayInEditMode = false;
	                        alert('숫자로만 입력 가능합니다.');
	                        return false;
	                    }
	                    
	                   //미수금 
	                   if (col.binding == 'quoteCost') {
	                	   e.getRow().dataItem.outCost = Number((s.activeEditor.value == null ? 0 : s.activeEditor.value))
	                	   								+ Number((e.getRow().dataItem.surtax == null ? 0 : e.getRow().dataItem.surtax))
														- Number((e.getRow().dataItem.depositCost == null ? 0 : e.getRow().dataItem.depositCost));
	                	   
	                	   if(isNaN(e.getRow().dataItem.outCost)) e.getRow().dataItem.outCost = 0;
	                	   
	                   }else if(col.binding == 'surtax'){
	                	   e.getRow().dataItem.outCost = Number((e.getRow().dataItem.quoteCost == null ? 0 : e.getRow().dataItem.quoteCost))
	                		   							+ Number((s.activeEditor.value == null ? 0 : s.activeEditor.value))
														- Number((e.getRow().dataItem.depositCost == null ? 0 : e.getRow().dataItem.depositCost));

							if(isNaN(e.getRow().dataItem.outCost)) e.getRow().dataItem.outCost = 0;
	                	   
						}else if(col.binding == 'add'){
	                	   e.getRow().dataItem.depositCost = Number((e.getRow().dataItem.depositCost == null ? 0 : e.getRow().dataItem.depositCost))
															+ Number((s.activeEditor.value == null ? 0 : s.activeEditor.value));
	                	   
	                	   e.getRow().dataItem.outCost = Number((e.getRow().dataItem.quoteCost == null ? 0 : e.getRow().dataItem.quoteCost))
														- Number((e.getRow().dataItem.depositCost == null ? 0 : e.getRow().dataItem.depositCost));
	                	   
	                	   if(isNaN(e.getRow().dataItem.outCost)) e.getRow().dataItem.outCost = 0;
	                	   s.activeEditor.value = null;
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
	        
	        
	        //*******************************분류 추가 팝업 그리드
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
	        
	        
	      //*****************************분류 내역 추가 팝업 그리드
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
	            	{ binding: 'classifiCd', header: '분류코드', isReadOnly: false, width: 230, align:"center" , dataMap: classifiList, dataMapEditor: 'DropDownList'},
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
	        
	        //********************수정용 그리드
	        editGrid = new wijmo.grid.FlexGrid('#editGrid', {
	            itemsSource: classifiView.itemsEdited,
	            isReadOnly: true
	        });
	        
	        //**********엑셀그리드 월관리청소********************
	        monExcelGrid = new wijmo.grid.FlexGrid('#monExcelGrid', {
	            autoGenerateColumns: false,
	            alternatingRowStep: 0,
	            columns : monColumns,
	            itemsSource: monExcelView
	        });

	        //행번호 표시하기
	        monExcelGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };
	        
	      //**********엑셀그리드 월관리청소 오입금********************
	        monErrorExcelGrid = new wijmo.grid.FlexGrid('#monErrorExcelGrid', {
	            autoGenerateColumns: false,
	            alternatingRowStep: 0,
	            columns : monErrorColumns,
	            itemsSource: monErrorExcelView
	        });

	        //행번호 표시하기
	        monErrorExcelGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };
	        
	        //***********엑셀그리드 부가수익*******************
	        addExcelGrid = new wijmo.grid.FlexGrid('#addExcelGrid', {
	            autoGenerateColumns: false,
	            alternatingRowStep: 0,
	            columns : addColumns,
	            itemsSource: addExcelView
	        });

	        //행번호 표시하기
	        addExcelGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };	        
	      
  
			  
	  }else if(type == "mon"){
		//월관리
		   monView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		       ,groupDescriptions: ['areaNm']
		   		,trackChanges: true
		   });
		  monGridPager.cv = monView;
		  monGrid.itemsSource = monView;
		  
	  }else if(type == "monError"){
			//월관리
		   monErrorView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   	   ,trackChanges: true
		   });
		  monErrorGridPager.cv = monErrorView;
		  monErrorGrid.itemsSource = monErrorView;
		  
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
	  refreshPaging(monErrorGrid.collectionView.totalItemCount, 1, monErrorGrid, 'monErrorGrid'); 
	  refreshPaging(addGrid.collectionView.totalItemCount, 1, addGrid, 'addGrid');  
	  refreshPaging(classifiGrid.collectionView.totalItemCount, 1, classifiGrid, 'classifiGrid');  
	  refreshPaging(itemGrid.collectionView.totalItemCount, 1, itemGrid, 'itemGrid'); 
	  
/* 	  refreshPaging(monGrid.collectionView.totalItemCount, 1, monGrid, 'monGrid', monView, monGridPager);  
	  refreshPaging(addGrid.collectionView.totalItemCount, 1, addGrid, 'addGrid', addView, addGridPager);  
	  refreshPaging(classifiGrid.collectionView.totalItemCount, 1, classifiGrid, 'classifiGrid', classifiView, classifiGridPager);  
	  refreshPaging(itemGrid.collectionView.totalItemCount, 1, itemGrid, 'itemGrid', itemView, itemGridPager);  */
	  
}


function getMonTotalCost(){
	$.ajax({
	      type : 'POST',
	      url : '/calculate/getMonTotalCost',
	      async : false, // 비동기모드 : true, 동기식모드 : false
	      dataType : null,
	      success : function(result) {
	        $("#totalOutcost").text(Number(result.outcost).toLocaleString('ko-KR')+ "원");
	        $("#totalDepositcost").text(Number(result.depositcost).toLocaleString('ko-KR')+ "원");
	        $("#totalAddcost").text(Number(result.addcost).toLocaleString('ko-KR')+ "원");
	        $("#totalErrorCount").text(Number(result.errorcount).toLocaleString('ko-KR')+ "개");
	        $("#totalErrorCost").text(Number(result.errorcost).toLocaleString('ko-KR')+ "원");

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
	        $("#totalAddDepositcost").text(Number(result.depositcost).toLocaleString('ko-KR')+ "원");
	        $("#totalAddOutcost").text(Number(result.outcost).toLocaleString('ko-KR')+ "원");

	      },
	      error: function(request, status, error) {
	      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

	      }
	  });
}

function getMonList(){
	$("#monDiv").show();
	$("#saveMonTop").show();
	$("#saveMonBottom").show();
	 
    $("#monExcelDiv").hide();
	$("#saveMonTopExcel").hide();
	$("#saveMonBottomExcel").hide();
	
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
	        $("#lableAddCost").text(Number(result.addcost).toLocaleString('ko-KR')+ "원");
	        $("#lableDepositCost").text(Number(result.depositcost).toLocaleString('ko-KR')+ "원");
	        $("#lableOutCost").text(Number(result.outcost).toLocaleString('ko-KR')+ "원");
	        $("#lableNoneCount").text(Number(result.nonecount).toLocaleString('ko-KR')+ "개");
	        
	        getMonTotalCost();

	      },
	      error: function(request, status, error) {
	      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

	      }
	  });
}

function getMonErrorList(){
	var param = {
		date : $('#date').val()
	};
	
	if($('#date').val() == null || $('#date').val() == ""){
		alert("조회월은 필수 검색조건입니다.");
		return false;
	}
	
	$.ajax({
      type : 'POST',
      url : '/calculate/getMonErrorList',
      async : false, // 비동기모드 : true, 동기식모드 : false
      dataType : null,
      data : param,
      success : function(result) {
	      	loadGridList('monError', result);
      },
      error: function(request, status, error) {
      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

      }
  	});
	
	getMonTotalCost();
}


function getAddList(){
	$("#addDiv").show();
	$("#saveAddTop").show();
	$("#saveAddBottom").show();
	$("#saveAddTopDelete").show();
	$("#saveAddBottomDelete").show();
	 
    $("#addExcelDiv").hide();
	$("#saveAddTopExcel").hide();
	$("#saveAddBottomExcel").hide();
	
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
   }else if(type == 'monError'){
	   var item = monErrorGrid.rows.filter(r => r.isSelected); 
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
	               url : "/calculate/deleteMonError",
	               async : false, // 비동기모드 : true, 동기식모드 : false
	               type : 'POST',
	               contentType: 'application/json',
	               data: JSON.stringify(rows),
	               success : function(result) {
	                   alert("삭제되었습니다.");
	                   getMonErrorList();
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
  }else if(type == 'monError'){
      if(monErrorView.itemCount > 0){
    	    var editItem = monErrorView.itemsEdited;
    		var editRows = [];

    		for(var i =0; i< editItem.length; i++){
    			if(!saveVal(type, editItem[i])) return false;
    			
    	    	editRows.push(editItem[i]);
    	    }
    		
          wijmo.Control.getControl("#editGrid").refresh(true);
          if(confirm("저장 하시겠습니까?")){
        	  $.ajax({
	                url : "/calculate/saveUpdateMonError",
	                async : false, // 비동기모드 : true, 동기식모드 : false
	                type : 'POST',
	                contentType: 'application/json',
	                data: JSON.stringify(editRows),
	                success : function(result) {
	                    alert("저장되었습니다.");
	                    getMonErrorList();
	                },
	                error : function(request,status,error) {
	                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	                }
	            });
          }
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
         var item  = monExcelGrid.rows;
         var rows = [];
         var params;
         var bldgList = getBldgList();
         
         for(var i=0; i< item.length; i++){
        	 var value = wijmo.changeType(monExcelGrid.collectionView.items[i].월, wijmo.DataType.String, null);
             var dateRegExpMonth = /^(19|20)\d{2}-(0[1-9]|1[012])$/;
             if(!dateRegExpMonth.test(value)){
                 alert("월은 YYYY-MM 형태로 입력하시기 바랍니다.");
                 return false;
             }
             
             txt = wijmo.changeType(monExcelGrid.collectionView.items[i].건물코드, wijmo.DataType.String, null);
             if(!wijmo.isString(txt) || txt.length != 11){
                 alert("건물코드를 바르게 입력하시기 바랍니다.");
                 return false;
             }
             
             var bldgItem = bldgList.filter(item => item.id == monExcelGrid.collectionView.items[i].건물코드);
             if(bldgItem.length <= 0){
            	 alert("정산처리가 불가능한 건물이 존재합니다. - "+monExcelGrid.collectionView.items[i].건물코드);
                 return false;
             }
             
             value = wijmo.changeType(monExcelGrid.collectionView.items[i].추가금, wijmo.DataType.Number, null);
             if(value != null && value != '' && !wijmo.isNumber(value)){
                 alert("추가금은 숫자만 입력 가능합니다.");
                 return false;
             }
             
             value = wijmo.changeType(monExcelGrid.collectionView.items[i].추가입금, wijmo.DataType.Number, null);
             if(!wijmo.isNumber(value)){
                 alert("추가입금은 숫자만 입력 가능합니다.");
                 return false;
             }
             
             var dateRegExp = /^(19|20)\d{2}.(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[0-1])$/;
             value = wijmo.changeType(monExcelGrid.collectionView.items[i].입금날짜, wijmo.DataType.String, null);
             if(value != null && value != '' && !dateRegExp.test(value)){
                 alert("입금날짜는 YYYY.MM.DD 형태로 입력하시기 바랍니다.");
                 return false;
             }
         
             params={
            	 monMt :  monExcelGrid.collectionView.items[i].월
            	 , bldgCd : monExcelGrid.collectionView.items[i].건물코드
            	 , taxBill : monExcelGrid.collectionView.items[i].세금계산서
            	 , addCost : monExcelGrid.collectionView.items[i].추가금
            	 , depositCost : monExcelGrid.collectionView.items[i].추가입금
            	 , depositDt : monExcelGrid.collectionView.items[i].입금날짜
            	 , depositor : monExcelGrid.collectionView.items[i].입금자명
                 , memo : monExcelGrid.collectionView.items[i].비고
             }
             rows.push(params);
         }
         if(confirm("저장 하시겠습니까?")){
             $.ajax({
                 url : "/calculate/saveMonExcel",
                 async : false, // 비동기모드 : true, 동기식모드 : false
                 type : 'POST',
                 contentType: 'application/json',
                 data: JSON.stringify(rows),
                 success : function(result) {
                     alert("총 " + result + "건이 저장되었습니다.");
                     getMonList();
                 },
                 error : function(request,status,error) {
                     alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                 }
             });
         }
     }else if(type == 'monErrorExcel'){// 엑셀 업로드 저장하기
         var item  = monErrorExcelGrid.rows;
         var rows = [];
         var params;
         
         for(var i=0; i< item.length; i++){
             var dateRegExp = /^(19|20)\d{2}.(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[0-1])$/;
             var value = wijmo.changeType(monErrorExcelGrid.collectionView.items[i].입금날짜, wijmo.DataType.String, null);
             if(value != null && value != '' && !dateRegExp.test(value)){
                 alert("입금날짜는 YYYY.MM.DD 형태로 입력하시기 바랍니다.");
                 return false;
             }
        	 
        	 value = wijmo.changeType(monErrorExcelGrid.collectionView.items[i].입금금액, wijmo.DataType.Number, null);
             if(!wijmo.isNumber(value)){
                 alert("입금금액은 숫자만 입력 가능합니다.");
                 return false;
             }
             
             value = wijmo.changeType(monErrorExcelGrid.collectionView.items[i].입금자명, wijmo.DataType.String, null);
             if(value == null || value == ''){
                 alert("입금자명을 입력하시기 바랍니다.");
                 return false;
             }
         
             params={
            	 depositCost : monErrorExcelGrid.collectionView.items[i].입금금액
            	 , depositDt : monErrorExcelGrid.collectionView.items[i].입금날짜
            	 , depositor : monErrorExcelGrid.collectionView.items[i].입금자명
                 , memo : monErrorExcelGrid.collectionView.items[i].비고
             }
             rows.push(params);
         }
         if(confirm("저장 하시겠습니까?")){
             $.ajax({
                 url : "/calculate/saveMonErrorExcel",
                 async : false, // 비동기모드 : true, 동기식모드 : false
                 type : 'POST',
                 contentType: 'application/json',
                 data: JSON.stringify(rows),
                 success : function(result) {
                     alert("총 " + result + "건이 저장되었습니다.");
                     closePop(type);
                 },
                 error : function(request,status,error) {
                     alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                 }
             });
         }
     }else if(type == 'addExcel'){// 엑셀 업로드 저장하기
         var item  = addExcelGrid.rows;
         var rows = [];
         var params;
         var classifiL = getClassifiList('drop');
         var itemL = getItemList('drop');
         
         for(var i=0; i< item.length; i++){
        	 
        	 var classifiLItem = classifiL.filter(item => item.id == addExcelGrid.collectionView.items[i].분류);
             if(classifiLItem.length <= 0){
            	 alert("등록되지 않은 뷴류가 존재합니다. - "+addExcelGrid.collectionView.items[i].분류);
                 return false;
             }
             
             var itemLItem = itemL.filter(item => item.id == addExcelGrid.collectionView.items[i].내역);
             if(itemLItem.length <= 0){
            	 alert("등록되지 않은 내역이 존재합니다. - "+addExcelGrid.collectionView.items[i].내역);
                 return false;
                 
             }else if(itemLItem[0].classifiCd != addExcelGrid.collectionView.items[i].분류){
            	 alert("해당 분류에 존재하지 않는 내역입니다. - 분류 : "+addExcelGrid.collectionView.items[i].분류 +", 내역 : "+addExcelGrid.collectionView.items[i].내역);
                 return false;
             }
        	 
        	 var value = wijmo.changeType(addExcelGrid.collectionView.items[i].일자, wijmo.DataType.String, null);
             var dateRegExp = /^(19|20)\d{2}.(0[1-9]|1[012]).(0[1-9]|[12][0-9]|3[0-1])$/;
             if(!dateRegExp.test(value)){
                 alert("일자는 YYYY.MM.DD 형태로 입력하시기 바랍니다.");
                 return false;
             }
             
             value = wijmo.changeType(addExcelGrid.collectionView.items[i].입금날짜, wijmo.DataType.String, null);
             if(value != null && value != '' && !dateRegExp.test(value)){
                 alert("입금날짜는 YYYY.MM.DD 형태로 입력하시기 바랍니다.");
                 return false;
             }
        	 
             value = wijmo.changeType(addExcelGrid.collectionView.items[i].견적, wijmo.DataType.Number, null);
             if(!wijmo.isNumber(value)){
                 alert("견적은 숫자만 입력 가능합니다.");
                 return false;
             }
             
             value = wijmo.changeType(addExcelGrid.collectionView.items[i].재료비, wijmo.DataType.Number, null);
             if(!wijmo.isNumber(value)){
                 alert("재료비는 숫자만 입력 가능합니다.");
                 return false;
             }
             
             value = wijmo.changeType(addExcelGrid.collectionView.items[i].외주, wijmo.DataType.Number, null);
             if(!wijmo.isNumber(value)){
                 alert("외주는 숫자만 입력 가능합니다.");
                 return false;
             }
             
             value = wijmo.changeType(addExcelGrid.collectionView.items[i].입금, wijmo.DataType.Number, null);
             if(!wijmo.isNumber(value)){
                 alert("입금은 숫자만 입력 가능합니다.");
                 return false;
             }
             
             value = wijmo.changeType(addExcelGrid.collectionView.items[i].부가세, wijmo.DataType.Number, null);
             if(!wijmo.isNumber(value)){
                 alert("부가세는 숫자만 입력 가능합니다.");
                 return false;
             }
             
             value = addExcelGrid.collectionView.items[i].지역;
             if(value == null && value == ''){
                 alert("지역은 필수입력사항입니다.");
                 return false;
             }
             
             value = addExcelGrid.collectionView.items[i].건물;
             if(value == null && value == ''){
                 alert("건물은 필수입력사항입니다.");
                 return false;
             }
             
             value = addExcelGrid.collectionView.items[i].입금자명;
             if(value == null && value == ''){
                 alert("입금자명은 필수입력사항입니다.");
                 return false;
             }
             params={
            	 addDt :  addExcelGrid.collectionView.items[i].일자,
            	 classifiCd : addExcelGrid.collectionView.items[i].분류,
            	 itemCd : addExcelGrid.collectionView.items[i].내역,
            	 areaNm : addExcelGrid.collectionView.items[i].지역, 
            	 bldgNm : addExcelGrid.collectionView.items[i].건물, 
            	 quoteCost : addExcelGrid.collectionView.items[i].견적, 
            	 surtax : addExcelGrid.collectionView.items[i].부가세, 
            	 materCost : addExcelGrid.collectionView.items[i].재료비, 
            	 outscCost : addExcelGrid.collectionView.items[i].외주, 
            	 depositCost : addExcelGrid.collectionView.items[i].입금, 
            	 depositDt : addExcelGrid.collectionView.items[i].입금날짜, 
            	 depositor : addExcelGrid.collectionView.items[i].입금자명
             }
             rows.push(params);
         }
         if(confirm("저장 하시겠습니까?")){
             $.ajax({
                 url : "/calculate/saveAddExcel",
                 async : false, // 비동기모드 : true, 동기식모드 : false
                 type : 'POST',
                 contentType: 'application/json',
                 data: JSON.stringify(rows),
                 success : function(result) {
                     alert("총 " + result + "건이 저장되었습니다.");
                     getAddList();
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
		
	}else if(type == "monError"){
		if(item.depositCost == null || item.depositCost == ''){
			alert("입금금액을 입력해주세요.");
			return false;
			
		}else if(item.depositDt == null || item.depositDt == ''){
			alert("입금날짜를 입력해주세요.");
			return false;
			
		}else if(item.depositor == null || item.depositor == ''){
			alert("입금자명을 입력해주세요.");
			return false;
		}
		
	}else if(type == "add"){
		
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
		}else if(item.depositCost != null && item.depositCost != ''){
			if(item.depositDt == null || item.depositDt == ''){
				alert("입금날짜를 입력해주세요.");
				return false;
			}else if(item.depositor == null || item.depositor == ''){
				alert("입금자명을 입력해주세요.");
				return false;
			}
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
        		   var classifi = [];
        		   if(result.length > 0){
	                   	for(var i =0; i<result.length; i++){
	                   		classifi[i] = { id: result[i].classifiCd, name: result[i].classifiNm };	
	                   	}
                   }else{
                	   classifi[0] = { id: null, name: null };	
                   }
        		   returnVal = classifi;
        		   
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
        		   if(result.length > 0){
		               for(var i =0; i<result.length; i++){
		            	   item[i] = { id: result[i].itemCd, name: result[i].itemNm, classifiCd: result[i].classifiCd };	
		               }
        		   }else{
        			   item[0] = { id: null, name: null, classifiCd: null };
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
                }else{
                	bldg[0] = { id: null, name: null,  areaCd: null,  areaNm: null, zone: null };	
                }
                returnVal = bldg;
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
	
	}else if(pop == "pop_sendMsgUpdate"){
		getMsgTemplate();
		
	}else if(pop == "add_monError"){
		$("#monErrorGrid").show();
		$("#monErrorGridPager").show();
		$("#saveMonErrorTop").show();
		$("#saveMonErrorBottom").show();
		$("#saveMonErrorTopDelete").show();
		$("#saveMonErrorBottomDelete").show();
		 
	    $("#monErrorExcelGrid").hide();
		$("#saveMonErrorTopExcel").hide();
		$("#saveMonErrorBottomExcel").hide();
		
		getMonErrorList();
	
	}else if(pop == "add_monErrorExcel"){
		pop = "add_monError";
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

function exportExcel(type){
	if(type == 'mon'){
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
		
	}else if(type == 'add'){
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
    
    var win = window.open("/calculate/getPopSpecification?bldgNm="+bldgNm+"&addMt="+$('#date2').val(), "pop", "width=830,height=630");
}

function downTemplate(type){
    if(type == 'mon'){
    	window.location.assign("<%=request.getContextPath()%>" + "/template/월관리청소양식.xlsx");
    	
	}else if(type == 'monError'){
    	window.location.assign("<%=request.getContextPath()%>" + "/template/오입금양식.xlsx");
    	
	}else if(type == 'add'){
		window.location.assign("<%=request.getContextPath()%>" + "/template/부가수익양식.xlsx");
	}
}

//업로드 파일 찾기
function findFile(type){
	if(type == 'mon'){
		$("#monImportFile").val("");
	    document.all.monImportFile.click();
	    
	}else if(type == 'add'){
		$("#addImportFile").val("");
	    document.all.addImportFile.click();	
	
	}else if(type == 'monError'){
		$("#monErrorImportFile").val("");
	    document.all.monErrorImportFile.click();	
	}
}

//엑셀 업로드
function importExcel(type){
	if(type == 'mon'){
		$("#monDiv").hide();
		$("#saveMonTop").hide();
		$("#saveMonBottom").hide();
		 
	    $("#monExcelDiv").show();
		$("#saveMonTopExcel").show();
		$("#saveMonBottomExcel").show();
	   	monView = new wijmo.collections.CollectionView(null, {
	            pageSize: 999
	    });
	        var inputEle =  document.querySelector('#monImportFile');
	        if (inputEle.files[0]) {
	            wijmo.grid.xlsx.FlexGridXlsxConverter.loadAsync(monExcelGrid, inputEle.files[0],{includeColumnHeaders: true}, (w) => {
	        // 데이터 바인딩할 함수 호출
	        bindImportedDataIntoModel(monExcelGrid);
	        monExcelGrid.columns.forEach(col => {
	          col.width = 120,
	          col.align = "center"
	        })
	      });
	    }
	        
	}else if(type == 'monError'){
		showPop('add_monErrorExcel');
		
		$("#monErrorGrid").hide();
		$("#monErrorGridPager").hide();
		$("#saveMonErrorTop").hide();
		$("#saveMonErrorBottom").hide();
		$("#saveMonErrorTopDelete").hide();
		$("#saveMonErrorBottomDelete").hide();
	                                                                                                                                                                  	 
	    $("#monErrorExcelGrid").show();
		$("#saveMonErrorTopExcel").show();
		$("#saveMonErrorBottomExcel").show();
	   	monView = new wijmo.collections.CollectionView(null, {});
	        var inputEle =  document.querySelector('#monErrorImportFile');
	        if (inputEle.files[0]) {
	            wijmo.grid.xlsx.FlexGridXlsxConverter.loadAsync(monErrorExcelGrid, inputEle.files[0],{includeColumnHeaders: true}, (w) => {
	        // 데이터 바인딩할 함수 호출
	        bindImportedDataIntoModel(monErrorExcelGrid);
	        monErrorExcelGrid.columns.forEach(col => {
	          col.width = 200,
	          col.align = "center"
	        })
	      });
	    } 
	        
	}else if(type == 'add'){
		$("#addDiv").hide();
		$("#saveAddTop").hide();
		$("#saveAddBottom").hide();
		$("#saveAddTopDelete").hide();
		$("#saveAddBottomDelete").hide();
		 
	    $("#addExcelDiv").show();
		$("#saveAddTopExcel").show();
		$("#saveAddBottomExcel").show();
	    addView = new wijmo.collections.CollectionView(null, {
	            pageSize: 999
	    });
	    var inputEle =  document.querySelector('#addImportFile');
	    if (inputEle.files[0]) {
	        wijmo.grid.xlsx.FlexGridXlsxConverter.loadAsync(addExcelGrid, inputEle.files[0],{includeColumnHeaders: true}, (w) => {
	        // 데이터 바인딩할 함수 호출
	        bindImportedDataIntoModel(addExcelGrid);
	        addExcelGrid.columns.forEach(col => {
	          col.width = 120,
	          col.align = "center"
	        })
	      });
	    }
         // 체크박스 생성
        addExcelSelector = new wijmo.grid.selector.Selector(addExcelGrid);
        addExcelSelector.column = addExcelGrid.columns[0];	
	}
}

//알리미톡
function getMsgremainCash(){
	
	var param = {
			api_key : "DCTMVYLLNTM0621"
		};

	$.ajax({
        url : "/calculate/remainCash",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        data: param,
        dataType:'json',
        success : function(result) {
            var rVal = result;
            $("#msgRemainCash").text(Number(rVal.remainCash).toLocaleString('ko-KR')+ "원");
        },
        error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
	});  
	
}

function getMsgTemplate(){
	$.ajax({
        url : "/calculate/getMsgTemplate",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        success : function(result) {
            if(result.length > 0){
            	$("#msgUpdate").val(result[0].nm);
            }
        },
        error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
	});
}

function saveMsgTemplate(){
	var param = {
		nm : $("#msgUpdate").val()
	};
	
	$.ajax({
        url : "/calculate/saveMsgTemplate",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        data : param,
        success : function(result) {
            alert("발신메세지가 수정되었습니다.");
            closePop();
        },
        error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
	}); 
}

function sendMsg(){
	var param;
	var msg;
	var conCost;
	var addCost;
	var totalCost;
	var msgError = "[ 발신메세지 오류 내역 ]\n세부오류는 http://www.alimtalkme.com 의 <발송 및 예약 내역> 메뉴에서 확인 할 수 있습니다.\n\n";
	var msgErrorFlag = false;
	var msgSuccess = 0;
	
	var item = monGrid.rows.filter(r => r.isSelected);
	if(item.length == 0){
        alert("선택된 행이 없습니다.");
        return false;
        
    }else{
    	//문자발송 시작
    	for(var i =0; i< item.length; i++){
    		conCost = (Number((item[i].dataItem.conCost == null ? 0 : item[i].dataItem.conCost))
						+ Number((item[i].dataItem.surtax == null ? 0 : item[i].dataItem.surtax))
					  ).toLocaleString('ko-KR');
    		
    		addCost = Number((item[i].dataItem.addCost == null ? 0 : item[i].dataItem.addCost)).toLocaleString('ko-KR');
    		
    		totalCost = (Number((item[i].dataItem.conCost == null ? 0 : item[i].dataItem.conCost))
						  + Number((item[i].dataItem.surtax == null ? 0 : item[i].dataItem.surtax))
						  + Number((item[i].dataItem.addCost == null ? 0 : item[i].dataItem.addCost))
						  + Number((item[i].dataItem.overCost == null ? 0 : item[i].dataItem.overCost)) //이월금
						).toLocaleString('ko-KR');
    		
    		
    		msg = "[ "+item[i].dataItem.bldgNm+" ]\n"
    			  +"월관리비 "+conCost.toLocaleString('ko-KR')+"원\n"
    			  +"추가금액 "+addCost+"원\n"
    			  +"총 "+totalCost+"원\n\n"
    			  +$("#msgUpdate").val();
    			  
    		//msg = "test";	  
    		
    		param = {
    				api_key : "DCTMVYLLNTM0621"
        			, msg : msg
        			, subject : "[청춘클린 "+item[i].dataItem.monMt+"월 정산 안내]"	//lms 제목
        			, callback : "01058743499"							//-를 제외한 발신번호 
        			, dstaddr : item[i].dataItem.pnum					// -를 제외한 수신번호
        			, send_reserve : 0 									//즉시발송 0, 예약발송 1
        		};
    		
         	$.ajax({
                url : "/calculate/sendMsg",
                async : false, // 비동기모드 : true, 동기식모드 : false
                type : 'POST',
                data: param,
                dataType:'json',
                success : function(result) {
                	
                	if(result.result == "100"){
                		msgSuccess += 1;
                	}else{
                		msgError += item[i].dataItem.bldgNm+" :"+result.result;
                        msgErrorFlag = true;
                	}
                },
                error : function(request,status,error) {
                    console.log("code:"+request.result+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
        	}); 
        }
    	
    	if(msgErrorFlag){
    		alert(msgError);
    	}else{
    		alert(msgSuccess+"건의 문자발송이 완료되었습니다.");
    	}
    	
    }
}


//이벤트 처리 
$(function(){
    $("#monImportFile").on('change', function (params) {
        importExcel('mon');
    });
    
    $("#monErrorImportFile").on('change', function (params) {
        importExcel('monError');
    });
    
    $("#addImportFile").on('change', function (params) {
        importExcel('add');
    });
});

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
                        <dl style="display:none;">
                            <dt>총 입금금액</dt>
                            <dd id="totalDepositcost">0원</dd>
                        </dl>
                        <dl style="display:none;">
                            <dt>총 추가금</dt>
                            <dd id="totalAddcost">0원</dd>
                        </dl>
                        <dl>
                            <dt>오입금 금액</dt>
                            <dd id="totalErrorCost">0원</dd>
                        </dl>
                        <dl>
                            <dt>오입금 수</dt>
                            <dd id="totalErrorCount">0개</dd>
                        </dl>
                        <dl>
                            <dt>문자 잔액</dt>
                            <dd id="msgRemainCash">0원</dd>
                        </dl>
                    </div>
                    <div class="admin_utility">
                        <label for="date">조회월</label>
                        <input type="month" id="date" onfocusout="_fnisMonth(this.value, this.id)" onkeyup="enterkey('mon');">
                        <button class="admin_utility_btn"  onClick="getMonList();">조회</button>
                        <button class="admin_utility_btn" onClick="showPop('add_monError');">오입금 내역</button>
                        <div class="admin_btn">
                        	<input type="file" class="form-control" style="display:none" id="monImportFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12" />
                        	<input type="file" class="form-control" style="display:none" id="monErrorImportFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12" />
                        	
                        	<button class="btn" onClick="downTemplate('monError');">오입금 엑셀 템플릿</button>
                        	<button class="btn" onClick="findFile('monError');">오입금 업로드</button>
                        	<button class="btn" onClick="downTemplate('mon');">엑셀 템플릿</button>
                            <button class="btn" onClick="findFile('mon');">엑셀 업로드</button>
                            <button class="btn" onClick="exportExcel('mon');">엑셀 다운로드</button>
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
                                    <option value="building">건물명</option>
                                    <option value="depositor">입금자명</option>
                                </select>
                                <label for="inq"></label>
                                <input type="text" id="inq" placeholder=",로 다중검색 가능" onkeyup="enterkey('mon');">
                                <button type="button" onClick="getMonList();">조회</button>
                            </form>
                            <div class="summary">
                                <dl>
                                    <dt>미입금 수</dt>
                                    <dd id="lableNoneCount">0원</dd>
                                </dl>
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
                                <button type="button" onClick="showPop('pop_sendMsgUpdate');">문구수정</button>
                                <button type="button" onClick="sendMsg();">문자발송</button>
                                <button type="button" id="saveMonTop" onClick="saveGrid('mon')">저장</button>
                                <button type="button" id="saveMonTopExcel" onClick="saveGrid('monExcel')">저장</button>
                            </div>
                            <div class="grid_wrap" id="monDiv" style="position:relative;">
                                <div id="monGrid"  style="height:500px;"></div>
                        		<div id="monGridPager" class="pager"></div>
                            </div>
	                        <div class="grid_wrap" id="monExcelDiv" style="position:relative;">
	                        	<div id="monExcelGrid"  style="height:500px;"></div>
	                        </div>
                            <div class="btn_wrap">
                                <button type="button" class="stroke"  onClick="_getUserGridLayout('monLayout', monGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('monLayout', monGrid, monColumns);">칼럼초기화</button>
                                <button type="button" onClick="showPop('pop_sendMsgUpdate');">문구수정</button>
                                <button type="button" onClick="sendMsg();">문자발송</button>
                                <button type="button" id="saveMonBottom" onClick="saveGrid('mon')">저장</button>
                                <button type="button" id="saveMonBottomExcel" onClick="saveGrid('monExcel')">저장</button>
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
                            <input type="file" class="form-control" style="display:none" id="addImportFile" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12" />
                            <button class="btn" onClick="popSpecification();">거래명세서 출력</button>
                        	<button class="btn" onClick="downTemplate('add');">엑셀 템플릿</button>
                            <button class="btn" onClick="findFile('add');">엑셀 업로드</button>
                            <button class="btn" onClick="exportExcel('add');">엑셀 다운로드</button>
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
                                <button type="button" id="saveAddTop" onClick="saveGrid('add')">저장</button>
                                <button type="button" id="saveAddTopExcel" onClick="saveGrid('addExcel')">저장</button>
                                <button type="button" id="saveAddTopDelete" onclick="deleteRows('add')">삭제</button>
                            </div>
                            <div class="grid_wrap" id="addDiv" style="position:relative;">
                                <div id="addGrid"  style="height:500px;"></div>
                        		<div id="addGridPager" class="pager"></div>
                            </div>
	                        <div class="grid_wrap" id="addExcelDiv" style="position:relative;">
	                        	<div id="addExcelGrid"  style="height:500px;"></div>
	                        </div>
                            <div class="btn_wrap">
                                <button type="button" class="stroke" onClick="_getUserGridLayout('addLayout', addGrid);">칼럼위치저장</button>
                                <button type="button" class="stroke" onClick="_resetUserGridLayout('addLayout', addGrid, addColumns);">칼럼초기화</button>
                                <button type="button" id="saveAddBottom" onClick="saveGrid('add')">저장</button>
                                <button type="button" id="saveAddBottomExcel" onClick="saveGrid('addExcel')">저장</button>
                            	<button type="button" id="saveAddBottomDelete" onclick="deleteRows('add')">삭제</button>
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
                    <div id="classifiGrid" style="width:860px; height:300px;"></div>
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
                    <div id="itemGrid" style="width:860px; height:300px;"></div>
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
    <!--내역생성 팝업 영역 끝 -->
    
    <!-- 팝업 : 문자수정 -->
    <div class="popup" id="pop_sendMsgUpdate">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">발신메세지 수정</p>
                <button type="button" class="popup_close" onClick="closePop('sendMsgUpdate');">x</button>
            </div>
            <div class="popup_inner">
            	<div class="row">
                    <label for="msgFix" style="vertical-align:top;">고정</label>
                    <textarea name="msgFix" id="msgFix" cols="60" rows="10" readonly>
[ 건물명 ] 
월관리비 000원
추가금액 000원
총 000원</textarea>
                </div>
                <div class="row">
                    <label for="msgUpdate" style="vertical-align:top;">수정</label>
                    <textarea name="msgUpdate" id="msgUpdate" cols="60" rows="10"></textarea>
                </div>
                <div class="popup_btn_area">
	                <div class="right">
	                    <button type="button" class="popup_btn" onclick="saveMsgTemplate();">문구수정</button>
	                </div>
	            </div>
            </div>
        </div>
    </div>
    <!--문자수정 팝업 영역 끝 -->
        <!-- 팝업 : 오입금내역 -->
    <div class="popup" id="add_monError">
        <div class="popup_container" style="min-height:100px;">
            <div class="popup_head">
                <p class="popup_title">오입금내역</p>
                <button type="button" class="popup_close" onClick="closePop('sendMsgUpdate');">x</button>
            </div>
            <div class="popup_grid">
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn" id="saveMonErrorTop" onClick="saveGrid('monError')">저장</button>
	                    <button type="button" class="popup_btn" id="saveMonErrorTopDelete" onclick="deleteRows('monError')">삭제</button>
                        <button type="button" class="popup_btn" id="saveMonErrorTopExcel" onClick="saveGrid('monErrorExcel')">저장</button>
                    </div>
                </div>
                <div class="popup_grid_area">
                    <div class="popup_grid">
	                    <div id="monErrorGrid" style="width:860px;  height:300px;"></div>
	                    <div id="monErrorGridPager" class="pager"></div>
	                    <div id="monErrorExcelGrid" style="width:860px;" style="display:none;"></div>
                    </div>
                </div>
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn" id="saveMonErrorBottom" onClick="saveGrid('monError')">저장</button>
	                    <button type="button" class="popup_btn" id="saveMonErrorBottomDelete" onclick="deleteRows('monError')">삭제</button>
                        <button type="button" class="popup_btn" id="saveMonErrorBottomExcel" onClick="saveGrid('monErrorExcel')">저장</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--오입금내역 팝업 영역 끝 -->
    
    <!-- 추가된 행 / 수정된 행 처리용 그리드 -->
    <div class="grid_wrap" id="editDiv" style="display:none;">
        <div id="editGrid"  style="height:500px;"></div>
    </div>
</body>
</html>