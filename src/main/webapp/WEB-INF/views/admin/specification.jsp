<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
response.setDateHeader("Expires", 0L); // Do not cache in proxy server
%>
<%@ include file="../include/header.jsp" %>

<body>
  
  <div class="specification">
  	<div class="btn_wrap">
      <a class="print_btn btn" href="javascript:window.print()">출력하기</a>
    </div>
    <div class="specification_wrap">
      <h1 class="tit">거래명세서</h1>
      <section class="section01">
        <div class="identity">
          <div class="date">
            <p><c:out value="${year}"/><span>년</span></p>
            <p><c:out value="${month}"/><span>월</span></p>
            <p><c:out value="${day}"/><span>일</span></p>
          </div>
          <div class="sign">
            <p><c:out value="${corpName}"/><span>귀하</span></p>
          </div>
        </div>
        <div class="customer">
          <table class="items">
            <colgroup>
              <col width="5%">
              <col width="30%">
              
            </colgroup>
            <tr>
              <th rowspan="5">공<br>급<br>자</th>
              <td class="center">등록번호</td>
              <td class="left" colspan="3">894-19-01217</td>
            </tr>
            <tr>
              <td class="center">상호</td>
              <td class="center">라임푸드</td>
              <td class="center">성명</td>
              <td class="center">김유신</td>
            </tr>
            <tr>
              <td class="center">사업장<br>소재지</td>
              <td class="left" colspan="3">경상남도 창원시 의창구 명서동 168-21</td>
            </tr>
            <tr>
              <td class="center">업태</td>
              <td class="center">도소매업</td>
              <td class="center">종목</td>
              <td class="center">식자재</td>
            </tr>
            <tr>
              <td class="center">전화번호</td>
              <td class="left" colspan="3">010-6489-8363</td>
            </tr>
          </table>
        </div>
      </section>

      <section class="section02">
        <table class="items">
          <colgroup>
            <col width="10%">
            <col width="30%">
            <col width="7%">
            <col width="8%">
            <col width="7%">
            <col width="15%">
            <col width="8%">
            <col width="20%">
          </colgroup>
          <tr>
            <td class="total center">합계<br>금액</td>
            <td class="total center" colspan="7">￦ <fmt:formatNumber type="number" maxFractionDigits="3" value="${totPrice}"/> 원정</td>
          </tr>
          <tr>
            <th>No</th>
            <th>품목</th>
            <th>규격</th>
            <th>과/면세</th>
            <th>수량</th>
            <th>단가</th>
            <th>부가세</th>
            <th>주문금액</th>
          </tr>

          <c:set var = "sumOrderCnt" value="0"/>
          <c:set var = "sumPrice" value="0"/>
          <c:set var = "sumVatPrice" value="0"/>
          <c:set var = "sumTotalPrice" value="0"/>
          <c:forEach var="item" items="${orderInfo}" varStatus="vs">
            <tr>
              <td class="center"><c:out value="${vs.count}"/></td>
              <td class="prd_name"> <c:out value="${item.prodName}"/></td>
              <td><c:out value="${item.unit}"/></td>
              <td><c:out value="${item.vatYn}"/></td>
              <td><fmt:formatNumber type="number" maxFractionDigits="3" value="${item.orderCnt}"/></td>
              <td><fmt:formatNumber type="number" maxFractionDigits="3" value="${item.price}"/> </td>
              <td><fmt:formatNumber type="number" maxFractionDigits="3" value="${item.vatPrice}"/> </td>
              <td><fmt:formatNumber type="number" maxFractionDigits="3" value="${item.totalPrice}"/></td>
            </tr>
            <c:set var="sumOrderCnt" value="${sumOrderCnt + item.orderCnt}"/>
            <c:set var="sumPrice" value="${sumPrice + item.price}"/>
            <c:set var="sumVatPrice" value="${sumVatPrice + item.vatPrice}"/>
            <c:set var="sumTotalPrice" value="${sumTotalPrice + item.totalPrice}"/>
          </c:forEach>
          <tr>
            <td class="left" colspan="4">계</td>
            <td><fmt:formatNumber type="number" maxFractionDigits="3" value="${sumOrderCnt}"/></td>
            <td><fmt:formatNumber type="number" maxFractionDigits="3" value="${sumPrice}"/></td>
            <td><fmt:formatNumber type="number" maxFractionDigits="3" value="${sumVatPrice}"/></td>
            <td><fmt:formatNumber type="number" maxFractionDigits="3" value="${sumTotalPrice}"/></td >
          </tr>
        </table>
        <table class="items">
          <colgroup>
            <col width="25%">
            <col width="25%">
            <col width="25%">
            <col width="25%">
          </colgroup>
          <tr>
            <td class="center">누적 미수금</td>
            <td><fmt:formatNumber type="number" maxFractionDigits="3" value="${outstanding - deposit}"/></td>
            <td class="center">총합계</td>
            <td><fmt:formatNumber type="number" maxFractionDigits="3" value="${outstanding - deposit + sumTotalPrice}"/></td>
          </tr>
        </table>
        <table class="items">
          <colgroup>
            <col width="25%">
            <col width="25%">
            <col width="25%">
            <col width="25%">
          </colgroup>
          <tr>
            <td class="center">비고</td>
            <td class="center"></td>
            <td class="center">인수자</td>
            <td class="center"></td>
          </tr>
        </table>
      </section>


    </div>
    <div class="btn_wrap bottom">
      <a class="print_btn btn" href="javascript:window.print()">출력하기</a>
    </div>
  </div>
</body>

</html>
