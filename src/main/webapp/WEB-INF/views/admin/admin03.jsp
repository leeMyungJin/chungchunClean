<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
response.setDateHeader("Expires", 0L); // Do not cache in proxy server
%>
<%@ include file="../include/header.jsp" %>


  <!-- 팝업 -->
<script>
   var oEditors=[];
var myGridID;
function init(){
  // 기본 날짜 초기화.
      var now = new Date();

      var nYear = now.getFullYear();
      var nMonth = now.getMonth()+1;
      var nDay = now.getDate();
      
      var past = new Date(Date.parse(now) - 30 * 1000 * 60 * 60 * 24);

      var pYear = past.getFullYear();
      var pMonth = past.getMonth()+1;
      var pDay = past.getDate();

      if(nMonth < 10)
        nMonth = "0" + nMonth;
      if(pMonth < 10)
        pMonth = "0" + pMonth;        

      if(nDay < 10)
        nDay = "0" + nDay;
      if(pDay < 10)
        pDay = "0" + pDay;

      $('#toDate').val(nYear + "-" + nMonth + "-" + nDay);
      $('#fromDate').val(pYear + "-" + pMonth + "-" + pDay);
}


//AUIGrid 칼럼 설정
var columnLayout = [ {
		dataField : "index",
		headerText : "번호",
    width :"25%",
    visible : false
  },   {
		dataField : "title",
		headerText : "제목",
		width :"25%"
  }, {
		dataField : "cretId",
		headerText : "작성자",
		width : "15%"
	}, {
		dataField : "cretTime",
		headerText : "작성일",
		width : "15%"
	}, {
		dataField : "period",
		headerText : "기간",
		width :"20%"
	}, {
		dataField : "status",
		headerText : "상태",
		width : "10%"
	}, {
		dataField : "remark",
		headerText : "비고",
		width : "15%"
  }, {
		dataField : "startDate",
    headerText : "시작일",
    visible : false,
		width : "15%"
	}, {
		dataField : "content",
    headerText : "내용",
    visible : false,
		width : "15%"
	}, {
		dataField : "index",
    headerText : "인덱스",
    visible : false,
		width : "15%"
	}, {
		dataField : "endDate",
    headerText : "종료일",
    visible : false,
		width : "15%"
	},{
		dataField : "width",
    headerText : "너비",
    visible : false,
		width : "15%"
  },{
		dataField : "height",
    headerText : "높이",
    visible : false,
		width : "15%"
  }];

function createAUIGrid(columnLayout) {
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
  auiGridProps.height= 800;
  auiGridProps.autoGridHeight = false;
  auiGridProps.enableRestore =false;
  //페이지 출력 행 개수
  auiGridProps.showPageRowSelect=true;
    // auiGridProps.pageRowCount=5;
  auiGridProps.pageRowSelectValues=[20, 40, 60 , 80, 100];
  // auiGridProps.pagingMode="simple";
    
  auiGridProps.enableMovingColumn=true;
  auiGridProps.noDataMessage="조회된 데이터가 없습니다.";

	// 실제로 #grid_wrap 에 그리드 생성
  myGridID = AUIGrid.create("#grid_wrap", columnLayout, auiGridProps);
  setDoubleCilckEvent("#grid_wrap");
}

function writeNotice(){
  if(noticeValidation()){
    $("#startDate").val($("#startDate").val().replace(/-/gi,''));
    $("#endDate").val($("#endDate").val().replace(/-/gi,''));
    $("#noticeYn").val('S'); //noticeYn : 'S'  // S 저장 ,C 완료(공지) ,D 삭제

      oEditors.getById["webEditor"].exec("UPDATE_CONTENTS_FIELD", []);
    $.ajax({
              url : "<%=request.getContextPath()%>/notice/writeNotice",
              async : true, // 비동기모드 : true, 동기식모드 : false
              type : 'POST',
              cache : false,
              dataType : 'json',
              data : $("#form").serialize(),
              success : function(data) {
                $('.popup').trigger("click");
              },
              error : function(request,status,error) {
                
              }
        });    
        alert('저장되었습니다.');
        searchNotice();
  }
}

function completeNotice(){
  if(noticeValidation()){
    $("#startDate").val($("#startDate").val().replace(/-/gi,''));
    $("#endDate").val($("#endDate").val().replace(/-/gi,''));
    $("#noticeYn").val('C'); //noticeYn : 'S'  // S 저장 ,C 완료(공지),D 삭제
  
    oEditors.getById["webEditor"].exec("UPDATE_CONTENTS_FIELD", []);
  $.ajax({
            url : "<%=request.getContextPath()%>/notice/writeNotice",
            async : true, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : 'json',
            data : $("#form").serialize(),
            success : function(data) {
              $('.popup').trigger("click");
            },
            error : function(request,status,error) {
              
            }
      });    
      alert('저장되었습니다.');
      searchNotice();
  }
}

