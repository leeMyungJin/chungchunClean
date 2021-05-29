<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
response.setDateHeader("Expires", 0L); // Do not cache in proxy server
%>
<%@ include file="../include/header.jsp" %>
</head>
<script>
var dlineGrid;
$(document).ready(function() {
  createAUIGrid();
  setShipDate();
  $("#corp_count").text("0  건");
  $("#prod_count").text("0  건");
  $("#total_price").text("0  원");
  $("#total_allPrice").text("0  원");
  

});
function shipDateCheck(shipId) {
    var shipDate ;

    if(shipId == "from"){
      shipDate = $('#fromDate').val();
    }else if(shipId == "to"){
      shipDate = $('#toDate').val();
    }

    var date = new Date(shipDate).getTime();
    var now = new Date().getTime();
    var diff = (date - now)/1000/60/60/24;
  if(diff > -1){
    alert("마감관리 조회는 오늘 이전 날짜까지 가능합니다.");
    if(shipId == "from"){
      var today = new Date();
      today.setDate(today.getDate() - 7);
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      if(month < 10) month = "0" + month;
      if(day < 10) day = "0" + day;
      $('#fromDate').val(year+ "-" + month+"-"+day) ;
    }else if(shipId == "to"){
      var today = new Date();
      today.setDate(today.getDate() - 1);
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      if(month < 10) month = "0" + month;
      if(day < 10) day = "0" + day;

      $('#toDate').val(year+ "-" + month+"-"+day) ;
    }
    return ;
  }
  var fromDate = $('#fromDate').val();
  var toDate = $('#toDate').val();
  var fromDateTime = new Date(fromDate).getTime();
  var toDateTime = new Date(toDate).getTime();

  var toDay = new Date();
  var dd = toDay.getDate();
  if(fromDateTime > toDateTime ){
    alert("시작일이 종료일보다 클 수 없습니다.");
    if(shipId == "from"){
      var from = new Date(toDate);
      from.setDate(from.getDate() - 1);
      var year = from.getFullYear();
      var month = from.getMonth() + 1;
      var day = from.getDate();
      if(month < 10) month = "0" + month;
      if(day < 10) day = "0" + day;
      $('#fromDate').val(year + "-" + month+"-"+day);
    }else if(shipId == 'to'){
      var from = new Date(fromDate);
      from.setDate(from.getDate() + 1);
      var year = from.getFullYear();
      var month = from.getMonth() + 1;
      var day = from.getDate();
      if(month < 10) month = "0" + month;
      if(dd <= day) day = day - 1;
      if(day < 10) day = "0" + day;
      $('#toDate').val(year + "-" + month+"-"+day);
      }
    return ;
  }

}
function setShipDate() {
    var today = new Date();
    today.setDate(today.getDate() - 7); //15일 더하여 setting
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    if(month < 10) month = "0" + month;
    if(day < 10) day = "0" + day;
    $('#fromDate').val(year + "-" + month+"-"+day) ;

    today = new Date();
    today.setDate(today.getDate() - 1); //15일 더하여 setting
    year = today.getFullYear();
    month = today.getMonth() + 1;
    day = today.getDate();
    if(month < 10) month = "0" + month;
    if(day < 10) day = "0" + day;
    $('#toDate').val(year + "-" + month+"-"+day);
}

