<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
function pageLoad(){
	$('#income').addClass("current");
}
</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        

        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">매출관리</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>금년 매출액</dt>
                        <dd>0000원</dd>
                    </dl>
                    <dl>
                        <dt>금년 입금금액</dt>
                        <dd>0000원</dd>
                    </dl>
                    <dl>
                        <dt>금년 미수금</dt>
                        <dd>0000원</dd>
                    </dl>
                    <dl>
                        <dt>금년 추가금</dt>
                        <dd>0000원</dd>
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
                                <option value="site">지역</option>
                                <option value="building">건물명</option>
                                <option value="depositor">입금자명</option>
                            </select>
                            <label for="inq"></label>
                            <input  id="inq" type="text" placeholder=",로 다중검색 가능">
                            <button type="button">조회</button>
                        </form>
                        <div class="summary">
                            <dl>
                                <dt>매출액</dt>
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