<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>청춘클린</title>
    <link rel="stylesheet" href="css/reset.css">
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
<body>
    <div class="btn_wrap"><a href="javascript:window.print()">출력하기</a></div>
    <div class="specification_wrap">
        <h2>거래명세서</h2>
        <div class="info">
            <div class="consumer">
                <p><span class="year"></span>년<span class="month"></span>월<span class="day"></span>일</p>
                <p><span></span>귀하</p>
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
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <td>상호</td>
                        <td>청춘클린</td>
                        <td>성명</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>사업장소재지</td>
                        <td colspan="3">경상남도 김해시</td>
                    </tr>
                    <tr>
                        <td>업태</td>
                        <td>서비스업</td>
                        <td>종목</td>
                        <td>시설관리업</td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td colspan="3"></td>
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
                    <td colspan="6">₩ 600,000 원정</td>
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
            <tbody>
                <tr>
                    <td>1</td>
                    <td>하자보수</td>
                    <td>타일보수</td>
                    <td>200,000</td>
                    <td >200,000</td>
                    <td >200,000</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>청소</td>
                    <td>공실청소</td>
                    <td>200,000</td>
                    <td>200,000</td>
                    <td>200,000</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>하자보수</td>
                    <td>타일보수</td>
                    <td>200,000</td>
                    <td>200,000</td>
                    <td>200,000</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">계</td>
                    <td></td>
                    <td></td>
                    <td></td>
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