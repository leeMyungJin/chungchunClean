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
var categoryGrid;
var categoryView;
var categoryGridPager;
var add = false;
var stockSelector;
var categorySelector;
var categorySelectCnt = 0;

function pageLoad(){
	$('#stock').addClass("current");
	$('#stock_code').addClass("current");
    loadGridStockList('init');
}

//그리드 초기 셋팅
function loadGridStockList(type, result){
    if(type == "init"){
		    //페이지당 6개의 데이터 항목이 포함된 CollectionView 페이지 생성
		   stockView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		    
		// 페이지 이동
	        stockGridPager = new wijmo.input.CollectionViewNavigator('#stockGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: stockView
		    });
		  
		// hostElement에 Wijmo의 FlexGird 생성
			  // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
			  // autoGenerateColumns: false >> 컬럼 사용자 정의 
		    stockGrid = new wijmo.grid.FlexGrid('#stockGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: [
			      { binding: 'l_categy_cd', header: '대카테고리코드', isReadOnly: true, width: 230, align:"center"},
			      { binding: 'l_categy_nm', header: '대카테고리명', isReadOnly: true, width: 230, align:"center"},
			      { binding: 'm_categy_cd', header: '중카테고리코드', isReadOnly: true, width: 230, align:"center" },
			      { binding: 'm_categy_nm', header: '중카테고리명', isReadOnly: true, width: 230, align:"center"  },
			      { binding: 'item_cd', header: '물품코드', isReadOnly: false, width: 230, align:"center"  },
			      { binding: 'item_nm', header: '물품명', isReadOnly: false, width: 230, align:"center"  },
			      { binding: 'cost', header: '원가', isReadOnly: false, width: 202, align:"center"}
			    ],
			    itemsSource: stockView
			  });
              // 체크박스 생성
            stockSelector = new wijmo.grid.selector.Selector(stockGrid, {
                itemChecked: () => {
                }
            });

            //카테고리 추가용 그리드 설정
            categoryGridPager = new wijmo.input.CollectionViewNavigator('#categoryGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: stockView
		    });
            categoryGrid = new wijmo.grid.FlexGrid('#categoryGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: [
			      { binding: 'l_categy_cd', header: '대카테고리코드', isReadOnly: false, width: 230, align:"center"},
			      { binding: 'l_categy_nm', header: '대카테고리명', isReadOnly: false, width: 230, align:"center"},
			      { binding: 'm_categy_cd', header: '중카테고리코드', isReadOnly: false, width: 230, align:"center" },
			      { binding: 'm_categy_nm', header: '중카테고리명', isReadOnly: false, width: 230, align:"center"  },
                  { binding: 'reg_date', header: '등록일시', isReadOnly: true, width: 230, align:"center"  }

			    ],
			    itemsSource: categoryView
			  });
            categorySelector = new wijmo.grid.selector.Selector(categoryGrid, {
                itemChecked: () => {
                    categorySelectCnt++;
                }
            });
    }else if(type == "category"){
           categoryView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		  categoryGridPager.cv = categoryView;
		  categoryGrid.itemsSource = categoryView;
	}else{
		  console.log(result);
		   stockView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		  stockGridPager.cv = stockView;
		  stockGrid.itemsSource = stockView;
	  }
}


