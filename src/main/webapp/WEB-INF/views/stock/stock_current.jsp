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
var itemList;
var lCategyList;
var classifiList;

var staffId = "<%=session.getAttribute("staffId")%>";

function pageLoad(){
	sessionCheck(staffId);
	
	$('#stock').addClass("current");
	$('#stock_current').addClass("current");
	
	
	var fromDate = new Date()
	fromDate.setDate(fromDate.getDate() - 7);
	var fromday = _getFormatDate(fromDate);
	var today = _getFormatDate(new Date());
	$('#fromDate').val(fromday);
	$('#toDate').val(today);
	$('#fromDate').attr('max',today);
	$('#toDate').attr('max',today);
	
	loadGridCurrentList('init');
	getCurrentList();
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
		   
		   console.log(getCategoryList());
		   
		   lCategyList = new wijmo.grid.DataMap(getCategoryList(), 'id', 'name');
		   classifiList = new wijmo.grid.DataMap(getClassifiList(), 'id', 'name');
		   itemList = new wijmo.grid.DataMap(getItemList(), 'id', 'name');
		   itemList.getDisplayValues = function (dataItem) {
			    let validItem = getItemList().filter(itemCd => itemCd.lCategyCd == dataItem.lCategyCd);
			    return validItem.map(itemCd => itemCd.name);
			}; 
		    
		   currentColumns = [
			      { isReadOnly: true, width: 35, align:"center"},
			      { binding: 'cateSarSeq', header: '?????????', isReadOnly: true, width: 0, align:"center", visible: false },
			      { binding: 'cretDt', header: '??????', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'cretNm', header: '?????????', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'classifiCd', header: '??????', isReadOnly: false, width: 200, align:"center", dataMap: classifiList, dataMapEditor: 'DropDownList' },
			      { binding: 'lCategyCd', header: '????????????', isReadOnly: false, width: 200, align:"center", dataMap: lCategyList, dataMapEditor: 'DropDownList' },
			      { binding: 'itemCd', header: '??????', isReadOnly: false, width: 200, align:"center", dataMap: itemList, dataMapEditor: 'DropDownList'},
			      { binding: 'cost', header: '??????', isReadOnly: true, width: 200, align:"center" },
			      { binding: 'sarQuantity', header: '???????????????', isReadOnly: false, width: 120, align:"center"},
			      { binding: 'quantity', header: '????????????', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'returnQuantity', header: '????????????', isReadOnly: false, width: 120, align:"center" },
			      { binding: 'activeYn', header: '???????????????????????????', isReadOnly: false, visible : false, width: 120, align:"center" },
			      { binding: 'updtDt', header: '????????????', isReadOnly: true, width: 100, align:"center" }
			];
			 
		   
		   currentGrid = new wijmo.grid.FlexGrid('#currentGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: currentColumns,
			    itemsSource: currentView,
			    formatItem:function(s,e){
			    	if((e.panel.cellType==1)&&(s.activeEditor)){
			        	if((s.editRange.row==e.row)&&(s.editRange.col==e.col)){
			          	return;
			          }
			        }
			    	
			    	if (e.panel == s.cells) {
			            var col = s.columns[e.col];
		                if (col.binding == 'sarQuantity' || col.binding == 'returnQuantity') {
		                    //??? ??????
		                    var html;
		                    var value = s.getCellData(e.row, e.col);
		                    var classifiCd = s.getCellData(e.row, 'classifiCd');

		                   if(value != undefined && value != null && value > 0){
		                    	if(classifiCd == "S" || classifiCd == "RS"){
			                    	html = '+'+value;
			                        wijmo.addClass(e.cell, "change_plus");
			                    	
			                    }else if(classifiCd == "R" || classifiCd == "RR"){
			                    	html = -value;
			                        wijmo.addClass(e.cell, "change_minus");
			                    }
			                    e.cell.textContent = html;           	
		                    }       
		                }
		            }
			      },
			      beginningEdit: function (s, e) {
		                var col = s.columns[e.col];
		                var item = s.rows[e.row].dataItem;
		                if(item.updtDt != undefined){
		                    if (col.binding == 'classifiCd' || col.binding == 'lCategyCd' || col.binding == 'itemCd' ) {
		                        e.cancel = true;
		                        alert("?????? ???????????? ????????? ???????????????.");
		                    }
		                }
		                
		                if (col.binding == 'sarQuantity') {
		                	if(item.activeYn == 'N'){
		                		e.cancel = true;
		                		alert("?????? ????????? ????????? ??????(?????? ????????????)?????? ????????? ??????????????????.");
		                	}else{
		                		classifiCd = s.getCellData(e.row, 'classifiCd');
			                	if(classifiCd == "RS" || classifiCd == "RR"){
			                		e.cancel = true;
			                		alert("????????? ??????/????????? ???????????? ?????? ???????????????.");
			                	}
		                	}
		                	
		                }else if(col.binding == 'returnQuantity'){
		                	if(item.activeYn == 'N'){
		                		e.cancel = true;
		                		alert("?????? ??? ????????? ????????? ????????? ??????????????????.");
		                	}else{
		                		classifiCd = s.getCellData(e.row, 'classifiCd');
			                	if(classifiCd == "S" || classifiCd == "R"){
			                		e.cancel = true;
			                		alert("????????? ????????????/??????????????? ???????????? ?????? ???????????????.");
			                	}
		                	}
		                	
		                }
		            },
		            cellEditEnding: (s, e) => {
		                let col = s.columns[e.col];
		                let value = s.activeEditor.value;
		                if (col.binding == 'itemCd') {
		                  var item = getItemList().filter(item => item.name == value);
		                  s.setCellData(e.row, 'cost', item[0].cost);
		                  s.setCellData(e.row, 'quantity', item[0].quantity);
		               
		                }else if(col.binding == 'sarQuantity' || col.binding == 'returnQuantity'){
		                	//???????????? ??????
		                	var formatValue = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
		                    if( !wijmo.isNumber(formatValue)){
		                        e.cancel = true;
		                        e.stayInEditMode = false;
		                        alert('???????????? ?????? ???????????????.');
		                        return false;
		                    }
		                	
		                    //???????????? ??????
		                    var quantity = s.getCellData(e.row, 'quantity');
		                	if(classifiCd == "S" || classifiCd == "RS"){
		                		if(s.getCellData(e.row, e.col) != '' && s.getCellData(e.row, e.col) != null){
		                			s.setCellData(e.row, 'quantity', Number(quantity) - s.getCellData(e.row, e.col) + Number(value));
		                			
		                		}else{
		                			s.setCellData(e.row, 'quantity', Number(quantity) + Number(value));
		                			
		                		}
		                		
		                    }else if(classifiCd == "R" || classifiCd == "RR"){
		                    	if(s.getCellData(e.row, e.col) != '' && s.getCellData(e.row, e.col) != null){
		                    		s.setCellData(e.row, 'quantity', Number(quantity) + s.getCellData(e.row, e.col) - Number(value));
		                			
		                		}else{
		                			s.setCellData(e.row, 'quantity', Number(quantity) - Number(value));
		                			
		                		}
		                    }
		                	
		                //???????????? ????????? ?????? ??? ?????????
		                }else if(col.binding == 'lCategyCd'){
		                	e.getRow().dataItem.itemCd = '';
		                	e.getRow().dataItem.cost = '';
		                	e.getRow().dataItem.sarQuantity = '';
		                	e.getRow().dataItem.returnQuantity = '';
		                	e.getRow().dataItem.quantity = '';
		                }
		              }
			  });
		   /*
		   currentGrid.formatItem.addHandler(function (s, e) {
			   if (e.panel == s.cells) {
		            var col = s.columns[e.col];
	                if (col.binding == 'sarQuantity' || col.binding == 'returnQuantity') {
	                    //??? ??????
	                    var html;
	                    var value = s.getCellData(e.row, e.col);
	                    console.log(value);
	                    var classifiCd = s.getCellData(e.row, 'classifiCd');
	                    
	                    if(value != undefined && value != null && value > 0){
	                    	if(classifiCd == "S" || classifiCd == "RS"){
		                    	html = '<span class="change_plus">+'+value+'</span>';
		                    }else if(classifiCd == "R" || classifiCd == "RR"){
		                    	html = '<span class="change_minus">-'+value+'</span>';
		                    }
		                    e.cell.innerHTML = html;           	
	                    }      
	                }
	            }
	        }); */
		   	
		   	//?????????
		   	currentGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };
	    
	        editGrid = new wijmo.grid.FlexGrid('#editGrid', {
	            itemsSource: currentView.itemsEdited,
	            isReadOnly: true
	        });
	        
	        _setUserGridLayout('currentLayout', currentGrid, currentColumns);
	        
	    	// ???????????? ??????
	     	currentSelector = new wijmo.grid.selector.Selector(currentGrid);
	     	currentSelector.column = currentGrid.columns[0];
	     	new wijmo.grid.filter.FlexGridFilter(currentGrid);
			  
	  }else{		  
		   currentView = new wijmo.collections.CollectionView(result, {
		       pageSize: Number($('#currentGridPageCount').val()),
		       trackChanges: true
		   });
		  currentGridPager.cv = currentView;
		  currentGrid.itemsSource = currentView;
	  }
	  
	  refreshPaging(currentGrid.collectionView.totalItemCount, 1, currentGrid, 'currentGrid');  // ????????? ?????? ??????
	  
}

