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
  $(document).ready(function() {
      if("<%=session.getAttribute("id")%>" == "null" ){
        location.href="/";
      }    
    createAUIGrid();
    setShipDate();
    $("#shopBasketCnt").text("0   건");
    $("#shopBasketAmt").text("0   원");
    // 서브 탭 메뉴
    $('.sub_tabs li.sub_tab').click(function() {
      var tab_id = $(this).attr('data-tab');
      $('.sub_tabs li.sub_tab').removeClass('current');
      $('.sub_tab_cont').removeClass('current');
      $(this).addClass('current');
      $('#' + tab_id).addClass('current');
    });

  });
    function checkHome(){
      if("<%=session.getAttribute("id")%>" == "null"){
          location.href = "/";
      }else{
          location.href="/cust/food";
      }
    }
function shipDateCheck(shipId) {
    var shipDate ;

    if(shipId == "from"){
      shipDate = $('#shipDateFrom').val();
    }else if(shipId == "to"){
      shipDate = $('#shipDateTo').val();
    }
    
    var date = new Date(shipDate).getTime();
    var now = new Date().getTime();
    var diff = (date - now)/1000/60/60/24;
  if(diff > 0){
    alert("마감관리 조회는 오늘 이전 날짜까지 가능합니다.");
    if(shipId == "from"){
      var today = new Date();
      today.setDate(today.getDate() - 7); 
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      if(month < 10) month = "0" + month;
      if(day < 10) day = "0" + day;
      $('#shipDateFrom').val(year+ "-" + month+"-"+day) ;
    }else if(shipId == "to"){
      var today = new Date();
      today.setDate(today.getDate() - 1); 
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      if(month < 10) month = "0" + month;
      if(day < 10) day = "0" + day;

      $('#shipDateTo').val(year+ "-" + month+"-"+day) ;
    }   
    return ;
  }
  var shipDateFrom = $('#shipDateFrom').val();
  var shipDateTo = $('#shipDateTo').val();
  var fromDate = new Date(shipDateFrom).getTime();
  var toDate = new Date(shipDateTo).getTime();

  var toDay = new Date();
  var dd = toDay.getDate();
  if(fromDate > toDate ){
    alert("시작일이 종료일보다 클 수 없습니다.");
    if(shipId == "from"){
      var from = new Date(shipDateTo);
      from.setDate(from.getDate() - 1); 
      var year = from.getFullYear();
      var month = from.getMonth() + 1;
      var day = from.getDate();
      if(month < 10) month = "0" + month;
      if(day < 10) day = "0" + day;
      $('#shipDateFrom').val(year + "-" + month+"-"+day);
    }else if(shipId == 'to'){
      var from = new Date(shipDateFrom);
      from.setDate(from.getDate() + 1); 
      var year = from.getFullYear();
      var month = from.getMonth() + 1;
      var day = from.getDate();
      if(dd <= day) day = day - 1;
      if(month < 10) month = "0" + month;
      if(day < 10) day = "0" + day;
      $('#shipDateTo').val(year + "-" + month+"-"+day);
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
    $('#shipDateFrom').val(year + "-" + month+"-"+day) ;

    today = new Date();
    today.setDate(today.getDate() - 1); //15일 더하여 setting
    year = today.getFullYear();
    month = today.getMonth() + 1;
    day = today.getDate();
    if(month < 10) month = "0" + month;
    if(day < 10) day = "0" + day;
    $('#shipDateTo').val(year + "-" + month+"-"+day);
}

var orderLayout = [{
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
		dataField : "corpName",
		headerText : "배송사업장",
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
    // expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
    //     if(item.vatYn=="과세")
    //       return ( item.orderCnt * item.price )*0.1;
    //     else
    //       return 0;
		// }    
  }, {
		dataField : "totalPrice",
		headerText : "TOTAL(1)+(2)",
		width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    // expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
		// 	// 1~2 분기 합을 계산하여 반환
		// 	// expFunction 의 리턴형은 항상 Number 여야 합니다.(즉, 수식만 가능)
		// 	return ( item.supPrice + item.vatPrice ); 
		// }    
  }];  
  
  function createAUIGrid() {
	//그리드 설정
		var orderProps = {
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
      // height : 400,
      //그리드 가로세로 설정.
      // autoGridHeight : false,
      // enableRestore : false,
      //페이지 출력 행 개수
      pageRowCount : 100,
      pageRowSelectValues:[20,40,60,80,100],
      showPageRowSelect : true,
      enableMovingColumn : true,
      showFooter : true,
      noDataMessage: "주문한 내역이 없습니다."
	  };
//상품 그리드
   var layout = loadColumnLayout();
   if(layout == null)
      orderGrid  = AUIGrid.create("#grid_order", orderLayout, orderProps);
   else
      orderGrid = AUIGrid.create("#grid_order", layout, orderProps);

  //클릭 이벤트 추가
  // setCilckEvent(orderGrid);
  //더블클릭 이벤트 추가
  // setDoubleCilckEvent(orderGrid);

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

  AUIGrid.setFooter(orderGrid,footerLayout);
}  

//상품 검색 함수
  function orderSearch() {
    var shipDateFrom = $('#shipDateFrom').val();
    var shipDateTo = $('#shipDateTo').val();
    var url = '<%=request.getContextPath()%>/cust/orderList';
    var prod = $('#orderSearch').val();
    var searchMode = $('#searchMode').val();
    var shipId = $('#shipCorp').val();
    if(shipDateFrom == '' || shipDateFrom == 'undefined' || shipDateFrom == null || shipDateTo == '' || shipDateTo == 'undefined' || shipDateTo == null  ){
      alert('배송요청일을 지정하세요.');
      return ;
    }
    var params = {
        prod : prod,
        shipId   : shipId,
        id : "<%=(String)session.getAttribute("id")%>",
        shipDateFrom : shipDateFrom,
        shipDateTo : shipDateTo,
        searchMode : searchMode
    };
    $.ajax({
          url : url,
          async : true, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          data : params,
          success : function(data) {
            AUIGrid.setGridData('#grid_order',data);
            setOrderInfo();
          },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
    });    
  }
function enterKey(){
  if (window.event.keyCode == '13') {
    orderSearch();
    return ;
  }
}
function setOrderInfo(){
  var foot = AUIGrid.getFooterData(orderGrid);
    $("#shopBasketCnt").text(AUIGrid.getRowCount(orderGrid) + " 건");
    $("#shopBasketAmt").text(numberComma(foot[3].value) + "원");
}  
  function exportToLocal() {
    if(AUIGrid.getRowCount(orderGrid) ==0){
    alert('조회된 데이터가 없습니다.');
    return ;
  }
	var excelProps = {
		sheetName : "마감정보",
    showRowNumColumn : true
	};
	AUIGrid.exportToXlsx(orderGrid, excelProps);
};
// 윈도우 리사이징 이벤트
window.onresize = function() {
	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
    AUIGrid.resize(orderGrid);
};


// 그리드 상태 저장
function saveColumnLayout() {
  
  var orderColumn ;
  // 칼럼 레이아웃 정보 가져오기
    orderColumn = AUIGrid.getColumnLayout(orderGrid);
	if(typeof(Storage) != "undefined") { // Check browser support
    var orderColumnStr = JSON.stringify(orderColumn);
    var orderRowPos = AUIGrid.getRowPosition(orderGrid); // 수직 스크롤 값
    var orderHPos =  AUIGrid.getProp(orderGrid, "hScrollPosition"); // 수평 스크롤 값(픽셀)
		
    localStorage.setItem("dlineAuigridLayout", orderColumnStr);

    localStorage.setItem("dlineAuigridRow", orderRowPos);

    localStorage.setItem("dlineAuigridCol", orderHPos);
		alert("현재 그리드의 상태가 보관되었습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 현재 상태로 그리드가 출력됩니다.");
	} else {
		alert("localStorage 를 지원하지 않는 브라우저입니다.");
		return;
	}
}
function loadColumnLayout() {

  var columnLayout = null;
  var columnStr;
    columnStr = getLocalStorageValue("dlineAuigridLayout");
	if(columnStr && typeof columnStr != "undefined") {
		columnLayout = JSON.parse(columnStr);
		//감춰진 칼럼에 따라 데모 상에 보이는 체크박스 동기화 시킴.
		syncCheckbox(columnLayout); 
	}
	return columnLayout;
}


// 레이아웃 정보 삭제
function resetColumnLayout() {
    if(typeof(Storage) != "undefined") { // Check browser support
      localStorage.removeItem("dlineAuigridLayout");
      localStorage.removeItem("dlineAuigridRow");
      localStorage.removeItem("dlineAuigridCol");
      alert("저장된 그리드의 상태를 초기화했습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 원래 상태로 출력됩니다.");
    } else {
      alert("localStorage 를 지원하지 않는 브라우저입니다.");
      return;
    }
}
// 칼럼 숨김/해제 체크박스 핸들러
function checkboxChangeHandler(event) {
	var target = event.target || event.srcElement;
	if(!target)	return;
	
	var dataField = target.value;
	var checked = target.checked;
	
	if(checked) {
		AUIGrid.showColumnByDataField(myGridID, dataField);
	} else {
		AUIGrid.hideColumnByDataField(myGridID, dataField);
	}
}

// 감춰진 칼럼에 따라 데모 상에 보이는 체크박스 동기화 시킴.
function syncCheckbox(columns) {
	recursive(columns);
	function recursive(children) {
		var c;
		var dom;
		for(var i=0, len=children.length; i<len; i++) {
			c = children[i];
			if(c.visible === false) {
				dom = document.getElementById(c.dataField);
				if(dom)dom.checked = false;
			}
			if(typeof c.children != "undefined") {
				recursive(c.children);
			}
		}
	}
}
function getLocalStorageValue(key) {
	if(typeof(Storage) != "undefined") { // Check browser support
		return localStorage.getItem(key);
	} else {
		alert("localStorage 를 지원하지 않는 브라우저입니다.");
	}
};
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
          <li><a href="/cust/dline" class="current">마감관리</a></li>
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
      <h1 class="sub_tit">마감관리</h1>
      <div class="customer03 sub_cont_wrap">
        <div class="btn_wrap">
          <button type="button" class="excel_down" onclick = "exportToLocal()">엑셀다운로드</button>
          <button type="button" class="order_request" onclick = "saveColumnLayout()">컬럼위치저장</button>
          <button type="button" class="order_request" onclick = "resetColumnLayout()">컬럼위치초기화</button>
        </div>
        <ul class="sub_tabs">
          <li class="sub_tab current" data-tab="tab1">전체</li>
          <!-- <li class="sub_tab" data-tab="tab2">최근주문이력</li>
          <li class="sub_tab" data-tab="tab3">즐겨찾기</li> -->
        </ul>

        <div class="sub_tab_cont current" id="tab1">
          <!-- 필터 영역 -->
          <div class="filter_area">
            <form class="" action="" method="post">
              <label for="">배송사업장</label>
              <select id="shipCorp" title="" class="">
                <%-- <option selected="selected">검색</option> --%>
                <c:forEach items="${getShipCorpList}" var="shipCorp">
                  <option value="${shipCorp.id}"><c:out value="${shipCorp.corpName}"/></option>
                </c:forEach>
              </select>

              <label for="" style="margin-left:36px;">배송요청일</label>
              <input type="text" id="shipDateFrom" class="datepicker" name="shipDateFrom" value="" onchange="shipDateCheck('from')"> - <input type="text" id="shipDateTo" class="datepicker" name="shipDateTo" value="" onchange="shipDateCheck('to')">
              <button type="button" class="search_btn" onclick="orderSearch()">조회</button>
            </form>

            <div class="filter_sum_area">
              <div class="sub_box">
                <p class="sum_tit">주문건수</p>
                <p class="sub_txt" id="shopBasketCnt"></p>
                <%-- <p class="sub_txt"><div id="shopBasketCnt"  class = "sub_txt">건</div></p> --%>
              </div>
              <div class="sub_box">
                <p class="sum_tit">총 주문액</p>
                <p class="sub_txt" id="shopBasketAmt"></p>
              </div>
            </div>
          </div>
          <!-- 필터 영역 끝 -->

          <!-- 보드 영역 -->
          <div class="flex_box expand_board_left">
            <div class="dashboard_area">
              <h2 class="dashboard_tit">주문내역</h2>
              <div class="dash_top">
                <div class="dash_search_area">
                <%-- <label for="">상품명/코드</label> --%>
                <select id = "searchMode" name= "searchMode" title="" class="">
                  <option value="all" selected="selected">전체</option>
                  <option value="prodName" >상품명</option>
                  <option value="prodCode" >상품코드</option>
                  <option value="orderNo" >주문번호</option>
                </select>
                  <div class="input_search_wrap">
                    <input type="text" id="orderSearch" name="orderSearch " value="" placeholder="오이,양파 콤마로 다중검색 가능" class="search" style="width: 300px" onkeypress="enterKey()">
                    <a href="javascript:orderSearch()"></a>
                  </div>
                </div>
              </div>
              <div class="dash_bottom">
                <div id="grid_order"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <%@ include file="../include/footer.jsp" %>
  </div>



 
</body>

</html>
