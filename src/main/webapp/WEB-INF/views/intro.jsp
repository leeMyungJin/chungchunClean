<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<%
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
response.setDateHeader("Expires", 0L); // Do not cache in proxy server

String browser = "";
String userAgent = request.getHeader("User-Agent");
if (userAgent.indexOf("Trident") > 0 || userAgent.indexOf("MSIE") > 0) {
 browser = "IE";
} else if (userAgent.indexOf("Opera") > 0) {
 browser = "Opera";
} else if (userAgent.indexOf("Firefox") > 0) {
 browser = "Firefox";
} else if (userAgent.indexOf("Safari") > 0) {
 if (userAgent.indexOf("Chrome") > 0) {
  browser = "Chrome";
 } else {
  browser = "Safari";
 }
}

%>
<!DOCTYPE html>
<html lang="kr" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta name="format-detection" content="telephone=no, email=no, address=no">
  <meta name="viewport" content="width=device-width,initial-scale=1" name="viewport">
  <meta name="keywords" content="라임푸드">
  <meta name="description" content="라임푸드">
  <meta property="og:type" content="website">
  <meta property="og:title" content="라임푸드">
  <meta property="og:image" content="img/og.jpg">
  <meta property="og:description" content="라임푸드">
  <meta property="og:url" content="">
  <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico">
  <link rel="canonical" href="">
  <title>라임푸드</title>
  <link rel="stylesheet" href="../css/reset.css">
  <link rel="stylesheet" href="../css/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>


  <script type="text/javascript">
    $(document).ready(function() {
      $("#findIdConfirm").on('click',function(){
        if(findIdValidation()){
        var params= {
                  corpNum : $("#findIdCorpNum").val(),
                  name : $("#findIdName").val(),
                  celPhone : $("#findIdCelPhone").val()
            }
            $.ajax({
              url : "<%=request.getContextPath()%>/cust/findId",
              async : false, // 비동기모드 : true, 동기식모드 : false
              type : 'POST',
              cache : false,
              dataType : null,
              data : params,
              success : function(data) {
                if(data != "" ){
                  if(data.length == 1)
                    alert('등록된 아이디는 ' + data + '입니다.');
                  else if(data.length > 1){
                    var str = '등록된 아이디는 ' + data[0];
                    for(var i =1; i < data.length ; i++)
                        str += ' ,'+  data[i];
                    str += ' 입니다.';
                    alert(str);
                  }
                }
                else
                  alert('해당 정보로 등록된 아이디가 없습니다.');
              }
            });
        }
      });

      $("#findPwdConfirm").on('click',function(){
        if(findPwdValidation()){
        var params= {
                  id : $("#findPwdId").val(),
                  corpNum : $("#findPwdCorpNum").val(),
                  name : $("#findPwdName").val(),
                  celPhone : $("#findPwdCelPhone").val()
            }
            $.ajax({
              url : "<%=request.getContextPath()%>/cust/findPwd",
              async : false, // 비동기모드 : true, 동기식모드 : false
              type : 'POST',
              cache : false,
              dataType : null,
              data : params,
              success : function(data) {
                if(data.length ==0){
                  alert('일치하는 고객정보가 없습니다.');
                  return false;
                }else{
                  $(".find_pw").removeClass('is-visible');
                  $(".pw_chg").addClass('is-visible');
                }

              }
            });
        }
      });
    });
  <%
      Cookie[] cookies = request.getCookies();
      if(cookies !=null){
          for(Cookie tempCookie : cookies){
              if(tempCookie.getName().equals("limefood_id")){
                  //쿠키값으로 대신 로그인 처리함
                  %>
                  $.ajax({
                        url : '<%=request.getContextPath()%>/login/autoLogin',
                        async : false, // 비동기모드 : true, 동기식모드 : false
                        type : 'POST',
                        cache : false,
                        dataType : 'text',
                        data : {id : "<%=tempCookie.getValue()%>" , browser : "<%=browser%>" , userAgent : "<%=userAgent%>"},
                        success : function(data) {
                          location.href="/cust/food";
                        },
                        error : function(request,status,error) {
                          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                        }
                  });
                  <%
              }
          }
      }
  %>
    // 필수 입력정보인 아이디, 비밀번호가 입력되었는지 확인하는 함수
    function checkValue()
    {
        inputForm = eval("document.loginInfo");
        if(!inputForm.id.value)
        {
            alert("아이디를 입력하세요");
            inputForm.id.focus();
            return false;
        }
        if(!inputForm.password.value)
        {
            alert("비밀번호를 입력하세요");
            inputForm.password.focus();
            return false;
        }
    }

    function autoLoginCheck(){
      if($('input#login_chk').val() =='off'){
        $('input#login_chk').val('on');
      }else{
        $('input#login_chk').val('off');
      }
    }

    function findIdValidation(){
      if($("#findIdCorpNum").val()==""){
          alert('사업자번호를 입력하시기 바랍니다.');
        return false;

      }else if($("#findIdName").val() == ""){
        alert('이름을 입력하시기 바랍니다.');
        return false;
      }else if($("#findIdCelPhone").val()==""){
        alert('휴대폰번호를 입력하시기 바랍니다.');
          return false;
      }else
        return true;
    }

     function findPwdValidation(){
        var idRule    = /^[a-zA-Z0-9]{6,}$/;
        var telRule   = /^\d{3}-\d{3,4}-\d{4}$/;
        var corpNumRule   = /^\d{3}-\d{2}-\d{5}$/;

        if($("#findPwdId").val() == ""){
          alert('아이디를 입력하시기 바랍니다.');
          return false;
        }else if(!idRule.test($("#findPwdID").val())){
          alert("아이디를 확인하시기 바랍니다.\n아이디는 소문자,숫자만 가능합니다.(6자리이상)");
          return false;
        }else if($("#findPwdCorpNum").val()==""){
            alert('사업자번호를 입력하시기 바랍니다.');
          return false;
        }else if(!corpNumRule.test($("#findPwdCorpNum").val())){
          alert("사업자 번호를 올바르게 입력하시기 바랍니다.\n예)123-45-67890");
          return false;
        }else if($("#findPwdName").val() == ""){
          alert('이름을 입력하시기 바랍니다.');
          return false;
        }else if($("#findPwdCelPhone").val()==""){
          alert('휴대폰번호를 입력하시기 바랍니다.');
            return false;
        }else if(!telRule.test($("#findPwdCelPhone").val())){
          alert('휴대폰 번호를 올바르게 입력하시기 바랍니다.예)010-0000-0000');
          return false;
        }
        return true;
      }
      function newPwdRule(){

        var inputForm = eval("document.pwdForm");

        var pwdRule1  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        var pwdRule2  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        var pwdRule3  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!pwdRule1.test(inputForm.newPwd.value) && !pwdRule2.test(inputForm.newPwd.value) && !pwdRule3.test(inputForm.newPwd.value) ){
          alert('비밀번호는 영문자(대,소문자), 숫자를 포함하여 최소 8자 이상이어야 합니다.');
          $('#newPwd').focus();
          return false;
        }else{
          return true;
        }

      }
      function newPwdCheck() {
        if($('#newPwd').val() != $('#newPwdChk').val()){
          alert('새 비밀번호가 일치하지 않습니다.');
          $('#newPwdChk').focus();
          return false;
        }else{
          newChkRule = true;
          return true;
        }

      }
      function changePwd(){
        if(newPwdRule() && newPwdCheck()){
          var url = '<%=request.getContextPath()%>/cust/updatePwd';
          var params = {
                pwd : $('#newPwd').val(),
                id  : $("#findPwdId").val(),
            };
            $.ajax({
                  url : url,
                  async : true, // 비동기모드 : true, 동기식모드 : false
                  type : 'POST',
                  cache : false,
                  dataType : null,
                  data : params,
                  success : function(data) {
                      alert('비밀번호가 변경되었습니다.');
                      $('.popup').removeClass('is-visible');
                  },
                  error : function(request,status,error) {
                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                  }
            });
        }
      }
    </script>