function noticeValidation(){
  if($("#startDate").val() == ""){
    alert('시작날짜를 지정하세요.');
    return false;
  }else if($("#endDate").val() == ""){
    alert('종료날짜를 지정하세요.');
    return false;
  }else if($("#title").val() == ""){
    alert('제목을 입력하세요.');
    return false;
  }else
    return true;
}

function deleteNotice(){
  
  if($("#index").val() != ""){
    if(confirm("삭제하시겠습니까?")){
        $("#noticeYn").val('D'); //noticeYn : 'S'  // S 저장 ,C 완료(공지) , D 삭제
            
            oEditors.getById["webEditor"].exec("UPDATE_CONTENTS_FIELD", []);
          $.ajax({
                    url : "<%=request.getContextPath()%>/notice/deleteNotice",
                    async : true, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    cache : false,
                    dataType : 'json',
                    data : $("#form").serialize(),
                    success : function(data) {
                      alert('삭제되었습니다.');
                      $('.popup').trigger("click");
                    },
                    error : function(request,status,error) {
                      
                    }
              });    
              searchNotice();
    }
    
  }else{
    alert('삭제할 공지사항이 없습니다.');
  }
}

function searchNotice(){
  var params = {
      fromDate : $("#fromDate").val().replace(/-/gi,''),
      toDate : $("#toDate").val().replace(/-/gi,''),
      searchText : $("#searchText").val(),
      search : $("#search").val()
  };
  $.ajax({
          url : "<%=request.getContextPath()%>/notice/searchNotice",
          async : false, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          data : params,
          success : function(data) {
            AUIGrid.setGridData("#grid_wrap", data);
          }
    });
    return false; 
}
function setDoubleCilckEvent(grid){
  	AUIGrid.bind(grid, "cellDoubleClick", function(event) {
      oEditors.getById["webEditor"].exec("SET_IR", [""]); //내용초기화
      $("#title").val(event.item.title);
      oEditors.getById["webEditor"].exec("PASTE_HTML", [event.item.content]); //내용밀어넣기
      $("#startDate").val(event.item.fromDate);
      $("#endDate").val(event.item.toDate);
      $("#index").val(event.item.index);
      $("#width").val(event.item.width);
      $("#height").val(event.item.height);
      $('.popup').addClass('is-visible');
      
  });
}

