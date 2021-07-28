<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
var staffId = "<%=session.getAttribute("staffId")%>";

function pageLoad(){
	sessionCheck(staffId);
	
	$('#statistics').addClass("current");
}
</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        
        <div class="admin_container">
            <div class="admin_section">
                <h2 class="admin_title" onclick='test()'>매출통계</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>금년 매출액</dt>
                        <dd>0000원</dd>
                    </dl>
                    <dl>
                        <dt>금년 월관리 건수</dt>
                        <dd>0000건</d>
                    </dl>
                    <dl>
                        <dt>금년 부가수익 건수</dt>
                        <dd>0000건</dd>
                    </dl>
                    <dl>
                        <dt>금년 재료비</dt>
                        <dd>0000원</dd>
                    </dl>
                </div>
                <div class="admin_box">
                    <section>
                        <h3 class="title">매출비율</h3>
                        <div class="content">도표가 들어올 영역입니다</div>
                    </section>
                    <section>
                        <h3 class="title">3개월간 매출통계</h3>
                        <div class="content">도표가 들어올 영역입니다</div>
                    </section>
                    <section>
                        <h3 class="title">분야별 매출</h3>
                        <div class="content">도표가 들어올 영역입니다</div>
                    </section>
                    <section>
                        <h3 class="title">부가수익 세부매출</h3>
                        <div class="content">도표가 들어올 영역입니다</div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</body>
</html>