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
  var tab_id = 'tab1';
    $(document).ready(function() {
      if("<%=session.getAttribute("id")%>" == "null" ){
        location.href="/";
      }
        openPopup();
        createAUIGrid();
        AUIGrid.resize(orderGrid);
        AUIGrid.resize(orderGrid1);
        AUIGrid.resize(orderGrid2);
        AUIGrid.resize(prodGrid);
        AUIGrid.resize(prodGrid1);
        AUIGrid.resize(prodGrid2);
        $("#shopBasketCnt").text("0   건");
        $("#shopBasketCnt1").text("0   건");
        $("#shopBasketCnt2").text("0   건");
        $("#shopBasketAmt").text("0   원");
        $("#shopBasketAmt1").text("0   원");
        $("#shopBasketAmt2").text("0   원");
        AUIGrid.setProp(prodGrid1, { "noDataMessage" : "최근 주문이력이 없습니다." } );
        AUIGrid.setProp(prodGrid2, { "noDataMessage" : "즐겨찾기 상품이 없습니다." } );


      // 서브 탭 메뉴
      $('.sub_tabs li.sub_tab').click(function() {
        tab_id = $(this).attr('data-tab');
        $('.sub_tabs li.sub_tab').removeClass('current');
        $('.sub_tab_cont').removeClass('current');
        $(this).addClass('current');
        $('#' + tab_id).addClass('current');
          AUIGrid.resize(prodGrid);
          AUIGrid.resize(prodGrid1);
          AUIGrid.resize(prodGrid2);
          AUIGrid.resize(orderGrid);
          AUIGrid.resize(orderGrid1);
          AUIGrid.resize(orderGrid2);
          // prodSearch();
      });


    });
  </script>
<script type="text/javascript">
  //공지사항 팝업 띄우기
function checkHome(){
      if("<%=session.getAttribute("id")%>"==null){
          location.href = "/";
      }else{
          location.href="/cust/food";
      }
  }
function getCookie(name) {
   var cookie = document.cookie;
   if (document.cookie != "") {
      var cookie_array = cookie.split("; ");
      for ( var index in cookie_array) {
        var cookie_name = cookie_array[index].split("=");
        if (cookie_name[0] == name) {
           return cookie_name[1];
        }
      }
    }
    return ;
}
function openPopup() {
  $.ajax({
          url : '<%=request.getContextPath()%>/notice/getNoticeList',
          async : true, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          success : function(data) {
            var cookieCheck;
            var pop;
            var alertFlag = true;
            for(var i=0; i<data.length; i++){
              cookieCheck = getCookie("popupYN"  + data[i].index);
              if(cookieCheck != "N"){
                pop = window.open("/cust/notice?index=" +data[i].index, '', 'width='+data[i].width+',height='+data[i].height+',left=0,top=0')
                if ( alertFlag && (pop == null || typeof(pop) == "undefined" || (pop == null && pop.outerWidth == 0) || (pop != null && pop.outerHeight == 0) || pop.test == "undefined")){
                  alert("[안내사항] 라임푸드 팝업 차단을 해제 바랍니다.\n고객 여러분 라임푸드에서 긴급/공지 사항 발생 시\n팝업으로 해당 내용을 안내 드리고 있습니다.\n해당 메시지가 보이신다면 브라우저에서\n라임푸드 사이트를 팝업 차단 해제 바랍니다.\n\n[ 차단 해제 방법]\n크롬 : \n1) 브라우저 상단 주소창 우측에 별모양 옆에 아이콘 클릭\n2) 라임푸드 사이트 항상 허용으로 변경\n\n익스플로우러 : \n1) 하단 팝업 차단 상태 메시지에서 \n2) 팝업 해제 항상 허용으로 변경\n\n= 늘 노력하는 라임푸드 올림 =");
                  alertFlag = false;
                } 
              }
            }
              
          }
    });
}

function sessionCheck() {
    if ('<%=session.getAttribute("id")%>' == 'null') {
        alert('세션이 만료되었습니다. 재로그인 하시기 바랍니다.');
        location.href = "/";
    } else {
        return true;
    }
}

  //상품 검색 함수
  function prodSearch() {
    var ship_date ;
    var url ;
    var prod;
    var ctg_code;
    var large_ctg;
    if(tab_id == 'tab1'){
      ship_date = $('#shipDate').val();
      url = '<%=request.getContextPath()%>/cust/prodList';
      prod = $('#prodSearch').val();
      $('#shipDate1').val(ship_date);
      $('#shipDate2').val(ship_date);
      $('#prodSearch1').val(prod);
      $('#prodSearch2').val(prod);
      ctg_code = $("#medium_ctg").val();
      large_ctg = $("#large_ctg").val();
    }else if(tab_id == 'tab2'){
      ship_date = $('#shipDate1').val();
      url ='<%=request.getContextPath()%>/cust/orderHist';
      prod = $('#prodSearch1').val();
      $('#shipDate').val(ship_date);
      $('#shipDate2').val(ship_date);
      $('#prodSearch').val(prod);
      $('#prodSearch2').val(prod);
      ctg_code = $("#medium_ctg1").val();
      large_ctg = $("#large_ctg1").val();
    }else if(tab_id == 'tab3'){
      ship_date = $('#shipDate2').val();
      url = '<%=request.getContextPath()%>/cust/bookmarkList';
      prod =$('#prodSearch2').val();
      $('#shipDate1').val(ship_date);
      $('#shipDate').val(ship_date);
      $('#prodSearch1').val(prod);
      $('#prodSearch').val(prod);
      ctg_code = $("#medium_ctg2").val();
      large_ctg = $("#large_ctg2").val();
    }
    if(ship_date == '' || ship_date == 'undefined' || ship_date == null){
      alert('배송요청일을 지정하세요.');
      return ;
    }
      if(AUIGrid.getRowCount(getOrderGridId()) ==0) {
        orderSearch();
      }

    var params = {
        prod : prod,
        id   :"<%=(String)session.getAttribute("id")%>",
        shipDate : ship_date,
        ctgCode : ctg_code,
        largeCtg : large_ctg
    };
    $.ajax({
          url : url,
          async : true, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          data :  params,
          success : function(data) {
            if(tab_id == 'tab1'){
              AUIGrid.setGridData("#grid_prod", data);
              AUIGrid.resize(prodGrid);
            }else if(tab_id == 'tab2'){
              AUIGrid.setGridData("#grid_prod1", data);
            }else if(tab_id == 'tab3'){
              AUIGrid.setGridData("#grid_prod2", data);
            }
            orderSearch();

          },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
    });
  }

  //상품 검색 함수
  function orderSearch() {
    var ship_date ;
    var url ;
    var prod ;
    if(tab_id == 'tab1'){
      ship_date = $('#shipDate').val();
      url = '<%=request.getContextPath()%>/cust/basketList';
      prod = $('#orderSearch').val();

      $('#shipDate1').val(ship_date);
      $('#shipDate2').val(ship_date);
      $('#orderSearch1').val(prod);
      $('#orderSearch2').val(prod);
    }else if(tab_id == 'tab2'){
      ship_date = $('#shipDate1').val();
      url ='<%=request.getContextPath()%>/cust/basketList';
      prod = $('#orderSearch1').val();
      $('#shipDate').val(ship_date);
      $('#shipDate2').val(ship_date);
      $('#orderSearch').val(prod);
      $('#orderSearch2').val(prod);
    }else if(tab_id == 'tab3'){
      ship_date = $('#shipDate2').val();
      url = '<%=request.getContextPath()%>/cust/basketList';
      prod = $('#orderSearch2').val();
      $('#shipDate1').val(ship_date);
      $('#shipDate').val(ship_date);
      $('#orderSearch1').val(prod);
      $('#orderSearch').val(prod);
    }
    if(ship_date == '' || ship_date == 'undefined' || ship_date == null){
      alert('배송요청일을 지정하세요.');
      return ;
    }
    var params = {
        prod : prod,
        id   :  "<%=(String)session.getAttribute("id")%>",
        shipDate : ship_date
    };
    $.ajax({
          url : url,
          async : true, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          data : params,
          success : function(data) {
            if(tab_id == 'tab1'){
              AUIGrid.setGridData("#grid_order", data);
            }else if(tab_id == 'tab2'){
              AUIGrid.setGridData("#grid_order1", data);
              orderSumCnt = AUIGrid.getRowCount(orderGrid1);
            }else if(tab_id == 'tab3'){
              AUIGrid.setGridData("#grid_order2", data);
              orderSumCnt = AUIGrid.getRowCount(orderGrid2);
            }
            setOrderInfo();
          },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
    });

  }