function validPopDate(date){
  var start;
  var end;
  if(date == 'start' || date == 'end '){
    start = $("#startDate").val().replace(/-/gi,'');
    end = $("#endDate").val().replace(/-/gi,'');
  }else{
    start = $("#fromDate").val().replace(/-/gi,'');
    end = $("#toDate").val().replace(/-/gi,'');
  }
  
  if(date == 'start'){
    if(start > end && start != "" && end != ""){
      alert("시작일이 종료일보다 클 수 없습니다.");
      $("#startDate").val("");
      $("#startDate").focus();
    }
  }else if(date == 'end'){
    if(start > end && start != "" && end != ""){
      alert("시작일보다 종료일이 작을 수 없습니다.");
      $("#endDate").val("");
      $("#endDate").focus();
    }
  }else if(date == 'from'){
    if(start > end && start != "" && end != ""){
      alert("시작일이 종료일보다 클 수 없습니다.");
      $("#fromDate").val("");
      $("#fromDate").focus();
    }
  }else if(date == 'to'){
    if(start > end && start != "" && end != ""){
      alert("시작일보다 종료일이 작을 수 없습니다.");
      $("#toDate").val("");
      $("#toDate").focus();
    }
  }
}
   function checkHome(){
      if("<%=session.getAttribute("id")%>" == "null"){
          location.href = "/";
      }else{
          location.href="/admin/main";
      }
    }
  function enterKey(){
    if (event.keyCode == 13) {
        searchNotice();
    }
  }   
  
  window.onresize = function() {

    AUIGrid.resize(myGridID);
}
</script>
</head>
<body>
  <!-- 서브 sub -->
  <!-- 관리자용 admin -->
  <div id="admin" class="admin">
    <asdie class="sidebar">
      <a href="javascript:checkHome();" class="header_logo"><img src="../img/header_logo.png" alt="라임푸드 로고" /></a>
      <ul class="nav">
        <li><a href="/admin/main"><img src="../img/sidebar_icon01.png" alt="" class="menu_icon">홈화면&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
        <li><a href="/admin/cust"><img src="../img/sidebar_icon02.png" alt="" class="menu_icon">회원관리</a></li>
        <li><a href="/admin/popup" class="current"><img src="../img/sidebar_icon03.png" alt="" class="menu_icon">팝업공지</a></li>
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
    <div class="sub_cont_area admin03">
      <section class="section01">
        <h1 class="sub_tit">팝업공지 작성</h1>

        <div class="popup_filter">
          <div>
            <label for="">기간설정</label>
            <!-- 추가 -->
            <input type="text" class="datepicker" id="fromDate"name="fromDate" value="" style="margin-left:20px;" onchange="validPopDate('from')" > - <input type="text" class="datepicker" id = "toDate" name="toDate" onchange="validPopDate('to')" value="">
            <!-- 추가끝 -->
          </div>
          <div class="btn_area">
            <button type="button" class="popup_write popup-trigger">팝업공지작성</button>
          </div>
        </div>
        <!-- 필터 영역 -->
        <div class="filter_area admin_filter">
          <form name="noticeList" id="noticeList" class="" onsubmit="return false;" method="post">
            <label for="">검색조건</label>
            <select id="search" name="search" title="" class="">
              <option selected="selected">전체</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
            </select>
            <label for="" style="margin-left:36px;">조회</label>
            <div class="input_search_wrap">
              <input type="text" id="searchText" name="searchText" value="" placeholder="" class="search" onkeypress="enterKey();"/>
              <button type="button" class="search_btn" onclick="searchNotice();">조회</button>
            </div>
          </form>
        </div>
        <!-- 필터 영역 끝 -->

        <!-- 보드 영역 -->
        <div class="dashboard_area">
            <div id="grid_wrap" style="z-index:0;"></div>
        </div>
      </section>
    </div>
  </div>

  <!-- 팝업 - 팝업공지작성 -->
  <div class="popup popup_notice" role="" style="overflow:auto;" >
  <form name="form" id = "form" type='POST'>
  <input type="hidden" name="userId" id="userId" value="<%=(String)session.getAttribute("id")%>"/>
  <input type = "hidden" name = "noticeYn" id = "noticeYn"/>
  <input type="hidden" name="index" id="index"/>
    <div class="popup_container" >
      <div class="popup_head">
        <p class="popup_tit">팝업공지작성</p>
        <a href="#" class="popup_close"></a>
      </div>
      <div class="inner" >
        <table class="table_style01">
          <tbody>
            <tr>
              <th>작성자</th>
              <td>관리자</td>
            </tr>
            <tr>
              <th>시작일*</th>
              <td><input type="text" class="datepicker" name="startDate" id="startDate" onchange="validPopDate('start')" value=""></td>
            </tr>
            <tr>
              <th>종료일*</th>
              <td><input type="text" class="datepicker" name="endDate" id = "endDate" onchange="validPopDate('end')" value=""></td>
            </tr>
            <tr>
              <th>가로</th>
              <td><input type="text" class="title" name="width" id = "width"  placeholder="450" value=""></td>
            </tr>
            <tr>
              <th>세로</th>
              <td><input type="text" class="title" name="height" id = "height"  placeholder="750"value=""></td>
            </tr>                        
            <tr>
              <th>제목*</th>
              <td><input type="text" id="title" class="title" name="title" value="" placeholder="" required="" style="max-width:inherit;"></td>
            </tr>
            <tr>
              <td colspan="2">
                <textarea name="webEditor" id="webEditor" rows="10" cols="10"></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btn_wrap" style="margin-top:18px;">
          <button type="button" class="popup_btn_cancel" onclick = "deleteNotice();">삭제</button>
          <button type="button" class="popup_btn_save" onclick = "writeNotice();">저장</button>
          <button type="button" class="popup_btn_complete" onclick="completeNotice();">완료(공지)</button>
        </div>
      </form>
      </div>
    </div> <!-- popup_container -->
  </div> <!-- popup -->
</body>

</html>
<script>
jQuery(document).ready(function($) {
      //open popup
      $('.popup-trigger').on('click', function(event) {
         $("#title").val("");
        $("#startDate").val("");
        $("#endDate").val("");
        $("#index").val("");
        oEditors.getById["webEditor"].exec("SET_IR", [""]);
        event.preventDefault();
        $('.popup').addClass('is-visible');
      });
      //close popup
      $('.popup').on('click', function(event) {
        if ($(event.target).is('.popup_close') || $(event.target).is('.popup')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
        }
      });
      //close popup when clicking the esc board button
      $(document).keyup(function(event) {
        event.preventDefault();
        if (event.which == '27') {
          $('.popup').removeClass('is-visible');
        }
      });
      createAUIGrid(columnLayout);
      init();
      // 스마트에디터2
      nhn.husky.EZCreator.createInIFrame({
          oAppRef: oEditors,
          elPlaceHolder:"webEditor",
          sSkinURI : "/smartEditor2/SmartEditor2Skin.html",
          fCreator:"createSEditor2",
          htParams: { fOnBeforeUnload : function(){}}
      });
    });
</script>



