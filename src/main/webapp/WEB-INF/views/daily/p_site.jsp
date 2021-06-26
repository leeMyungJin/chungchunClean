<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>청춘클린</title>
    <link rel="stylesheet" href="css/reset.css">
    <style>
        .site_wrap{padding:12px;}
        .site_wrap table{border-collapse:collapse; margin:20px 8px;}
        .site_wrap th,td{border:1px solid #333; padding:10px;}
        .image_list li{
            position:relative; float:left;
            margin:0 8px 16px; border:1px solid #333; height:400px; width:calc(33.3333% - 16px);
            text-align: center; line-height:400px; overflow:hidden;
        }
        .image_list li img{position:absolute; top:0; left:0; right:0; bottom:0; margin:auto; width:auto; max-width:100%; height:auto; max-height:100%;}
        /* tablet */
        @media screen and (min-width: 720px) and (max-width: 959px){
            .image_list li{width:calc(50% - 16px);}
        }
        /* mobile */
        @media screen and (max-width: 719px){
            .image_list li{width:100%; margin:0;}
        }
        
    </style>
</head>
<body>
    <div class="site_wrap">
        <table>
            <colgroup>
                <col style="width:10%">
                <col style="width:25%;">
                <col style="width:10%;">
                <col style="width:25%;">
                <col style="width:10%;">
                <col style="width:30%;">
            </colgroup>
            <tr>
                <th>방문일자</th>
                <td>2021-06-09</td>
                <th>업로드일자</th>
                <td>2021-06-09</td>
                <th>담당자</th>
                <td>홍길동</td>
            </tr>
            <tr>
                <th>지역</th>
                <td>창원시</td>
                <th>건물명</th>
                <td colspan="3">창원빌딩</td>
            </tr>
            <tr>
                <th>주소</th>
                <td colspan="5">창원시 의창구 명서동</td>
            </tr>
            <tr>
                <th>종량제</th>
                <td>00개</td>
                <th>음식물 칩</th>
                <td colspan="3">00개</td>
            </tr>
        </table>
        <ul class="image_list">
            <li><img src="image/site1.jpeg" alt="현장점검이미지" height="400" width="400"></li>
            <li><img src="image/site2.jpeg" alt="현장점검이미지" height="400" width="400"></li>
            <li><img src="image/site3.jpeg" alt="현장점검이미지" height="400" width="400"></li>
            <li><img src="/Users/admin/Documents/00 프로젝트/img/img6.jpeg" alt="현장점검이미지" height="400" width="400"></li>
            <li><img src="#" alt="현장점검이미지" height="400" width="400"></li>
            <li><img src="#" alt="현장점검이미지" height="400" width="400"></li>
            <li><img src="#" alt="현장점검이미지" height="400" width="400"></li>
            <li><img src="#" alt="현장점검이미지" height="400" width="400"></li>
            <li><img src="#" alt="현장점검이미지" height="400" width="400"></li>
        </ul>
    </div>
</body>
</html>