<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>청춘클린</title>
    <link rel="stylesheet" href="css/reset.css">
    <style>
        body{padding:35px; font-size:13px; line-height:1.5; max-width:1000px;}
        .btn_wrap{text-align:right; margin:5px 45px;}
        .btn_wrap a{display:inline-block; padding:8px 18px; color:#fff; background-color:#0C1842;}
        h2{margin:30px 0; text-align:center;}
        p{margin-bottom:20px;}
        .line{text-decoration: underline;}
        .des{text-align: center; margin:70px 0 90px;}
        .info{display: flex; justify-content:space-around;}
        @media print{
            .btn_wrap, .btn_wrap *{display: none;}
        }
    </style>
</head>
<body>
    <div class="wrap">
        <div class="btn_wrap"><a href="javascript:window.print()">출력하기</a></div>
        <h2>청춘클린 (주) 청소 용역 계약서</h2>
        <p><strong class="line">oooo</strong>(이하 ‘갑’ 이라 한다) 과 청소 용역 업체 청춘클린(이하 ‘을’이라 한다)는 아래와 같이 청소 용역 계약을 체결한다.</p>
        <p>[제 1 조] ‘갑’은  <strong class="line">oooo</strong> 청소를 ‘을’의 책임전담 하에 실시한다.</p>
        <p>[제 2 조] ‘을’이 제1조의 작업을 시행하기 위하여 소요되는 청소용품 밑 소모자재는 ‘을’의 부담으로 한다.</p>
        <p>[제 3 조] ‘갑’은 청소용역비 금 <span class="line">0000</span> 원 <span>(\_________)</span>   (부가세별도)을 ‘을’의 청구에 의하여 청소 마지막날에(매월말일) 지급한다.</p>
        <p>[제 4 조] ‘갑’은 ‘을’에게 작업에 필요한 전기나 용수를 무상으로 제공한다.</p>
        <p>[제 5 조] 본 계약기간은 2021년    월     일 로부터 20   년     월     일까지로 하며, ‘을’이 청소용역을 성실히 이행하지 않을 경우 또는 ‘을’이 청소 용역업 등을 수행할 능력이 없다고 인정된 경우에는 ‘갑’은 본 계약을 해지요청 할 수 있다. 
            또한 해지 한달전 통보가 되어야 하며 통보되지 않을시 자동으로 연장한다</p>
        <p>[제 6 조] 상기 계약 일반사항 이외에 아래 내용을 특약사항으로 정하며, 일반사항과 특약사항이 상충되는 경우에는 특약사항을 우선적으로 적용 하도록 한다.</p>
        <p>[제 7 조] 청소내용  계단청소</p>
        <p>[제 8 조] 특약사항 </p>
        <div class="des">
            <p>위와 같이 계약을 체결하고 계약서 2통을 작성, 서명 날인 후 ‘갑’ 과 ‘을’이 각각 1통씩 보관한다.</p>
            <p class="date">계 약 일 자 :  2021 년 06 월 4 일</p>
        </div>
        <div class="info">
            <table >
                <thead>
                    <tr>
                        <th colspan="3">'갑'</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>주 소: </th>
                        <td>김해시 내동 135-2번지, 102호</td>
                    </tr>
                    <tr>
                        <th>회사명: </th>
                        <td>청춘클린(주)</td>
                    </tr>
                    <tr>
                        <th>대표자: </th>
                        <td>김도엽</td>
                        <td>(인)</td>
                    </tr>
                    <tr>
                        <th>연락처: </th>
                        <td>010-5689-3499</td>
                    </tr>
                </tbody>
            </table>
            <table >
                <thead>
                    <tr>
                        <th colspan="3">'을'</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>주 소: </th>
                        <td>김해시 내동 135-2번지, 102호</td>
                    </tr>
                    <tr>
                        <th>회사명: </th>
                        <td>청춘클린(주)</td>
                    </tr>
                    <tr>
                        <th>대표자: </th>
                        <td>김도엽</td>
                        <td>(인)</td>
                    </tr>
                    <tr>
                        <th>연락처: </th>
                        <td>010-5689-3499</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="btn_wrap"><a href="javascript:window.print()">출력하기</a></div>
    </div>
</body>
</html>