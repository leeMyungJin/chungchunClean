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
var orderGrid;
var prodGrid;
var selectOrderIndex;
$(document).ready(function() {
  $("#corp_count").text("0 건");
  $("#prod_count").text("0 건");
  $("#total_price").text("0 원");
  $("#total_allPrice").text("0 원");

  var orderLayout = [{
      dataField : "rowId",
      headerText : "pk",
      width :"7%",
      visible : false
    },{
      dataField : "id",
      headerText : "id",
      width :"7%",
      visible : false
    }, {
      dataField : "corpName",
      headerText : "배송사업장",
      width :"10%"
    },{
      dataField : "orderNo",
      headerText : "주문번호",
      width :"7%"
    },{
      dataField : "del",
      headerText : "삭제",
      width :"5%",
      renderer : {
        type : "CheckBoxEditRenderer",
        showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
        checkValue  : 'Y',
        unCheckValue  : 'N',
        editable : true, // 체크박스 편집 활성화  여부(기본값 : false)
        //사용자가 체크 상태를 변경하고자 할 때 변경을 허락할지 여부를 지정할 수 있는 함수 입니다.
      }
    },{
      dataField : "shipDate",
      headerText : "배송요청일",
      width :"7%"
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
      width : "7%"
    }, {
      dataField : "prodCode",
      headerText : "상품코드",
      width :"7%"
    }, {
      dataField : "shipId",
      headerText : "배송사업장아이디",
      width :"10%",
      visible : true
    }, {
      dataField : "name",
      headerText : "이름",
      width :"10%",
      visible : true
    }, {
      dataField : "corpNum",
      headerText : "사업자번호",
      width :"10%",
      visible : true
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
      dataField : "cost",
      headerText : "원가",
      width : "5%",
      dataType : "numeric",
      formatString : "#,##0"
    }, {
      dataField : "price",
      headerText : "단가",
      width : "5%",
      dataType : "numeric",
      formatString : "#,##0"
    }, {
      dataField : "supPrice",
      headerText : "합계(1)",
      width : "8%",
      editable : false,
      dataType : "numeric",
      formatString : "#,##0",
      // expFunction : function(  rowIndex, columnIndex, item, dataField ) { // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
      // 	// 1~2 분기 합을 계산하여 반환
      // 	// expFunction 의 리턴형은 항상 Number 여야 합니다.(즉, 수식만 가능)
      // 	return ( item.orderCnt * item.price );
      // }
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
    visible : true
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
    visible : true
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
    visible : true
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
    visible : true
  }];

  //상품검색 그리드 Layout
  var prodLayout = [{
      dataField : "check",
      headerText : "선택",
      width :"10%",
      renderer : {
        type : "CheckBoxEditRenderer",
        showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
        checkValue  : 'Y',
        unCheckValue  : 'N',
        editable : true, // 체크박스 편집 활성화  여부(기본값 : false)
        //사용자가 체크 상태를 변경하고자 할 때 변경을 허락할지 여부를 지정할 수 있는 함수 입니다.
      }
    },{
      dataField : "deadLine",
      headerText : "마감일시",
      width : "20%"
    },{
      dataField : "prodCode",
      headerText : "상품코드",
      width : "20%"
    },{
      dataField : "status",
      headerText : "상태",
      width : "20%",
      visible : false
    },{
      dataField : "prodName",
      headerText : "상품명",
      width : "30%"
    }, {
      dataField : "unit",
      headerText : "단위",
      width : "15%"
    }, {
      dataField : "origin",
      headerText : "원산지",
      width : "25%"
    },{
      dataField : "vatYn",
      headerText : "과/면세",
      width : "15%"
    }, {
      dataField : "cost",
      headerText : "원가",
      width : "20%",
      dataType : "numeric",
      formatString : "#,##0"
    }, {
      dataField : "price",
      headerText : "단가",
      width : "20%",
      dataType : "numeric",
      formatString : "#,##0"
    }, {
      dataField : "headPrice",
      headerText : "본사단가",
      width : "20%",
      dataType : "numeric",
      formatString : "#,##0"
    }];

    var prodProps = {};
      prodProps.editable = false;
      prodProps.enableSorting = true;
      prodProps.softRemoveRowMode = false;
      //페이징 설정
      prodProps.usePaging = true;
      // singleRow 선택모드
      prodProps.selectionMode = "multipleCells";
      // 고정 칼럼 1개
      // prodProps.fixedColumnCount = 1;
      // 줄번호 칼럼 렌더러 출력
      prodProps.showRowNumColumn = true;
      // 체크박스 표시 렌더러 출력 안함
      prodProps.showRowCheckColumn = false;
      //그리드 가로세로 설정.
      // auiGridProps.width= 1550;
      prodProps.height= 500;
      // prodProps.autoGridHeight = false;
      // prodProps.enableRestore =false;
      //페이지 출력 행 개수
      prodProps.showPageRowSelect=true;
      prodProps.pageRowCount=100;
      prodProps.pageRowSelectValues=[20, 40, 60 , 80, 100];
      // prodProps.pagingMode="simple";
      prodProps.enableMovingColumn=true;
      prodProps.noDataMessage='검색된 데이터가 없습니다.';
      // prodProps.showEditedCellMarker =false;

  function createAUIGrid() {
	//그리드 설정
		var orderProps = {
      // rowIdField : "rowId",
      softRemoveRowMode : false,
      editable : true,
      cellMergeRowSpan : true,
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
      noDataMessage: "주문한 내역이 없습니다.",
      useGroupingPanel : false,
      editableOnGroupFields : true,
      enableSummaryMerge : true,
      summaryMergePolicy : "all" ,
      nableSummaryMerge : true,
       // 최초 보여질 때 모두 열린 상태로 출력 여부
      displayTreeOpen : true,
      // 그룹핑 후 셀 병합 실행
      enableCellMerge : true,
      cellMergeRowSpan : true,
      showBranchOnGrouping : false,
      groupingFields : ["corpNum","shipDate"],
      groupingSummary  : {
	      dataFields : [ "cost","price","supPrice", "vatPrice", "totalPrice" ]
      }
     
	  };
    //상품 그리드
    orderGrid  = AUIGrid.create("#grid_order", orderLayout, orderProps);
    prodGrid   = AUIGrid.create("#grid_prod",prodLayout,prodProps);
  }

  createAUIGrid();
  setDate();

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
  // 그리드 이벤트
  AUIGrid.bind(orderGrid, "cellEditBegin", function(event) {
  // rowIdField 설정 값 얻기
      var rowIdField = AUIGrid.getProp(orderGrid, "rowIdField");
        // 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
        if(event.dataField == "orderCnt" || event.dataField == "supPrice" || event.dataField == "vatPrice" || event.dataField == "totalPrice") {
            return true;
        }else
          return false;
  });

  AUIGrid.bind(orderGrid, "cellClick", function(event) {
  // rowIdField 설정 값 얻기
        if(event.dataField == "shipDate") {
          if(confirm(event.item.corpName + "의 " + event.item.shipDate + "배송요청일자 주문을 일괄 삭제하시겠습니까?")){
            var params = {
           orderNo  : AUIGrid.getCellValue(orderGrid, event.rowIndex,"orderNo"),
           userId : "<%=(String)session.getAttribute("id")%>"
         }
         $.ajax({
               url : "<%=request.getContextPath()%>/admin/delOrder",
             async : true, // 비동기모드 : true, 동기식모드 : false
             type : 'POST',
             cache : false,
             dataType : null,
             data : params,
             success : function(data) {
                 alert('삭제되었습니다.');
                 searchOrder();
             },
             error : function(request,status,error) {
               }
         });
          }
        }
  });

  AUIGrid.bind(orderGrid, "cellEditEnd", function(event) {
  // rowIdField 설정 값 얻기
   if(event.dataField == "del"){
     if(confirm("삭제하시겠습니까?")){
       if(!isNaN(AUIGrid.getCellValue(orderGrid,event.rowIndex,"orderCnt"))){
         var params = {
           prodCode : AUIGrid.getCellValue(orderGrid, event.rowIndex,"prodCode"),
           orderNo  : AUIGrid.getCellValue(orderGrid, event.rowIndex,"orderNo"),
           orderCnt : AUIGrid.getCellValue(orderGrid,event.rowIndex,"orderCnt")*-1,
           userId : "<%=(String)session.getAttribute("id")%>"
         }
         $.ajax({
               url : "<%=request.getContextPath()%>/admin/delOrder",
             async : true, // 비동기모드 : true, 동기식모드 : false
             type : 'POST',
             cache : false,
             dataType : null,
             data : params,
             success : function(data) {
                 alert('삭제되었습니다.');
                  searchOrderInfo();
             },
             error : function(request,status,error) {
               }
         });
         AUIGrid.setCellValue(orderGrid,event.rowIndex,"del","N");
         AUIGrid.removeRow(orderGrid, event.rowIndex);
         removeStatus(orderGrid);
        //  AUIGrid.updateGrouping(orderGrid);
       }else{
         alert('수량을 확인하세요.');
         return false;
       }
       
     }else{
       AUIGrid.setCellValue(orderGrid,event.rowIndex,"del","N");
       removeStatus(orderGrid);
     }
  }else{
      var rowIdField = AUIGrid.getProp(orderGrid, "rowIdField");
      if(AUIGrid.isAddedById(event.pid, event.item[rowIdField]) || AUIGrid.isEditedById(event.pid,event.item[rowIdField])) {
      // 추가된 행 아이템인지 조사하여 추가된 행인 경우만 에디팅 진입 허용
        if(event.dataField == "orderCnt") {
          if(AUIGrid.getCellValue(orderGrid,event.rowIndex,"vatYn") == "과세"){
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "supPrice", event.item.price * event.item.orderCnt);
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "vatPrice", Math.round((event.item.price * event.item.orderCnt)*0.1));
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "totalPrice", event.item.price * event.item.orderCnt + Math.round((event.item.price * event.item.orderCnt)*0.1));

            //본사단가 적용
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "headSup", event.item.headPrice * event.item.orderCnt);
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "headVat", Math.round((event.item.headPrice * event.item.orderCnt)*0.1));
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "headTotal", event.item.headPrice * event.item.orderCnt + Math.round((event.item.headPrice * event.item.orderCnt)*0.1));
          }else{
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "supPrice", event.item.price * event.item.orderCnt);
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "vatPrice", 0);
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "totalPrice", event.item.price * event.item.orderCnt);

            //본사단가 적용
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "headSup", event.item.headPrice * event.item.orderCnt);
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "headVat", 0);
            AUIGrid.setCellValue(orderGrid,event.rowIndex, "headTotal", event.item.headPrice * event.item.orderCnt);
          }
        }
      return false; // 다른 필드들은 편집 허용
        }
    }
  });

  AUIGrid.bind(prodGrid, "cellDoubleClick", function(event) {
      if(AUIGrid.isUniqueValue(orderGrid,"rowId", AUIGrid.getCellValue(orderGrid,selectOrderIndex,"orderNo") + event.item.prodCode)){
          var item = {
          rowId    : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"orderNo") + event.item.prodCode,
          id      : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"id"),
          orderNo : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"orderNo"),
          del : "N",
          shipDate : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"shipDate"),
          deadLine : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"deadLine"),
          corpName : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"corpName"),
          shipId   : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"shipId"),
          corpNum  : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"corpNum"),
          name     : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"name"),
        }
        AUIGrid.addRow(orderGrid,item, "selectionDown" );
        // AUIGrid.updateGrouping(orderGrid);
        AUIGrid.setCellValue(orderGrid, selectOrderIndex+1,"prodCode",event.item.prodCode);
        AUIGrid.setCellValue(orderGrid,selectOrderIndex+1 ,"prodName",event.item.prodName);
        AUIGrid.setCellValue(orderGrid,selectOrderIndex+1 ,"deadLine",event.item.deadLine);
        AUIGrid.setCellValue(orderGrid,selectOrderIndex+1 ,"status"  ,event.item.status);
        AUIGrid.setCellValue(orderGrid,selectOrderIndex+1 ,"unit",event.item.unit);
        AUIGrid.setCellValue(orderGrid,selectOrderIndex+1 ,"origin",event.item.origin);
        AUIGrid.setCellValue(orderGrid,selectOrderIndex+1 ,"price",event.item.price);
        AUIGrid.setCellValue(orderGrid,selectOrderIndex+1 ,"vatYn",event.item.vatYn);
        AUIGrid.setCellValue(orderGrid,selectOrderIndex+1 ,"cost",event.item.cost);
        AUIGrid.setCellValue(orderGrid,selectOrderIndex+1 ,"headPrice",event.item.headPrice);
        // AUIGrid.setCellValue(orderGrid,selectOrderIndex+1,"pk", AUIGrid.getCellValue(orderGrid,selectOrderIndex,"orderNo") + event.item.prodCode);
        AUIGrid.setCellValue(orderGrid,"selectionDown","id", AUIGrid.getCellValue(orderGrid,"selectedIndex","id"));
        $('.pro_search').trigger('click');
        // AUIGrid.updateGrouping(orderGrid);
      }else{
        alert("이미 주문한 상품입니다.");
      }
  });

  AUIGrid.bind(prodGrid, "cellEditEnd", function(event) {
    if(event.dataField == "check") {
      if(!AUIGrid.isUniqueValue(orderGrid,"rowId", AUIGrid.getCellValue(orderGrid,selectOrderIndex,"orderNo") + event.item.prodCode) ){
        alert("이미 주문한 상품입니다.");
        AUIGrid.setCellValue(prodGrid,event.rowIndex, "check", "N");
        return false;
      }else{
        return true;
      }
    }
  });

  $(".save_btn").on("click",function(event){
    var rowIdField = AUIGrid.getProp(orderGrid, "rowIdField");
    for(var i =0; i<AUIGrid.getRowCount(orderGrid); i++){
        if(AUIGrid.isAddedById(orderGrid, AUIGrid.getCellValue(orderGrid,i,rowIdField)) || AUIGrid.isEditedById(orderGrid,AUIGrid.getCellValue(orderGrid,i,rowIdField))) {
           if(AUIGrid.getCellValue(orderGrid,i,"orderCnt") == "" || AUIGrid.getCellValue(orderGrid,i,"orderCnt") == null){
            alert((i + 1 )+'행 수량을 입력하시기 바랍니다.');
            return false;
          }
          var params = {
            id : AUIGrid.getCellValue(orderGrid,i,"id"),
            deadLine : AUIGrid.getCellValue(orderGrid,i,"deadLine") == null ? '' : AUIGrid.getCellValue(orderGrid,i,"deadLine"),
            shipDate : AUIGrid.getCellValue(orderGrid,i,"shipDate"),
            prodCode : AUIGrid.getCellValue(orderGrid,i,"prodCode"),
            prodName : AUIGrid.getCellValue(orderGrid,i,"prodName"),
            corpName : AUIGrid.getCellValue(orderGrid,i,"corpName"),
            corpNum  : AUIGrid.getCellValue(orderGrid,i,"corpNum"),
            unit     : AUIGrid.getCellValue(orderGrid,i,"unit"),
            origin   : AUIGrid.getCellValue(orderGrid,i,"origin"),
            vatYn    : AUIGrid.getCellValue(orderGrid,i,"vatYn") == '과세' ? 'Y' : 'N',
            orderCnt : AUIGrid.getCellValue(orderGrid,i,"orderCnt"),
            price    : AUIGrid.getCellValue(orderGrid,i,"price"),
            supPrice : AUIGrid.getCellValue(orderGrid,i,"supPrice"),
            vatPrice : AUIGrid.getCellValue(orderGrid,i,"vatPrice"),
            totalPrice : AUIGrid.getCellValue(orderGrid,i,"totalPrice"),
            orderNo  : AUIGrid.getCellValue(orderGrid,i,"orderNo"),
            shipId   : AUIGrid.getCellValue(orderGrid,i,"shipId"),
            cost     : AUIGrid.getCellValue(orderGrid,i,"cost"),
            name     : AUIGrid.getCellValue(orderGrid,i,"name"),
            userId   : "<%=(String)session.getAttribute("id")%>",
            headPrice : AUIGrid.getCellValue(orderGrid,i,"headPrice"), 
            headSup  : AUIGrid.getCellValue(orderGrid,i,"headSup"),
            headVat  : AUIGrid.getCellValue(orderGrid,i,"headVat"),
            headTotal  : AUIGrid.getCellValue(orderGrid,i,"headTotal")
          }
          $.ajax({
            url : "<%=request.getContextPath()%>/admin/addOrder",
            async : true, // 비동기모드 : true, 동기식모드 : false
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
      }
      alert('저장되었습니다.');
      removeStatus(orderGrid);
      searchOrderInfo();
  });
});
  function checkHome(){
    if("<%=session.getAttribute("id")%>"==null){
        location.href = "/";
    }else{
        location.href="/admin/main";
    }
  }
  window.onresize = function() {
	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출
    AUIGrid.resize(orderGrid);
};
  //버튼 이벤트
function exportExcel(){
    var excelProps = {
      sheetName : "주문관리",
      exceptColumnFields : ["rowId","id","del"], // 이름, 제품, 컬러는 아예 엑셀로 내보내기 안하기.
      showRowNumColumn : true
    };
    AUIGrid.exportToXlsx(orderGrid, excelProps);
}
function setDate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    if(month < 10) month = "0" + month;
    if(day < 10) day = "0" + day;
    $('#fromDate').val(year + "-" + month+"-"+day) ;

    today = new Date();
    today.setDate(today.getDate());
    year = today.getFullYear();
    month = today.getMonth() + 1;
    day = today.getDate();
    if(month < 10) month = "0" + month;
    if(day < 10) day = "0" + day;
    $('#toDate').val(year + "-" + month+"-"+day);
}

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

