<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<%
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
response.setDateHeader("Expires", 0L); // Do not cache in proxy server
%>
<%@ include file="../include/header.jsp" %>
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false"></script>
<script type="text/javascript">
var newRule = false;
var newChkRule = false;
    function update(){
         inputForm = eval("document.myInfo");
         // 기본 입력 체크 
          if(!inputForm.name.value)
          {
              alert("이름을 입력하세요.");    
              inputForm.name.focus();
              return false;
          }else if(!inputForm.telPhone.value){
              alert("전화번호를 입력하세요.예)02-123-1234");    
              inputForm.telPhone.focus();
              return false;
          }else if(!inputForm.celPhone.value){
              alert("휴대폰번호를 입력하세요.예)010-1234-1234");    
              inputForm.celPhone.focus();
              return false;              
          }else if(!inputForm.email.value){
              alert("이메일을 입력하세요.예)limefood@limefood.co.kr");    
              inputForm.email.focus();
              return false;              
          }else if(!inputForm.corpName.value){
              alert("사업장명을 입력하세요.");    
              inputForm.corpName.focus();
              return false;              
          }else if(!inputForm.corpNum.value){
              alert("사업자번호를 입력하세요.예)123-45-67890");    
              inputForm.corpName.focus();
              return false;              
          }else if(!inputForm.basAddr.value){
              alert("주소를 입력하세요.");    
              inputForm.addr.focus();
              return false;              
          }

          // 입력값 체크
          // 정규식
          var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
          var telRule   = /^\d{2,3}-\d{3,4}-\d{4}$/;
          var celRule   = /^\d{3}-\d{3,4}-\d{4}$/;

          if(!emailRule.test(inputForm.email.value)){
            alert("이메일을 확인하시기 바랍니다.");
            inputForm.email.focus();
              return false;
          }else if(!telRule.test(inputForm.telPhone.value)){  // 전화번호
            alert("전화번호를 올바르게 입력하시기 바랍니다.\n예)02-1234-1234");
            inputForm.telPhone.focus();
              return false;
          }else if(!celRule.test(inputForm.celPhone.value)){  // 휴대폰번호
            alert("휴대폰번호를 올바르게 입력하시기 바랍니다.\n예)010-1234-1234");
            inputForm.celPhone.focus();
              return false;
          }else if(!checkBizNum(inputForm.corpNum.value)){  // 사업자번호
            alert("사업자 번호를 올바르게 입력하시기 바랍니다.\n예)123-45-67890");
            inputForm.corpNum.focus();
              return false;
          }
          inputForm.submit();
    }

    function cancel(){
      location.href = "/cust/myInfo";
    }

    function checkBizNum(corpNum){
      var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
      var tmpBizID, i, chkSum=0, c2, remander;
      corpNum = corpNum.replace(/-/gi,'');
 
      for (i=0; i<=7; i++){
        chkSum += checkID[i] * corpNum.charAt(i);
      }
      c2 = "0" + (checkID[8] * corpNum.charAt(8));
      c2 = c2.substring(c2.length - 2, c2.length);
      chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
      remander = (10 - (chkSum % 10)) % 10 ;
 
      if (Math.floor(corpNum.charAt(9)) == remander) {
        return true ; // OK!
      }
      return false;
    }
  function daumAddr(){
    daum.postcode.load(function(){
        new daum.Postcode({
            oncomplete: function(data) {
                var addr = ''; // 주소 변수

                //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                    addr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                    addr = data.jibunAddress;
                }

                // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                if(data.userSelectedType === 'R'){
                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        addr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        addr += (addr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if(addr !== ''){
                        addr = ' (' + addr + ')';
                    }
                    // 조합된 참고항목을 해당 필드에 넣는다.
                    document.getElementById("basAddr").value = addr;
                
                } else {
                    document.getElementById("basAddr").value = '';
                }

                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById("basAddr").value = addr;
            }
        }).open();
    });
  }

  function checkHome(){
    if("<%=session.getAttribute("id")%>"==null){
        location.href = "/";
    }else{
        location.href="/cust/food";
    }
  }
