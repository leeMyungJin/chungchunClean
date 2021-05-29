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
var salesGrid;
  function checkHome(){
    if("<%=session.getAttribute("id")%>"==null){
        location.href = "/";
    }else{
        location.href="/admin/main";
    }
  }

jQuery(document).ready(function($) {
  $("#orderCnt").text("0 건");
  $("#prodCnt").text("0 개");
  $("#sales").text("0 원");
  $("#total").text("0 원");
  $("#profit").text("0 원");
  $("#deposit").text("0 원");
  $("#outstanding").text("0 원");

  createAUIGrid();
  setDate();
  getYearInfo();
  AUIGrid.bind(salesGrid,"cellEditEnd", function(event) {
    var params = {
      corpNum : event.item.corpNum ,
      corpName : event.item.corpName ,
      month : event.item.month,
      deposit : event.item.income,
      userId : "<%=(String)session.getAttribute("id")%>"
    }
  
    $.ajax({
          url : "<%=request.getContextPath()%>/admin/addDeposit",
          async : false, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          data : params,
          success : function(data) {
            // AUIGrid.setGridData(salesGrid,data);
            removeStatus(salesGrid);
            getYearInfo();
            getSales();
            // AUIGrid.setCellValue(salesGrid,event.item.rowIndex, "outstanding", event.item.outstanding - event.item.imcome);
            // AUIGrid.setCellValue(salesGrid,event.item.rowIndex, "deposit", event.item.deposit + event.item.imcome);
            // AUIGrid.setCellValue(salesGrid,event.item.rowIndex, "income", 0);
          },
            error : function(request,status,error) {
              alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });

  });
});
  var salesLayout = [
  {
    dataField : "corpName",
		headerText : "사업장명",
    width : "10%",
	},{
    dataField : "corpNum",
		headerText : "사업자번호",
    width : "10%",
    visible : true
	},{
		dataField : "month",
		headerText : "월구분",
    width :"5%",
    editable : false
	}, {
		dataField : "orderCnt",
		headerText : "주문건수",
    width : "7%",
    dataType : "numeric",
    formatString : "#,##0",
    editable : false
	}, {
		dataField : "prodCnt",
		headerText : "상품수",
    width :"7%",
    dataType : "numeric",
    formatString : "#,##0",
    editable : false
	}, {
		dataField : "cost",
		headerText : "원가①",
    width : "7%",
    dataType : "numeric",
    formatString : "#,##0",
    editable : false
  }, {
		dataField : "price",
		headerText : "단가②",
    width :"7%",
    dataType : "numeric",
    formatString : "#,##0",
    editable : false
  },{
		dataField : "profit",
		headerText : "순익 ②-①",
    width :"8%",
    dataType : "numeric",
    formatString : "#,##0",    
    editable : false
  }, {
		dataField : "sales",
		headerText : "매출액②'",
    width : "10%",
    dataType : "numeric",
    formatString : "#,##0",    
    editable : false
	},{
		dataField : "vatPrice",
		headerText : "VAT③",
    width : "8%",
    dataType : "numeric",
    formatString : "#,##0",    
    editable : false
	}, {
		dataField : "totalPrice",
		headerText : "부가세포함 금액 ②'+③",
    width : "10%",
    dataType : "numeric",
    formatString : "#,##0",    
    editable : false
	}, {
		dataField : "deposit",
		headerText : "입금금액",
    width : "12%",
    dataType : "numeric",
    formatString : "#,##0",
    editable :false
  }, {
		dataField : "income",
		headerText : "추가입금",
    width : "12%",
    dataType : "numeric",
    formatString : "#,##0",
    editRenderer:{
      type:"InputEditRenderer",
      onlyNumeric:true,
      allowNegative: true
    }
  }, {
		dataField : "outstanding",
		headerText : "미수금",
    width : "12%",
    dataType : "numeric",
    formatString : "#,##0",
    editable : false,
    expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
			return ( item.sales - item.deposit ); 
		}
  }];
  

var footerLayout = [ {
    labelText : "합계",
    positionField : "#base",
    style : "aui-grid-my-column"
  }, {
      dataField : "orderCnt",
      positionField : "orderCnt",
      operation : "SUM",
      formatString : "#,##0"
  }, {
      dataField : "prodCnt",
      positionField : "prodCnt",
      operation : "SUM",
      formatString : "#,##0"
  }, {
    dataField : "vatPrice",
    positionField : "vatPrice",
    operation : "SUM",
    formatString : "#,##0"
  }, {
    dataField : "sales",
    positionField : "sales",
    operation : "SUM",
    formatString : "#,##0"
  }, {
    dataField : "totalPrice",
    positionField : "totalPrice",
    operation : "SUM",
    formatString : "#,##0"
  }, {
    dataField : "profit",
    positionField : "profit",
    operation : "SUM",
    formatString : "#,##0"
  }, {
    dataField : "deposit",
    positionField : "deposit",
    operation : "SUM",
    formatString : "#,##0"
  }, {
    dataField : "outstanding",
    positionField : "outstanding",
    operation : "SUM",
    formatString : "#,##0"
  }
];

