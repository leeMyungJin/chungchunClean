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
var invenGrid;

  function checkHome(){
    if("<%=session.getAttribute("id")%>"==null){
        location.href = "/";
    }else{
        location.href="/admin/main";
    }
  }
jQuery(document).ready(function($) {
createAUIGrid();
searchInven();
getSales();
});

//그리드 설정
//그리드 설정
var invenLayout = [{
		dataField : "largeCtgName",
		headerText : "대카테고리",
    width :"10%",
    editable : false
	}, {
		dataField : "mediumCtgName",
		headerText : "중카테고리",
    width :"10%",
    editable : false
	}, {
		dataField : "prodName",
		headerText : "상품명",
    width :"25%",
    editable : false
  },{
		dataField : "prodCode",
		headerText : "상품코드",
		width : "15%",
    editable : false
	}, {
		dataField : "unit",
		headerText : "단위",
		width : "10%",
    editable : false
	}, {
		dataField : "vatYn",
		headerText : "과/면세",
    width : "7%",
    editable : false
  }, {
		dataField : "origin",
		headerText : "원산지",
    width : "5%",
    editable : false
  }, {
		dataField : "cost",
		headerText : "원가",
    width : "8%",
    dataType : "numeric",
    formatString : "#,##0",
    editable : false
	}, {
		dataField : "remainInven",
		headerText : "잔여수량",
		width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
  }];

  function createAUIGrid() {
	//그리드 설정
		var invenProps = {
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
      // showFooter : false,
      //그리드 가로세로 설정.
      // autoGridHeight : false,
      // enableRestore : false,
      //페이지 출력 행 개수
      pageRowCount : 100,
      pageRowSelectValues:[20,40,60,80,100],
      showPageRowSelect : true,
      enableMovingColumn : true,
      showFooter : true,
      noDataMessage: "현재 부족한 재고항목이 없습니다.",
      useGroupingPanel : false,
	  };
//상품 그리드
  invenGrid  = AUIGrid.create("#grid_inven", invenLayout, invenProps);
}