//???????????? ???????????? ????????????
function getCategoryList() {
	var returnVal;
	
    $.ajax({
            url : "/stock/getLCategoryList",
            async : false, // ??????????????? : true, ??????????????? : false
            type : 'POST',
            success : function(result) {
            	var gategory = [];
                if(result.length > 0){
                	
                	for(var i =0; i<result.length; i++){
                		gategory[i] = { id: result[i].lCategyCd, name: result[i].lCategyNm };	
                	}
                	
                }else{
                	gategory[0] = { id: null, name: null };	
                }
                returnVal = gategory;
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
    
    return returnVal;
}

//????????? ???????????? ????????????
function getItemList() {
	var returnVal;
	
    $.ajax({
            url : "/stock/getItemList",
            async : false, // ??????????????? : true, ??????????????? : false
            type : 'POST',
            success : function(result) {
            	var item = [];
                if(result.length > 0){
                	
                	for(var i =0; i<result.length; i++){
                		item[i] = { id: result[i].itemCd
                				, name: result[i].itemNm
                				, lCategyCd: result[i].lCategyCd
                				, cost: result[i].cost
                				, quantity: result[i].quantity };	
                	}
                	
                }else{
                	item[0] = { id: null
            				, name: null
            				, lCategyCd: null
            				, cost: null
            				, quantity: null };	
                }
                returnVal = item;
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
    
    return returnVal;
}

//?????? ???????????? ????????????
function getClassifiList() {
	var returnVal;
	
    $.ajax({
            url : "/stock/getClassifiList",
            async : false, // ??????????????? : true, ??????????????? : false
            type : 'POST',
            success : function(result) {
            	var classifi = [];
                if(result.length > 0){
                	
                	for(var i =0; i<result.length; i++){
                		classifi[i] = { id: result[i].cd, name: result[i].nm };	
                	}
                	
                }else{
                	classifi[0] = { id: null, name: null };	
                }
                returnVal = classifi;
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

    //?????? ???????????? ?????????????????? ???????????? ????????? ?????? > ?????? ?????? > ????????? ????????? ????????? ???.
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

//?????????
function addRow(){
	currentGrid.allowAddNew = true;
}

function deleteRows(){
    var item = currentGrid.rows.filter(r => r.isSelected); 
    var rows = [];
    var params;
    if(item.length == 0){
        alert("????????? ?????? ????????????.");
        return false;
    }else{
        for(var i =0; i< item.length ; i++){
            rows.push(item[i].dataItem);
        }
        if(confirm("????????? ????????? ?????? ????????????????????")){
            $.ajax({
                url : "/stock/deleteStockCurrent",
                async : false, // ??????????????? : true, ??????????????? : false
                type : 'POST',
                contentType: 'application/json',
                data: JSON.stringify(rows),
                success : function(result) {
                    alert("?????????????????????.");
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
    var addItem  = currentView.itemsAdded;
    var editItem = currentView.itemsEdited;
    var addRows = [];
	var editRows = [];
	var rows = [];
	
	console.log("saveGrid");
	console.log(addItem);
	console.log(editItem);

    for(var i=0; i< addItem.length; i++){
    	if(!saveVal(addItem[i])) return false;
    	
    	addRows.push(addItem[i]);
    	rows.push(addItem[i]);
    }
	
	for(var i =0; i< editItem.length; i++){
		if(!saveVal(editItem[i])) return false;
		
    	editRows.push(editItem[i]);
    	rows.push(editItem[i]);
    }
	
	console.log(rows);
    
	wijmo.Control.getControl("#editGrid").refresh(true);
    if(confirm("????????? ????????? ?????? ????????????????????")){
    	$.ajax({
            url : "/stock/saveStockCurrentQuantity",
            async : false, // ??????????????? : true, ??????????????? : false
            type : 'POST',
            contentType: 'application/json',
            data: JSON.stringify(rows),
            success : function(result) {
            	console.log('saveStockCurrentQuantity');
            	console.log(rows);
            	insertUpdateGrid(addRows, editRows);
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    }
}

function saveVal(item){
	if(item.classifiCd == null || item.classifiCd == ''){
		alert("????????? ??????????????????.");
		return false;
	
	}else if(item.lCategyCd == null || item.lCategyCd == ''){
		alert("??????????????? ??????????????????.");
		return false;
		
	}else if(item.itemCd == null || item.itemCd == ''){
		alert("????????? ??????????????????.");
		return false;
		
	}else if((item.returnQuantity == null || item.returnQuantity == '') && (item.sarQuantity == null || item.sarQuantity == '') ){
		alert("????????? ??????????????????.");
		return false;
		
	}
	
	return true;
}

function insertUpdateGrid(addRows, editRows){
    $.ajax({
        url : "/stock/saveStockCurrent",
        async : false, // ??????????????? : true, ??????????????? : false
        type : 'POST',
        contentType: 'application/json',
        data: JSON.stringify(addRows),
        success : function(result) {
           	console.log('saveStockCurrent');
           	console.log(addRows);
            saveUpdateGrid(editRows);
        },
        error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

function saveUpdateGrid(editRows){
	$.ajax({
        url : "/stock/saveUpdateStockCurrent",
        async : false, // ??????????????? : true, ??????????????? : false
        type : 'POST',
        contentType: 'application/json',
        data: JSON.stringify(editRows),
        success : function(result) {
        	console.log('saveUpdateStockCurrent');
        	console.log(editRows);
            alert("?????????????????????.");
            getCurrentList();
        },
        error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        

        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">????????????</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>?????? ????????????</dt>
                        <dd><%=request.getAttribute("todayStore")%>???</dd>
                    </dl>
                    <dl>
                        <dt>?????? ????????????</dt>
                        <dd><%=request.getAttribute("todayRelease")%>???</dd>
                    </dl>
                    <dl>
                        <dt>?????? ??????????????????</dt>
                        <dd><%=request.getAttribute("todayReturnStore")%>???</dd>
                    </dl>
                    <dl>
                        <dt>?????? ??????????????????</dt>
                        <dd><%=request.getAttribute("todayReturnRelease")%>???</dd>
                    </dl>
                </div>
                <div class="admin_utility">
                    <form action="#" method="post" onsubmit="return false;">
                        <label for>?????????</label>
                         <input type="date" id="fromDate" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey();">
                        -
                        <input type="date" id="toDate" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey();">
                        <button type="button" class="admin_utility_btn" onClick="getCurrentList();">??????</button>
                    </form>
                    <div class="admin_btn">
                        <button class="btn" onClick="exportExcel();">?????? ????????????</button>
                    </div>
                </div>
                <div class="admin_content">
                    <!-- ?????? ?????? admin_filter-->
                    <div class="admin_filter">
                        <form action="#" id="search_form" name="search_form" onsubmit="return false;">
                            <label for="con">????????????</label>
                            <select name="con" id="con">
                                <option value="all" selected="selected">??????</option>
                                <option value="category">???????????????</option>
                                <option value="product">?????????</option>
                                <option value="person">?????????</option>
                            </select>
                            <label for="inq"></label>
                            <input type="text" id="inq" placeholder=",??? ???????????? ??????"  onkeyup="enterkey();">
                            <button type="button" onClick="getCurrentList();">??????</button>
                        </form>
                    </div>
                    <!-- ?????? ?????? admin_dashboard-->
                    <div class="admin_dashboard">
                    	<select id="currentGridPageCount" onchange="getCurrentList()" class="left">
							<option value="30">30</option>
							<option value="50">50</option>
							<option value="100" selected="selected">100</option>
						</select>
                    	<button type="button" class="stroke left" onClick="addRow()">+ ????????????</button>
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('currentLayout', currentGrid);">??????????????????</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('currentLayout', currentGrid, currentColumns);">???????????????</button>
                        	<button type="button" onclick="saveGrid()">??????</button>
                            <button type="button" onclick="deleteRows()">??????</button>
                        </div>
                        <div class="grid_wrap">
                        	<div id="currentGrid"></div>
                        	<div id="currentGridPager" class="pager"></div>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('currentLayout', currentGrid);">??????????????????</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('currentLayout', currentGrid, currentColumns);">???????????????</button>
                        	<button type="button" onclick="saveGrid()">??????</button>
                            <button type="button" onclick="deleteRows()">??????</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <div class="grid_wrap" id="addDiv" style="display:none;">
        <div id="addGrid" ></div>
    </div>
    <div class="grid_wrap" id="editDiv" style="display:none;">
        <div id="editGrid" ></div>
    </div>
</body>
</html>