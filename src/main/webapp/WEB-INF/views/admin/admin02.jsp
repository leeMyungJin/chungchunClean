<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
response.setDateHeader("Expires", 0L); // Do not cache in proxy server
%>
<%@ include file="../include/header.jsp" %>
<script>
var custGrid;
var excelGrid;
var corpListGrid;
var corpGrid;
var dupCheck = false;
var regCheck = false;
  function checkHome(){
    if("<%=session.getAttribute("id")%>"==null){
        location.href = "/";
    }else{
        location.href="/admin/main";
    }
  }
  //계정 등록
  function regist(){
         inputForm = eval("document.custInfo");
         // 기본 입력 체크
          if(!inputForm.name.value)
          {
              alert("이름을 입력하세요");
              inputForm.name.focus();
              return false;
          }else if(!inputForm.telPhone.value){
              alert("전화번호를 입력하세요");
              inputForm.telPhone.focus();
              return false;
          }else if(!inputForm.celPhone.value){
              alert("휴대폰번호를 입력하세요");
              inputForm.celPhone.focus();
              return false;
          }else if(!inputForm.email.value){
              alert("이메일을 입력하세요");
              inputForm.email.focus();
              return false;
          }else if(!inputForm.corpName.value){
              alert("사업장명을 입력하세요");
              inputForm.corpName.focus();
              return false;
          }else if(!inputForm.corpNum.value){
              alert("사업자번호를 입력하세요");
              inputForm.corpName.focus();
              return false;
          }else if(!inputForm.basAddr.value){
              alert("주소를 입력하세요");
              inputForm.basAddr.focus();
              return false;
          }

          // 입력값 체크
          // 정규식
          var idRule    = /^[a-zA-Z0-9]{6,}$/;
          var pwdRule1  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          var pwdRule2  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
          var pwdRule3  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
          var telRule   = /^\d{2,3}-\d{3,4}-\d{4}$/;
          var celRule   = /^\d{3}-\d{3,4}-\d{4}$/;
          var corpNumRule   = /^\d{3}-\d{2}-\d{5}$/;

          if(!idRule.test(inputForm.id.value)){
            alert("아이디를 확인하시기 바랍니다.\n아이디는 소문자,숫자만 가능합니다.(6자리이상)");
            return false;
          }else if(!pwdRule1.test(inputForm.password.value) && !pwdRule2.test(inputForm.password.value) && !pwdRule3.test(inputForm.password.value)){
            alert("비밀번호를 확인하시기 바랍니다.\n비밀번호는 영문자(대,소문자), 숫자를 포함하여 최소 8자 이상이어야 합니다.");
            inputForm.password.focus();
              return false;
          }else if(!emailRule.test(inputForm.email.value)){ //이메일
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
          }else if(!corpNumRule.test(inputForm.corpNum.value)){
            alert("사업자 번호를 올바르게 입력하시기 바랍니다.\n예)123-45-67890");
            inputForm.corpNum.focus();
            return false;
          }
          // else if(!checkBizNum(inputForm.corpNum.value)){  // 사업자번호
          //   alert("사업자 번호를 올바르게 입력하시기 바랍니다.\n예)123-56-67890");
          //   inputForm.corpNum.focus();
          //     return false;
          // }
          else if(!dupCheck){
            alert('아이디 중복확인을 먼저 하시기 바랍니다.');
            return false;
          }else if(!regCheck){
            alert('등록된 아이디가 존재합니다.\n다른 아이디를 사용하시기 바랍니다.');
            return false;
          }else if(regCheck && dupCheck)
            inputForm.submit();    
  }
  // 사업자번호 Validation
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

    //계정생성 팝업 초기화
  function init() {
    inputForm = eval("document.custInfo");
    inputForm.id.value="";
    inputForm.password.value="";
    inputForm.name.value="";
    inputForm.telPhone.value="";
    inputForm.celPhone.value="";
    inputForm.email.value="";
    inputForm.corpName.value="";
    inputForm.corpNum.value="";
    inputForm.basAddr.value="";
    inputForm.dtlAddr.value="";
  }
    function chgInit(event) {
    $(".popup_container").scrollTop(0);
    inputForm = eval("document.chg_custInfo");
    inputForm.chg_id.value=event.item.id;
    inputForm.chg_password.value="";
    inputForm.chg_name.value=event.item.name;
    inputForm.chg_telPhone.value=event.item.telPhone;
    inputForm.chg_celPhone.value=event.item.celPhone;;
    inputForm.chg_email.value=event.item.email;
    inputForm.chg_corpName.value=event.item.corpName;
    inputForm.chg_corpNum.value=event.item.corpNum;
    inputForm.chg_basAddr.value=event.item.basAddr;
    inputForm.chg_dtlAddr.value=event.item.dtlAddr;
    inputForm.remark.value=event.item.remark;
    inputForm.searchCorp.value="";

    if(event.item.adminFlag == 'Y'){
      $("#mem_admin_chk").prop('checked',true);
      $("#mem_admin_chk").val('on');
    }else{
      $("#mem_admin_chk").prop('checked',false);
      $("#mem_admin_chk").val('off');
    }
    if(event.item.lockFlag == 'Y'){
      $("#mem_stop_chk").prop('checked',true);
      $("#mem_stop_chk").val('on');
    }else{
      $("#mem_stop_chk").prop('checked',false);
      $("#mem_stop_chk").val('off');
    }

    AUIGrid.clearGridData("#corp_Grid");
    AUIGrid.clearGridData("#corpList_Grid");
  }
  // 고객 조회
  function searchCust() {
    var cond = document.searchForm.cond.value;
    var value = document.searchForm.search.value;
    var params = {
        cond : cond ,
        value : value
    };

    $.ajax({
          url : '<%=request.getContextPath()%>/admin/infoList',
          async : true, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          data : params,
          success : function(data) {
            AUIGrid.setGridData("#grid_wrap", data);
            AUIGrid.setGridData(excelGrid, data);
          },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
    });
  }