function setOrderInfo(){
  var grid = getOrderGridId();
  var foot = AUIGrid.getFooterData(grid);
  if(grid == orderGrid){
    $("#shopBasketCnt").text(AUIGrid.getRowCount(grid) + " 건");
    $("#shopBasketAmt").text(numberComma(foot[3].value) + "원");
  }else if(grid == orderGrid1){
    $("#shopBasketCnt1").text(AUIGrid.getRowCount(grid) + " 건");
    $("#shopBasketAmt1").text(numberComma(foot[3].value) + "원");
  }else if(grid == orderGrid2){
    $("#shopBasketCnt2").text(AUIGrid.getRowCount(grid) + " 건");
    $("#shopBasketAmt2").text(numberComma(foot[3].value) + "원");
  }
}
  function enterKey(gbn) {
            if (window.event.keyCode == 13) {
                // 엔터키가 눌렸을 때 실행할 내용
                if(gbn == "1"){
                  prodSearch();
                }else if(gbn == "2"){
                  orderSearch();
                }
            }
  }
  //즐겨찾기 추가
  function addBookmark(prod){
        var params = {
        prod : prod,
        id   : "<%=(String)session.getAttribute("id")%>"
    };
        $.ajax({
          url : '<%=request.getContextPath()%>/cust/addBookmark',
          async : true, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          data : params,
          dataType : null,
          success : function(data) {
              removeStatus(getProdGridId());
          },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
        });
  }
  //즐겨찾기 삭제
  function delBookmark(prod,row) {
        var params = {
        prod : prod,
        id   : "<%=(String)session.getAttribute("id")%>"
    };
        $.ajax({
          url : '<%=request.getContextPath()%>/cust/delBookmark',
          async : true, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : null,
          data : params,
          success : function(data) {
            if(tab_id == "tab3"){
              AUIGrid.removeRow(getProdGridId(),row);
              var rowIdx = AUIGrid.getRowIndexesByValue(prodGrid,"prodCode",prod);
              AUIGrid.setCellValue(prodGrid,rowIdx,"bookmark","N");
              rowIdx = AUIGrid.getRowIndexesByValue(prodGrid1,"prodCode",prod);
              AUIGrid.setCellValue(prodGrid1,rowIdx,"bookmark","N");
              removeStatus(prodGrid);
              removeStatus(prodGrid1);
              }

          },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
    });
  }

// 장바구니로이동 버튼 클릭
function moveRight(grid) {

	// 상단 그리드의 체크된 행들 얻기
  var rows = AUIGrid.getSelectedRows(grid);

	if(rows.length <= 0) {
		alert('선택된 상품이 없습니다.');
		return;
  }
  if(rows[0].status == 'X'){
    alert("주문불가 상품은 장바구니에 담을 수 없습니다.");
    return ;
  }
  // 얻은 행을 하단 그리드에 추가하기
  if(grid == prodGrid ){
      if(!AUIGrid.isUniqueValue(orderGrid,"prodCode",rows[0].prodCode)){
        alert("중복된 상품이 존재합니다.");

        return ;
      }
    addShopBasket(rows[0].prodCode, 1);
  }else if(grid ==prodGrid1){
      if(!AUIGrid.isUniqueValue(orderGrid1,"prodCode",rows[0].prodCode)){
        alert("중복된 상품이 존재합니다.");
        return ;
      }
    addShopBasket(rows[0].prodCode, 1);
  }else if(grid == prodGrid2){
      if(!AUIGrid.isUniqueValue(orderGrid2,"prodCode",rows[0].prodCode)){
        alert("중복된 상품이 존재합니다.");
        return ;
      }
    addShopBasket(rows[0].prodCode, 1);
  }
  removeStatus(getOrderGridId());
};


  //장바구니 추가