window.onresize = function() {

    AUIGrid.resize(salesGrid);
}

  function createAUIGrid() {
	//그리드 설정
		var salesProps = {
      editable : true,
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
      enableFilter : true,
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
      editableOnGroupFields : false,
      groupingFields : ["corpNum"],
      groupingSummary  : {
	      dataFields : [ "orderCnt", "prodCnt", "cost","price","profit" , "sales", "vatPrice","totalPrice", "deposit","outstanding"]
      },
      // 최초 보여질 때 모두 열린 상태로 출력 여부
      displayTreeOpen : true,
      // 그룹핑 후 셀 병합 실행
      enableCellMerge : true,
      cellMergeRowSpan : true,
      showBranchOnGrouping : false,
      adjustSummaryPosition : true,
      fillValueGroupingSummary : true,
	  };
//상품 그리드
  salesGrid  = AUIGrid.create("#grid_sales", salesLayout, salesProps);
  AUIGrid.setFooter(salesGrid,footerLayout);
}

// Ajax 부분
function getSales(){
   var telRule   = /^\d{2,3}-\d{3,4}-\d{4}$/;

   if($("#cond").val() == "telPhone"){
     if(!telRule.test($("#search").val()) && $("#search").length >1){
       alert("휴대폰번호를 올바르게 입력하시기 바랍니다.\n예)010-1234-1234");
       return false;
     }
   }
  var params={
    fromDate : $("#fromDate").val(),
    toDate : $("#toDate").val(),
    cond : $("#cond").val(),
    search : $("#search").val(),
  }
  $.ajax({
        url : "<%=request.getContextPath()%>/admin/getSales",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'json',
        data : params,
        success : function(data) {
          AUIGrid.setGridData(salesGrid,data);
        },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
      });
       getSalesInfo();
}

function getYearInfo(){

  $.ajax({
        url : "<%=request.getContextPath()%>/admin/getYearInfo",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'json',
        success : function(data) {
          $("#yearSales").text(numberComma(data.sales)+" 원");
          $("#yearProfit").text(numberComma(data.profit)+" 원");
          $("#yearTotal").text(numberComma(data.total)+ " 원");
          if(data.sales >0)
            $("#yearOutstanding").text(numberComma(data.sales-data.profit) + " 원("+((data.sales-data.profit) / data.sales * 100).toFixed(2) +" %)");
          else{
            $("#yearOutstanding").text("0 원(0%)");
          }

        },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
      });

}

function getSalesInfo(){
  var params={
    fromDate : $("#fromDate").val(),
    toDate : $("#toDate").val(),
    cond : $("#cond").val(),
    search : $("#search").val(),
  }

  $.ajax({
        url : "<%=request.getContextPath()%>/admin/getSalesInfo",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'json',
        data : params,
        success : function(data) {
          $("#orderCnt").text(numberComma(data.ordercnt) + " 건");
          $("#prodCnt").text(numberComma(data.prodcnt) + " 개");
          $("#sales").text(numberComma(data.sales) + " 원");
          $("#total").text(numberComma(data.total) + " 원");
          $("#deposit").text(numberComma(data.deposit) + " 원");
          $("#profit").text(numberComma(data.profit) + " 원");
          if(data.sales != 0)
            $("#outstanding").text(numberComma(data.sales - data.deposit) + "원("+ ((data.sales - data.deposit) / data.sales * 100).toFixed(2) + " %)");
          else 
          $("#outstanding").text( "0 %");
        },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
      });
}
// 달력
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

function setDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    if(month < 10) month = "0" + month;
    $('#fromDate').val(year + "-" + month) ;

    today = new Date();
    today.setDate(today.getDate() +1);
    year = today.getFullYear();
    month = today.getMonth() + 1;
    if(month < 10) month = "0" + month;
    $('#toDate').val(year + "-" + month);
}

// 엑셀 다운로드
function exportToLocal() {
	var excelProps = {
		sheetName : "매출정보",
    showRowNumColumn : true
	};
	AUIGrid.exportToXlsx(salesGrid, excelProps);
};

