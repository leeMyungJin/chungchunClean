<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>청춘클린</title>
    <%@ include file="../include/header.jsp" %>
    <style>
        .qr_wrap{width:1000px; max-width:1000px;}
        .btn_wrap{text-align:right; margin:5px 45px;}
        .btn_wrap a{display:inline-block; padding:8px 18px; color:#fff; background-color:#0C1842;}
        .qr_list{display:flex; flex-wrap: wrap;}
        .qr_list li{flex-basis:33.3333%; text-align:center; padding:0 50px 18px;}
        .qr, .txt{border:1px solid #333; border-radius:10px;}
        .qr{margin:auto; width:100px; height:100px; line-height:100px; font-weight: bold; font-size:24px;}
        .txt{margin-top:3px; padding:5px 0;}
        @media print{
            .btn_wrap, .btn_wrap *{display: none;}
        }
    </style>
</head>

<script type="text/javascript">
function setBuildingQr(){
	var qrList = "${qrCnt}";
	console.log("${qrList}");
	 for(var i =1; i<=qrList; i++){
		console.log($("#barcode_"+i).attr("nm"));
		let qrCode = new wijmo.barcode.common.QrCode('#barcode_'+i , {
            value : $("#barcode_"+i).attr("nm")
	    });
	} 
}
</script>

<body onload="setBuildingQr()">
    <div class="qr_wrap">
        <div class="btn_wrap"><a href="javascript:window.print()">출력하기</a></div>
        <ul class="qr_list">
        	<c:forEach var="qrList" items="${qrList}" varStatus="status">
	            <li>
	                <div id="barcode_${status.count}" class="qr" nm="${qrList.nm}"></div>
	                <p class="txt">${qrList.cd}</p>
	                <p class="txt">QR값 : ${qrList.nm}</p>
	            </li>
            </c:forEach>
        </ul>
        <div class="btn_wrap"><a href="javascript:window.print()">출력하기</a></div>
    </div>
</body>
</html>