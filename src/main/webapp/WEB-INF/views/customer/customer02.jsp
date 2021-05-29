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
    if("<%=session.getAttribute("id")%>"== "null"){
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
  function setShipDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1); //15일 더하여 setting
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    if(month < 10)
      month = "0" + month;
    if(day < 10 )
      day = "0" + day;
    $('#shipDateFrom').val(year + "-" + month + "-" + day);

    today = new Date();
    today.setDate(today.getDate() + 7); //15일 더하여 setting
    year = today.getFullYear();
    month = today.getMonth() + 1;
    day = today.getDate();
    if(month < 10)
      month = "0" + month;
    if(day < 10 )
      day = "0" + day;

    $('#shipDateTo').val(year + "-" + month+"-"+day);
  }
function setOrderInfo(){
  var foot = AUIGrid.getFooterData(orderGrid);
    $("#shopBasketCnt").text(AUIGrid.getRowCount(orderGrid) + " 건");
    $("#shopBasketAmt").text(numberComma(foot[3].value) + "원");
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
  if(diff < 0){
    alert("주문관리 조회는 오늘 이후 날짜부터 가능합니다.");
    if(shipId == "from"){
      var today = new Date();
      today.setDate(today.getDate() + 1); 
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      if(month < 10)
      month = "0" + month;
      if( day < 10 )
        day = "0" + day;
      $('#shipDateFrom').val(year + "-" + month+"-"+day);
    }else if(shipId == "to"){
      var today = new Date();
      today.setDate(today.getDate() + 7); 
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      if(month < 10)
      month = "0" + month;
      if( day < 10 )
        day = "0" + day;      
      $('#shipDateTo').val(year + "-" + month+"-"+day);
    }   
    return ;
  }

  var shipDateFrom = $('#shipDateFrom').val();
  var shipDateTo = $('#shipDateTo').val();
  var fromDate = new Date(shipDateFrom).getTime();
  var toDate = new Date(shipDateTo).getTime();

  var toDay = new Date();
  var dd = toDay.getDate();
  var mm = toDay.getMonth();
  var yy = toDay.getFullYear();
  if(fromDate > toDate ){
    alert("시작일이 종료일보다 클 수 없습니다.");
    if(shipId == "from"){
      var from = new Date(shipDateTo);
      var year = from.getFullYear();
      var month = from.getMonth() + 1;
      var day = from.getDate();
      if(day-1 <= dd && month > mm &&  year >= yy){
        if(day-1 == 0){
          if(month-1 ==0){
            month = 12;
            year = year-1;
          }else{
            month = month - 1;
          }
          day = new Date(year,month,day-1).getDate();
        }else{
          day = dd;   
        }
      }
      else{
        day = day - 1;
        if(day ==0){
          month = month -1;
          if(month == 0){
            year = year-1;
            month = 12;
          } 
          day = new Date(year,month-1,day).getDate();
        }
      }
      if(day < 10) day = "0" + day;
      if(month < 10 ) month = "0" + month;
      $('#shipDateFrom').val(year + "-" + month+"-"+day);
    }else if(shipId == 'to'){
      var from = new Date(shipDateFrom);
      from.setDate(from.getDate() + 1); 
      var year = from.getFullYear();
      var month = from.getMonth() + 1;
      var day = from.getDate();
      if(dd <= day) day = day - 1;
      if(day < 10) day = "0" + day;
      if(month < 10) month = "0" + month;
      $('#shipDateTo').val(year + "-" + month+"-"+day);
      }
    return ;
  } 
}
  
function checkHome(){
      if("<%=session.getAttribute("id")%>"==null){
          location.href = "/";
      }else{
          location.href="/cust/food";
      }
  }