var orderLayout = [{
		dataField : "corpName",
		headerText : "배송사업장",
		width :"10%"
  },{
		dataField : "orderNo",
		headerText : "주문번호",
    width :"7%"
	},{
		dataField : "shipDate",
		headerText : "배송요청일",
    width :"7%"
	}, {
		dataField : "deadLine",
		headerText : "마감일시",
		width : "7%"
	}, {
		dataField : "prodCode",
		headerText : "상품코드",
		width :"7%"
	}, {
		dataField : "price",
		headerText : "단가",
    width : "5%",
    dataType : "numeric",
    formatString : "#,##0"
  }, {
		dataField : "corpNum",
		headerText : "사업자번호",
    width :"10%"
  },{
		dataField : "name",
		headerText : "이름",
		width :"10%"
  },{
		dataField : "prodName",
		headerText : "상품명",
		width : "15%"
	}, {
		dataField : "unit",
		headerText : "단위",
		width : "6%"
	}, {
		dataField : "origin",
		headerText : "원산지",
		width : "5%"
	}, {
		dataField : "vatYn",
		headerText : "과/면세",
    width : "5%",
  }, {
		dataField : "orderCnt",
		headerText : "주문수량",
    width : "5%",
    dataType : "numeric",
    formatString : "#,##0",
	}, {
		dataField : "supPrice",
		headerText : "합계(1)",
		width : "8%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
  }, {
		dataField : "vatPrice",
		headerText : "VAT(2)",
		width : "8%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
  }, {
		dataField : "totalPrice",
		headerText : "TOTAL(1)+(2)",
		width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
  }];

  function createAUIGrid() {
	//그리드 설정
		var orderProps = {
      rowIdField : "rowId",
      enableSorting : true,
      //페이징 설정
      usePaging : true,
      // singleRow 선택모드
      selectionMode : "multipleCells",
      // 고정 칼럼 1개
      // fixedColumnCount : 1,
      // 줄번호 칼럼 렌더러 출력
      showRowNumColumn : true,
      // 체크박스 표시 렌더러 출력 안함
      showRowCheckColumn : false,
      headerHeight : 35,
      rowHeight : 35,
      footerHeight : 35,
      height : 600,
      //그리드 가로세로 설정.
      // autoGridHeight : false,
      // enableRestore : false,
      //페이지 출력 행 개수
      pageRowCount : 100,
      pageRowSelectValues:[20,40,60,80,100],
      showPageRowSelect : true,
      enableMovingColumn : true,
      showFooter : true,
      noDataMessage: "조회 결과가 없습니다.",
      useGroupingPanel : false,
      editableOnGroupFields : true,
      groupingFields : ["corpNum", "shipDate"],
      groupingSummary  : {
	      dataFields : [ "orderCnt","supPrice", "vatPrice", "totalPrice" ]
      },
      // 최초 보여질 때 모두 열린 상태로 출력 여부
      displayTreeOpen : true,
      // 그룹핑 후 셀 병합 실행
      enableCellMerge : true,
      cellMergeRowSpan : true,
      showBranchOnGrouping : false,
      enableSummaryMerge : true,
      summaryMergePolicy : "all" ,
      nableSummaryMerge : true
	  };
//상품 그리드
  dlineGrid  = AUIGrid.create("#grid_dline", orderLayout, orderProps);

  //클릭 이벤트 추가
  // setCilckEvent(dlineGrid);
  //더블클릭 이벤트 추가
  // setDoubleCilckEvent(dlineGrid);

// 푸터 설정
var footerLayout = [ {
	labelText : "소계",
	positionField : "#base",
  style : "aui-grid-my-column"
  }, {
    colSpan : 5
  },{
    dataField : "supPrice",
    positionField : "supPrice",
    operation : "SUM",
    formatString : "#,##0"
  }, {
    dataField : "vatPrice",
    positionField : "vatPrice",
    operation : "SUM",
    formatString : "#,##0"
  }, {
    dataField : "totalPrice",
    positionField : "totalPrice",
    operation : "SUM",
    formatString : "#,##0"
  }];

  AUIGrid.setFooter(dlineGrid,footerLayout);
}

function orderSearch(){
  var params = {
    searchText : $("#searchText").val().trim(),
    fromDate : $("#fromDate").val().replace(/-/gi,''),
    toDate : $("#toDate").val().replace(/-/gi,''),
    cond : $("#cond").val()
  }
  //주문 리스트
  $.ajax({
        url : "<%=request.getContextPath()%>/admin/getOrderList",
        async : true, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'json',
        data : params,
        success : function(data) {
          AUIGrid.setGridData(dlineGrid, data);
        },
        error : function(request,status,error) {
        }
      });
  //주문 통계
  $.ajax({
        url : "<%=request.getContextPath()%>/admin/getOrderInfo",
        async : true, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'json',
        data : params,
        success : function(data) {
          $("#corp_count").text(data.corp_count + "  건");
          $("#prod_count").text(data.prod_count + "  건");
          $("#total_price").text(numberComma(data.total_supprice) + "  원");
          $("#total_allPrice").text(numberComma(data.total_price) + "  원");
        },
        error : function(request,status,error) {
        }
      });

}
function enterKey(){
  if (window.event.keyCode == '13') {
    orderSearch();
    return ;
  }
}
function exportExcel(){
  if(AUIGrid.getRowCount(dlineGrid) ==0){
    alert('조회된 데이터가 없습니다.');
    return ;
  }
  var excelProps = {
    sheetName : "주문관리",
    // exceptColumnFields : ["del"], // 이름, 제품, 컬러는 아예 엑셀로 내보내기 안하기.
    showRowNumColumn : true
  };
  AUIGrid.exportToXlsx(dlineGrid, excelProps);
}
  function checkHome(){
    if("<%=session.getAttribute("id")%>"==null){
        location.href = "/";
    }else{
        location.href="/admin/main";
    }
  }