function searchInven(){
  var params={
    search : $("#search").val(),
    cond : $("#cond").val(),
    page : "main"
  }
  $.ajax({
    url : "<%=request.getContextPath()%>/admin/getInven",
    async : false, // 비동기모드 : true, 동기식모드 : false
    type : 'POST',
    cache : false,
    dataType : 'json',
    data : params,
    success : function(data) {
      AUIGrid.setGridData(invenGrid,data);
    },
      error : function(request,status,error) {
        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
  }); 
}

function movePage(page){
  if(page == 'sales'){
    location.href="/admin/sales";
  }else{
    location.href="/admin/inven";
  }
}

function getSales(){
  var fromDate = new Date();
  var lastDate = new Date(fromDate.getFullYear(),fromDate.getMonth()+1,0);
  var params={};
  var month ; 
  var totalSales=0;
  var totalProfit=0;
  var sales=[];
  var profit=[];
  for(var i = 0; i< 3; i++){
    lastDate = new Date(fromDate.getFullYear(),(fromDate.getMonth()+1-i),0);
    month = lastDate.getMonth()+1;
      if(month < 10)
        month = "0" + month;
      params.fromDate = lastDate.getFullYear() + "-" + month ;
      params.toDate = lastDate.getFullYear() + "-" + month ;
      $.ajax({
        url : "<%=request.getContextPath()%>/admin/getSales",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'json',
        data : params,
        success : function(data) {
          var salesSum =0;
          var profitSum=0;
          for(var k=0; k< data.length; k++){
            salesSum += data[k].sales;
            profitSum +=data[k].profit;
          }
          $("#salesMonth0"+(i+1)).html(month+"월");
          $("#sales0"+(i+1)).html(numberComma(salesSum)+"원")
          $("#profitMonth0"+(i+1)).html(month+"월");
          $("#profit0"+(i+1)).html(numberComma(profitSum)+"원");
          sales.push(salesSum);
          profit.push(profitSum);
          totalSales += salesSum;
          totalProfit += Math.abs(profitSum);
        },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
      }); 
  }
  for(var i=0; i<3; i++){
    $("#salesPercent0"+(i+1)).attr('data-percentage', (sales[i] / totalSales *100).toFixed(0));
    if(profit[i] < 0){
      $("#profit0"+(i+1)).css("color","red");
    }
    $("#profitPercent0"+(i+1)).attr('data-percentage', (Math.abs(profit[i]) / totalProfit * 100).toFixed(0));
    
  }
}

window.onresize = function() {

    AUIGrid.resize(invenGrid);
}
</script>
<body>


  <!-- 서브 sub -->
  <!-- 관리자용 admin -->
  <div id="admin" class="admin">

    <asdie class="sidebar">
      <a href="javascript:checkHome()" class="header_logo"><img src="../img/header_logo.png" alt="라임푸드 로고" /></a>
      <ul class="nav">
        <li><a href="/admin/main" class="current"><img src="../img/sidebar_icon01.png" alt="" class="menu_icon">홈화면&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
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
        <li><a href="/admin/dline"><img src="../img/sidebar_icon06.png" alt="" class="menu_icon">마감관리</a></li>
        <li><a href="/admin/inven"><img src="../img/sidebar_icon07.png" alt="" class="menu_icon">재고관리</a></li>
        <li><a href="/admin/sales"><img src="../img/sidebar_icon08.png" alt="" class="menu_icon">매출관리</a></li>
      </ul>
      <a href="/cust/food" class="admin_exit_btn">관리자모드 나가기</a>      
    </asdie>

    <div class="sub_cont_area">
      <div class="admin01 sub_cont_wrap">
        <div class="section_wrap">
          <section class="section01">
            <div class="tit_area">
              <h1 class="sub_tit">매출실적</h1>
              <a href="#" class="view_more" onclick="movePage('sales')">자세히 보기</a>
            </div>
            <div class="section_cont">
              <div id="chart">
                <ul id="bars">
                  <li>
                    <div id="salesPercent03" data-percentage="56" class="bar bg01">
                      <p id="sales03"></p>
                    </div><span id="salesMonth03"></span>
                  </li>
                  <li>
                    <div id="salesPercent02" data-percentage="33" class="bar bg02">
                      <p id="sales02"></p>
                    </div><span id="salesMonth02"></span>
                  </li>
                  <li>
                    <div id="salesPercent01" data-percentage="54" class="bar bg03">
                      <p id="sales01"></p>
                    </div><span id="salesMonth01"></span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section class="section02">
            <div class="tit_area">
              <h1 class="sub_tit">순익실적</h1>
              <a href="#" class="view_more" onclick="movePage('sales')">자세히 보기</a>
            </div>
            <div class="section_cont">
              <div id="chart">
                <ul id="bars">
                  <li>
                    <div id="profitPercent03" data-percentage="56" class="bar bg01">
                      <p id="profit03"></p>
                    </div><span id="profitMonth03"></span>
                  </li>
                  <li>
                    <div id="profitPercent02"  data-percentage="33" class="bar bg02">
                      <p id="profit02"></p>
                    </div><span id="profitMonth02"></span>
                  </li>
                  <li>
                    <div id="profitPercent01" data-percentage="54" class="bar bg03">
                      <p id="profit01"></p>
                    </div><span id="profitMonth01"></span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section class="section03">
            <div class="tit_area">
              <h1 class="sub_tit">재고관리</h1>
              <a href="#" class="view_more" onclick="movePage('inven')">자세히 보기</a>
            </div>
            <div class="section_cont">
            <div id="grid_inven"></div>
            </div>
          </section>
        </div>
      </div>

    </div>
  </div>

  <!-- 차트 -->
  <script>
    $(function() {
      $("#bars li .bar").each(function(key, bar) {
        var percentage = $(this).data('percentage');

        $(this).animate({
          'height': percentage + '%'
        }, 1000);
      });
    });
  </script>
</body>

</html>
