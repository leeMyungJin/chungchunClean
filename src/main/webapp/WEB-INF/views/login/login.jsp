<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>청춘클린</title>
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/common.css">
</head>

<body>
    <div class="login_wrap">
        <!--로그인 영역-->
        <div class="login_box">
            <h1 class="logo logo">로고</h1>
            <form action="<%=request.getContextPath()%>/login/main" id="login_form" method="post" name="login_form">
                <fieldset class="login_fld">
                    <legend class="blind">로그인</legend>
                    <input type="text" id="identity" name="identity" placeholder="아이디">
                    <input type="password" id="password" name="password" placeholder="비밀번호">
                    <div class="login_check">
                        <input type="checkbox" id="auto-login" name="auto-login">
                        <label for="auto-login">자동 로그인</label>
                    </div>
                    <button type="submit" class="login_btn">login</button>
                </fieldset>
            </form>
            <p>아이디 / 비밀번호 찾기는 관리자에게 문의바랍니다</p>
        </div>
        <div class="terms_area">
            <a href="#">청춘클린 이용약관</a>
            <a href="#">청춘클린 개인정보수집약관</a>
        </div>
    </div>
</body>
</html>