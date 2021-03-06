<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMS 템플릿 가이드</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/common.css">
    <style>
        textarea{border:none;}
        header{position:fixed; border-bottom:1px solid #eee; width:100%; height:65px; line-height:65px; background-color:#fff;}
        h1{text-align:center; font-size:30px; font-weight:bold; }
        h2{margin-bottom:24px; font-size:24px; font-weight:bold;}
        h3{font-size:18px; font-weight: bold;}
        p{margin-bottom:5px;}
        a{margin-left:12px; text-decoration:underline; cursor:pointer;}
        a:hover{color:#008055;}
        .wrap{padding:0 40px; border:none;}
        .index{padding:60px 10px 30px;}
        .index h3{margin:20px 0;}
        article{margin-bottom: 20px; padding:20px; border: 1px solid #333;}
        section{margin:30px 0;}
        .des{margin:20px 0 30px;}

        .admin_utility span{border-radius:5px; padding:8px 10px; color:#fff; background-color:#008055;}
    </style>
</head>
<body>
    <div class="wrap">
        <header><h1>CMS 템플릿 가이드</h1></header>
        <div class="index">
            <h3>페이지 바로가기</h3>
            <p>- 로그인<a href="login.html" target="_blank">login.html</a></p>
            <p>- 매출통계<a href="statistics.html" target="_blank">statistics.html</a></p>
            <p>- 대상관리/건물관리<a href="building.html" target="_blank">building.html</a></p>
            <p>- 대상관리/직원관리<a href="staff.html" target="_blank">staff.html</a></p>
            <p>- 일일점검<a href="daily.html" target="_blank">daily.html</a></p>
            <p>- 재고관리/코드관리<a href="stock_code.html" target="_blank">stock_code.html</a></p>
            <p>- 재고관리/재고관리<a href="stock_stock.html" target="_blank">stock_stock.html</a></p>
            <p>- 재고관리/입출현황<a href="stock_current.html" target="_blank">stock_current.html</a></p>
            <p>- 정산관리/정산처리<a href="calculate_process.html" target="_blank">calculate_process.html</a></p>
            <p>- 정산관리/정산이력<a href="calculate_history.html" target="_blank">calculate_history.html</a></p>
            <p>- 매출관리<a href="income.html" target="_blank">income.html</a></p>
            <h3>팝업 바로가기</h3>
            <p>- 건물QR코드<a href="p_building_qr.html" target="_blank">p_building_qr.html</a></p>
            <p>- 재고관리QR코드<a href="p_stock_qr.html" target="_blank">p_stock_qr.html</a></p>
            <p>- 현장점검이미지<a href="p_site.html" target="_blank">p_site.html</a></p>
            <p>- 계약서<a href="p_contract.html" target="_blank">p_contract.html</a></p>
            <p>- 거래명세서<a href="p_specification.html" target="_blank">p_specification.html</a></p>
        </div>
        <article>
            <h2>페이지 공통</h2>
            <p class="des">로그인과 팝업 페이지을 제외한 대부분의 관리자 페이지는 admin_wrap안에 메뉴바인 admin_sidebar와  컨텐츠 영역인 admin_container을  가집니다 
            admin_container안에서 h2태그(admin_title)를 가지는 div는 admin_section 영역으로 묶입니다
            </p>
            <div class="admin_section">
                <h2 class="admin_title">타이틀</h2>
            </div>
        </article>
        <article>
            <h2>admin_section 구성요소</h2>
            <section>
                <h3>1) 요약 .admin_summary</h3>
                <p class="des">: 각 섹션의 통계 요약</p>
                <div class="admin_summary">
                    <dl>
                        <dt>전체 직원수</dt>
                        <dd>00명</dd>
                    </dl>
                    <dl>
                        <dt>관리자 수</dt>
                        <dd>00명</dd>
                    </dl>
                    <a href="#">직원추가</a>
                </div>
            </section>
            <section>
                <h3>2) 유틸리티 .admin_utility</h3>
                <p class="des">: admin_utility 영역안에는 form이나 admin_btn등 유틸리티가 들어갑니다. 버튼은 항상 오른쪽상단에 위치합니다</p>
                <div class="admin_utility">
                    <span>form ></span>
                    <form action="#" method="post">
                        <label for="">조회일</label>
                        <input type="date" id="fromDate" value="2021-06-02">
                        -
                        <input type="date" id="toDate" value="2021-06-02">
                        <button type="button" class="admin_utility_btn">조회</button>
                    </form>
                    <div class="admin_btn">
                        <span>.admin_btn ></span>
                        <button class="btn">거래명세서 출력</button>
                        <button class="btn">엑셀 업로드</button>
                        <button class="btn">엑셀 다운로드</button>
                    </div>
                </div>
            </section>
            <section>
                <h3>3) 컨텐츠 .admin_content</h3>
                <p class="des">: 실제적인 컨텐츠가 들어가는 영역입니다 admin_filter와 admin_dashboard가 들어갑니다</p>
            </section>
            <section>
                <h3>4) 필터 .admin_filter</h3>
                <p class="des">: 필터 설정을 할 수있는 영역입니다</p>
                <div class="admin_filter">
                    <form action="#" id="search_form" name="search_form">
                        <label for="con">검색조건</label>
                        <select name="con" id="con">
                            <option value="all" selected="selected">전체</option>
                            <option value="category">분류명</option>
                            <option value="history">내역명</option>
                            <option value="building">건물명</option>
                            <option value="depositor">입금자명</option>
                        </select>
                        <label for="inq"></label>
                        <input type="text" placeholder=",로 다중검색 가능">
                        <button type="button">조회</button>
                        <input type="checkbox" id="essential" name="essential">
                        <label for="essential">추가입고 필요항목만 보기</label>
                    </form>
                    <div class="summary">
                        <dl>
                            <dt>미수금</dt>
                            <dd>0000원</dd>
                        </dl>
                        <dl>
                            <dt>이월금</dt>
                            <dd>0000원</dd>
                        </dl>
                        <dl>
                            <dt>재료비</dt>
                            <dd>0000원</dd>
                        </dl>
                    </div>
                </div>
            </section>
            <section>
                <h3>5) 대시보드 .admin_dashboard</h3>
                <p class="des">그리드 시스템이 들어가는 영역 (grid_wrap)이며 위아래로 버튼영역(btn_wrap)이 들어가야합니다</p>
                <div class="admin_dashboard">
                    <div class="btn_wrap">
                        <button type="button">추가</button>
                        <button type="button">수정</button>
                        <button type="button">삭제</button>
                        <button type="button" class="stroke">칼럼초기화</button>
                        <button type="button" class="stroke">칼럼위치저장</button>
                    </div>
                    <div class="grid_wrap">Grid 영역입니다</div>
                    <div class="btn_wrap">
                        <button type="button">추가</button>
                        <button type="button">수정</button>
                        <button type="button">삭제</button>
                        <button type="button" class="stroke">칼럼초기화</button>
                        <button type="button" class="stroke">칼럼위치저장</button>
                    </div>
                </div>
            </section>
        </article>
        <article>
            <h2>페이지 기본 팝업창</h2>
            <p>클래스 popup은 페이지 전체를 덮는 검정색 배경을 가지며 popup안에 popup_container부터 팝업영역입니다 popup_head는 공통영역으로 내용변경시 popup_inner안에서 수정합니다<br>
            .admin_container 바깥에 위치하며 팝업 시작부분에 주석을 달아주어 팝업영역을 알려줍니다 </p>
        </article>
    </div>
</body>
</html>