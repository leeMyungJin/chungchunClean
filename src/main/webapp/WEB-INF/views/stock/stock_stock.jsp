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
var excelGrid;
var excelView;
var excelGridPager;

function pageLoad(){
	$('#stock').addClass("current");
	$('#stock_stock').addClass("current");
    $("#essesntail").attr("checked",true);
    loadGridStockList('init');
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
                { binding: 'status', header: '상태', isReadOnly: true, width: 60, align:"center"},
                { binding: 'lCategyCd', header: '대카테고리코드', isReadOnly: true, visible: false, width: 200, align:"center"},
                { binding: 'lCategyNm', header: '대카테고리명', isReadOnly: true, width: 230, align:"center"},
                { binding: 'itemNm', header: '물품명', isReadOnly: true, width: 230, align:"center"  },
                { binding: 'itemCd', header: '코드번호', isReadOnly: true, width: 200, align:"center"},
                { binding: 'cost', header: '원가', isReadOnly: true, width: 200, align:"center"},
                { binding: 'quantity', header: '재고수량', isReadOnly: true, width: 200, align:"center"},
                { binding: 'add', header: '추가입고', isReadOnly: false, width: 200, align:"center"}
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

        localStorage.setItem('stockMngInitLayout', stockGrid.columnLayout);
        _setUserGridLayout('stockMngLayout', stockGrid, stockColumns );

        //행번호 표시하기
        stockGrid.itemFormatter = function (panel, r, c, cell) { 
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
            }
        };

        stockGrid.formatItem.addHandler(function (s, e) {
            // 열 헤더에 대한 중앙 정렬 
            if (e.panel == s.columnHeaders) {
            e.cell.innerHTML = '<div class="v-center">' +
                e.cell.innerHTML + '</div>';
            }
            //  "status" 열에 대한 커스텀 렌더링
            if (e.panel == s.cells) {
            var col = s.columns[e.col];
            var status = s.getCellData(e.row, e.col);
                if (e.row > 0 && col.binding == 'status') {
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

        // 체크박스 생성
        excelSelector = new wijmo.grid.selector.Selector(excelGrid, {
            itemChecked: () => {
            }
        });

        excelSelector.column = excelGrid.columns[0];
    }else{
        stockView = new wijmo.collections.CollectionView(result, {
            pageSize: 100,
            groupDescriptions: ['lCategyNm']
        });
        stockGrid.columns[0].width = 50;
        stockGridPager.cv = stockView;
        stockGrid.itemsSource = stockView;
	  }
      refreshPaging(stockGrid.collectionView.totalItemCount, 1, stockGrid, 'stockGrid');
      $(".wj-cell").css("padding-left"," ");
}


//재고 검색
function getStockList(){
    $("#excelDiv").hide();
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
            },
            error : function(request,status,error) {
             	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
          });
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


</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        

        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">재고관리</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>총 재고수량</dt>
                        <dd>00개</dd>
                    </dl>
                    <dl>
                        <dt>추가입고 필요항목</dt>
                        <dd>00개</dd>
                    </dl>
                    <dl>
                        <dt>총 재고자산</dt>
                        <dd>0000원</dd>
                    </dl>
                </div>
                <div class="admin_utility">
                    <div class="admin_btn">
                        <button class="btn">엑셀 업로드</button>
                        <button class="btn" onclick="exportExcel();">엑셀 다운로드</button>
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
                            <input type="text" id="inq" placeholder=",로 다중검색 가능" onclick="enterkey()">
                            <button type="button" onclick ="getStockList();">조회</button>
                            <input type="checkbox" id="essential" name="essential">
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
                            <button type="button" class="stroke">칼럼위치저장</button>
                            <button type="button" class="stroke">칼럼초기화</button>
                        </div>
                        <div class="grid_wrap">
                            <div id="stockGrid"  style="height:500px;"></div>
                        	<div id="stockGridPager" class="pager"></div>
                        </div>
                        <div class="grid_wrap" id="excelDiv" style="position:relative;">
                        	<div id="excelGrid"  style="height:500px;"></div>
                        	<div id="excelGridPager" class="pager"></div>
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
</body>
</html>