</script>
<script type="text/javascript">

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
function nowPwdCheck(){
  var url = '<%=request.getContextPath()%>/cust/checkPwd';
  var params = {
        pwd : $('#nowPwd').val(),
        id   :  "<%=(String)session.getAttribute("id")%>",
    };
    $.ajax({
          url : url,
          async : true, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          data : params,
          success : function(data) {
            if(!data){
              alert('현재 비밀번호를 확인하시기 바랍니다.');
              $('#nowPwd').focus();
              return ;
            }
          },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
    });   
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

function clearData(){
  $('#nowPwd').val('');
  $('#newPwd').val('');
  $('#newPwdChk').val('');
}

function changePwd(){
  if(newPwdRule() && newPwdCheck()){
    var url = '<%=request.getContextPath()%>/cust/updatePwd';
    var params = {
          pwd : $('#newPwd').val(),
          id   :  "<%=(String)session.getAttribute("id")%>",
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
<body>


  <!-- 서브 sub -->
  <!-- 고객용 customer -->
  <div id="customer" class="customer">
    <!-- 헤더 스타일1 header style1 -->
    <header id="header" class="header">
      <div class="inner">
        <a href="javascript:checkHome()" class="header_logo"><img src="../img/header_logo.png" alt="라임푸드 로고"></a>
        <ul class="gnb">
          <li><a href="/cust/howto">사용방법안내</a></li>
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


    <div class="sub_cont_area">
      <h1 class="sub_tit">나의정보</h1>
      <div class="myinfo">
        <div class="inner">
          <form name ="myInfo" class="" action="<%=request.getContextPath()%>/cust/upInfo" method="post">
          <span class="essential essential_tit">* 필수항목</span>
          <table class="table_style01">
            <tbody>
              <tr>
                <th>아이디</th>
                <td><%=session.getAttribute("id")%></td>
              </tr>
              <tr>
                <th>비밀번호 <span class="essential">*</span></th>
                <td><button type="button" class="chg_btn">비밀번호 변경</button></td>
              </tr>
              <tr>
                <th>이름 <span class="essential">*</span></th>
                <td><input type="text" id="name" name="name" value="<%=session.getAttribute("name")%>" maxlength="7" placeholder="" required></td>
              </tr>
              <tr>
                <th>전화번호 <span class="essential">*</span></th>
                <td><input type="text" id="telPhone" name="telPhone" value="<%=session.getAttribute("telPhone")%>" maxlength="13" placeholder="" required></td>
              </tr>
              <tr>
                <th>휴대폰번호 <span class="essential">*</span></th>
                <td><input type="text" id="celPhone" name="celPhone" value="<%=session.getAttribute("celPhone")%>" maxlength="13" placeholder="" required></td>
              </tr>
              <tr>
                <th>이메일 <span class="essential">*</span></th>
                <td><input type="email" id="email" name="email" value="<%=session.getAttribute("email")%>" placeholder="" required></td>
              </tr>
              <tr>
                <th>사업장명 <span class="essential">*</span></th>
                <td><input type="text" id="corpName" name="corpName" value="<%=session.getAttribute("corpName")%>" placeholder="" required></td>
              </tr>
              <tr>
                <th>사업자번호 <span class="essential">*</span></th>
                <td><input type="text" id="corpNum" name="corpNum" value="<%=session.getAttribute("corpNum")%>" maxlength="12"placeholder="" required></td>
              </tr>              
                  <tr>
                    <th>주소 <span class="essential">*</span></th>
                    <td>
                      <input type="text" class="addr" id="basAddr" name="basAddr" rows="3" value="<%=session.getAttribute("basAddr")%>" placeholder="" required onClick="daumAddr()">
                      <input type="text" class="addr" id="dtlAddr" name="dtlAddr" rows="3" value="<%=session.getAttribute("dtlAddr")%>" placeholder="" required >
                    </td>
                  </tr>
            </tbody>
          </table>
          <div class="btn_wrap">
            <button type="button" class="btn_cancel" onClick="return cancel()">취소</button>
            <button type="button" class="btn_confirm" onClick="return update()">수정</button>
          </div>
        </form>
        </div>
      </div>
    </div>
    <%@ include file="../include/footer.jsp" %>
  </div>
  <div class="popup pw_chg" role="">
    <div class="popup_container">
      <div class="popup_head">
        <p class="popup_tit">비밀번호변경</p>
        <a class="popup_close"></a>
      </div>
      <div class="inner">
        <form class="" action="" id="pwdForm" name="pwdForm" method="post">
          <table class="table_style01">
            <tbody>
              <tr>
                <th>현재 비밀번호</th>
                <td><input type="password" id="nowPwd" name="nowPwd" value="" maxlength="20" placeholder="" required onchange="nowPwdCheck()"></td>
              </tr>
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

  <!-- 팝업 -->
  <script>
    jQuery(document).ready(function($) {
      if("<%=session.getAttribute("id")%>"== null){
        location.href="/";
      }      
      //open popup
      $('.chg_btn').on('click', function(event) {
        event.preventDefault();
        clearData();
        newRule = false;
        newChkRule = false;
        $('.popup').addClass('is-visible');
      });

      //close popup
      $('.popup').on('click', function(event) {
        if ($(event.target).is('.btn_cancel') || $(event.target).is('.popup_close')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
        }
      });
      //close popup when clicking the esc keyboard button
      $(document).keyup(function(event) {
        if (event.which == '27') {
          $('.popup').removeClass('is-visible');
        }
      });
    });
  </script>


</body>

</html>