function addShopBasket(prod, orderCnt){
      var params = {
      prod : prod,
      id   : "<%=session.getAttribute("id")%>",
      orderCnt : orderCnt
      };
      $.ajax({
        url : '<%=request.getContextPath()%>/cust/addShopBasket',
        async : true, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        data : params,
        dataType : null,
        success : function(data) {
          var rows = AUIGrid.getSelectedRows(getProdGridId());
          rows[0].supPrice = rows[0].price;
          rows[0].headSup = rows[0].headPrice;
          if(rows[0].vatYn == "과세"){
            rows[0].vatPrice = Math.round(rows[0].price * 0.1);
            rows[0].headVat = Math.round(rows[0].headPrice * 0.1);
          }else {
            rows[0].vatPrice = 0;
            rows[0].headVat = 0;
          }
          rows[0].totalPrice = rows[0].supPrice + rows[0].vatPrice;
          rows[0].headTotal = rows[0].headSup + rows[0].headVat;
          AUIGrid.addRow(getOrderGridId(), rows, "last");
          AUIGrid.updateRow(getOrderGridId(), { "shipDate" : getShipDate() , "orderCnt" : orderCnt }, "selectedIndex");
          AUIGrid.setCellValue(getOrderGridId(), "selectedIndex", "supPrice", rows[0].price);
          // gridSorting(getOrderGridId(), "prodCode");
          removeStatus(getOrderGridId());
          setOrderInfo();
        },
        error : function(request,status,error) {
          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
      });
}
//즐겨찾기 삭제
function delShopBasket(grid,prod, rowIndex) {
      var params = {
      prod : prod,
      id   : "<%=session.getAttribute("id")%>"
      };
      $.ajax({
        url : '<%=request.getContextPath()%>/cust/delShopBasket',
        async : true, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : null,
        data : params,
        success : function(data) {
            AUIGrid.removeRow(grid,rowIndex);
            setOrderInfo();
        },
        error : function(request,status,error) {
          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
  });
}
  //즐겨찾기 변경
function upShopBasket(prodCode, orderCnt, grid){
      var params = {
      prodCode : prodCode,
      id   : "<%=session.getAttribute("id")%>",
      orderCnt : orderCnt
      };
      $.ajax({
        url : '<%=request.getContextPath()%>/cust/upShopBasket',
        async : true, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        data : params,
        dataType : null,
        success : function(data) {
          // orderSearch();
          removeStatus(grid);
        },
        error : function(request,status,error) {
          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
      });
}

// 선택된 로우 삭제
function moveLeft(grid) {
	// 하단 그리드의 체크된 행들 얻기
	var rows = AUIGrid.getSelectedRows(grid);
	if(rows.length <= 0) {
		alert('선택된 상품이 없습니다.');
		return;
	}
	// 얻은 행을 상단 그리드에 추가하기
  AUIGrid.removeRow(grid, "selectedIndex");
  AUIGrid.removeSoftRows(grid);
};

  var prodGrid;
  var prodGrid1;
  var prodGrid2;

  var orderGrid;
  var orderGrid1;
  var orderGrid2;

//AUIGrid 칼럼 설정
var prodLayout = [   {
		dataField : "bookmark",
		headerText : "즐겨찾기",
    width :"13%",
    renderer : {
      type : "ImageRenderer",
      imgHeight : 15, // 이미지 높이, 지정하지 않으면 rowHeight에 맞게 자동 조절되지만 빠른 렌더링을 위해 설정을 추천합니다.
      altField : null, // alt(title) 속성에 삽입될 필드명, 툴팁으로 출력됨. 만약 null 을 설정하면 툴팁 표시 안함.
      imgTableRef :  { // 이미지 소스참조할 테이블 레퍼런스
        "Y" : "../img/star_full_icon.png",
        "N" : "../img/star_empty_icon.png",
        "default" : "../img/star_empty_icon.png" // default
      }
    }

	},{
		dataField : "status",
		headerText : "상태",
    width : "10%",
    renderer : {
      type : "ImageRenderer",
      imgHeight : 12, // 이미지 높이, 지정하지 않으면 rowHeight에 맞게 자동 조절되지만 빠른 렌더링을 위해 설정을 추천합니다.
      altField : null, // alt(title) 속성에 삽입될 필드명, 툴팁으로 출력됨. 만약 null 을 설정하면 툴팁 표시 안함.
      imgTableRef :  { // 이미지 소스참조할 테이블 레퍼런스
        "O" : "../img/possible_icon.png",
        "X" : "../img/impossible_icon.png",
      }
    }
	}, {
		dataField : "deadLine",
		headerText : "마감일시",
		width : "15%"
	}, {
		dataField : "prodCode",
		headerText : "상품코드",
		width :"15%"
	}, {
		dataField : "price",
		headerText : "단가",
    width : "10%",
    dataType : "numeric",
    formatString : "#,##0"
  }, {
		dataField : "prodName",
		headerText : "상품명",
		width : "35%"
	}, {
		dataField : "unit",
		headerText : "단위",
		width : "10%"
	}, {
		dataField : "origin",
		headerText : "원산지",
		width : "15%"
	}, {
		dataField : "vatYn",
		headerText : "과/면세",
    width : "10%"
	}, {
		dataField : "headPrice",
		headerText : "본사단가",
    width : "10%",
    dataType : "numeric",
    formatString : "#,##0",
    visible : false
	}];

var orderLayout = [{
		dataField : "del",
    headerText : "삭제",
    // headerRenderer : {
    //   type : "CheckBoxHeaderRenderer",
    //   // 헤더의 체크박스가 상호 의존적인 역할을 할지 여부(기본값:false)
    //   // dependentMode 는 renderer 의 type 으로 CheckBoxEditRenderer 를 정의할 때만 활성화됨.
    //   // true 설정했을 때 클릭하면 해당 열의 필드(데모 상은 isActive 필드)의 모든 데이터를 true, false 로 자동 바꿈
    //   dependentMode : false,
    //   position : "left" // 기본값 "bottom"
    // },
    width :"10%",
		renderer : {
			type : "CheckBoxEditRenderer",
      showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
      checkValue  : 'Y',
      unCheckValue  : 'N',
			editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
      //사용자가 체크 상태를 변경하고자 할 때 변경을 허락할지 여부를 지정할 수 있는 함수 입니다.
			checkableFunction :  function(rowIndex, columnIndex, value, isChecked, item, dataField ) {
				// 행 아이템의 charge 가 Anna 라면 수정 불가로 지정. (기존 값 유지)
				return true;
      }
    }
	},{
		dataField : "status",
		headerText : "상태",
    width : "10%",
    editable : false,
    renderer : {
      type : "ImageRenderer",
      imgHeight : 12, // 이미지 높이, 지정하지 않으면 rowHeight에 맞게 자동 조절되지만 빠른 렌더링을 위해 설정을 추천합니다.
      altField : null, // alt(title) 속성에 삽입될 필드명, 툴팁으로 출력됨. 만약 null 을 설정하면 툴팁 표시 안함.
      imgTableRef :  { // 이미지 소스참조할 테이블 레퍼런스
        "O" : "../img/possible_icon.png",
        "X" : "../img/impossible_icon.png",
      }
    }
	}, {
		dataField : "deadLine",
		headerText : "마감일시",
    width : "15%",
    editable : false
	}, {
		dataField : "prodCode",
		headerText : "상품코드",
		width :"15%",
    editable : false
	}, {
		dataField : "price",
		headerText : "단가",
    width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0"

	},{
		dataField : "prodName",
		headerText : "상품명",
		width : "35%",
    editable : false
	}, {
		dataField : "unit",
		headerText : "단위",
		width : "10%",
    editable : false
	}, {
		dataField : "origin",
		headerText : "원산지",
		width : "15%",
    editable : false
  }, {
		dataField : "orderCnt",
		headerText : "주문수량",
    width : "15%",
    dataType : "numeric",
    formatString : "#,##0",
    editRenderer : {
      onlyNumeric : true, // 0~9만 입력가능
      textAlign : "right", // 오른쪽 정렬로 입력되도록 설정
     }
	}, {
		dataField : "vatYn",
		headerText : "과/면세",
    width : "10%",
    editable : false
	}, {
		dataField : "supPrice",
		headerText : "합계(1)",
		width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    // expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
    //       return ( item.orderCnt * item.price );
		// }
  }, {
		dataField : "vatPrice",
		headerText : "VAT(2)",
		width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    // expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
    //     if(item.vatYn=="과세")
    //       return Math.round(( item.orderCnt * item.price )*0.1);
    //     else
    //       return 0;
		// }
  }, {
		dataField : "totalPrice",
		headerText : "TOTAL(1)+(2)",
		width : "20%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    // expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
		// 	// 1~2 분기 합을 계산하여 반환
		// 	// expFunction 의 리턴형은 항상 Number 여야 합니다.(즉, 수식만 가능)
		// 	return ( item.supPrice + item.vatPrice );
		// }
  },{
    dataField : "shipDate",
    visible : false
  },{
    dataField : "shipCorp",
    visible : false
  },{
		dataField : "cost",
		headerText : "단가",
    width : "10%",
    dataType : "numeric",
    formatString : "#,##0",
    visible : false
  },{
    dataField : "useFlag",
    headerText : "활성화",
    visible : false
  }, {
		dataField : "headPrice",
		headerText : "본사단가",
		width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    // expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
    //       return ( item.orderCnt * item.price );
		// }
    visible : false
  }, {
		dataField : "headSup",
		headerText : "본사공급가액",
		width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    // expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
    //       return ( item.orderCnt * item.price );
		// }
    visible : false
  }, {
		dataField : "headVat",
		headerText : "본사부가세액",
		width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    // expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
    //       return ( item.orderCnt * item.price );
		// }
    visible : false
  }, {
		dataField : "headTotal",
		headerText : "본사합계액",
		width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    // expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
    //       return ( item.orderCnt * item.price );
		// }
    visible : false
  }];


function createAUIGrid() {
	//그리드 설정
		var prodProps = {
      enableSorting : true,
      //페이징 설정
      usePaging : true,
      // singleRow 선택모드
      selectionMode : "multipleCells",
      softRemoveRowMode  : false,
      // 고정 칼럼 1개
      // fixedColumnCount : 1,
      // 줄번호 칼럼 렌더러 출력
      showRowNumColumn : true,
      // 체크박스 표시 렌더러 출력 안함
      showRowCheckColumn : false,
      // height : 600,
      //그리드 가로세로 설정.
      // autoGridHeight : false,
      // enableRestore : false,
      headerHeight : 35,
      rowHeight : 35,
      footerHeight : 35,
      //페이지 출력 행 개수
      pageRowCount : 100,
      pageRowSelectValues:[20,40,60,80,100],
      showPageRowSelect : true,
      enableMovingColumn : true,
      noDataMessage: "검색한 상품이 존재하지 않습니다."
	  };


  var orderProps={
    editable : true,
    enableSorting :true,
    softRemoveRowMode  : false,
    usePaging: true,
    // fixedColumnCount: 1,
    showRowNumColumn : true,
    showRowCheckColumn : false,
    // autoGridHeight : false,
    // enableRestore:false,
    pageRowCount:100,
    // height : 600,
    headerHeight : 35,
    rowHeight : 35,
    footerHeight : 35,
    showPageRowSelect:true,
    pageRowSelectValues:[20,40,60,80,100],
    enableMovingColumn:true,
    editBeginMode:"click",
    onlyEnterKeyEditEnd :false,
    showFooter : true, // 푸터 보이게 설정
    noDataMessage: "장바구니에 담긴 상품이 없습니다."
  };

//상품 그리드
var layout = loadColumnLayout('prod');
   if(layout == null){
    prodGrid  = AUIGrid.create("#grid_prod", prodLayout, prodProps);
    prodGrid1 = AUIGrid.create("#grid_prod1", prodLayout,prodProps);
    prodGrid2 = AUIGrid.create("#grid_prod2", prodLayout,prodProps);
   }
   else{
     prodGrid  = AUIGrid.create("#grid_prod", layout, prodProps);
     prodGrid1 = AUIGrid.create("#grid_prod1", layout, prodProps);
     prodGrid2 = AUIGrid.create("#grid_prod2", layout, prodProps);
   }
  //클릭 이벤트 추가
  setCilckEvent(prodGrid);
  setCilckEvent(prodGrid1);
  setCilckEvent(prodGrid2);

  //더블클릭 이벤트 추가
  setDoubleCilckEvent(prodGrid);
  setDoubleCilckEvent(prodGrid1);
  setDoubleCilckEvent(prodGrid2);
  setKeydownEvent(prodGrid);
  setKeydownEvent(prodGrid1);
  setKeydownEvent(prodGrid2);


//주문 그리드
 layout = null;
  layout = loadColumnLayout('shop');
   if(layout == null){
    orderGrid  = AUIGrid.create("#grid_order", orderLayout, orderProps);
    orderGrid1 = AUIGrid.create("#grid_order1", orderLayout,orderProps);
    orderGrid2 = AUIGrid.create("#grid_order2", orderLayout,orderProps);
   }
   else{
     orderGrid  = AUIGrid.create("#grid_order", layout, orderProps);
     orderGrid1 = AUIGrid.create("#grid_order1", layout, orderProps);
     orderGrid2 = AUIGrid.create("#grid_order2", layout, orderProps);
   }
  setCilckEvent(orderGrid);
  setCilckEvent(orderGrid1);
  setCilckEvent(orderGrid2);

  setKeydownEvent(orderGrid);
  setKeydownEvent(orderGrid1);
  setKeydownEvent(orderGrid2);

  //변경 이벤트 추가
  setCellEditEndEvent(orderGrid);
  setCellEditEndEvent(orderGrid1);
  setCellEditEndEvent(orderGrid2);
  // setDoubleCilckEvent(orderGrid);
  // setDoubleCilckEvent(orderGrid1);
  // setDoubleCilckEvent(orderGrid2);

// 푸터 설정
var footerLayout = [ {
	labelText : "합계",
	positionField : "#base",
	style : "aui-grid-my-column"
}
, {
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
}
];

  AUIGrid.setFooter(orderGrid,  footerLayout);
  AUIGrid.setFooter(orderGrid1, footerLayout);
  AUIGrid.setFooter(orderGrid2, footerLayout);
}
     // 그리드 클릭 이벤트 추가
function setCilckEvent(grid){
    if(grid == prodGrid || grid == prodGrid1 || grid == prodGrid2){
        AUIGrid.bind(grid, "cellClick", function(event) {
          if(event.dataField == "bookmark"){
            switch(event.value){
              case "Y" :
                delBookmark(event.item.prodCode, event.rowIndex);
                AUIGrid.updateRow(grid, { "bookmark" : "N" }, event.rowIndex);
                if(tab_id != "tab3"){
                    AUIGrid.removeRow(prodGrid2,AUIGrid.getRowIndexesByValue(prodGrid2,"prodCode",event.item.prodCode ));
                    removeStatus(prodGrid2);
                }
                removeStatus(getProdGridId());
                break;
              case "N" :
                addBookmark(event.item.prodCode);
                AUIGrid.updateRow(grid, { "bookmark" : "Y" }, event.rowIndex);
                var rows = AUIGrid.getSelectedRows(grid);
                if(tab_id != "tab3"){
                  AUIGrid.addRow(prodGrid2, rows, "last");
                  gridSorting(prodGrid2, "prodCode");
                }
                break;
            }

          }
      });
    }else if(grid == orderGrid || grid == orderGrid1 || grid == orderGrid2){
        AUIGrid.bind(grid, "cellClick", function(event) {
          if(event.dataField == "del" ){
            switch(event.value){
              case "Y":
                if(confirm("삭제하시겠습니까?")){
                  delShopBasket(orderGrid,event.item.prodCode, event.rowIndex);
                  delShopBasket(orderGrid1,event.item.prodCode, event.rowIndex);
                  delShopBasket(orderGrid2,event.item.prodCode, event.rowIndex);
                }else{
                  AUIGrid.setCellValue(orderGrid,event.rowIndex,"del","N");
                  AUIGrid.setCellValue(orderGrid1,event.rowIndex,"del","N");
                  AUIGrid.setCellValue(orderGrid2,event.rowIndex,"del","N");
                  removeStatus(orderGrid);
                  removeStatus(orderGrid1);
                  removeStatus(orderGrid2);
                }
                break;
            }

          }
      });
    }
}
     // 그리드 더블클릭 이벤트 추가
function setDoubleCilckEvent(grid){
  	AUIGrid.bind(grid, "cellDoubleClick", function(event) {
      if(grid == prodGrid || grid == prodGrid1 || grid == prodGrid2){
        if(event.bookmark != "bookmark"){
          if($('#shipDate').val() == "" ){
            alert('배송요청일을 지정하세요.');
            return false;
          }

            moveRight(grid);
            setOrderInfo();
        }

      }
      // else if(grid == orderGrid || grid == orderGrid1 || grid == orderGrid2){
      //   moveLeft(grid);
      // }
  });
}
     // 그리드 변경 이벤트 추가
function setCellEditEndEvent(grid){
        AUIGrid.bind(grid, "cellEditEnd", function(event) {
          AUIGrid.setCellValue(grid, event.rowIndex,"supPrice", event.item.orderCnt * event.item.price);
          AUIGrid.setCellValue(grid, event.rowIndex,"headSup", event.item.orderCnt * event.item.headPrice); //본사단가
          if(event.item.vatYn=="과세"){
            AUIGrid.setCellValue(grid, event.rowIndex,"vatPrice", Math.round((event.item.orderCnt * event.item.price)*0.1));
            AUIGrid.setCellValue(grid, event.rowIndex,"totalPrice", (event.item.orderCnt * event.item.price) + Math.round((event.item.orderCnt * event.item.price)*0.1) );
            //본사 단가 기준 금액 
            AUIGrid.setCellValue(grid, event.rowIndex,"headVat", Math.round((event.item.orderCnt * event.item.headPrice)*0.1));
            AUIGrid.setCellValue(grid, event.rowIndex,"headTotal", (event.item.orderCnt * event.item.headPrice) + Math.round((event.item.orderCnt * event.item.headPrice)*0.1) );
          }
          else{
            AUIGrid.setCellValue(grid, event.rowIndex,"vatPrice", 0); 
            AUIGrid.setCellValue(grid, event.rowIndex,"totalPrice", (event.item.orderCnt * event.item.price));
            //본사 단가 기준 금액 
            AUIGrid.setCellValue(grid, event.rowIndex,"headVat", 0); 
            AUIGrid.setCellValue(grid, event.rowIndex,"headTotal", (event.item.orderCnt * event.item.headPrice));
          }
          
            upShopBasket(event.item.prodCode, event.item.orderCnt, grid);
      });
}

// insert key 막기.
function setKeydownEvent(grid){
  AUIGrid.bind(grid,"keyDown",	function(event) {
      if(event.keyCode == 45) { // Insert  키
        return false; // 기본 행위 안함.
      }
      return true; // 기본 행위 유지
    });
}

function exportToLocal() {
	var excelProps = {
		sheetName : "고객정보",
    exceptColumnFields : ["edit"], // 이름, 제품, 컬러는 아예 엑셀로 내보내기 안하기.
    showRowNumColumn : true
	};
	AUIGrid.exportToXlsx(prodGrid, excelProps);
};
// 윈도우 리사이징 이벤트
window.onresize = function() {

	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
	if (typeof prodGrid !== "undefined") {
    AUIGrid.resize(prodGrid);
    AUIGrid.resize(prodGrid1);
    AUIGrid.resize(prodGrid2);

    AUIGrid.resize(orderGrid);
    AUIGrid.resize(orderGrid1);
    AUIGrid.resize(orderGrid2);
  }
};

function shipDateCheck() {
    var shipDate ;
    if(tab_id == "tab1"){
      shipDate = $('#shipDate').val();
      $('#shipDate1').val(shipDate);
      $('#shipDate2').val(shipDate);
    }else if(tab_id == "tab2"){
      shipDate = $('#shipDate1').val();
      $('#shipDate').val(shipDate);
      $('#shipDate2').val(shipDate);
    }else if(tab_id =="tab3"){
      shipDate = $('#shipDate2').val();
      $('#shipDate1').val(shipDate);
      $('#shipDate').val(shipDate);
    }

    var date = new Date(shipDate).getTime();
    var now = new Date().getTime();
    var diff = (date - now)/1000/60/60/24;
  if((date - now)/1000/60/60/24 < 0){
    alert("배송요청일은 오늘 이후 날짜부터 가능합니다.");
     shipDate = $('#shipDate').val('');
     shipDate = $('#shipDate1').val('');
     shipDate = $('#shipDate2').val('');
    return ;
  }
}

function getShipDate() {
  var date;
  if(tab_id == "tab1"){
    date  = new Date($('#shipDate').val());
  }else if(tab_id == "tab2"){
    date  = new Date($('#shipDate1').val());
  }else if(tab_id == "tab3"){
    date  = new Date($('#shipDate2').val());
  }

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  month = month > 9 ? month : "0" + month;
  day  = day > 9 ? day : "0" + day;
  return year + "-" + month + "-" +day;
}

function orderRequest(grid){
  var orderCnt =0;
    orderCnt = AUIGrid.getRowCount(grid);
  if(orderCnt == 0){
    alert("장바구니에 담긴 상품이 없습니다.");
    return ;
  }
  if(document.getElementById("ship_corp").value == ""){
    alert("배송사업장을 선택하세요.");
    return ;
  }

  for(var i =0; i<orderCnt; i++){
    if(AUIGrid.getCellValue(grid,i,"status") == "X"){
      alert("주문불가 상품이 존재하여 주문요청이 불가능합니다.");
      return ;
    }
  }
    for(var i =0; i<orderCnt; i++){
    if(AUIGrid.getCellValue(grid,i,"useFlag") == "N"){
      alert(AUIGrid.getCellValue(grid,i,"prodName") + "상품은 현재 판매되지 않는 상품입니다.\n관리자에게 문의하시기 바랍니다.");
      return ;
    }
  }


  var data = {};

  var shipCorp;
  var shipDate ;
  if(tab_id == "tab1"){
    shipCorp = $('#ship_corp').val();
    shipDate = $('#shipDate').val();
  }else if(tab_id == "tab2"){
    shipCorp = $('#ship_corp1').val();
    shipDate = $('#shipDate1').val();
  }else if(tab_id == "tab3"){
    shipCorp = $('#ship_corp2').val();
    shipDate = $('#shipDate2').val();
  }
  AUIGrid.updateRowBlockToValue(grid, 0, AUIGrid.getRowCount(grid)-1, "shipCorp",shipCorp);
  AUIGrid.updateRowBlockToValue(grid, 0, AUIGrid.getRowCount(grid)-1, "shipDate",shipDate);

if(shipDate == "" || shipDate == undefined || shipDate == null){
  alert('배송요청일을 지정하세요.');
  return ;
}
var list = AUIGrid.getGridData(grid);
data.add = list;
if(sessionCheck()){
    $.ajax({
          url : '<%=request.getContextPath()%>/cust/orderReq',
          async : true, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'text',
          contentType: "application/json; charset=utf-8",
          data :  JSON.stringify(data),
          success : function(data) {
            if(tab_id == 'tab1'){
              AUIGrid.clearGridData(getOrderGridId(), "");
            }else if(tab_id == 'tab2'){
              AUIGrid.clearGridData(getOrderGridId(), "");
            }else if(tab_id == 'tab3'){
              AUIGrid.clearGridData(getOrderGridId(), "");
            }
            if(data!= ""){
              alert("주문요청 되었습니다.");
            }else{
              alert('세션이 만료되었습니다. 재로그인 하시기 바랍니다.');
              location.href="/"
            }
          },
          error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
          }
    });
  }
}

function getOrderGridId() {
  var gridId ;
  if(tab_id == "tab1"){
    gridId = orderGrid;
  }else if(tab_id =="tab2"){
    gridId = orderGrid1;
  }else if(tab_id =="tab3"){
    gridId = orderGrid2;
  }
  return gridId;
}
function getProdGridId() {
  var gridId ;
  if(tab_id == "tab1"){
    gridId = prodGrid;
  }else if(tab_id =="tab2"){
    gridId = prodGrid1;
  }else if(tab_id =="tab3"){
    gridId = prodGrid2;
  }
  return gridId;
}

function gridSorting(grid, col){
   var sortingInfo = [];
 // 차례로 Country, Name, Price 에 대하여 각각 오름차순, 내림차순, 오름차순 지정.
 sortingInfo[0] = { dataField : col, sortType : 1 }; // 오름차순 1
 AUIGrid.setSorting(grid, sortingInfo);
}
function setShipCorp(obj){
  if(tab_id =='tab1'){
    $('#ship_corp1').val(obj.value);
    $('#ship_corp2').val(obj.value);
  }else if(tab_id =='tab2'){
    $('#ship_corp').val(obj.value);
    $('#ship_corp2').val(obj.value);
  }else if(tab_id == 'tab3'){
    $('#ship_corp1').val(obj.value);
    $('#ship_corp').val(obj.value);
  }
}

//카테고리 설정
function setLargeCtg(obj){
  var largeCtgCode;
var params = {}
  if(tab_id == 'tab1'){
    largeCtgCode = $("#large_ctg").val();
  }else if(tab_id == 'tab2'){
    largeCtgCode = $("#large_ctg1").val();
  }else if(tab_id == 'tab3'){
    largeCtgCode = $("#large_ctg2").val();
  }
  if(largeCtgCode != ''){
    params.largeCtgCode = largeCtgCode;
   $.ajax({
          url : '<%=request.getContextPath()%>/cust/getMediumCtg',
          async : false, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : 'json',
          data :  params,
          success : function(data) {
            if(tab_id == 'tab1'){
                  $("#medium_ctg").empty();
                  $("#medium_ctg").append("<option value=''>중분류</option>");
              if(data.length > 0){
                  for (var idx = 0; idx < data.length; idx++) {
                    var option = $("<option value='"+data[idx].mediumCtgCode +"'>" + data[idx].mediumCtgName + "</option>");
                      $('#medium_ctg').append(option);
                  }
              }
            }else if(tab_id == 'tab2'){
                  $("#medium_ctg1").empty();
                  $("#medium_ctg1").append("<option value=''>중분류</option>");
              if(data.length > 0){
                  for (var idx = 0; idx < data.length; idx++) {
                    var option = $("<option value='"+data[idx].mediumCtgCode +"'>" + data[idx].mediumCtgName + "</option>");
                      $('#medium_ctg1').append(option);
                  }
              }              
            }else if(tab_id == 'tab3'){
                  $("#medium_ctg2").empty();
                  $("#medium_ctg2").append("<option value=''>중분류</option>");
              if(data.length > 0){
                  for (var idx = 0; idx < data.length; idx++) {
                    var option = $("<option value='"+data[idx].mediumCtgCode +"'>" + data[idx].mediumCtgName + "</option>");
                      $('#medium_ctg2').append(option);
                  }
              }             
            }
          },
          error : function(request,status,error) {
          }
    });
  }else{
    if(tab_id == 'tab1'){
          $("#medium_ctg").empty();
          $("#medium_ctg").append("<option value=''>중분류</option>");
    }else if(tab_id == 'tab2'){
          $("#medium_ctg1").empty();
          $("#medium_ctg1").append("<option value=''>중분류</option>");
    }else if(tab_id == 'tab3'){
          $("#medium_ctg2").empty();
          $("#medium_ctg2").append("<option value=''>중분류</option>");
    }
  }
}


// 그리드 상태 저장
function saveColumnLayout() {
  
  var prodColumn ;
  var shopColumn ;
  // 칼럼 레이아웃 정보 가져오기
    prodColumn = AUIGrid.getColumnLayout(getProdGridId());
    shopColumn = AUIGrid.getColumnLayout(getOrderGridId());
	
	if(typeof(Storage) != "undefined") { // Check browser support
    var prodColumnStr = JSON.stringify(prodColumn);
    var shopColumnStr = JSON.stringify(shopColumn);
    var prodRowPos = AUIGrid.getRowPosition(getOrderGridId()); // 수직 스크롤 값
    var shopRowPos = AUIGrid.getRowPosition(getProdGridId()); // 수직 스크롤 값
    var prodHPos =  AUIGrid.getProp(getOrderGridId(), "hScrollPosition"); // 수평 스크롤 값(픽셀)
    var shopHPos =  AUIGrid.getProp(getProdGridId(), "hScrollPosition"); // 수평 스크롤 값(픽셀)
		
    localStorage.setItem("prodAuigridLayout", prodColumnStr);
    localStorage.setItem("shopAuigridLayout", shopColumnStr);

    localStorage.setItem("prodAuigridRow", prodRowPos);
    localStorage.setItem("shopAuigridRow", shopRowPos);

    localStorage.setItem("prodAuigridCol", prodHPos);
    localStorage.setItem("shopAuigridCol", shopHPos);
		
		alert("현재 그리드의 상태가 보관되었습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 현재 상태로 그리드가 출력됩니다.");
	} else {
		alert("localStorage 를 지원하지 않는 브라우저입니다.");
		return;
	}
}
function loadColumnLayout(grid) {

  var columnLayout = null;
  var columnStr;
  if(grid == 'prod'){
    columnStr = getLocalStorageValue("prodAuigridLayout");
  }else if(grid == 'shop'){
    columnStr = getLocalStorageValue("shopAuigridLayout");
  }
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
      localStorage.removeItem("prodAuigridLayout");
      localStorage.removeItem("prodAuigridRow");
      localStorage.removeItem("prodAuigridCol");
      localStorage.removeItem("shopAuigridLayout");
      localStorage.removeItem("shopAuigridRow");
      localStorage.removeItem("shopAuigridCol");
      alert("저장된 그리드의 상태를 초기화했습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 원래 상태로 출력됩니다.");
    } else {
      alert("localStorage 를 지원하지 않는 브라우저입니다.");
      return;
    }
}
function saveLayout(){
  saveColumnLayout();
}

function resetLayout(){
  resetColumnLayout();
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
<body >
  <!-- 서브 sub -->
  <!-- 고객용 customer -->
  <div id="customer" class="customer">


    <!-- 헤더 스타일1 header style1 -->
    <header id="header" class="header">
      <div class="inner">
        <a href="javascript:checkHome()" class="header_logo"><img src="../img/header_logo.png" alt="라임푸드 로고" /></a>
        <ul class="gnb">
          <li><a href="/cust/howto">사용방법안내</a></li>
          <li><a href="/cust/food" class="current">식자재주문</a></li>
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

    <div class="sub_cont_area bg01">
      <h1 class="sub_tit">식자재 주문</h1>
      <div class="sub_cont_wrap customer01">
        <div class="btn_wrap">
          <a href="<%=request.getContextPath()%>/template/식자재주문매뉴얼.pdf" download>
          <button type="button" class="excel_down">사용방법 안내</button>
          </a>
          <button type="button" class="order_request" onclick = "saveLayout()">컬럼위치저장</button>
          <button type="button" class="order_request" onclick = "resetLayout()">컬럼위치초기화</button>
          <button type="button" class="order_request" onclick = "orderRequest(getOrderGridId())">주문요청</button>
        </div>
        <ul class="sub_tabs">
          <li class="sub_tab current" data-tab="tab1">전체</li>
          <li class="sub_tab" data-tab="tab2">최근주문이력</li>
          <li class="sub_tab" data-tab="tab3">★ 즐겨찾기</li>
        </ul>
        <div class="sub_tab_cont current" id="tab1">
          <!-- 필터 영역 -->
          <div class="filter_area">
            <form class="" action="" method="post">
              <label for="">배송사업장</label>
              <select id="ship_corp" title="" class="" onchange="setShipCorp(this)">
                <c:forEach items="${getShipCorpList}" var="shipCorp">
                  <option value="${shipCorp.id}"><c:out value="${shipCorp.corpName}"/></option>
                </c:forEach>
              </select>

              <label for="" style="margin-left:36px;">배송요청일</label>
              <input type="text" class="datepicker" id ="shipDate" name="shipDate" value=""  onchange = "shipDateCheck()">
            </form>
            <div class="filter_sum_area">
              <div class="sub_box">
                <p class="sum_tit">주문건수</p>
                <p class="sub_txt" id="shopBasketCnt"></p>
              </div>
              <div class="sub_box">
                <p class="sum_tit">총 주문액</p>
                <p class="sub_txt" id="shopBasketAmt"></p>
              </div>
              <div class="sub_box">
                <p class="sum_tit">월 주문 누적액</p>
                <p class="sub_txt"><%=request.getAttribute("monthOrderAmt")%> 원</p>
              </div>
            </div>
          </div>
          <!-- 필터 영역 끝 -->
          <!-- 보드 영역 -->
          <div class="flex_wrap expand_board">
            <div class="flex_box expand_board_left">
              <div class="dashboard_area">
                <div class="dashboard_tit_wrap">
                  <h2 class="dashboard_tit">상품정보</h2>
                  <div class="mark_area">
                    <p class="possible">주문가능</p>
                    <p class="impossible">주문불가</p>
                  </div>
                </div>
                <div class="dash_top">
                  <div class="dash_search_area">
                 <select id="large_ctg" title="" class="" onchange="setLargeCtg(this)">
                  <option selected="selected" value=''>대분류</option>
                    <c:forEach items="${largeCtgList}" var="category">
                      <option value="${category.largeCtgCode}"><c:out value="${category.largeCtgName}"/></option>
                    </c:forEach>
                </select>
                <select id="medium_ctg" title="" class="">
                  <option selected="selected" value=''>중분류</option>
                </select>
                    <!-- <label for="">상품명/코드</label> -->
                    <div class="input_search_wrap">
                      <input type="text" id = "prodSearch" name="prodSearch" value="" placeholder="오이,양파 콤마로 다중검색 가능" class="search"  onkeyup="enterKey(1)">
                      <a href="javascript:prodSearch()"></a>
                    </div>
                  </div>
                </div>
                <div class="dash_bottom">
                  <div id="grid_prod" ></div>
                </div>
              </div>
            </div>
            <div class="expand_btn_wrap">
              <button type="button" class="expand_right_btn"></button>
              <button type="button" class="expand_center_btn"></button>
              <button type="button" class="expand_left_btn"></button>
            </div>
            <div  class="flex_box expand_board_right">
              <div id = "shopBasket" class="dashboard_area">
                <div class="dashboard_tit_wrap">
                  <h2 class="dashboard_tit">장바구니</h2>
                  <div class="mark_area">
                    <p class="possible">주문가능</p>
                    <p class="impossible">주문불가</p>
                  </div>
                </div>
                <div class="dash_top">
                  <div class="dash_search_area">
                    <label for="">주문내역</label>
                    <div class="input_search_wrap">
                      <input type="text" id = "orderSearch" name="orderSearch" value="" placeholder="오이,양파 콤마로 다중검색 가능" class="search" onkeyup="enterKey(2)">
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
          <!-- 보드 영역 끝-->
        </div>
        <div class="sub_tab_cont" id="tab2">
          <!-- 필터 영역 -->
          <div class="filter_area">
            <form class="" action="" method="post">
              <label for="">배송사업장</label>
              <select id="ship_corp1" title="" class="" onchange="setShipCorp(this)">
                <c:forEach items="${getShipCorpList}" var="shipCorp">
                  <option value="${shipCorp.id}"><c:out value="${shipCorp.corpName}"/></option>
                </c:forEach>
              </select>
              <label for="" style="margin-left:36px;">배송요청일</label>
              <input type="text" class="datepicker" id = "shipDate1" name="shipDate1" value="" onchange = "shipDateCheck()">
            </form>
            <div class="filter_sum_area">
              <div class="sub_box">
                <p class="sum_tit">주문건수</p>
                <p class="sub_txt" id="shopBasketCnt1"></p>
              </div>
              <div class="sub_box">
                <p class="sum_tit">총 주문액</p>
                <p class="sub_txt" id="shopBasketAmt1"></p>
              </div>
              <div class="sub_box">
                <p class="sum_tit">월 주문 누적액</p>
                <p class="sub_txt"><%=request.getAttribute("monthOrderAmt")%> 원</p>
              </div>
            </div>
          </div>
          <!-- 필터 영역 끝 -->
          <!-- 보드 영역 -->
          <div class="flex_wrap expand_board">
            <div class="flex_box expand_board_left">
              <div class="dashboard_area">
                <div class="dashboard_tit_wrap">
                  <h2 class="dashboard_tit">상품정보</h2>
                  <div class="mark_area">
                    <p class="possible">주문가능</p>
                    <p class="impossible">주문불가</p>
                  </div>
                </div>
                <div class="dash_top">
                  <div class="dash_search_area">
                    <select id="large_ctg1" title="" class="" onchange="setLargeCtg(this)">
                      <option selected="selected" value=''>대분류</option>
                        <c:forEach items="${largeCtgList}" var="category">
                          <option value="${category.largeCtgCode}"><c:out value="${category.largeCtgName}"/></option>
                        </c:forEach>
                    </select>
                    <select id="medium_ctg1" title="" class="">
                      <option selected="selected" value=''>중분류</option>
                    </select>
                    <!-- <label for="">상품명/코드</label> -->
                    <div class="input_search_wrap">
                     <input type="text" id = "prodSearch1" name="prodSearch1" value="" placeholder="오이,양파 콤마로 다중검색 가능" class="search" onkeyup="enterKey(1);">
                      <a href="javascript:prodSearch()"></a>
                    </div>
                  </div>
                </div>
                <div class="dash_bottom">
                  <div id="grid_prod1"></div>
                </div>
              </div>
            </div>
            <div class="expand_btn_wrap">
              <button type="button" class="expand_right_btn"></button>
              <button type="button" class="expand_center_btn"></button>
              <button type="button" class="expand_left_btn"></button>
            </div>
            <div class="flex_box expand_board_right">
              <div id = "shopBasket1" class="dashboard_area">
                <div class="dashboard_tit_wrap">
                  <h2 class="dashboard_tit">장바구니</h2>
                  <div class="mark_area">
                    <p class="possible">주문가능</p>
                    <p class="impossible">주문불가</p>
                  </div>
                </div>

                <div class="dash_top">
                  <div class="dash_search_area">
                    <label for="">주문내역</label>
                    <div class="input_search_wrap">
                      <input type="text" id = "orderSearch1" name="orderSearch1" value="" placeholder="오이,양파 콤마로 다중검색 가능" class="search" onkeyup="enterKey(2);">
                      <a href="javascript:orderSearch()"></a>
                    </div>
                  </div>
                </div>
                <div class="dash_bottom">
                  <div id="grid_order1"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- 보드 영역 끝-->
        </div>
        <div class="sub_tab_cont" id="tab3">
          <!-- 필터 영역 -->
          <div class="filter_area">
            <form class="" action="" method="post">
              <label for="">배송사업장</label>
              <select id="ship_corp2" title="" class="" onchange="setShipCorp(this)">
                <c:forEach items="${getShipCorpList}" var="shipCorp">
                  <option value="${shipCorp.id}"><c:out value="${shipCorp.corpName}"/></option>
                </c:forEach>
              </select>
              <label for="" style="margin-left:36px;">배송요청일</label>
              <input type="text" class="datepicker" id = "shipDate2" name="shipDate2" value="" onchange = "shipDateCheck()">
            </form>
            <div class="filter_sum_area">
              <div class="sub_box">
                <p class="sum_tit">주문건수</p>
                <p class="sub_txt" id="shopBasketCnt2"></p>
              </div>
              <div class="sub_box">
                <p class="sum_tit">총 주문액</p>
                <p class="sub_txt" id="shopBasketAmt2"></p>
              </div>
              <div class="sub_box">
                <p class="sum_tit">월 주문 누적액</p>
                <p class="sub_txt"><%=request.getAttribute("monthOrderAmt")%> 원</p>
              </div>
            </div>
          </div>
          <!-- 필터 영역 끝 -->
          <!-- 보드 영역 -->
          <div class="flex_wrap expand_board">
            <div class="flex_box expand_board_left">
              <div class="dashboard_area">
                <div class="dashboard_tit_wrap">
                  <h2 class="dashboard_tit">상품정보</h2>
                  <div class="mark_area">
                    <p class="possible">주문가능</p>
                    <p class="impossible">주문불가</p>
                  </div>
                </div>

                <div class="dash_top">
                  <div class="dash_search_area">
                    <select id="large_ctg2" title="" class="" onchange="setLargeCtg(this)">
                      <option selected="selected" value=''>대분류</option>
                        <c:forEach items="${largeCtgList}" var="category">
                          <option value="${category.largeCtgCode}"><c:out value="${category.largeCtgName}"/></option>
                        </c:forEach>
                    </select>
                    <select id="medium_ctg2" title="" class="">
                      <option selected="selected" value=''>중분류</option>
                    </select>
                    <!-- <label for="">상품명/코드</label> -->
                    <div class="input_search_wrap">
                      <input type="text" id = "prodSearch2" name="prodSearch2" value="" placeholder="오이,양파 콤마로 다중검색 가능" class="search" onkeyup="enterKey(1);">
                      <a href="javascript:prodSearch()"></a>
                    </div>
                  </div>

                </div>
                  <div class="dash_bottom">
                    <div id="grid_prod2"></div>
                  </div>
              </div>
            </div>
            <div class="expand_btn_wrap">
              <button type="button" class="expand_right_btn"></button>
              <button type="button" class="expand_center_btn"></button>
              <button type="button" class="expand_left_btn"></button>
            </div>
            <div class="flex_box expand_board_right">
              <div id = "shopBasket2"  class="dashboard_area">
                <div class="dashboard_tit_wrap">
                  <h2 class="dashboard_tit">장바구니</h2>
                  <div class="mark_area">
                    <p class="possible">주문가능</p>
                    <p class="impossible">주문불가</p>
                  </div>
                </div>

                <div class="dash_top">
                  <div class="dash_search_area">
                    <label for="">주문내역</label>
                    <div class="input_search_wrap">
                      <input type="text" id = "orderSearch2" name="orderSearch2" value="" placeholder="오이,양파 콤마로 다중검색 가능" class="search" onkeyup="enterKey(2);">
                      <a href="javascript:orderSearch()"></a>
                    </div>
                  </div>

                </div>
                <div class="dash_bottom">
                  <div id="grid_order2"></div>
                </div>
              </div>
            </div>
          </div>
          <!-- 보드 영역 끝-->
        </div>
        <div class="btn_wrap bottom">
          <button type="button" class="order_request" onclick = "orderRequest(getOrderGridId())">주문요청</button>
        </div>
      </div>
    </div>
    <%@ include file="../include/footer.jsp" %>
  </div>
</body>
</html>