// 사업장 조회
 function searchCorp() {
    var params = {
        corp : document.chg_custInfo.searchCorp.value,
        id : document.chg_custInfo.chg_id.value
    };

    $.ajax({
          url : '<%=request.getContextPath()%>/admin/getCorpList',
          async : true, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          data : params,
          success : function(data) {
            AUIGrid.setGridData("#corpList_Grid", data);
          },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
    });
  }



  // 그리드 영역
// AUIGrid 생성 후 반환 ID


// document ready (jQuery 의 $(document).ready(function() {}); 과 같은 역할을 합니다.
function documentReady() {
	// AUIGrid 그리드를 생성합니다.
	createAUIGrid();
	// 데이터 요청, 요청 성공 시 AUIGrid 에 데이터 삽입합니다.

};

//AUIGrid 칼럼 설정
var custLayout = [{
		dataField : "name",
		headerText : "이름",
		width :"7%"
	},{
		dataField : "id",
		headerText : "ID",
		width : "7%"
	}, {
		dataField : "lastLogin",
		headerText : "최근 접속일",
		width : "10%"
	}, {
		dataField : "cretTime",
		headerText : "계정생성일",
		width :"10%"
	}, {
		dataField : "corpName",
		headerText : "사업장명",
		width : "13%"
	}, {
		dataField : "email",
		headerText : "Email",
		width : "13%"
	},{
		dataField : "adminFlag",
		headerText : "관리자여부",
    width : "5%",
    visible : true
  },{
		dataField : "lockFlag",
		headerText : "회원정지여부",
    width : "7%",
    visible : true
  }, {
		dataField : "browser",
		headerText : "브라우저",
		width : "5%"
	}, {
		dataField : "remark",
		headerText : "메모",
		width : "16%"
	}, {
		dataField : "edit",
		headerText : "정보수정",
    width : "7%",
    renderer:{
        type : "ButtonRenderer",
        labelText : "수정",
        onClick : function(event){
          // alert("정보수정 팝업띄우기");
          chgInit(event);
          getChild();
          $('.mem_chg').addClass('is-visible');
        }

    }
	}, {
		dataField : "telPhone",
		headerText : "전화번호",
    width : "20%",
    visible : false
	}, {
		dataField : "celPhone",
		headerText : "휴대폰번호",
    width : "20%",
    visible : false
	}, {
		dataField : "corpNum",
		headerText : "사업자번호",
    width : "20%",
    visible : false
	}, {
		dataField : "basAddr",
		headerText : "기본주소",
    width : "20%",
    visible : false
	}, {
		dataField : "dtlAddr",
		headerText : "상세주소",
    width : "20%",
    visible : false
  }];


  var excelLayout = [{
		dataField : "name",
		headerText : "이름",
		width :"10%"
	},{
		dataField : "id",
		headerText : "ID",
		width : "10%"
	}, {
		dataField : "lastLogin",
		headerText : "최근 접속일",
		width : "10%"
	}, {
		dataField : "cretTime",
		headerText : "계정생성일",
		width :"10%"
	}, {
		dataField : "corpName",
		headerText : "사업장명",
		width : "15%"
	}, {
		dataField : "corpNum",
		headerText : "사업자번호",
    width : "20%",
	},{
		dataField : "email",
		headerText : "Email",
		width : "15%"
	},{
		dataField : "adminFlag",
		headerText : "관리자여부",
		width : "5%"
	},{
		dataField : "lockFlag",
		headerText : "회원정지여부",
		width : "7%"
	}, {
		dataField : "browser",
		headerText : "브라우저",
		width : "5%"
	}, {
		dataField : "remark",
		headerText : "메모",
		width : "20%"
	}, {
		dataField : "edit",
		headerText : "정보수정",
    width : "10%",
    renderer:{
        type : "ButtonRenderer",
        labelText : "수정",
        onClick : function(event){
          // alert("정보수정 팝업띄우기");
          chgInit(event);
          getChild();
          $('.mem_chg').addClass('is-visible');
        }

    }
	}, {
		dataField : "telPhone",
		headerText : "전화번호",
    width : "10%",
	}, {
		dataField : "celPhone",
		headerText : "휴대폰번호",
    width : "10%",
	}, {
		dataField : "basAddr",
		headerText : "기본주소",
    width : "40%",
	}, {
		dataField : "dtlAddr",
		headerText : "상세주소",
    width : "10%",
  }];

  var corpListLayout = [{
		dataField : "corpName",
		headerText : "사업장명",
    width : "50%"
  },{
		dataField : "name",
		headerText : "이름",
    width : "30%"
  },{
		dataField : "id",
		headerText : "사업장id",
    width : "20%",
    visible : false
  },{
		dataField : "add",
		headerText : "추가",
    width : "20%",
    renderer:{
        type : "ButtonRenderer",
        labelText : "추가",
        onClick : function(event){
            var item = {
              "corpName" : event.item.corpName,
              "name" : event.item.name,
              "id" : event.item.id
            };
            if(AUIGrid.isUniqueValue(corpGrid, "id", event.item.id))
              AUIGrid.addRow("#corp_Grid", item, "last");
            else
              alert("이미 추가된 사업장입니다.");
        }

    }
  }];
  var corpLayout = [{
		dataField : "corpName",
		headerText : "사업장명",
    width : "50%"
  },{
		dataField : "name",
		headerText : "이름",
    width : "30%"
  },{
		dataField : "id",
		headerText : "사업장id",
    width : "20%",
    visible : false
  },{
		dataField : "del",
		headerText : "삭제",
    width : "20%",
    renderer:{
        type : "ButtonRenderer",
        labelText : "삭제",
        onClick : function(event){
          AUIGrid.removeRow(corpGrid, "selectedIndex");
        }
    }
  }];