var orderLayout = [{
		dataField : "orderNo",
    headerText : "주문번호",
    editable : false,
    width :"6%"
	},{
		dataField : "name",
    headerText : "발주자",
    editable : false,
    width :"6%"
	},{
		dataField : "id",
    headerText : "발주자아이디",
    editable : false,
    width :"6%",
    visible :false

	},{
		dataField : "shipDate",
    headerText : "배송요청일",
    editable : false,
    width :"6%",
	},{
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
    width :"4%",
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
    width : "3%",
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
    editable : false,
		width : "5.5%"
	}, {
		dataField : "prodCode",
    headerText : "상품코드",
    editable : false,
		width :"7%"
	}, {
		dataField : "price",
		headerText : "단가",
    width : "5%",
    dataType : "numeric",
    editable : false,
    formatString : "#,##0"
  }, {
		dataField : "corpName",
    headerText : "배송사업장",
    editable : false,
		width :"10%"    
  },{
		dataField : "prodName",
    headerText : "상품명",
    editable : false,
		width : "15%"
	}, {
		dataField : "unit",
    headerText : "단위",
    editable : false,
		width : "5%"
	}, {
		dataField : "origin",
    headerText : "원산지",
    editable : false,
		width : "5%"
	}, {
		dataField : "vatYn",
    headerText : "과/면세",
    editable : false,
    width : "5%",
  }, {
		dataField : "orderCnt",
		headerText : "주문수량",
    width : "5%",
    dataType : "numeric",
    formatString : "#,##0",
    editRenderer : {
      onlyNumeric : true, // 0~9만 입력가능
      textAlign : "right", // 오른쪽 정렬로 입력되도록 설정
      editable : true,
     },
	}, {
		dataField : "supPrice",
		headerText : "합계(1)",
		width : "7%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
			// 1~2 분기 합을 계산하여 반환
			// expFunction 의 리턴형은 항상 Number 여야 합니다.(즉, 수식만 가능)
			return ( item.orderCnt * item.price ); 
		}
  }, {
		dataField : "vatPrice",
		headerText : "VAT(2)",
		width : "7%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
        if(item.vatYn=="과세")
          return Math.round(( item.orderCnt * item.price )*0.1);
        else
          return 0;
		}    
  }, {
		dataField : "totalPrice",
		headerText : "TOTAL(1)+(2)",
		width : "10%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
    expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
			// 1~2 분기 합을 계산하여 반환
			// expFunction 의 리턴형은 항상 Number 여야 합니다.(즉, 수식만 가능)
			return ( item.supPrice + item.vatPrice ); 
		}    
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
		var orderProps = {
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
      // height : 400,
      headerHeight : 35,
      rowHeight : 35,
      footerHeight : 35,  
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
  setCilckEvent(orderGrid);
  setCellEditEndEvent(orderGrid);
  setKeydownEvent(orderGrid);
  //더블클릭 이벤트 추가
  // setDoubleCilckEvent(orderGrid);

// 푸터 설정
var footerLayout = [ {
	labelText : "소계",
	positionField : "#base",
  style : "aui-grid-my-column",
  colSpan : 10
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
  }];

  AUIGrid.setFooter(orderGrid,footerLayout);
}  
  // 그리드 클릭 이벤트
function setCilckEvent(grid){
    if(grid == orderGrid){
        AUIGrid.bind(grid, "cellClick", function(event) {
          if(event.dataField == 'del'){
            if(event.item.status == 'X'){
                alert('삭제할 수 없는 상품입니다.');
                AUIGrid.updateRow(grid, { "del" : false}, "selectedIndex");
                AUIGrid.removeSoftRows(grid); // 삭제 표시된 행(소프트 삭제) 그리드에서 제거
                AUIGrid.resetUpdatedItems(grid); // 현재 수정 정보 초기화    
                return ;
            }else{
              if(confirm("삭제하시겠습니까?")){
                delOrder(grid, event.item.prodCode , event.item.orderNo, event.rowIndex, event.item.orderCnt*-1);  
                alert("삭제 되었습니다.");
                orderSearch();
              }else{
                AUIGrid.setCellValue(grid,event.rowIndex,"del", 'N');
                // removeSTatus(grid);
              }
            }
          }else if(event.dataField == "shipDate"){
              if(confirm( event.item.shipDate + " 배송요청일자 주문을 일괄 삭제하시겠습니까?")){
                var params = {
                  orderNo  : event.item.orderNo,
                  id   : "<%=session.getAttribute("id")%>",
                  // orderCnt : event.item.orderCnt*-1,
                  userId : "<%=(String)session.getAttribute("id")%>"
                }
                $.ajax({
                    url : "<%=request.getContextPath()%>/cust/delOrder",
                    async : true, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    cache : false,
                    dataType : null,
                    data : params,
                    success : function(data) {
                        alert('삭제되었습니다.');
                        orderSearch();
                    },
                    error : function(request,status,error) {
                      }
                });
               }
          }
        });
    }
}

     // 그리드 변경 이벤트 추가
function setCellEditEndEvent(grid){
        AUIGrid.bind(grid,"cellEditBegin", function (event) {
          if(event.item.status == "X"){
            alert("수정이 불가능한 상품입니다.");
            return false;
          }
        })
        AUIGrid.bind(grid, "cellEditEnd", function(event) {
          if(event.item.status != "X"){
            var supPrice = event.item.orderCnt * event.item.price;
            var vatPrice = Math.round((event.item.orderCnt * event.item.price)*0.1) ;
            var headSup = event.item.orderCnt * event.item.headPrice;
            var headVat = Math.round((event.item.orderCnt * event.item.headPrice)*0.1) ;
          
            AUIGrid.setCellValue(grid,event.rowIndex, "supPrice", supPrice);
            if(event.item.vatYn =="과세"){
              AUIGrid.setCellValue(grid, event.rowIndex, "vatPrice",  vatPrice);
              AUIGrid.setCellValue(grid, event.rowIndex, "headVat",  headVat);
            }else{
              vatPrice = 0;
              headVat = 0;
              AUIGrid.setCellValue(grid,event.rowIndex,"vatPrice",vatPrice);
              AUIGrid.setCellValue(grid, event.rowIndex, "headVat",  headVat);
            }
            AUIGrid.setCellValue(grid,event.rowIndex,"totalPrice",supPrice + vatPrice);
            AUIGrid.setCellValue(grid,event.rowIndex,"headTotal",headSup + headVat);

            upOrder(grid, event.item.prodCode, event.item.orderNo, event.rowIndex, event.item.orderCnt, supPrice, vatPrice, supPrice + vatPrice,
                headSup, headVat, headSup+headVat);
          }
          if(event.which == 13) { // 엔터키로 편집완료했는지 여부
          AUIGrid.setSelectionByIndex(grid, event.rowIndex+1, event.columnIndex);
          }
      });          
}

