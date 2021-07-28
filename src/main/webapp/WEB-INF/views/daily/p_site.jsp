<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="청춘클린 현장점검이미지">
    <meta name="keywords" content="청춘클린, 현장점검, 결과보고">
    <meta name="description" content="청춘클린 현장점검 결과보고">
    <meta property="og:type" content="website">
    <meta property="og:title" content="이용해주셔서 감사합니다">
    <meta property="og:description" content="청춘클린 현장 점검 결과보고 입니다">
    <meta property="og:image" content="image/og_site.png">
    <title>청춘클린</title>
    <link rel="stylesheet" href="css/reset.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script> 
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
	<script src="../js/include/common.js"></script>
    <script>
    
    var staffId = "<%=session.getAttribute("staffId")%>";
    
     $( document ).ready( function() {
         AOS.init();
         
         sessionCheck(staffId);
         
         var imgPath = '${imgPath}'.split(',');
       
         if(imgPath.length > 0){
         	for(var i=0; i<imgPath.length; i++){
         		console.log(imgPath[i]);
         		$('#site_img').append('<li class="aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="ease-in-out"><img src="'+imgPath[i]+'" alt="현장점검이미지" height="400" width="400"></li>');
         	}
         }
     } );
   </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        body{font-family: 'Montserrat', sans-serif; background-color:#f7f7f7;}
        h2, h3{font-weight:700;}
        .site_header{position:relative; height:680px; color:#fff; background:url(image/bg_site.png) center / cover no-repeat;  }
        .site_header .title{padding-top:180px; font-size:40px; font-weight:700; text-align: center; text-shadow: 3px 10px 12px rgba(39, 39, 39, 0.366);}
        .site_header .title span{display:block; font-size:24px;}
        .site_header .title strong{color:#ffbb00;}
        .site_info{position:absolute; bottom: 0; padding:30px 20px 30px; width:100%; transition:all 0.3s; color:#646464; font-size:14px; background-color:rgba(255,255,255,0.8); }
        .site_info strong{float:left; font-weight: bold;}
        .site_info span{display:block;  margin-left:78px;}
        .site_info p{margin-bottom:8px;}
        .site_content{padding:20px;}
        .site_content li{position:relative; margin:0 0 12px 0; height:300px; box-shadow: 3px 8px 10px rgba(177, 177, 177, 0.2); background-color: #fff; overflow:hidden;}
        .site_content li img{position:absolute; top:0; left:0; right:0; bottom:0; margin:auto; width:auto; max-width:100%; height:auto; max-height:100%;}
        .site_content h3{padding:50px 0; font-size:32px; text-align: center;}
        .site_footer{padding:20px; height:150px; color:#ddd; text-align: center; font-size:12px; background-color:#222;}
        .site_footer p{margin-top:20px; line-height:1.5;}
        /* tablet */
        @media screen and (min-width:720px) and (max-width:1099px){
            .site_header{height:800px;}
            .site_header .title{font-size:60px;}
            .site_header .title span{font-size:32px;}
            .site_info{top:450px; left:0; padding:30px 100px 0 170px; font-size:18px;}
            .site_info p{margin-bottom:12px;}
            .site_content{padding:40px;}
            .site_content h3{font-size:40px;}
            .site_content .site_img:after{display: block; content:""; clear: both;}
            .site_content .site_img li{float:left; width:calc(50% - 30px); margin:0 12px 24px;}
            .site_footer{font-size:14px;}
        }
        /* pc */
        @media screen and (min-width:1100px){
            .site_header{height:980px; }
            .site_header .title{padding-left:250px; text-align:left; font-size:100px;}
            .site_header .title span{font-size:70px;}
            .site_info{position:absolute; top:540px; padding:60px 110px; font-size:20px;}
            .site_info p{margin-bottom:12px;}
            .site_info span{margin-left:120px;}
            .site_content{padding:0 100px; }
            .site_content h3{margin:100px 0; text-align:center; color:#000; font-size:70px; font-weight:700;} 
            .site_content h3 br{display:none;}
            .site_content .site_img:after{display: block; content:""; clear: both;}
            .site_content .site_img li{float:left; width:calc(50% - 30px); margin:0 15px 30px; height:580px; line-height:580px;}
            .site_footer{margin-top:80px; padding:60px; height:250px; font-size:1em;}
        }
        @media screen and (min-width:1800px){
            .site_info{left:48%;}
            .site_info span{width:450px;}
        }
    </style>
</head>
<body>
    <div class="site_wrap">
        <header class="site_header">
            <h2 class="title"><span>이용해주셔서 감사합니다</span> <strong>'청춘클린'</strong>  입니다</h2>
            <div class="site_info">
                <p>
                    <strong>방문 일자</strong>
                    <span>${dailyInfo.visitDt}</span>
                </p>
                <p>
                    <strong>업로드 일자</strong>
                    <span>${dailyInfo.cretDt}</span>
                </p>
                <p>
                    <strong>담당자</strong>
                    <span>${dailyInfo.officerNm}</span>
                </p>
                <p>
                    <strong>지역</strong>
                    <span>${dailyInfo.areaNm}</span>
                </p>
                <p>
                    <strong>건물명</strong>
                    <span>${dailyInfo.bldgNm}</span>
                </p>
                <p>
                    <strong>주소</strong>
                    <span>${dailyInfo.dtlAddr}</span>
                </p>
                <p>
                    <strong>비고</strong>
                    <span>${dailyInfo.memo}</span>
                </p>
            </div>
        </header>
        <div class="site_content">
            <h3 class="aos-init aos-animate" data-aos="fade-down" data-aos-offset="300" data-aos-duration="1100">깨끗해진 공간을<br> 직접 확인해보세요.</h3>
            <ul class="site_img" id="site_img">
           </ul>
        </div>
        <footer class="site_footer">
            <p>본 내용의 저작권은 (주)청춘클린사에 있습니다. <br>무단으로 사용할 경우 법적 처벌을 받을 수 있습니다.</p>
            <p>TEL 055-335-5689</p>
        </footer>
    </div>
</body>
</html>