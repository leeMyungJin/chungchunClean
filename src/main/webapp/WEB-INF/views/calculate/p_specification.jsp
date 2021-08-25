<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html lang="en">
<head>
	<%@ include file="../include/header.jsp" %>
    <style>
        .specification_wrap{margin:0 auto; border:1px solid #333; padding:20px; width:800px; font-size:14px; box-sizing: border-box;}
        .btn_wrap{text-align:right; margin:5px 70px;}
        .btn_wrap a{display:inline-block; padding:8px 18px; color:#fff; background-color:#0C1842;}
        h2{margin:20px 0 50px; letter-spacing:12px; font-size:22px; font-weight:900; text-align:center; }
        table{border:1px solid #333; width:100%;}
        thead{font-weight:700;}
        th{font-weight:700; background-color:#f0f0f0;}
        th, td{border:1px solid #333; padding:7px 0; text-align: center;}
        .info{display:flex; justify-content:space-between; margin-bottom:30px; width:100%;}
        .consumer{width:45%; margin:30px;}
        .consumer p{border-bottom:1px solid #333; padding:10px 15px; text-align: right;}
        .consumer span{padding:0 30px;}
        @media print{
            .btn_wrap, .btn_wrap *{display: none;
            }
        }
    </style>
</head>

<script type="text/javascript">
var cretDt;
var totalCost;
var bldgNm;

var staffId = "<%=session.getAttribute("staffId")%>";

function pageLoad(){
	sessionCheck(staffId);
	
	$('#cretDt').text('${cretDt}');
	$('#totalCost').text('${totalCost}');
	$('#quoteTotalCost').text('${quoteTotalCost}');
	$('#surtaxTotalCost').text('${surtaxTotalCost}');
	$('#totalCost2').text('₩'+'${totalCost}'+" 원정");
	$('#bldgNm').text('${bldgNm}');

}
</script>

<body onload="pageLoad()">
    <div class="btn_wrap"><a href="javascript:window.print()">출력하기</a></div>
    <div class="specification_wrap">
        <h2>거래명세서</h2>
        <div class="info">
            <div class="consumer">
                <p><span id="cretDt"></span></p>
                <p><span id="bldgNm"></span>귀하</p>
            </div>
            <table style="width:55%;">
                <colgroup>
                    <col width="8%">
                    <col width="25%">
                    <col width="25%">
                    <col width="17%">
                    <col width="25%">
                </colgroup>
                <tbody>
                    <tr>
                        <th rowspan="5">공<br>급<br>자</th>
                        <td>등록번호</td>
                        <td colspan="3">337-86-01667</td>
                    </tr>
                    <tr>
                        <td>상호</td>
                        <td>청춘클린</td>
                        <td>성명</td>
                        <td>김도엽</td>
                    </tr>
                    <tr>
                        <td>사업장소재지</td>
                        <td colspan="3">경상남도 김해시 금관대로1359번길 11-1, 102호 (내동)</td>
                    </tr>
                    <tr>
                        <td>업태</td>
                        <td>서비스업</td>
                        <td>종목</td>
                        <td>시설관리업</td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td colspan="3">055) 335-5689</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <table>
            <colgroup>
                <col width="7%">
                <col width="13%">
                <col width="30%">
                <col width="16%">
                <col width="16%">
                <col width="18%">
            </colgroup>
            <thead>
                <tr>
                    <td>합계<br>금액</td>
                    <td colspan="6" id="totalCost2"></td>
                </tr>
                <tr>
                    <th>NO.</th>
                    <th>분류</th>
                    <th>내역</th>
                    <th>공급가액</th>
                    <th>부가세액</th>
                    <th>합계액</th>
                </tr>
            </thead>
            <tbody id="infoTable">
            	<c:forEach var="vo" items="${addSpecInfo}">
				    <tr>
				    	<td><c:out value="${vo.rownum}"/></td>
				        <td><c:out value="${vo.classifiNm}"/></td>
				        <td><c:out value="${vo.itemNm}"/></td>
				        <td><fmt:formatNumber value="${vo.quoteCost}" pattern="#,###" /></td>
				        <td><fmt:formatNumber value="${vo.surtax}" pattern="#,###" /></td>
				        <td><fmt:formatNumber value="${vo.conCost}" pattern="#,###" /></td>

<fmt:formatNumber value="${price }" pattern="#,###" />

				    </tr>
				</c:forEach>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">계</td>
                    <td id="quoteTotalCost"></td>
                    <td id="surtaxTotalCost"></td>
                    <td id="totalCost"></td>
                </tr>
                <tr>
                    <td colspan="2">비고</td>
                    <td></td>
                    <td colspan="2">인수자</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    </div>
    <div class="btn_wrap"><a href="javascript:window.print()">출력하기</a></div>
</body>
</html>