function setKeydownEvent(grid){
  AUIGrid.bind(grid,"keyDown",	function(event) {
      if(event.keyCode == 45) { // Insert  키
        return false; // 기본 행위 안함.
      }
      return true; // 기본 행위 유지
    });
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

//주문 삭제
function delOrder(grid,prod,orderNo, rowIndex, orderCnt) {
  if(!isNaN(orderCnt)){
    var params = {
      prodCode : prod,
      id   : "<%=session.getAttribute("id")%>",
      orderNo : orderNo,
      orderCnt : orderCnt,
      userId : "<%=(String)session.getAttribute("id")%>"
      };  
      $.ajax({
        url : '<%=request.getContextPath()%>/cust/delOrder',
        async : true, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : null,
        data : params,
        success : function(data) {
            AUIGrid.removeRow(grid,rowIndex);
            AUIGrid.removeSoftRows(grid); // 삭제 표시된 행(소프트 삭제) 그리드에서 제거
            AUIGrid.resetUpdatedItems(grid); // 현재 수정 정보 초기화    
        },
        error : function(request,status,error) {
          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
      });  
  }else{
    alert('수량을 확인하세요.');
    return false;
  }
          
}

  //주문정보 수정
function upOrder(grid,prod,orderNo, rowIndex, orderCnt, supPrice, vatPrice, totalPrice, headSup, headVat, headTotal){
      var params = {
      prod : prod,
      id   : "<%=session.getAttribute("id")%>",
      orderNo : orderNo,
      orderCnt : orderCnt,
      supPrice : supPrice,
      vatPrice : vatPrice,
      totalPrice : totalPrice,
      headSup : headSup,
      headVat : headVat,
      headTotal : headTotal
      };  
      $.ajax({
        url : '<%=request.getContextPath()%>/cust/upOrder',
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        data : params,
        dataType : 'json',
        success : function(data) {
          var rows = AUIGrid.getSelectedRows(grid);
          AUIGrid.updateRow(grid, { "orderCnt" : orderCnt }, rowIndex);
          AUIGrid.removeSoftRows(grid);
          AUIGrid.resetUpdatedItems(grid);
          setOrderInfo();
        },
        error : function(request,status,error) {
          alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
      });  
}

  function enterKey() {
    if (window.event.keyCode == 13) {
        // 엔터키가 눌렸을 때 실행할 내용
        orderSearch();
    }
  }
  function exportToLocal() {
	var excelProps = {
		sheetName : "주문정보",
    exceptColumnFields : ["del", "status"], // 이름, 제품, 컬러는 아예 엑셀로 내보내기 안하기.
    showRowNumColumn : true
	};
	AUIGrid.exportToXlsx(orderGrid, excelProps);
};

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
		
    localStorage.setItem("orderAuigridLayout", orderColumnStr);

    localStorage.setItem("orderAuigridRow", orderRowPos);

    localStorage.setItem("orderAuigridCol", orderHPos);
		alert("현재 그리드의 상태가 보관되었습니다.\r\n브라우저를 종료하거나 F5 로 갱신했을 때 현재 상태로 그리드가 출력됩니다.");
	} else {
		alert("localStorage 를 지원하지 않는 브라우저입니다.");
		return;
	}
}
function loadColumnLayout() {

  var columnLayout = null;
  var columnStr;
    columnStr = getLocalStorageValue("orderAuigridLayout");
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
      localStorage.removeItem("orderAuigridLayout");
      localStorage.removeItem("orderAuigridRow");
      localStorage.removeItem("orderAuigridCol");
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
        <a href="javascript:checkHome()" class="header_logo"><img src="../img/header_logo.png" alt="라임푸드 로고" /></a>
        <ul class="gnb">
          <li><a href="/cust/howto">사용방법안내</a></li>
          <li><a href="/cust/food">식자재주문</a></li>
          <li><a href="/cust/order" class="current">주문관리</a></li>
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
      <h1 class="sub_tit">주문관리</h1>
      <div class="customer02 sub_cont_wrap">
        <div class="btn_wrap">
          <button type="button" class="excel_down" onclick="exportToLocal()">엑셀다운로드</button>
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
                  <input type="text" id = "orderSearch" name="orderSearch" value="" placeholder="오이,양파 콤마로 다중검색 가능" class="search" style="width:300px" onkeyup="enterKey()">
                  <a href="javascript:orderSearch()"></a>
                </div>
              </div>
            </div>
            <div class="dash_bottom">
             <div id="grid_order"></div>
            </div>
          </div>
          <!-- 보드 영역 끝-->


        </div>
      </div>
    </div>
    <%@ include file="../include/footer.jsp" %>
  </div>
</body>

</html>