function searchOrder(){
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
          AUIGrid.setGridData("#grid_order", data);
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

function searchOrderInfo() {
   var params = {
    searchText : $("#searchText").val().trim(),
    fromDate : $("#fromDate").val().replace(/-/gi,''),
    toDate : $("#toDate").val().replace(/-/gi,''),
    cond : $("#cond").val()
  }
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
function enterKey(btn){
  if (window.event.keyCode == '13') {
    if(btn == "order"){
      searchOrder();     
    }else if(btn == "prod"){ 
      searchProd();   
    }
  }
}

function searchProd(){
 var params = {
    search : $("#searchProd").val().trim(),
    shipDate : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"shipDate"),
    cond : 'all',
    id   : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"id")
  }
  //주문 리스트
  $.ajax({
        url : "<%=request.getContextPath()%>/admin/getProdList",
        async : true, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'json',
        data : params,
        success : function(data) {
          AUIGrid.setGridData("#grid_prod", data);
        },
        error : function(request,status,error) {
        }
      });

}

function addProd(){
  var idx = 1;
  for(var i=0; i<AUIGrid.getRowCount(prodGrid) ; i++){
    if(AUIGrid.getCellValue(prodGrid,i,"check") == 'Y'){
          var item = {
            rowId    : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"orderNo") + AUIGrid.getCellValue(prodGrid,i,"prodCode"),
            id      : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"id"),
            orderNo : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"orderNo"),
            del : "N",
            shipDate : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"shipDate"),
            deadLine : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"deadLine"),
            corpName : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"corpName"),
            shipId   : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"shipId"),
            corpNum  : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"corpNum"),
            name     : AUIGrid.getCellValue(orderGrid,selectOrderIndex,"name"),
          }
          AUIGrid.addRow(orderGrid,item, "selectionDown");
          // AUIGrid.updateGrouping(orderGrid);
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"prodCode",AUIGrid.getCellValue(prodGrid,i,"prodCode"));
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"prodName",AUIGrid.getCellValue(prodGrid,i,"prodName"));
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"deadLine",AUIGrid.getCellValue(prodGrid,i,"deadLine"));
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"status"  ,AUIGrid.getCellValue(prodGrid,i,"status"));
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"unit",AUIGrid.getCellValue(prodGrid,i,"unit"));
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"origin",AUIGrid.getCellValue(prodGrid,i,"origin"));
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"price",AUIGrid.getCellValue(prodGrid,i,"price"));
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"vatYn",AUIGrid.getCellValue(prodGrid,i,"vatYn"));
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"cost",AUIGrid.getCellValue(prodGrid,i,"cost"));
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"headPrice",AUIGrid.getCellValue(prodGrid,i,"headPrice"));
          // AUIGrid.setCellValue(orderGrid,selectOrderIndex+1,"pk", AUIGrid.getCellValue(orderGrid,selectOrderIndex,"orderNo") + event.item.prodCode);
          AUIGrid.setCellValue(orderGrid,selectOrderIndex+idx,"id", AUIGrid.getCellValue(orderGrid,selectOrderIndex,"id"));
          $('.pro_search').trigger('click');
          idx++;
          // AUIGrid.updateGrouping(orderGrid);
      
    }
  }
}