</head>
<body>

  <!-- 인트로 intro -->
  <div id="intro">
    <img src="../img/intro_bg_img1.png" alt="" class="bg_img bg_img1">
    <img src="../img/intro_bg_img2.png" alt="" class="bg_img bg_img2">
    <img src="../img/intro_bg_img3.png" alt="" class="bg_img bg_img3">
    <img src="../img/intro_bg_img4.png" alt="" class="bg_img bg_img4">
    <img src="../img/intro_bg_img5.png" alt="" class="bg_img bg_img5">

    <!-- 인트로 그림자 -->
    <div class="intro_wrap">

      <!-- 로그인 영역 -->
      <div class="login_area">
        <img src="../img/logo.png" alt="라임푸드 로고" class="intro_logo">
        <form name ="loginInfo" action="<%=request.getContextPath()%>/login/login" method="post">
          <fieldset class="login_form">
            <legend class="blind">로그인</legend>
            <input id="id" name="id" placeholder="아이디" type="text">
            <input id="password" name="password" placeholder="비밀번호" type="password">
            <div class="chk_wrap">
							<input type="checkbox" id="login_chk" name="login_chk" class="chk" value="off" onchange="autoLoginCheck()">
							<label for="login_chk" id="login_chk_label" class="chk_label">자동 로그인</label>
						</div>
            <input type="submit" alt="로그인" value="LOG IN" id="intro_login_submit" onClick="return checkValue()">
            <input type="hidden" id="browser" name="browser" value="<%=browser%>">
            <input type="hidden" id="userAgent" name="userAgent" value="<%=userAgent%>">

          </fieldset>
        </form>
        <div class="find_area">
          <a class="popup-trigger">아이디 찾기</a>
          <span class="bar"></span>
          <a class="popup-trigger2">비밀번호 찾기</a>
        </div>
        
        <a href="http://pf.kakao.com/_SXnmK" class="kakao_inquiry" target="_blank"><img src="../img/kakao_icon.png" alt="" >카카오톡 문의</a>
        <p class="login_notice">가입 필요 대상자는 <span>010-6398-8363 전화 문의</span> 바랍니다.</p>


      </div>
      <!-- 로그인 영역 끝 -->


      <!-- 공지 영역 있을 때 -->
      <!--
      <div class="notice_area">
        <h1>공지사항</h1>
        <div class="notice_txt">
          <p>금주 서비스 안정화를 위한 시스템 작업이 예정되어 있습니다.<br>참고하셔서 이용하시는데 불편함이 없으시길 바랍니다.</p>
          <p>[시스템 안정화 작업]</p>
          <p>작업시간 : 10/17(토) 20:00 ~ 10/18(일) 08:00 </p>
        </div>
        <div class="img_wrap">
          <h4>권장브라우저 다운로드</h4>
          <img src="img/chrome.png" alt="">
          <p>Chrome</p>
        </div>
      </div> -->
      <!-- 공지 영역 있을 때  끝 -->


    </div>


    <div class="term_area">
      <a href="/terms">라임푸드 이용약관</a>
      <span class="bar"></span>
      <a href="/personalTerms">라임푸드 개인정보수집약관</a>
    </div>
       <div class="popup find_id" role="">
      <div class="popup_container">
        <div class="popup_head">
          <p class="popup_tit">아이디 찾기</p>
          <a href="#0" class="popup_close"></a>
        </div>
        <div class="inner">
          <form class="" action="" method="post">
            <table class="table_style01">
              <tbody>
                <tr>
                  <th>사업자번호</th>
                  <td><input type="text" id="findIdCorpNum" name="findIdCorpNum" value=""  placeholder="123-45-67890" required></td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td><input type="text" id="findIdName" name="findIdName" value="" maxlength="7" placeholder="홍길동" required></td>
                </tr>
                <tr>
                  <th>휴대폰번호</th>
                  <td><input type="text" id="findIdCelPhone" name="findIdCelPhone" value="" maxlength="13" placeholder="010-1234-1234" required></td>
                </tr>
              </tbody>
            </table>
            <div class="btn_wrap" style="margin-top:18px;">
              <button type="button" class="btn_cancel" id ="findIdCancel">취소</button>
              <button type="button" class="btn_confirm" id="findIdConfirm">확인</button>
            </div>
          </form>

        </div>
      </div>
    </div> <!-- popup -->

    <!-- 팝업 -->
    <script>
      jQuery(document).ready(function($) {
        //open popup
        $('.popup-trigger').on('click', function(event) {
          event.preventDefault();
          $("#findIdCorpNum").val("");
          $("#findIdName").val("");
          $("#findIdCelPhone").val("");
          $('.find_id').addClass('is-visible');
        });

        //close popup
        $('.find_id').on('click', function(event) {
          if ($(event.target).is('.popup_close') || $(event.target).is('.popup')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
          }
        });
        //close popup when clicking the esc keyboard button
        $(document).keyup(function(event) {
          if (event.which == '27') {
            $('.find_id').removeClass('is-visible');
          }
        });
      });
    </script>

    <!-- 팝업 - 비밀번호찾기  -->
    <div class="popup find_pw" role="">
      <div class="popup_container">
        <div class="popup_head">
          <p class="popup_tit">비밀번호 찾기</p>
          <a href="#0" class="popup_close"></a>
        </div>
        <div class="inner">
          <form class="" action="" method="post">
            <table class="table_style01">
              <tbody>
                <tr>
                  <th>아이디<span class="essential">*</span></th>
                  <td><input type="text" id="findPwdId" name="findPwdId" value=""  placeholder="" required></td>
                </tr>
                <tr>
                  <th>사업자번호<span class="essential">*</span></th>
                  <td><input type="text" id="findPwdCorpNum" name="findPwdCorpNum" value=""  maxlength="12" placeholder="123-45-67890" required></td>
                </tr>
                <tr>
                  <th>이름<span class="essential">*</span></th>
                  <td><input type="text" id="findPwdName" name="findPwdName" value="" maxlength="7" placeholder="홍길동" required></td>
                </tr>
                <tr>
                  <th>휴대폰번호<span class="essential">*</span></th>
                  <td><input type="text" id="findPwdCelPhone" name="findPwdCelPhone" value="" maxlength="13" placeholder="010-0000-0000" required></td>
                </tr>
              </tbody>
            </table>
            <div class="btn_wrap" style="margin-top:18px;">
              <button type="button" class="btn_cancel" id="findPwdCancel">취소</button>
              <button type="button" class="btn_confirm" id="findPwdConfirm">확인</button>
            </div>
          </form>

        </div>
      </div>
    </div> <!-- popup -->

    <!-- 팝업 -->
    <script>
      jQuery(document).ready(function($) {
        //open popup
        $('.popup-trigger2').on('click', function(event) {
          event.preventDefault();
          $("#findPwdId").val("");
            $("#findPwdName").val("");
            $("#findPwdCorpNum").val("");
            $("#findPwdCelPhone").val("");
          $('.find_pw').addClass('is-visible');
        });

        //close popup
        $('.find_pw').on('click', function(event) {
          if ($(event.target).is('.popup_close') || $(event.target).is('.find_pw')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
          }
        });
        //close popup when clicking the esc keyboard button
        $(document).keyup(function(event) {
          if (event.which == '27') {
            $('.find_pw').removeClass('is-visible');
            $('.find_pw').removeClass('is-visible');
            $('.pw_chg').removeClass('is-visible');
          }
        });
        $('.btn_cancel').on('click',function(event){
           $('.find_id').removeClass('is-visible');
          $('.find_pw').removeClass('is-visible');
          $('.pw_chg').removeClass('is-visible');
        });

        //close popup
        $('.pw_chg').on('click', function(event) {
          if ($(event.target).is('.popup_close') || $(event.target).is('.pw_chg')) {
            event.preventDefault();
            $(this).removeClass('is-visible');
          }
        });
      });
    </script>
  </div>

<div class="popup pw_chg" role="">
    <div class="popup_container" style = "min-height:0px">
      <div class="popup_head">
        <p class="popup_tit">비밀번호변경</p>
        <a class="popup_close"></a>
      </div>
      <div class="inner">
        <form class="" action="" id="pwdForm" name="pwdForm" method="post">
          <table class="table_style01">
            <tbody>
              <tr>
                <th>새 비밀번호</th>
                <td><input type="password" id="newPwd" name="newPwd" value="" maxlength="20" placeholder="" required onchange="newPwdRule()"></td>
              </tr>
              <tr>
                <th>새 비밀번호 확인</th>
                <td><input type="password" id="newPwdChk" name="newPwdChk" value="" maxlength="20" placeholder="" required onchange="newPwdCheck()"></td>
              </tr>
            </tbody>
          </table>
          <div class="btn_wrap" style="margin-top:18px;">
            <button type="button" class="btn_cancel">취소</button>
            <button type="button" class="btn_confirm" onclick="changePwd()">변경</button>
          </div>
        </form>
      </div>
    </div>
  </div> <!-- popup -->

</body>
</html>