function createAUIGrid() {
	//그리드 설정
	var auiGridProps = {};
	auiGridProps.enableSorting = true;
  //페이징 설정
  auiGridProps.usePaging = true;
	// singleRow 선택모드
	auiGridProps.selectionMode = "multipleCells";
	// 고정 칼럼 1개
	auiGridProps.fixedColumnCount = 1;
	// 줄번호 칼럼 렌더러 출력
  auiGridProps.showRowNumColumn = true;
	// 체크박스 표시 렌더러 출력 안함
  auiGridProps.showRowCheckColumn = false;
  //그리드 가로세로 설정.
  // auiGridProps.width= 1550;
  auiGridProps.height= 500;
  auiGridProps.autoGridHeight = false;
  auiGridProps.enableRestore =false;
  //페이지 출력 행 개수
  auiGridProps.showPageRowSelect=true;
    auiGridProps.pageRowCount=100;
  auiGridProps.pageRowSelectValues=[20, 40, 60 , 80, 100];

  auiGridProps.enableMovingColumn=true;

  auiGridProps.noDataMessage="회원이 존재하지 않습니다.";

  var corpProps = {
      // rowIdField : "id",
      enableSorting: true,
      usePaging : true,
      selectionMode : "multipleCells",
      showRowNumColumn : true,
      // softRemoveRowMode : false,
      // width : 550,
      height : 300,
      autoGridHeight : false,
      enableRestore : false,
      showPageRowSelect : true ,
      // pageRowCount : 5,
      pageRowSelectValues : [20, 40, 60 , 80, 100],
      noDataMessage : "사업장이 존재하지 않습니다."
  };

	// 실제로 #grid_wrap 에 그리드 생성
  custGrid = AUIGrid.create("#grid_wrap", custLayout, auiGridProps);
  excelGrid = AUIGrid.create("#grid_excel", excelLayout, auiGridProps);
  corpListGrid = AUIGrid.create("#corpList_Grid",corpListLayout, corpProps);
  corpGrid = AUIGrid.create("#corp_Grid",corpLayout, corpProps);
}
function exportToLocal() {

	var excelProps = {
    fixedColumnCount : 1,
		sheetName : "고객정보",
    exceptColumnFields : ["edit"], // 이름, 제품, 컬러는 아예 엑셀로 내보내기 안하기.
    showRowNumColumn : true
	};
  AUIGrid.exportToXlsx(excelGrid, excelProps);
};

