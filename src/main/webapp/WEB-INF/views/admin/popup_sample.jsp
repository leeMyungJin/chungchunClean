<%@ page language="java" contentType="text/html; charset=UTF-8"    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="kr" dir="ltr">
<head>
  <meta charset="utf-8">
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
  <%-- <link rel="stylesheet" href="../css/resp.css"> --%>
  <link href="../AUIGrid/AUIGrid_style.css" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <!-- AUIGrid 라이센스 파일입니다. 그리드 출력을 위해 꼭 삽입하십시오. -->
<script type="text/javascript" src="../AUIGrid/AUIGridLicense.js"></script>
<script type="text/javascript" src="../AUIGrid/AUIGrid.js"></script>
<script type="text/javascript" src="../AUIGrid/FileSaver.js"></script>

<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false"></script>

</head>
<script>
var custGrid;
var excelGrid;
var corpListGrid;
var corpGrid;
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
          }else if(!inputForm.corpName.value){
              alert("사업자번호을 입력하세요");    
              inputForm.corpName.focus();
              return false;              
          }else if(!inputForm.basAddr.value){
              alert("주소를 입력하세요");    
              inputForm.basAddr.focus();
              return false;              
          }

          // 입력값 체크
          // 정규식
          var idRule    = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
          var pwdRule1  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
          var pwdRule2  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
          var pwdRule3  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
          var telRule   = /^\d{2,3}-\d{3,4}-\d{4}$/;
          var celRule   = /^\d{3}-\d{3,4}-\d{4}$/;

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
          }else if(!checkBizNum(inputForm.corpNum.value)){  // 사업자번호
            alert("사업자 번호를 올바르게 입력하시기 바랍니다.\n예)1234-56-67890");
            inputForm.corpNum.focus();
              return false;
          }
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
		dataField : "email",
		headerText : "Email",
		width : "15%"
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
    // auiGridProps.pageRowCount=5;
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
        adminFlag : $("#mem_admin_chk").val() == 'off'? 'N' : 'Y',
        lockFlag : $("#mem_stop_chk").val() == 'off'? 'N' : 'Y',
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
     $('.mem_chg').trigger('click');
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

    <!-- 추가 -->
      <a href="#" class="pro_search_btn popup-trigger1"><span>상품 검색</span> </a>
      <!-- 추가끝 -->

      <!-- 추가 -->
      <a href="#" class="place_search_btn popup-trigger2"><span>사업장 검색</span> </a>
      <!-- 추가끝 -->

      <!-- 추가 -->
      <a href="#" class="pro_add_btn popup-trigger3"><span>상품 추가</span> </a>
      <!-- 추가끝 -->


  <!-- 팝업 - 상품검색 -->
  <div class="popup pro_search" role="">
    <div class="popup_container">
      <div class="popup_head">
        <p class="popup_tit">상품 검색</p>
        <a href="#0" class="popup_close"></a>
      </div>
      <div class="inner">
        <form class="" action="" method="post">
          <table class="table_style01">
            <tbody>
              <tr>
                <th>상품검색</th>
                <td>
                  <div class="input_search_wrap">
                    <input type="text" name="" value="" placeholder="상품명 검색" class="search">
                    <a href="#"></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="grid_area">
            그리드 들어갈 부분
          </div>

          <div class="btn_wrap" style="margin-top:18px;">
            <button type="button" class="btn_cancel">취소</button>
            <button type="button" class="btn_confirm">검색</button>
          </div>
        </form>

      </div>
    </div>
  </div> <!-- popup -->

  <!-- 팝업 - 사업장검색 -->
  <div class="popup place_search" role="">
    <div class="popup_container">
      <div class="popup_head">
        <p class="popup_tit">사업장 검색</p>
        <a href="#0" class="popup_close"></a>
      </div>
      <div class="inner">
        <form class="" action="" method="post">
          <table class="table_style01">
            <tbody>
              <tr>
                <th>사업장검색</th>
                <td>
                  <div class="input_search_wrap">
                    <input type="text" name="" value="" placeholder="사업장 검색" class="search">
                    <a href="#"></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="grid_area">
            그리드 들어갈 부분
          </div>

          <div class="btn_wrap" style="margin-top:18px;">
            <button type="button" class="btn_cancel">취소</button>
            <button type="button" class="btn_confirm">검색</button>
          </div>
        </form>

      </div>
    </div>
  </div> <!-- popup -->

  <!-- 팝업 - 상품추가 -->
  <div class="popup pro_add" role="">
    <div class="popup_container">
      <div class="popup_head">
        <p class="popup_tit">상품 추가</p>
        <a href="#0" class="popup_close"></a>
      </div>
      <div class="inner">
        <form class="" action="" method="post">
          <span class="essential essential_tit">* 필수항목</span>
          <table class="table_style01">
            <tbody>
              <tr>
                <th>상품코드 <span class="essential">*</span></th>
                <td><input type="text" id="" name="" value="" maxlength="7" placeholder="" required></td>
              </tr>
              <tr>
                <th>상품명 <span class="essential">*</span></th>
                <td><input type="text" id="" name="" value="" maxlength="7" placeholder="" required></td>
              </tr>
              <tr>
                <th>마감기한 <span class="essential">*</span></th>
                <td><input type="text" class="datepicker hasDatepicker" id="" name="" value=""></td>
              </tr>
              <tr>
                <th>단가 <span class="essential">*</span></th>
                <td><input type="text" id="" name="" value="" maxlength="11" placeholder="" required></td>
              </tr>
              <tr>
                <th>원산지 <span class="essential">*</span></th>
                <td><input type="email" id="" name="" value="" placeholder="" required></td>
              </tr>
              <tr>
                <th>부가세여부 <span class="essential">*</span></th>
                <td><input type="text" id="" name="" value="" placeholder="" required></td>
              </tr>
            </tbody>
          </table>
          <div class="btn_wrap" style="margin-top:18px;">
            <button type="button" class="btn_cancel">취소</button>
            <button type="button" class="btn_confirm">상품추가</button>
          </div>
        </form>
      </div>
    </div>
  </div> <!-- popup -->

  <!-- 팝업 -->
  <script>
    jQuery(document).ready(function($) {
      //open popup
      $('.popup-trigger1').on('click', function(event) {
        event.preventDefault();
        $('.pro_search').addClass('is-visible');
      });

      //close popup
      $('.pro_search').on('click', function(event) {
        if ($(event.target).is('.popup_close') || $(event.target).is('.pro_search')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
        }
      });
      //close popup when clicking the esc keyboard button
      $(document).keyup(function(event) {
        if (event.which == '27') {
          $('.pro_search').removeClass('is-visible');
        }
      });

      //open popup
      $('.popup-trigger2').on('click', function(event) {
        event.preventDefault();
        $('.place_search').addClass('is-visible');
      });

      //close popup
      $('.place_search').on('click', function(event) {
        if ($(event.target).is('.popup_close') || $(event.target).is('.place_search')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
        }
      });
      //close popup when clicking the esc keyboard button
      $(document).keyup(function(event) {
        if (event.which == '27') {
          $('.place_search').removeClass('is-visible');
        }
      });

      //open popup
      $('.popup-trigger3').on('click', function(event) {
        event.preventDefault();
        $('.pro_add').addClass('is-visible');
      });

      //close popup
      $('.pro_add').on('click', function(event) {
        if ($(event.target).is('.popup_close') || $(event.target).is('.pro_add')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
        }
      });
      //close popup when clicking the esc keyboard button
      $(document).keyup(function(event) {
        if (event.which == '27') {
          $('.pro_add').removeClass('is-visible');
        }
      });

    });
    
  </script>
</body>
</html>
