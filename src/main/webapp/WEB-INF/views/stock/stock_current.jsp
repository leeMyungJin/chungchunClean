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

//그리드 초기 셋팅
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
		   
		   currentColumns = [
			      { binding: 'sarSeq', header: 'seq', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'cretDt', header: '일자', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'cretNm', header: '담당자', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'classifiCd', header: '분류', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'lCategyCd', header: '대카테고리', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'mCategyCd', header: '중카테고리', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'itemCd', header: '물품코드', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'itemNm', header: '물품명', isReadOnly: true, width: '*'', align:"center" },
			      { binding: 'cost', header: '원가', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'sarQuantity', header: '입출고수량', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'returnQuantity', header: '반품수량', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'quantity', header: '재고수량', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'updtDt', header: '수정일자', isReadOnly: true, width: 100, align:"center" }
			];
		  
		   currentGrid = new wijmo.grid.FlexGrid('#currentGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: currentColumns,
			    itemsSource: currentView
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
</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        

        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">입출현황</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>금일 입고수량</dt>
                        <dd>00개</dd>
                    </dl>
                    <dl>
                        <dt>금일 출고수량</dt>
                        <dd>00개</dd>
                    </dl>
                    <dl>
                        <dt>금일 반품입고수량</dt>
                        <dd>00개</dd>
                    </dl>
                    <dl>
                        <dt>금일 반품출고수량</dt>
                        <dd>00개</dd>
                    </dl>
                </div>
                <div class="admin_utility">
                    <form action="#" method="post">
                        <label for>조회일</label>
                        <input type="date" id="fromDate" value="2021-06-02">
                        -
                        <input type="date" id="toDate" value="2021-06-02">
                        <button type="button" class="admin_utility_btn">조회</button>
                    </form>
                    <div class="admin_btn">
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
                                <option value="category">카테고리명</option>
                                <option value="product">물품명</option>
                                <option value="person">담당자</option>
                            </select>
                            <label for="inq"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능">
                            <button type="button">조회</button>
                        </form>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                    	<button type="button" class="stroke left">+ 이력추가</button>
                        <div class="btn_wrap">w
                            <button type="button" class="stroke">칼럼위치저장</button>
                            <button type="button" class="stroke">칼럼초기화</button>
                        </div>
                        <div class="grid_wrap">Grid 영역입니다</div>
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