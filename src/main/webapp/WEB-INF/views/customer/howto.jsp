<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
response.setDateHeader("Expires", 0L); // Do not cache in proxy server
%>
<%@ include file="../include/header.jsp" %>
<script>
function downloadFile(file){
    window.location.assign("<%=request.getContextPath()%>" + "/template/" + file + ".pdf");
}
function bookmark_add() {
     bookmark_url  = "https://limefood.co.kr";
     bookmark_name = "라임푸드";
    
     try {
      window.external.AddFavorite(bookmark_url,bookmark_name);
     } catch(e) {
      alert('이 브라우저는 즐겨찾기 추가 기능을 지원하지 않습니다.');
      return false;
     }
 }

    function checkHome(){
    if("<%=session.getAttribute("id")%>"==null){
        location.href = "/";
    }else{
        location.href="/cust/food";
    }
  }
</script>
<body>
    <!-- 서브 sub -->
    <!-- 고객용 customer -->
    <div id="customer" class="customer">

        <!-- 퀵 바 quick bar -->
        <div class="quick_bar_wrap active">
            <div class="quick_trigger">
                <div class="quick_trigger_wrap">
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="quick_bar">
                <a href="<%=request.getContextPath()%>/template/한눈에보는_라임푸드.pdf"  class="quick_item quick01" download>
                    <img src="../img/quick_icon01.png" alt="">
                    <p>한장으로 보는<br>라임푸드 서비스</p>
                </a>
                <a href="<%=request.getContextPath()%>/template/라임푸드_매뉴얼.pdf" class="quick_item quick01" download>
                    <img src="../img/quick_icon02.png" alt="">
                    <p>라임푸드<br>사용 매뉴얼</p>
                </a>
                <a href="javascript:bookmark_add();" class="quick_item quick01">
                    <img src="../img/quick_icon03.png" alt="">
                    <p>즐겨찾기<br>추가하기</p>
                </a>
                <a href="http://pf.kakao.com/_SXnmK" class="quick_item quick01">
                    <img src="../img/quick_icon04.png" alt="">
                    <p>카카오<br>고객센터</p>
                </a>
            </div>
        </div>


        <!-- 헤더 -->
        <header id="header" class="header">
            <div class="inner">
                <a href="javascript:checkHome();" class="header_logo"><img src="../img/header_logo.png" alt="라임푸드 로고" /></a>
                <ul class="gnb">
                    <li><a href="/cust/howto" class="current">사용방법안내</a></li>
                    <li><a href="/cust/food">식자재주문</a></li>
                    <li><a href="/cust/order">주문관리</a></li>
                    <li><a href="/cust/dline">마감관리</a></li>
                </ul>
                <%  if(session.getAttribute("adminFlag") != null){
                    if(session.getAttribute("adminFlag").toString().equals("Y")){
                %>
                <a href="/admin/main" class="admin">admin</a>
                <%
                }
                }else{ %>
                    <script>location.href="/"</script>
                <%
                }  
                %> 
                <div class="my_wrap">
                    <a href="#" class="my_id">ID : <%=session.getAttribute("id")%></a>
                    <span class="bar"></span>
                    <a href="/cust/myInfo" class="my_info">나의정보보기</a>
                    <span class="bar"></span>
                    <a href="javascript:logOut()" class="logout">로그아웃</a>
                </div>
            </div>
        </header>

        <div class="howto">
            <section class="section01">
                <div class="inner">
                    <div class="txt_wrap wow fadeInDown" data-wow-duration=".8s">
                        <h2><span>라임푸드 사용방법안내</span></h2>
                    </div>
                    <div class="btn_wrap">
                        <a href="#section02" class="btn"># 라임푸드 서비스 소개 <img src="../img/view_more_icon2.png" alt=""></a>
                        <a href="#section04" class="btn"># 식자재 주문 (발주) <img src="../img/view_more_icon2.png" alt=""></a>
                        <a href="#section06" class="btn"># 주문관리 (수정, 삭제) <img src="../img/view_more_icon2.png" alt=""></a>
                        <a href="#section07" class="btn"># 마감관리 (조회) <img src="../img/view_more_icon2.png" alt=""></a>
                    </div>
                </div>
            </section>
            <section class="section02" id="section02">
                <div class="inner">
                    <div class="txt_wrap wow fadeInDown" data-wow-duration=".8s">
                        <h5># 라임푸드 서비스 소개</h5>
                        <h2><span>라임푸드 서비스</span>란?</h2>
                        <p>소상공인, 관공서, 병원 등 <span>‘식자재 정기 배송이 필요한 사업장’에 합리적인 가격으로 직배송</span> 하는 서비스 입니다.</p>
                    </div>
                </div>
            </section>
            <section class="section03" id="section03">
                <div class="inner">
                    <div class="txt_wrap wow fadeInDown" data-wow-duration=".8s">
                        <h5># 라임푸드 서비스 소개</h5>
                        <h2>라임푸드 서비스만의 <span>장점</span></h2>
                    </div>
                    <div class="flex_wrap">
                        <div class="flex_box fir wow fadeInDown" data-wow-duration=".8s" data-wow-delay=".2s">
                            <div class="icon_wrap"></div>
                            <p>합리적인 가격<br>(도매가)</p>
                        </div>
                        <div class="flex_box sec wow fadeInDown" data-wow-duration=".8s" data-wow-delay=".4s">
                            <div class="icon_wrap"></div>
                            <p>소량 및 대량<br>발주 가능</p>
                        </div>
                        <div class="flex_box thi wow fadeInDown" data-wow-duration=".8s" data-wow-delay=".6s">
                            <div class="icon_wrap"></div>
                            <p>신선식품<br>직배송</p>
                        </div>
                    </div>
                    <div class="flex_wrap">
                        <div class="flex_box fou wow fadeInDown" data-wow-duration=".8s" data-wow-delay=".2s">
                            <div class="icon_wrap"></div>
                            <p>발주이력<br>변화관리</p>
                        </div>
                        <div class="flex_box fif wow fadeInDown" data-wow-duration=".8s" data-wow-delay=".4s">
                            <div class="icon_wrap"></div>
                            <p>한눈에 보는<br>식자재 단가표</p>
                        </div>
                        <div class="flex_box six wow fadeInDown" data-wow-duration=".8s" data-wow-delay=".6s">
                            <div class="icon_wrap"></div>
                            <p>배송일<br>100% 엄수</p>
                        </div>
                    </div>
                </div>
            </section>
            <section class="section04" id="section04">
                <div class="inner">
                    <div class="txt_wrap wow fadeInDown" data-wow-duration=".8s">
                        <h5># 식사재 주문 (발주)</h5>
                        <h2><span>식자재 주문</span>은 <span>어떻게</span> 하나요?</h2>
                        <p><span>식자재 주문 화면</span>에서 <span>원하는 일자에 배송</span>되도록 필요한 식자재를 주문할 수 있답니다~ </p>
                    </div>
                </div>
            </section>
            <section class="section05" id="section05">
                <div class="inner">
                    <div class="txt_wrap wow fadeInDown" data-wow-duration=".8s">
                        <h5># 식사재 주문 (발주) - 순서</h5>
                        <h2>식자재 주문 <span>순서 안내</span></h2>
                        <ul class="step">
                            <li><span>STEP 01</span> 원하는 요청일 선택</li>
                            <li><span>STEP 02</span>주문할 식자재 검색</li>
                            <li><span>STEP 03</span>주문할 식자재 선택</li>
                            <li><span>STEP 04</span>주문수량 수정 및 상품 삭제</li>
                            <li><span>STEP 05</span>클릭 시 주문 완료</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section class="section06" id="section06">
                <div class="inner">
                    <div class="txt_wrap wow fadeInDown" data-wow-duration=".8s">
                        <h5># 주문관리 (수정, 삭제)</h5>
                        <h2><span>주문관리</span>란 뭔가요?</h2>
                        <p><span>아직 배송되지 않은 주문 내역을 수정/변경</span> 할 수 있습니다.</p>
                    </div>
                </div>
            </section>
            <section class="section07" id="section07">
                <div class="inner">
                    <div class="txt_wrap wow fadeInDown" data-wow-duration=".8s">
                        <h5># 마감관리(조회)</h5>
                        <h2><span>마감관리</span>란 뭔가요?</h2>
                        <p><span>과거에 주문했던 내역을 조회</span>할 수 있습니다.</p>
                    </div>
                </div>
            </section>


        </div>

        <%@ include file="../include/footer.jsp" %>
    </div>


</body>

</html>