function printSepc(){
  if(AUIGrid.getSelectedIndex(orderGrid)[0] >= 0){
    window.open("/admin/specification?id="+AUIGrid.getCellValue(orderGrid,AUIGrid.getSelectedIndex(orderGrid)[0],"shipId")
                +"&fromDate="+$("#fromDate").val() +"&toDate="+$("#toDate").val()
                  +"&corpNum="+AUIGrid.getCellValue(orderGrid,AUIGrid.getSelectedIndex(orderGrid)[0],"corpNum")
                  +"&shipDate="+AUIGrid.getCellValue(orderGrid,AUIGrid.getSelectedIndex(orderGrid)[0],"shipDate"), '거래명세서',"width=1000,height=1000,left=0,top=0") ;
  }else{
    alert("배송사업장을 선택하시기 바랍니다.");
    return false;
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
        <li><a href="/admin/order" class="current"><img src="../img/sidebar_icon05.png" alt="" class="menu_icon">주문관리</a></li>
        <li><a href="/admin/dline"><img src="../img/sidebar_icon06.png" alt="" class="menu_icon">마감관리</a></li>
        <li><a href="/admin/inven"><img src="../img/sidebar_icon07.png" alt="" class="menu_icon">재고관리</a></li>
        <li><a href="/admin/sales"><img src="../img/sidebar_icon08.png" alt="" class="menu_icon">매출관리</a></li>
      </ul>
      <a href="/cust/food" class="admin_exit_btn">관리자모드 나가기</a>
    </asdie>
    <div class="sub_cont_area admin05">
      <h1 class="sub_tit">주문관리</h1>
      <div class="btn_area flex">
      	<div>
      		 <label for="">조회일</label>
            <input type="text" class="datepicker" id="fromDate"name="fromDate" value="" style="margin-left:20px;" onchange="validPopDate('from')" > - <input type="text" class="datepicker" id = "toDate" name="toDate" onchange="validPopDate('to')" value="">
      	</div>
      	<div>
	        <button type="button" class="excel_down" onclick="exportExcel()">엑셀다운로드</button>
	        <button type="button" class="print" onclick = "printSepc()">거래명세서출력</button>
        </div>
      </div>

      <section class="section01">
        <!-- 필터 영역 -->
        <div class="filter_area admin_filter">
          <form class="" onsubmit="return false;"  method="post">
            <label for="">검색조건</label>
              <select id="cond" title="" class="">
                <option value="all" selected="selected">전체</option>
                <option value="corpName">사업장</option>
                <option value="prodName">상품명</option>
                <option value="name">이름</option>
                <option value="orderNo">주문번호</option>
              </select>
            <label for="">조회</label>
            <div class="input_search_wrap">
              <input type="text" name="searchTet" id="searchText" value="" placeholder="사업장, 상품명, 이름, 주문번호" class="search" onkeypress="enterKey('order');">
              <button type="button" class="search_btn" id="searchBtn" name="searchBtn" onclick="searchOrder()">조회</button>
            </div>
            <!-- <div class="resp_box_style01">
              <label for="">조회일</label>
              <input type="text" class="datepicker" name="fromDate" id ="fromDate" value="" style="margin-left:20px;" onchange="shipDateCheck('from')"> - <input type="text" class="datepicker" name="toDate" id="toDate" value=""onchange="shipDateCheck('to')">
            </div>-->

          </form>
          <div class="filter_sum_area">
            <div class="sub_box">
              <p class="sum_tit">주문사업장수</p>
              <p class="sub_txt" id="corp_count"></p>
            </div>
              <div class="sub_box">
                <p class="sum_tit">주문 항목수</p>
                <p class="sub_txt" id="prod_count"></p>
              </div>
              <div class="sub_box">
                <p class="sum_tit">총 매출액</p>
                <p class="sub_txt" id="total_price"></p>
              </div>
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
            <div class="btn_wrap">
              <div>
                <button type="button" class="row_add popup-trigger1"><span>+</span>주문추가</button>
                <%-- <button type="button" class="row_del"><span>-</span>행삭제</button> --%>
              </div>
              <button type="button" class="save_btn btn">저장</button>
            </div>
            <div id="grid_order"></div>
            
            <div class="btn_wrap bottom">
              <button type="button" class="save_btn btn">저장</button>
            </div>
            
          </div>
        </div>
        <!-- 보드 영역 끝-->
      </section>
    </div>
  </div>

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
                    <input type="text" id="searchProd" name="searchProd" value="" placeholder="상품명,상품코드 검색" class="search" onkeypress="enterKey('prod')">
                    <a href="javascript:searchProd()"></a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="grid_area">
            <div id="grid_prod"></div>
          </div>

          <div class="btn_wrap" style="margin-top:18px;">
            <button type="button" class="btn_cancel">취소</button>
            <button type="button" class="btn_confirm" onclick="addProd();">추가</button>
          </div>
        </form>

      </div>
    </div>
  </div> <!-- popup -->

  <script>
    jQuery(document).ready(function($) {
      //open popup
      $('.popup-trigger1').on('click', function(event) {
        event.preventDefault();
        selectOrderIndex = AUIGrid.getSelectedIndex(orderGrid)[0];
        if(selectOrderIndex == -1 || AUIGrid.getCellValue(orderGrid, selectOrderIndex, "rowId") == undefined  ){
          alert('주문 추가할 배송사업장을 선택 바랍니다.');
          return false;
        }
        AUIGrid.clearGridData(prodGrid);
        $('.pro_search').addClass('is-visible');

      });
      //close popup when clicking the esc keyboard button
      $(document).keyup(function(event) {
        if (event.which == '27') {
          $('.pro_search').removeClass('is-visible');
        }
      });
    });
    $('.pro_search').on('click', function(event) {
      if ($(event.target).is('.popup_close') || $(event.target).is('.pro_search')) {
        event.preventDefault();
        $(this).removeClass('is-visible');
      }
    });
    $('.btn_cancel').on('click', function(event) {
        event.preventDefault();
        $(".pro_search").removeClass('is-visible');
    });    
  </script>

</body>
</html>
