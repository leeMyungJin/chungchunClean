<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
function pageLoad(){
	$('#calculate').addClass("current");
	$('#calculate_process').addClass("current");
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
                    <a href="#panel_mon" role="tab" class="on">월관리청소</a>
                    <a href="#panel_add" role="tab">부가수익</a>
                </div>
                <!-- 탭 패널 : 월관리청소 -->
                <div id="panel_mon" role="tabpanel" class="tabpanel">
                    <div class="admin_summary">
                        <dl>
                            <dt>총 누적미수금(이월금)</dt>
                            <dd>0000원</dd>
                        </dl>
                        <dl>
                            <dt>총 입금금액</dt>
                            <dd>0000원</dd>
                        </dl>
                        <dl>
                            <dt>총 추가금</dt>
                            <dd>0000원</dd>
                        </dl>
                        <dl>
                            <dt>문자 잔액</dt>
                            <dd>0000원</dd>
                        </dl>
                    </div>
                    <div class="admin_utility">
                        <form action="#" method="post">
                            <label for="Date">조회일</label>
                            <input type="date" id="Date" value="2021-06-02">
                            <button class="admin_utility_btn">조회</button>
                        </form>
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
                                    <option value="site">지역</option>
                                    <option value="building">건물명</option>
                                    <option value="depositor">입금자명</option>
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
                                <button type="button">문구수정</button>
                                <button type="button">문자발송</button>
                                <button type="button">삭제</button>
                            </div>
                            <div class="grid_wrap">Grid 영역입니다</div>
                            <div class="btn_wrap">
                                <button type="button" class="stroke">칼럼위치저장</button>
                                <button type="button" class="stroke">칼럼초기화</button>
                                <button type="button">문구수정</button>
                                <button type="button">문자발송</button>
                                <button type="button">삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 탭 패널 : 부가수익 -->
                <div id="panel_add" role="tabpanel" class="tabpanel">
                    <div class="admin_summary">
                        <dl>
                            <dt>총 입금금액</dt>
                            <dd>0000원</dd>
                        </dl>
                        <dl>
                            <dt>총 이월금</dt>
                            <dd>0000원</dd>
                        </dl>
                        <a href="#add_category">분류명생성</a>
                        <a href="#add_breakdown">내역생성</a>
                    </div>
                    <div class="admin_utility">
                        <form action="#" method="post">
                            <label for="Date">방문일</label>
                            <input type="date" id="Date" value="2021-06-02">
                            <button class="admin_utility_btn">조회</button>
                        </form>
                        <div class="admin_btn">
                            <button class="btn">거래명세서 출력</button>
                            <button class="btn">엑셀 업로드</button>
                            <button class="btn">엑셀 다운로드</button>
                        </div>
                    </div>
                    <div class="admin_content">
                        <!-- 필터 영역 admin_filter -->
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
                                <input type="text" placeholder=",로 다중검색 가능">
                                <button type="button">조회</button>
                            </form>
                            <div class="summary" style="position: relative; top:10px;">
                                <dl>
                                    <dt>견적</dt>
                                    <dd>0000원</dd>
                                </dl>
                                <dl>
                                    <dt>추가금</dt>
                                    <dd>0000원</dd>
                                </dl>
                                <dl>
                                    <dt>재료비</dt>
                                    <dd>0000원</dd>
                                </dl>
                                <dl>
                                    <dt>외주비</dt>
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
                            </div>
                        </div>
                        <!-- 보드 영역 admin_dashboard -->
                        <div class="admin_dashboard">
                            <button type="button" class="stroke left">+ 건물추가</button>
                            <div class="btn_wrap">
                                <button type="button" class="stroke">칼럼위치저장</button>
                                <button type="button" class="stroke">칼럼초기화</button>
                                <button type="button">저장</button>
                                <button type="button">삭제</button>
                            </div>
                            <div class="grid_wrap">Grid 영역입니다</div>
                            <div class="btn_wrap">
                                <button type="button" class="stroke">칼럼위치저장</button>
                                <button type="button" class="stroke">칼럼초기화</button>
                                <button type="button">저장</button>
                                <button type="button">삭제</button>
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
    <!--분류명생성 팝업 영역 끝 -->
    <!-- 팝업 : 내역생성 -->
    <div class="popup" id="add_breakdown">
        <div class="popup_container" > 
            <div class="popup_head">
                <p class="popup_title">내역추가</p>
                <button type="button" class="popup_close">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form action="#" method="post">
                    <div class="row">
                        <label for="sort">분류명<i>*</i></label>
                        <select name="sort" id="sort">
                            <option value="all" selected="selected">전체</option>
                            <option value="">하자보수</option>
                            <option value="">공실청소</option>
                        </select>
                    </div>
                    <div class="row">
                        <label for="breakdown">내역명<i>*</i></label>
                        <input type="text" id="breakdown" name="breakdown" required><br>
                        <input type="text" id="breakdown" name="breakdown" style="margin:10px 0 0 103px;" required><br>
                        <input type="text" id="breakdown" name="breakdown" style="margin:10px 0 0 103px;" required>
                        <button type="button" class="popup_btn att">추가</button>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn confirm">추가</button>
                </div>
            </div>
        </div>
    </div>
    <!--내역생성 팝업 영역 끝 -->
</body>
</html>