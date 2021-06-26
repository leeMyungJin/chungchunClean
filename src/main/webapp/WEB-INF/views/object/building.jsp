<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
function pageLoad(){
	$('#object').addClass("current");
	$('#building').addClass("current");
}
</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        
        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">건물관리</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>전체 건물수</dt>
                        <dd>00명</dd>
                    </dl>
                    <dl>
                        <dt>전체 단지수</dt>
                        <dd>00개</dd>
                    </dl>
                    <!-- 클릭시 건물추가 팝업창 띄움 -->
                    <a href="#new_building">건물추가</a>
                </div>
                <div class="admin_utility">
                    <div class="admin_btn">
                        <button class="btn">계약서 출력</button>
                        <button class="btn">엑셀 템플릿</button>
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
                                <option value="area">지역</option>
                                <option value="client">고객명</option>
                                <option value="building">건물명</option>
                            </select>
                            <label for="inq"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능">
                            <button type="button">조회</button>
                        </form>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="click();">칼럼위치저장</button>
                            <button type="button" class="stroke">칼럼초기화</button>
                            <button type="button">QR출력</button>
                            <button type="button">저장</button>
                        </div>
                        <div class="grid_wrap">Grid 영역입니다</div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke">칼럼위치저장</button>
                            <button type="button" class="stroke">칼럼초기화</button>
                            <button type="button">QR출력</button>
                            <button type="button">저장</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <!-- 팝업 -->
    <!-- 팝업 : 건물추가-->
    <div class="popup" id="new_building" style="display:none;">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">건물추가</p>
                <button type="button" class="popup_close">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form action="#" method="post">
                    <div class="row">
                        <label for="region">지역<i>*</i></label>
                        <input type="text" id="region" name="region" required>
                        <button type="button" class="popup_btn att">검색</button>
                    </div>
                    <div class="row">
                        <label for="dtlAddr">상세주소<i>*</i></label>
                        <input type="text" id="dtlAddr" name="dtlAddr" required>
                        <button type="button" class="popup_btn att">중복확인</button>
                    </div>
                    <div class="row">
                        <label for="builName">건물명<i>*</i></label>
                        <input type="text" id="builName" name="builName" required>
                    </div>
                    <div class="row">
                        <label for="builNum">건물번호<i>*</i></label>
                        <input type="text" id="builNum" name="builNum" onfocus="this.blur()" readonly>
                    </div>
                    <div class="row">
                        <label for="codeNum">동 번호<i>*</i></label>
                        <input type="text" id="codeNum" name="codeNum" required>
                        <button type="button" class="popup_btn att">추가</button>
                    </div>
                    <div class="row">
                        <label for="downPay">계약금액<i>*</i></label>
                        <input type="text" id="downPay" name="downPay" required>
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn confirm">생성</button>
                </div>
            </div>
        </div>
    </div>
    <!--건물추가 팝업 영역 끝-->
    <!-- 팝업 : 정보수정 -->
    <div class="popup" id="modify_building"  style="display:none;">
        <div class="popup_container"> 
            <div class="popup_head">
                <p class="popup_title">정보수정</p>
                <button type="button" class="popup_close">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form action="#" method="post">
                    <div class="row">
                        <label for="active">활성화</label>
                        <input type="checkbox" id="active" name="active" checked>체크 시, 활성화
                    </div>
                    <div class="row">
                        <label for="region">지역<i>*</i></label>
                        <input type="text" id="region" name="region" required>
                        <button type="button" class="popup_btn att">검색</button>
                    </div>
                    <div class="row">
                        <label for="dtlAddr">상세주소<i>*</i></label>
                        <input type="text" id="dtlAddr" name="dtlAddr" required>
                        <button type="button" class="popup_btn att">중복확인</button>
                    </div>
                    <div class="row">
                        <label for="builName">건물명<i>*</i></label>
                        <input type="text" id="builName" name="builName" required>
                    </div>
                    <div class="row">
                        <label for="builNum">건물번호<i>*</i></label>
                        <input type="text" id="builNum" name="builNum" onfocus="this.blur()" readonly>
                    </div>
                    <div class="row">
                        <label for="codeNum">동 번호<i>*</i></label>
                        <input type="text" id="codeNum" name="codeNum" required>
                        <input type="text" id="codeNum" name="codeNum" required>
                        <input type="text" id="codeNum" name="codeNum" required>
                        <button type="button" class="popup_btn att">추가</button>
                    </div>
                    <div class="row">
                        <label for="downPay">계약금액<i>*</i></label>
                        <input type="text" id="downPay" name="downPay" required>
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn stroke">수정</button>
                    <button type="button" class="popup_btn fill">삭제</button>
                </div>
            </div>
        </div>
    </div>
    <!--정보수정 팝업 영역 끝-->
</body>
</html>