// 윈도우 리사이징 이벤트
window.onresize = function() {
	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
	if (typeof custGrid !== "undefined") {
		AUIGrid.resize(custGrid);
	}
};

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

  function daumAddrChg(){
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

  function enterKey(type){
    if (window.event.keyCode == '13') {
      if(type == 'cust')
        searchCust();
      else
        searchCorp();
    }
  }

  function saveCust(){
    //고객정보 저장
    inputForm = eval("document.chg_custInfo");
         // 기본 입력 체크
          if(!inputForm.chg_name.value)
          {
              alert("이름을 입력하세요");
              inputForm.chg_name.focus();
              return false;
          }else if(!inputForm.chg_telPhone.value){
              alert("전화번호를 입력하세요");
              inputForm.chg_telPhone.focus();
              return false;
          }else if(!inputForm.chg_celPhone.value){
              alert("휴대폰번호를 입력하세요");
              inputForm.chg_celPhone.focus();
              return false;
          }else if(!inputForm.chg_email.value){
              alert("이메일을 입력하세요");
              inputForm.chg_email.focus();
              return false;
          }else if(!inputForm.chg_corpName.value){
              alert("사업장명을 입력하세요");
              inputForm.chg_corpName.focus();
              return false;
          }else if(!inputForm.chg_corpNum.value){
              alert("사업자번호를 입력하세요");
              inputForm.chg_corpName.focus();
              return false;
          }else if(!inputForm.chg_basAddr.value){
              alert("주소를 입력하세요");
              inputForm.chg_basAddr.focus();
              return false;
          }

          // 입력값 체크
          // 정규식
          var idRule    = /^[a-zA-Z0-9]{6,}$/;
          var pwdRule1  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
          var pwdRule2  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
          var pwdRule3  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
          var telRule   = /^\d{2,3}-\d{3,4}-\d{4}$/;
          var celRule   = /^\d{3}-\d{3,4}-\d{4}$/;
          var corpNumRule   = /^\d{3}-\d{2}-\d{5}$/;

         if(!emailRule.test(inputForm.chg_email.value)){ //이메일
            alert("이메일을 확인하시기 바랍니다.");
            inputForm.chg_email.focus();
              return false;
          }else if(!telRule.test(inputForm.chg_telPhone.value)){  // 전화번호
            alert("전화번호를 올바르게 입력하시기 바랍니다.\n예)02-1234-1234");
            inputForm.chg_telPhone.focus();
              return false;
          }else if(!celRule.test(inputForm.chg_celPhone.value)){  // 휴대폰번호
            alert("휴대폰번호를 올바르게 입력하시기 바랍니다.\n예)010-1234-1234");
            inputForm.chg_celPhone.focus();
              return false;
          }else if(!corpNumRule.test(inputForm.chg_corpNum.value)){
            alert("사업자 번호를 올바르게 입력하시기 바랍니다.\n예)123-45-67890");
            inputForm.chg_corpNum.focus();
            return false;
          }
          // else if(!checkBizNum(inputForm.corpNum.value)){  // 사업자번호
          //   alert("사업자 번호를 올바르게 입력하시기 바랍니다.\n예)123-56-67890");
          //   inputForm.corpNum.focus();
          //     return false;
          // }
    var params = {
        id : document.chg_custInfo.chg_id.value,
        password : document.chg_custInfo.chg_password.value,
        name : document.chg_custInfo.chg_name.value,
        telphone : document.chg_custInfo.chg_telPhone.value,
        celphone : document.chg_custInfo.chg_celPhone.value,
        email : document.chg_custInfo.chg_email.value,
        corpName : document.chg_custInfo.chg_corpName.value,
        corpNum : document.chg_custInfo.chg_corpNum.value,
        basAddr : document.chg_custInfo.chg_basAddr.value,
        dtlAddr : document.chg_custInfo.chg_dtlAddr.value,
        adminFlag : $("#mem_admin_chk").val() == 'on'? 'Y' : 'N',
        lockFlag : $("#mem_stop_chk").val() == 'on'? 'Y' : 'N',
        remark : document.chg_custInfo.remark.value,
        userId : "<%=(String)session.getAttribute("id")%>"
    };

    $.ajax({
          url : '<%=request.getContextPath()%>/admin/modifyCustInfo',
          async : false, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : null,
          data : params,
          success : function(data) {
          },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
    });

    // 지점 추가
    var rowIdField = AUIGrid.getProp(corpGrid, "rowIdField");
    for(var i =0; i<AUIGrid.getRowCount(corpGrid); i++){
      if(AUIGrid.isAddedById(corpGrid, AUIGrid.getCellValue(corpGrid,i,rowIdField)) ){
        var params = {
          id : AUIGrid.getCellValue(corpGrid,i,"id"),
          headId : $("#chg_id").val(),
          userId   : "<%=(String)session.getAttribute("id")%>"
        }
      }else if( AUIGrid.isRemovedById(corpGrid, AUIGrid.getCellValue(corpGrid,i,rowIdField))) {
         var params = {
          id : AUIGrid.getCellValue(corpGrid,i,"id"),
          userId   : "<%=(String)session.getAttribute("id")%>"
        }
      }
      if(AUIGrid.isAddedById(corpGrid, AUIGrid.getCellValue(corpGrid,i,rowIdField)) || AUIGrid.isRemovedById(corpGrid, AUIGrid.getCellValue(corpGrid,i,rowIdField)))
        $.ajax({
          url : "<%=request.getContextPath()%>/admin/addChild",
          async : false, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : null,
          data : params,
          success : function(data) {
          },
          error : function(request,status,error) {
          }
        });
    }
    alert('저장되었습니다.');
     searchCust();
     $('.mem_chg').trigger('click');
  }
  function deleteCust(){
    if(confirm("삭제하시겠습니까?")){
      var params = {
          id : document.chg_custInfo.chg_id.value
      };

      $.ajax({
            url : '<%=request.getContextPath()%>/admin/deleteCust',
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : null,
            data : params,
            success : function(data) {
            },
            error : function(request,status,error) {
              alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
      });
      alert('삭제되었습니다.');
      searchCust();
      $('.mem_chg').trigger('click');
    }
  }

  function getChild(){
    var params = {
          id : $("#chg_id").val(),
          userId   : "<%=(String)session.getAttribute("id")%>"
        }
        $.ajax({
          url : "<%=request.getContextPath()%>/admin/getChild",
          async : false, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          data : params,
          success : function(data) {
              AUIGrid.setGridData(corpGrid,data);
          },
          error : function(request,status,error) {
          }
        });
  }
</script>
<body>

  <!-- 서브 sub -->
  <!-- 관리자용 admin -->
  <div id="admin" class="admin">

    <asdie class="sidebar">
      <a href="javascript:checkHome()" class="header_logo"><img src="../img/header_logo.png" alt="라임푸드 로고" /></a>
      <ul class="nav">
        <li><a href="/admin/main"><img src="../img/sidebar_icon01.png" alt="" class="menu_icon">홈화면&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
        <li><a href="/admin/cust" class="current"><img src="../img/sidebar_icon02.png" alt="" class="menu_icon">회원관리</a></li>
        <li><a href="/admin/popup"><img src="../img/sidebar_icon03.png" alt="" class="menu_icon">팝업공지</a></li>
        <li><a href="/admin/ctg"><img src="../img/sidebar_icon04.png" alt="" class="menu_icon">상품관리</a>
          <ul class="nav_dept2">
            <li><a href="/admin/ctg">카테고리</a></li>
            <li><a href="/admin/prod">상품관리</a></li>
            <li><a href="/admin/price">단가관리</a></li>
          </ul>
        </li>
        <li><a href="/admin/order"><img src="../img/sidebar_icon05.png" alt="" class="menu_icon">주문관리</a></li>
        <li><a href="/admin/dline"><img src="../img/sidebar_icon06.png" alt="" class="menu_icon">마감관리</a></li>
        <li><a href="/admin/inven"><img src="../img/sidebar_icon07.png" alt="" class="menu_icon">재고관리</a></li>
        <li><a href="/admin/sales"><img src="../img/sidebar_icon08.png" alt="" class="menu_icon">매출관리</a></li>
      </ul>
      <a href="/cust/food" class="admin_exit_btn">관리자모드 나가기</a>
    </asdie>
    <div class="sub_cont_area admin02">
      <h1 class="sub_tit">회원관리</h1>
      <section class="section01">
        <div class="over_area">
          <div class="over_box">
            <p class="over_tit">전체 고객사</p>
            <p class="over_txt"><%=request.getAttribute("corpCnt")%>개</p>
          </div>
          <div class="over_box">
            <p class="over_tit">전체 고객수</p>
            <p class="over_txt"><%=request.getAttribute("custCnt")%> 명</p>
          </div>
          <div class="over_box">
            <a href="#" class="over_btn popup-trigger" onClick="return init()"><span>고객계정생성</span> <img src="../img/plus_icon.png" alt=""></a>
          </div>
        </div>
      </section>

      <div class="btn_area">
        <button type="button" class="excel_down" onclick ="exportToLocal()">엑셀다운로드</button>
      </div>

      <section class="section02">
        <!-- 필터 영역 -->
        <div class="filter_area admin_filter">
          <form class="" id ="searchForm" name="searchForm" action="javascript:searchCust()" method="get" >
            <label for="">검색조건</label>
            <select id="cond" title="" class="">
              <option value="all" selected="selected">전체</option>
              <option value="name">이름</option>
              <option value="telPhone">전화번호</option>
              <option value="celPhone">휴대폰번호</option>
              <option value="corpName">사업장명</option>
              <option value="email">이메일</option>
              <option value="id">ID</option>
            </select>

            <label for="" style="margin-left:36px;">조회</label>
            <div class="input_search_wrap">
              <input type="text" id="search" name="search" value="" placeholder="" class="search" onkeypress="enterKey('cust')">
              <button type="button" class="search_btn" onclick="searchCust()" >조회</button>
            </div>
          </form>
        </div>
        <!-- 필터 영역 끝 -->

        <!-- 그리드 영역 -->
        <div class="dashboard_area" height="500px">
            <div id="grid_wrap"></div>
        </div>
        <!-- 보드 영역 끝-->
      </section>

      <div id="grid_excel" style="visibility: hidden;"></div>
      <!-- 팝업 - 고객계정생성 -->
      <div class="popup mem_new" role="">
        <div class="popup_container">
          <div class="popup_head">
            <p class="popup_tit">고객계정생성</p>
            <a href="#" class="popup_close"></a>
          </div>
          <div class="inner">
            <form name = "custInfo" class="" action="<%=request.getContextPath()%>/admin/regCust" method="post">
              <input type="hidden" id="custType" name="custType" value="C"/>
              <input type="hidden" id="adminFlag" name="adminFlag" value="N"/>
              <span class="essential essential_tit">* 필수항목</span>
              <table class="table_style01">
                <tbody>
                  <tr>
                    <th>아이디 <span class="essential">*</span></th>
                    <td>
                        <input type="text" id="id" name="id" value="" maxlength="20" placeholder="" required>
                        <button type="button" id="checkId" class="btn_overlap" >중복확인</button>
                    </td>
                  </tr>
                  <tr>
                    <th>비밀번호 <span class="essential">*</span></th>
                    <td><input type="password" id="password" name="password" value="" maxlength="20" placeholder="" required></td>
                  </tr>
                  <tr>
                    <th>이름 <span class="essential">*</span></th>
                    <td><input type="text" id="name" name="name" value="" maxlength="7" placeholder="홍길동" required></td>
                  </tr>
                  <tr>
                    <th>전화번호 <span class="essential">*</span></th>
                    <td><input type="text" id="telPhone" name="telPhone" value="" maxlength="13" placeholder="02-000-0000" required></td>
                  </tr>
                  <tr>
                    <th>휴대폰번호 <span class="essential">*</span></th>
                    <td><input type="text" id="celPhone" name="celPhone" value="" maxlength="13" placeholder="010-0000-0000" required></td>
                  </tr>
                  <tr>
                    <th>이메일 <span class="essential">*</span></th>
                    <td><input type="email" id="email" name="email" value="" placeholder="1234@naver.com" required></td>
                  </tr>
                  <tr>
                    <th>사업장명 <span class="essential">*</span></th>
                    <td><input type="text" id="corpName" name="corpName" value="" placeholder="라임푸드" required></td>
                  </tr>
                  <tr>
                    <th>사업자번호 <span class="essential">*</span></th>
                    <td><input type="text" id="corpNum" name="corpNum" value="" maxlength="12" placeholder="123-45-67890" required></td>
                  </tr>
                  <tr>
                    <th>주소 <span class="essential">*</span></th>
                    <td>
                      <input type="text" class="addr" id="basAddr" name="basAddr" rows="3" value="<%=session.getAttribute("basAddr")%>" placeholder="창원시 의창구 사림동 00번지" required onClick="daumAddr()">
                      <input type="text" class="addr" id="dtlAddr" name="dtlAddr" rows="3" value="<%=session.getAttribute("dtlAddr")%>" placeholder="00건물 00호" required>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="btn_wrap">
                <button type="button" class="btn_confirm btn1" onClick ="return regist()">계정생성</button>
              </div>
            </form>
          </div>
        </div> <!-- popup_container -->
      </div> <!-- popup -->


      <!-- 팝업 - 고객계정수정 -->

       <div id ="chg_custInfo" class="popup mem_chg" role="">
        <div class="popup_container">
          <div class="popup_head">
            <p class="popup_tit">고객계정수정</p>
            <a href="#0" class="popup_close mem_chg"></a>
          </div>
          <div class="inner">
            <form class="" name = "chg_custInfo" action="" method="post">
              <span class="essential essential_tit">* 필수항목</span>
              <table class="table_style01">
                <tbody>
	                <tr>
	                <th>회원정지</th>
	                <td><input type="checkbox" name="mem_stop_chk" value="off" id="mem_stop_chk"/> <label for="mem_stop_chk"><span class="check_span"></span>체크시 로그인할 수 없음</label></td>
	              </tr>
	              <tr>
	                <th>관리자</th>
	                <td><input type="checkbox" name="mem_admin_chk" value="off" id="mem_admin_chk" /> <label for="mem_admin_chk"><span class="check_span"></span>체크시 관리자 모드 접속 가능</label></td>
	              </tr>

                  <tr>
                    <th>아이디</th>
                    <td><input type="text" id="chg_id" name="chg_id" value="" maxlength="7" placeholder="" disabled></td>
                  </tr>
                  <tr>
                    <th>비밀번호</th>
                    <td><input type="password" id="chg_password" name="chg_password" value=""  placeholder="" required></td>
                  </tr>
                  <tr>
                    <th>이름 <span class="essential">*</span></th>
                    <td><input type="text" id="chg_name" name="chg_name" value="" maxlength="7" placeholder="홍길동" required></td>
                  </tr>
                  <tr>
                    <th>전화번호 <span class="essential">*</span></th>
                    <td><input type="text" id="chg_telPhone" name="chg_telPhone" value="" maxlength="13" placeholder="02-000-0000" required></td>
                  </tr>
                  <tr>
                    <th>휴대폰번호 <span class="essential">*</span></th>
                    <td><input type="text" id="chg_celPhone" name="chg_celPhone" value="" maxlength="13" placeholder="010-0000-0000" required></td>
                  </tr>
                  <tr>
                    <th>이메일 <span class="essential">*</span></th>
                    <td><input type="email" id="chg_email" name="chg_email" value="" placeholder="1234@naver.com" required></td>
                  </tr>
                  <tr>
                    <th>사업장명 <span class="essential">*</span></th>
                    <td><input type="text" id="chg_corpName" name="chg_corpName" value="" placeholder="라임푸드" required></td>
                  </tr>
                  <tr>
                    <th>사업자번호 <span class="essential">*</span></th>
                    <td><input type="text" id="chg_corpNum" name="chg_corpNum" value="" maxlength="12" placeholder="123-45-67890" required></td>
                  </tr>
                  <tr>
                    <th>주소 <span class="essential">*</span></th>
                    <td>
                      <input type="text" class="addr" id="chg_basAddr" name="chg_basAddr" rows="3" value="<%=session.getAttribute("basAddr")%>" placeholder="" required onClick="daumAddrChg()">
                      <input type="text" class="addr" id="chg_dtlAddr" name="chg_dtlAddr" rows="3" value="<%=session.getAttribute("dtlAddr")%>" placeholder="" required>
                    </td>
                  </tr>
                  <tr>
                    <th>메모</th>
                    <td>
                      <textarea class="memo" name="remark" id="remark" rows="3" value="" placeholder="" required></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="maching_area">
                <div class="maching_filter_wrap">
                  <label for="" style="margin-right:18px;">지점매칭</label>
                  <div class="input_search_wrap">
                    <input type="text" id="searchCorp" name="searchCorp" value="" placeholder="사업장명 검색" class="search" onkeypress="enterKey('corp')">
                    <a onclick="searchCorp()"></a>
                  </div>
                </div>
                <div class="maching_list">
                <div id="corpList_Grid"></div>
                </div>
                <div class="maching_list_add">
                  <h2 class="maching_list_tit">추가된 지점현황</h2>
                  <div id="corp_Grid"></div>
                </div>
              </div>
              <div class="btn_wrap" style="margin-top:18px;">
                <button type="button" class="btn_cancel" onclick="deleteCust()">계정삭제</button>
                <button type="button" class="btn_confirm" onclick="saveCust()">계정수정</button>
              </div>
            </form>
          </div>
        </div> <!-- popup_container -->
      </div> <!-- popup -->
    </div>
  </div>


  <!-- 팝업 -->
  <script>
    jQuery(document).ready(function($) {
      //open popup
      createAUIGrid();
      $('.popup-trigger').on('click', function(event) {
        event.preventDefault();
        dupCheck = false;
        regCheck = false;
        $('.mem_new').addClass('is-visible');
      });

      //close popup
      $('.popup').on('click', function(event) {
        if ($(event.target).is('.popup_close') || $(event.target).is('.popup')) {
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
      //open popup
      $('.popup-trigger2').on('click', function(event) {
        event.preventDefault();
        $('.mem_chg').addClass('is-visible');
        createPopAUIGrid();
      });

      //close popup
      $('.mem_chg').on('click', function(event) {
        if ($(event.target).is('.popup_close') || $(event.target).is('.mem_chg')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
        }
      });
      //close popup when clicking the esc keyboard button
      $(document).keyup(function(event) {
        if (event.which == '27') {
          $('.mem_chg').removeClass('is-visible');
        }
      });
      $("#mem_stop_chk").on('click',function(event){
        if($(this).val() == 'off'){
          $(this).val('on');
          $(this).prop('checked',true);
        }else{
          $(this).val('off');
          $(this).prop('checked',false);
        }
      });
      $("#mem_admin_chk").on('click',function(event){
        if($(this).val() == 'off'){
          $(this).val('on');
          $(this).prop('checked',true);
        }else{
          $(this).val('off');
          $(this).prop('checked',false);
        }
      });
      $("#checkId").on('click', function(event){
        if($("#id").val()==""){
          alert("아이디를 입력하세요.");
          return false;
        }
        if($("#id").val().length <6){
          alert('아이디를 확인하시기 바랍니다.(6자리이상)');
          return false;
        }
        var params = {
              id : $("#id").val()
            }
            $.ajax({
              url : "<%=request.getContextPath()%>/admin/getCheckId",
              async : false, // 비동기모드 : true, 동기식모드 : false
              type : 'POST',
              cache : false,
              dataType : 'text',
              data : params,
              success : function(data) {
                  if(data != ""){
                    alert('등록된 아이디가 존재합니다.\n다른 아이디를 사용하시기 바랍니다.');
                    regCheck = false; dupCheck = true;
                  }else{
                    alert('등록 가능한 아이디입니다.');
                    regCheck = true; dupCheck = true;
                  }
              },
              error : function(request,status,error) {
               alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
              }
            });
      });
    });
  </script>

</html>