//코드 검색
function search(){
    var params = {
            inq : $("#inq").val(),
            con : $("#con").val()
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

//팝업 오픈
function showPop(pop){
	if(pop == "add_category"){
        $.ajax({
            url : "/stock/getCategoryList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
        	    loadGridStockList('category', result);
            },
            error : function(request,status,error) {
             	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
          });
		
	}else if(pop == "add_product"){
		
	}
	
	$('#'+pop).addClass('is-visible');
}

//팝업 종료
function closePop(){
	$('.popup').removeClass('is-visible');
    add = false;
    categoryGrid.allowAddNew = add;
    categorySelectCnt = 0;
}
// 행추가
function addRow(type){
    add = true;
    if(type == 'category'){
        categoryGrid.allowAddNew = add;
    }
}

//행 삭제
function deleteRows(type){
    if(type == 'category'){
        var item = categoryGrid.rows.filter(r => r.isSelected);
        var rows = [];
        for(var i =0; i< item.length ; i++){
            rows.push(item[i]._data);
        }
        var test = {
            params : rows
        }

        $.ajax({
            url : "/stock/deleteCategory",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            dataType : 'json',
            data: test,
            success : function(result) {
        	    loadGridStockList('category', result);
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
                <h2 class="admin_title">코드관리</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>총 물품 수</dt>
                        <dd>0000개</dd>
                    </dl>
                    <a href="javascript:void(0);" onclick="showPop('add_category');">카테고리 추가</a>
                    <a href="javascript:void(0);" onclick="showPop('add_product');">물품 추가</a>
                </div>
                <div class="admin_utility">
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
                                <option value="category">카테고리명</option>
                                <option value="product">물품명</option>
                            </select>
                            <label for="inq"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능">
                            <button type="button" onClick="search();">조회</button>
                        </form>
                        <div class="summary">
                            <dl>
                                <dt>미수금</dt>
                                <dd>0000원</dd>
                            </dl>
                            <dl>
                                <dt>입금금액</dt>
                                <dd>0000원</dd>
                            </dl>
                            <dl>
                                <dt>추가금</dt>
                                <dd>0000원</dd>
                            </dl>
                        </div>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                        <div class="btn_wrap">
                            <button type="button" class="stroke">칼럼위치저장</button>
                            <button type="button" class="stroke">칼럼초기화</button>
                            <button type="button">QR출력</button>
                            <button type="button">저장</button>
                            <button type="button">삭제</button>
                        </div>
                        <div class="grid_wrap" style="position:relative;">
                        	<div id="stockGrid"  style="height:500px;"></div>
                        	<div id="stockGridPager" style="align:center"></div>
                            </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke">칼럼위치저장</button>
                            <button type="button" class="stroke">칼럼초기화</button>
                            <button type="button">QR출력</button>
                            <button type="button">저장</button>
                            <button type="button">삭제</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <!-- 팝업 -->
    <!-- 팝업 : 카테고리추가-->
    <div class="popup" id="add_category">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">카테고리추가</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_inner">
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn">삭제</button>
                        <button type="button" class="popup_btn">저장</button>
                    </div>
                </div>
                <div class="popup_grid_area">
                    <button class="btn" onclick="addRow('category');">+ 행 추가</button>
                    <div id="categoryGrid"></div>
                    <div id="categoryGridPager"></div>
                    <div>
                    <button class="btn" onclick="addRow('category');">+ 행 추가</button>
                    </div>
                </div>
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn" onclick="deleteRows('category');">삭제</button>
                        <button type="button" class="popup_btn">저장</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--카테고리추가 팝업 영역 끝-->
    <!-- 팝업 : 물품추가 -->
    <div class="popup" id="add_product">
        <div class="popup_container"> 
            <div class="popup_head">
                <p class="popup_title">물품추가</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form action="#" method="post">
                    <div class="row">
                        <label for="category1">대카테고리<i>*</i></label>
                        <select name="category1" id="category1">
                            <option value="all" selected="selected">전체</option>
                            <option value="">청소류</option>
                            <option value="">소독류</option>
                        </select>
                    </div>
                    <div class="row">
                        <label for="category2">중카테고리<i>*</i></label>
                        <input type="text" id="category2" name="category2" required>
                    </div>
                    <div class="row">
                        <label for="product">상품명<i>*</i></label>
                        <input type="text" id="product" name="product" required>
                    </div>
                    <div class="row">
                        <label for="code">코드<i>*</i></label>
                        <input type="text" id="code" name="code" required>
                    </div>
                    <div class="row">
                        <label for="cost">원가<i>*</i></label>
                        <input type="text" id="cost" name="cost" required>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn stroke">중복확인</button>
                    <button type="button" class="popup_btn fill">추가</button>
                </div>
            </div>
        </div>
    </div>
    <!--물품추가 팝업 영역 끝-->
</body>
</html>