function enterKey(){
  if (window.event.keyCode == '13') {
      getSales();     
  }
}
</script>
<body>


  <!-- 서브 sub -->
  <!-- 관리자용 admin -->
  <div id="admin" class="admin admin08">

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
        <li><a href="/admin/dline" ><img src="../img/sidebar_icon06.png" alt="" class="menu_icon">마감관리</a></li>
        <li><a href="/admin/inven"><img src="../img/sidebar_icon07.png" alt="" class="menu_icon">재고관리</a></li>
        <li><a href="/admin/sales" class="current"><img src="../img/sidebar_icon08.png" alt="" class="menu_icon">매출관리</a></li>
      </ul>
      <a href="/cust/food" class="admin_exit_btn">관리자모드 나가기</a>
    </asdie>
    <div class="sub_cont_area admin08">
      <h1 class="sub_tit">매출관리</h1>
      <section class="section01">
        <div class="over_area">
          <div class="over_box">
            <p class="over_tit">금년수익</p>
            <p class="over_txt" id="yearProfit"></p>
          </div>        
          <div class="over_box">
            <p class="over_tit">금년매출</p>
            <p class="over_txt" id="yearSales"></p>
          </div>
          <div class="over_box">
            <p class="over_tit">부가세포함 합계</p>
            <p class="over_txt" id="yearTotal"></p>
          </div>
          <div class="over_box">
            <p class="over_tit">미수금</p>
            <p class="over_txt" id="yearOutstanding"></p>
          </div>
          <!-- <div class="over_box">
            <p class="over_tit">미입금</p>
            <p class="over_txt">00원</p>
          </div>-->
        </div>
      </section>

      <div class="btn_area flex">
        <div>
     	  <label for="">조회일</label>
          <input type="text" class="datepicker2" id="fromDate"name="fromDate" value="" style="margin-left:20px;" onchange="validPopDate('from')" > - <input type="text" class="datepicker2" id = "toDate" name="toDate" onchange="validPopDate('to')" value="">
      	</div>
      	<div>
         <button type="button" class="excel_down" onclick="exportToLocal()">엑셀다운로드</button>
        </div>
      </div>

      <section class="section02">
        <!-- 필터 영역 -->
        <div class="filter_area admin_filter">
          <form class="" action="" onsubmit="return false;"  method="post">
            <label for="">검색조건</label>
              <select id="cond" title="" class="">
                <option value="all" selected="selected">전체</option>
                <option value="corpName">사업장명</option>
                <option value="corpNum">사업자번호</option>
              </select>
            <div class="input_search_wrap">
              <input type="text" name="search" id="search" value="" placeholder="사업장명, 사업자번호 검색" class="search" onkeyup="enterKey()">
              <button type="button" class="search_btn" onclick="getSales()" >조회</button>
            </div>
            <!-- <div class="resp_box_style01">
              <label for="" style="margin-left:36px;">조회일</label>
              <input type="text" class="datepicker" name="" value="" style="margin-left:20px;"> - <input type="text" class="datepicker" name="" value="">
            </div>-->
          
          </form>
          <div class="filter_sum_area">
            <div class="sub_box">
              <p class="sum_tit">주문건수</p>
              <p class="sub_txt" id="orderCnt"></p>
            </div>
        <%--     <div class="sub_box">
              <p class="sum_tit">총상품수</p>
              <p class="sub_txt" id="prodCnt"></p>
            </div> --%>
            <div class="sub_box">
              <p class="sum_tit">총순익</p>
              <p class="sub_txt" id="profit"></p>
            </div>
            <div class="sub_box">
              <p class="sum_tit">총매출액</p>
              <p class="sub_txt" id="sales"></p>
            </div>
          <div class="sub_box">
              <p class="sum_tit">부가세포함 합계</p>
              <p class="sub_txt" id="total"></p>
            </div>            
            <div class="sub_box">
              <p class="sum_tit">총입금금액</p>
              <p class="sub_txt" id="deposit"></p>
            </div>
            <div class="sub_box">
              <p class="sum_tit">총미수금(%)</p>
              <p class="sub_txt" id="outstanding"></p>
            </div>                        
          </div>
        </div>
        <!-- 필터 영역 끝 -->

        <!-- 보드 영역 -->
        <div class="dashboard_area">
          <div class="dash_bottom">
              <!-- <button type="button" class="save_btn btn">저장</button> -->
            </div>
            <div id="grid_sales"></div>
            <!-- <div class="btn_wrap bottom">
              <button type="button" class="save_btn btn">저장</button>
            </div>-->
          </div>
          <!-- 보드 영역 끝-->
      </section>

    </div>
  </div>


</body>
</html>
