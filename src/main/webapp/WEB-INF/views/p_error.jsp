<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="청춘클린">
    <meta name="keywords" content="청춘클린, 오류 페이지">
    <meta name="description" content="청춘클린 오류 페이지">
    <link rel="icon" href="../../image/icon_favicon.ico" type="image/ico">
    <link rel="shortcut icon" href="../../error/icon_favicon.ico"/>
    <title>청춘클린</title>
    <link rel="stylesheet" href="../../error/reset.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <style>
        .error_wrap{width:100vw; height:100vh; background:#fff url(../../error/bg_error.png) center / contain no-repeat; transition:all 0.3s;}
        @media screen and (max-width:1099px){
            .error_wrap{background-image: url(../../error/bg_mobile_error.png);}
        }
    </style>
</head>
<body>
<div class="error_wrap"></div>
</body>
</html>s