function validPopDate(date){
  var start;
  var end;
  start = $("#fromDate").val().replace(/-/gi,'');
  end = $("#toDate").val().replace(/-/gi,'');
  
  if(date == 'from'){
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

window.onresize = function() {

    AUIGrid.resize(dlineGrid);
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
        <li><a href="/admin/cust"><img src="../img/sidebar_icon02.png" alt="" class="menu_icon">회원관리</a></li>
        <li><a href="/admin/popup"><img src="../img/sidebar_icon03.png" alt="" class="menu_icon">팝업공지</a></li>
        <li><a href="/admin/ctg"><img src="../img/sidebar_icon04.png" alt="" class="menu_icon">상품관리</a>
          <ul class="nav_dept2">
            <li><a href="/admin/ctg">카테고리</a></li>
            <li><a href="/admin/prod">상품관리</a></li>
            <li><a href="/admin/price">단가관리</a></li>
          </ul>
        </li>
        <li><a href="/admin/order"><img src="../img/sidebar_icon05.png" alt="" class="menu_icon">주문관리</a></li>
        <li><a href="/admin/dline" class="current"><img src="../img/sidebar_icon06.png" alt="" class="menu_icon">마감관리</a></li>
        <li><a href="/admin/inven"><img src="../img/sidebar_icon07.png" alt="" class="menu_icon">재고관리</a></li>
        <li><a href="/admin/sales"><img src="../img/sidebar_icon08.png" alt="" class="menu_icon">매출관리</a></li>
      </ul>
      <a href="/cust/food" class="admin_exit_btn">관리자모드 나가기</a>
    </asdie>
    <div class="sub_cont_area admin06">
      <h1 class="sub_tit">마감관리</h1>
      <div class="btn_area flex">
     	 <div>
     	   <label for="">조회일</label>
           <input type="text" class="datepicker" id="fromDate"name="fromDate" value="" style="margin-left:20px;" onchange="validPopDate('from')" > - <input type="text" class="datepicker" id = "toDate" name="toDate" onchange="validPopDate('to')" value="">
      	</div>
      	<div>
        <button type="button" class="excel_down" onclick="exportExcel()">엑셀다운로드</button>
        </div>
      </div>

      <section class="section01">
        <!-- 필터 영역 -->
        <div class="filter_area admin_filter">
          <form class="" action="" onsubmit="return false;"  method="post">
          <label for="">검색조건</label>
            <select id = "cond" name= "cond" title="" class="">
                  <option value="all" selected="selected">전체</option>
                  <option value="corpName" >사업장</option>
                  <option value="prodName" >상품명</option>
                  <option value="prodCode" >상품코드</option>
                  <option value="name" >이름</option>
              </select>
        
            <label for="">조회</label>
              <input type="text" name="searchText" id="searchText" value="" placeholder="사업장, 상품명, 상품코드, 이름" class="search" onKeypress="enterKey()">
              <button type="button" class="search_btn" onclick="orderSearch()">조회</button>

           <!-- <div class="resp_box_style01">
              <label for="" style="margin-left:36px;">조회일</label>
              <input type="text" class="datepicker" name="fromDate" id = "fromDate" value="" style="margin-left:20px;" onchange="shipDateCheck('from')"> - <input type="text" class="datepicker" name="toDate" id="toDate" value="" onchange="shipDateCheck('to')">
            </div>-->

          </form>
          <div class="filter_sum_area">
            <div class="sub_box">
              <p class="sum_tit">주문사업장수</p>
              <p class="sub_txt" id = "corp_count"></p>
            </div>
              <div class="sub_box">
                <p class="sum_tit">주문 항목수</p>
                <p class="sub_txt" id = "prod_count"></p>
              </div>
              <div class="sub_box">
                <p class="sum_tit">총 매출액</p>
                <p class="sub_txt" id="total_price"></p>
              </div>
<%--               <div class="sub_box">
                <p class="sum_tit">총 매출액</p>
                <p class="sub_txt" id="total_sales"></p>
              </div> --%>
              <div class="sub_box">
                <p class="sum_tit">부가세포함 합계</p>
                <p class="sub_txt" id="total_allPrice"></p>
              </div>                            
            </div>
        </div>
        <!-- 필터 영역 끝 -->

        <!-- 보드 영역 -->
        <div class="dashboard_area">
          <div class="dash_bottom">
            <div id="grid_dline"></div>
        </div>
        <!-- 보드 영역 끝-->
      </section>


    </div>
  </div>

</body>
</html>
