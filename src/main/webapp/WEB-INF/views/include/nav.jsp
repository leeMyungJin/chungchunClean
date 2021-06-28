<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<aside id='aside' class="admin_sidebar">
    <h1 class="logo logo_s">로고</h1>
    <ul class="admin_nav">
        <li><a id="statistics" href="/statistics/" class="dept1">매출통계</a></li>
        <li>
            <a id="object" href="/object/building" class="dept1 client">대상관리</a>
            <ul class="dept2">
                <li><a id="building" href="/object/building">건물관리</a></li>
                <li><a id="staff" href="/object/staff">직원관리</a></li>
            </ul>
        </li>
        <li><a id="daily" href="/daily/" class="dept1 daily">일일점검</a></li>
        <li>
            <a id="stock" href="/stock/code" class="dept1 stuck">재고관리</a>
            <ul class="dept2">
                <li><a id="stock_code" href="/stock/code">물품관리</a></li>
                <li><a id="stock_stock" href="/stock/stock">재고현황</a></li>
                <li><a id="stock_current" href="/stock/current">입출이력</a></li>
            </ul>
        </li>
        <li>
            <a id="calculate" href="/calculate/process" class="dept1 calculate">정산관리</a>
            <ul class="dept2">
                <li><a id="calculate_process" href="/calculate/process">정산처리</a></li>
                <li><a id="calculate_history" href="/calculate/history">정산이력</a></li>
            </ul>
        </li>
        <li>
            <a id="income" href="/income/" class="dept1 manage">매출관리</a>
        </li>
    </ul>
    <div class="terms_area">
        <a href="#">이용약관</a>
        <a href="#">개인정보수집약관</a>
    </div>
    <a href="javascript:logOut()" class="admin_out">로그아웃</a>
</aside>