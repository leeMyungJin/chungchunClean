<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
function pageLoad(){
	$('#stock').addClass("current");
	$('#stock_code').addClass("current");
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
                    <a href="#add_category">카테고리 추가</a>
                    <a href="#add_product">물품 추가</a>
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
                            <button type="button">조회</button>
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
                        <div class="grid_wrap">Grid 영역입니다</div>
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
                <button type="button" class="popup_close">x</button>
            </div>
            <div class="popup_inner">
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn">삭제</button>
                        <button type="button" class="popup_btn">저장</button>
                    </div>
                </div>
                <div class="popup_grid_area">
                    <a href="#" class="btn">+ 행 추가</a>
                    <div class="popup_grid">Grid영역입니다</div>
                    <a href="#" class="btn">+ 행 추가</a>
                </div>
                <div class="popup_btn_area">
                    <div class="right">
                        <button type="button" class="popup_btn">삭제</button>
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
                <button type="button" class="popup_close">x</button>
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