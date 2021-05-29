<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
response.setDateHeader("Expires", 0L); // Do not cache in proxy server
%>

<%@ include file="./include/header.jsp" %>

<script type="text/javascript">
     function setCookie(name, value, expiredays) {
        var date = new Date();
        date.setDate(date.getDate() + expiredays);
        document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString();
    }

    function closePopup() {
        if (document.getElementById("check").checked) {
            setCookie("popupYN"+"${index}", "N", 3);
        }
            self.close();
    }
</script>

<body class="popup_notice">
    ${content}
    <div class="popup_notice_check">
        <input type="checkbox" id="check"><fontsize=3> <b>체크 시 3일간 팝업 보지 않기</b> </font>
        <button type="button"  onclick="closePopup();">닫기</button>
    </div>
</body>
