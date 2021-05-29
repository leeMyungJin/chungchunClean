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
var prodGrid;
 jQuery(document).ready(function($) {

   var prodLayout = [{
      dataField : "pk",
      headerText : "pk",
      width : "10%",
      editable : false,
      visible : false
    },{
      dataField : "id",
      headerText : "지점아이디",
      width : "10%",
      editable : false,
      visible : false
    },{
      dataField : "largeCtgCode",
      headerText : "대카테고리코드",
      width : "9%",
      editable : false,
      visible  :false
    },{
      dataField : "largeCtgName",
      headerText : "대카테고리명",
      width : "9%",
      editable : false,
      visible  :true
    },{
      dataField : "mediumCtgCode",
      headerText : "중카테고리코드",
      width : "9%",
      editable : false,
      visible  :false
    },{
      dataField : "mediumCtgName",
      headerText : "중카테고리명",
      width : "9%",
      editable : false,
      visible  :true
    },{
      dataField : "name",
      headerText : "이름",
      width : "9%",
      editable : false,
      visible  :false
    }, {
      dataField : "corpName",
      headerText : "지점",
      width :"10%",
      editable : false
    }
    // ,{
    //   dataField : "check",
    //   headerText : "선택",
    //   // headerRenderer : {
    //   //   type : "CheckBoxHeaderRenderer",
    //   // //   // 헤더의 체크박스가 상호 의존적인 역할을 할지 여부(기본값:false)
    //   // //   // dependentMode 는 renderer 의 type 으로 CheckBoxEditRenderer 를 정의할 때만 활성화됨.
    //   // //   // true 설정했을 때 클릭하면 해당 열의 필드(데모 상은 isActive 필드)의 모든 데이터를 true, false 로 자동 바꿈
    //   //     dependentMode : true, 			
    //   //   position : "left" // 기본값 "bottom"
    //   // },    
    //   width :"4%",
    //   renderer : {
    //     type : "CheckBoxEditRenderer",
    //     showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
    //     checkValue  : 'Y',
    //     unCheckValue  : 'N',
    //     editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
    //   } 
    // }
    ,{
      dataField : "deadLine",
      headerText : "마감일시",
      width : "8%",
      editable : false
    },{
      dataField : "prodCode",
      headerText : "상품코드",
      width : "7%",
      editable : false
      // visible : false
    }, {
      dataField : "corpNumText",
      headerText : "지점사업자번호",
      width :"20%",
      editable : false,
    }, {
      dataField : "corpNum",
      headerText : "지점사업자번호",
      width :"15%",
      editable : false,
      visible: false
    },{
      dataField : "prodName",
      headerText : "상품명",
      width : "30%",
      editable : false
    }, {
      dataField : "unit",
      headerText : "단위",
      width : "6%",
      editable : false
    }, {
      dataField : "origin",
      headerText : "원산지",
      width : "10%",
      editable : false
    }, {
      dataField : "vatYn",
      headerText : "과/면세",
      width : "6%",
      editable : false
    }, {
      dataField : "cost",
      headerText : "원가",
      width : "7%",
      dataType : "numeric",
      formatString : "#,##0",
      editable : false
    }, {
      dataField : "price",
      headerText : "단가",
      width : "7%",
      dataType : "numeric",
      formatString : "#,##0"
    }];

    function createAUIGrid() {
      //그리드 설정
      var prodProps = {};
      prodProps.rowIdField = "pk";
      prodProps.editable = true;
      prodProps.enableSorting = true;
      //페이징 설정
      prodProps.usePaging = true;
      // singleRow 선택모드
      // prodProps.selectionMode = "multipleCells";
      // 줄번호 칼럼 렌더러 출력 
      prodProps.showRowNumColumn = true;
      // 체크박스 표시 렌더러 출력 안함
      prodProps.showRowCheckColumn = false;
      //그리드 가로세로 설정.
      prodProps.height= 500;
      //페이지 출력 행 개수
      prodProps.showPageRowSelect=true;
      prodProps.pageRowCount=100;
      prodProps.pageRowSelectValues=[20, 40, 60 , 80, 100];
      // prodProps.pagingMode="simple";
      prodProps.enableMovingColumn=true;
      // 실제로 #grid_wrap 에 그리드 생성
      // setDoubleCilckEvent("#grid_wrap");
      prodProps.useGroupingPanel = false;
      prodProps.editableOnGroupFields = true;
      prodProps.groupingFields = ["corpNumText", "largeCtgName","mediumCtgName"];
      // 최초 보여질 때 모두 열린 상태로 출력 여부
      prodProps.displayTreeOpen = false;
      // 그룹핑 후 셀 병합 실행
      prodProps.enableCellMerge = false;
      prodProps.cellMergeRowSpan = false;
      prodProps.showBranchOnGrouping = true;
			prodProps.showRowCheckColumn = true;
			prodProps.rowCheckDependingTree = true;

      prodGrid = AUIGrid.create("#grid_prod", prodLayout, prodProps);
    }

    createAUIGrid();
    // setAddRowEvent(prodGrid);
    // setCellEditEndEvent(prodGrid);
    // setCilckEvent(prodGrid);
    setKeydownEvent(prodGrid);

    function setCellEditEndEvent(grid){
      AUIGrid.bind(grid, "cellEditEnd", function(event) {
            if(event.columnIndex == "5"){
              // removeStatus(grid);
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

    AUIGrid.bind(prodGrid,"cellClick", function(event){
      if(event.dataField == "corpNum" ){
        if(event.item._$depth ==1){
          for(var i=0; i<event.item.children.length; i++){
            event.item.children[0].check = 'Y';
          }
        }else if(event.item._$depth == 2){
          for(var i=0; i<AUIGrid.getRowCount(prodGrid); i++){
           if(AUIGrid.getCellValue(prodGrid,i,"corpNum") == event.item.corpNum){
            if(AUIGrid.getCellValue(prodGrid,i,"check") != "Y")
              AUIGrid.setCellValue(prodGrid,i,"check", "Y");
            else
              AUIGrid.setCellValue(prodGrid,i,"check", "N");
          }
        }
        }
        removeStatus(prodGrid);
      }
    });
  })
  .ajaxStart(function(){
	loadingBarStart(); //ajax실행시 로딩바를 보여준다.
})
.ajaxStop(function(){
	loadingBarEnd(); //ajax종료시 로딩바를 숨겨준다.
});

    function checkHome(){
    if("<%=session.getAttribute("id")%>"==null){
        location.href = "/";
    }else{
        location.href="/admin/main";
    }
  }
  function searchList(){
    var params = {
      cond : $("#cond").val(),
      search : $("#search").val(),
      user_id : "<%=(String)session.getAttribute("id")%>"
    }
    $.ajax({
        url : "<%=request.getContextPath()%>/admin/getPriceList",
        async : true, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'json',
        data : params,
        success : function(data) {
          AUIGrid.setGridData('#grid_prod', data); 
        },
        error : function(request,status,error) {
        }
      }); 
  }

function applyPrice() {
    const promise = new Promise(function (resolve, reject) {
        //fnLoadingOpen(); // 로딩 시작
        loadingBarStart();
        // 로딩 이미지가 활성화 된 상태에서 실행하기 위해 지연시간을 둠
        setTimeout(function () {
            priceApply();
        }, 100);
    });
}
function priceApply(){
        var checkedItems = AUIGrid.getCheckedRowItems(prodGrid);
        var rowItem;
        for(var i=0, len = checkedItems.length; i<len; i++) {
          rowItem = checkedItems[i];
          // if(rowItem.item._$depth == 2){
          //   var newPrice = Math.round(rowItem.item.cost + rowItem.item.cost *($("#priceModify").val()/100));
          //   var item = {pk : rowItem.item.pk , price : newPrice};
          //   AUIGrid.updateRowsById(prodGrid,item);
          // }
          // if(rowItem.item._$depth == 3){
          //   var newPrice = Math.round(rowItem.item.cost + rowItem.item.cost *($("#priceModify").val()/100));
          //   var item = {pk : rowItem.item.pk , price : newPrice};
          //   AUIGrid.updateRowsById(prodGrid,item);
          // }
          if(rowItem.item._$depth == 4){
            var newPrice = Math.round(rowItem.item.cost + rowItem.item.cost *($("#priceModify").val()/100));
            var item = {pk : rowItem.item.pk , price : newPrice};
            AUIGrid.updateRowsById(prodGrid,item);
          }
        }
        loadingBarEnd();
  }
   window.onresize = function() {
	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
    AUIGrid.resize(prodGrid);
  }

  function exportExcel(){
    // if(AUIGrid.getRowCount(prodGrid) == 0){
    //   alert('조회된 데이터가 없습니다.');
    //   return ;
    // }
    var excelProps = {
      sheetName : "단가관리",
      exceptColumnFields : ["pk","headid","check"], // 이름, 제품, 컬러는 아예 엑셀로 내보내기 안하기.
      showRowNumColumn : true
    };
    AUIGrid.exportToXlsx(prodGrid, excelProps);
  }

function enterKey(){
  if (window.event.keyCode == '13') {
    searchList();
    return ;
  }
}
function expand() {
    AUIGrid.collapseAll(prodGrid);
    // AUIGrid.expandItemByRowId(prodGrid,)
}
function save() {
    const promise = new Promise(function (resolve, reject) {
        //fnLoadingOpen(); // 로딩 시작
        loadingBarStart();
        // 로딩 이미지가 활성화 된 상태에서 실행하기 위해 지연시간을 둠
        setTimeout(function () {
            savePrice();
        }, 100);
    });
}
function savePrice(){
  var count = AUIGrid.getRowCount('#grid_prod');
  var result = 0;
  var checkedItems = AUIGrid.getCheckedRowItems(prodGrid);
  if(checkedItems.length <= 0) {
    alert("체크된 행이 없습니다.");
    return;
  }
  var rowItem;
  for(var i=0 ; i < checkedItems.length; i++) {
    rowItem = checkedItems[i];
    if(rowItem.item._$depth == 4){
      var params= {
          prodCode : rowItem.item.prodCode,
          corpNum : rowItem.item.corpNum,
          price : rowItem.item.price,
          cost : rowItem.item.getCheckedRowItems,
          user_id : "<%=(String)session.getAttribute("id")%>"
      }
      $.ajax({
        url : "<%=request.getContextPath()%>/admin/savePrice",
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
  }
  removeStatus(prodGrid);
  alert('변경되었습니다.');
  loadingBarEnd();
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
        <li><a href="/admin/ctg" class="current"><img src="../img/sidebar_icon04.png" alt="" class="menu_icon">상품관리</a>
          <ul class="nav_dept2">
            <li><a href="/admin/ctg">카테고리</a></li>
            <li><a href="/admin/prod" >상품관리</a></li>
            <li><a href="/admin/price" class="current">단가관리</a></li>
          </ul>
        </li>
        <li><a href="/admin/order"><img src="../img/sidebar_icon05.png" alt="" class="menu_icon">주문관리</a></li>
        <li><a href="/admin/dline"><img src="../img/sidebar_icon06.png" alt="" class="menu_icon">마감관리</a></li>
        <li><a href="/admin/inven"><img src="../img/sidebar_icon07.png" alt="" class="menu_icon">재고관리</a></li>
        <li><a href="/admin/sales"><img src="../img/sidebar_icon08.png" alt="" class="menu_icon">매출관리</a></li>
      </ul>
      <a href="/cust/food" class="admin_exit_btn">관리자모드 나가기</a>      
    </asdie>
    <div class="sub_cont_area admin04_02">
      <div class="loading_bar_wrap">
		<div class="loader"></div>
	</div>
      <h1 class="sub_tit">단가관리</h1>
      <div class="btn_area">
       <!--  <button type="button" class="excel_templete" onclick="downTemplate()">엑셀템플릿</button>
        <button  type="file" class="excel_upload" id="excelUp"  >엑셀업로드</button> -->
        <button type="button" class="excel_down" onclick="exportExcel()">엑셀다운로드</button>
      </div>
      

      <section class="section01">
        <!-- 필터 영역 -->
        <div class="filter_area admin_filter">
          <form class="" action="" method="post" onsubmit="return false">
            <label for="">검색조건</label>
              <select id="cond" title="" class="">
                <option value="all" selected="selected">전체</option>
                <option value="corpName">사업장</option>
                <option value="prodName">상품명</option>
                <option value="prodCode">상품코드</option>
              </select> 
            <label for="" style="margin-left:36px;">조회</label>
            <div class="input_search_wrap">
              <input type="text" name="search" id = "search" value="" placeholder="사업장/상품명/상품코드" class="search" onkeypress="enterKey()">
              <button type="button" class="search_btn" onclick="searchList()" >조회</button>
            </div>
          </form>
        </div>
        <!-- 필터 영역 끝 -->

        <!-- 보드 영역 -->
        <div class="dashboard_area">
          <div class="dash_bottom">
            <div class="btn_wrap">
              <div class="apply_wrap">
                <%-- <button type="button" class="row_add"><span>+</span>행추가</button> --%>
                <%-- <button type="button" class="row_del"><span>-</span>행삭제</button> --%>
                <label for="">일괄 단가 조정</label>
      
                <input type="text" name = "priceModify" id="priceModify"  placeholder="00" class="search"/> %
                <button type="button" name ="apply" id = "apply" class="apply_btn btn" onclick="applyPrice();">적용</button>
                
                <button type="button" name ="apply" id = "apply" class="apply_btn btn" onclick="expand();">모두 닫기</button>
                
              </div>
              <button type="button" name = "save" class="save_btn btn" onclick="save();">저장</button>
            </div>
            <div id="grid_prod"></div>
            <div class="btn_wrap bottom">
              <button type="button" class="save_btn btn" onclick="save();">저장</button>
            </div>
          </div>
        </div>
        <!-- 보드 영역 끝-->
      </section>


    </div>
  </div>


</body>
</html>
