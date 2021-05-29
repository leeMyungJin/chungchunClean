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
  getCtgCnt();
  getProdCnt();
  createAUIGrid();
   AUIGrid.bind(invenGrid, "cellEditEnd", function(event) {
     if(event.item.addInven != "")
      if(!isNaN(event.item.addInven)){
        AUIGrid.setCellValue(invenGrid,event.rowIndex,"remainInven", parseInt(event.item.remainInven) + parseInt(event.item.addInven));
          var params={
                  prodCode :event.item.prodCode,
                  inven : event.item.addInven,
                  userId : "<%=(String)session.getAttribute("id")%>"
          }
          $.ajax({
            url : "<%=request.getContextPath()%>/admin/addInven",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : null,
            data : params,
            success : function(data) {
              // AUIGrid.setGridData(invenGrid,data);
              // searchInven();
              if(event.item.remainInven + event.item.addInven >0)
                AUIGrid.setCellValue(invenGrid,event.rowIndex,"status","O");
              else{
                AUIGrid.setCellValue(invenGrid,event.rowIndex,"status","X");
              }
              AUIGrid.setCellValue(invenGrid,event.rowIndex,"addInven","");
              removeStatus(invenGrid);

            },
              error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
              }
          });
      }else{
        alert('수량을 확인하세요.');
        return false;
      }
      

      
 });

});

  //카테고리 수 
  function getCtgCnt(){
      $.ajax({
          url : "<%=request.getContextPath()%>/admin/getCtgCnt",
          async : false, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : null,
          success : function(data) {
            $("#largeCnt").text(data.largeCnt + " 개");
            $("#mediumCnt").text(data.mediumCnt + "개");
          },
            error : function(request,status,error) {
              alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        }); 
  }

  //상품수
function getProdCnt(){

  $.ajax({
    url : "<%=request.getContextPath()%>/admin/getProdCnt",
    async : false, // 비동기모드 : true, 동기식모드 : false
    type : 'POST',
    cache : false,
    dataType : null,
    success : function(data) {
      $("#prodCnt").text(data + " 개");
    },
      error : function(request,status,error) {
        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
  }); 
}

function searchInven(){
  var params={
    search : $("#search").val(),
    cond : $("#cond").val()
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

//그리드 설정
var invenLayout = [{
    dataField : "status",
		headerText : "상태",
    width : "4%",
    renderer : {
      type : "ImageRenderer",
      imgHeight : 12, // 이미지 높이, 지정하지 않으면 rowHeight에 맞게 자동 조절되지만 빠른 렌더링을 위해 설정을 추천합니다.
      altField : null, // alt(title) 속성에 삽입될 필드명, 툴팁으로 출력됨. 만약 null 을 설정하면 툴팁 표시 안함.      
      imgTableRef :  { // 이미지 소스참조할 테이블 레퍼런스
        "O" : "../img/possible_icon.png",
        "X" : "../img/impossible_icon.png",
      }
    }
	},{
		dataField : "largeCtgName",
		headerText : "대카테고리",
    width :"10%",
    editable : false
	}, {
		dataField : "largeCtgCode",
		headerText : "대카테고리코드",
    width : "8%",
    editable : false
	}, {
		dataField : "mediumCtgName",
		headerText : "중카테고리",
    width :"9%",
    editable : false
	}, {
		dataField : "mediumCtgCode",
		headerText : "중카테고리코드",
    width : "8%",
    editable : false
  }, {
		dataField : "prodName",
		headerText : "상품명",
    width :"16%",
    editable : false
  },{
		dataField : "subProdCode",
		headerText : "상품코드",
    width :"5%",
    editable : false
  },{
		dataField : "prodCode",
		headerText : "최종코드명",
		width : "8%",
    editable : false
	}, {
		dataField : "unit",
		headerText : "단위",
		width : "6%",
    editable : false
	}, {
		dataField : "vatYn",
		headerText : "과/면세",
    width : "5%",
    editable : false
  }, {
		dataField : "origin",
		headerText : "원산지",
    width : "5%",
    editable : false
  }, {
		dataField : "cost",
		headerText : "원가",
    width : "5%",
    dataType : "numeric",
    formatString : "#,##0",
    editable : false
	}, {
		dataField : "remainInven",
		headerText : "잔여수량",
		width : "5.5%",
    editable : false,
    dataType : "numeric",
    formatString : "#,##0",
  }, {
		dataField : "addInven",
		headerText : "추가입고",
		width : "5.5%",
    dataType : "numeric",
    formatString : "#,##0",
    editRenderer:{
              type:"InputEditRenderer",
              onlyNumeric:true,
              allowNegative: true
    }
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
      showFooter : false,
      noDataMessage: "조회 결과가 없습니다.",
      useGroupingPanel : false,
	  };
//상품 그리드
  invenGrid  = AUIGrid.create("#grid_inven", invenLayout, invenProps);
}


function exportToLocal() {
	var excelProps = {
		sheetName : "재고정보",
    exceptColumnFields : ["status", "addInven"], // 이름, 제품, 컬러는 아예 엑셀로 내보내기 안하기.
    showRowNumColumn : true
	};
	AUIGrid.exportToXlsx(invenGrid, excelProps);
}

function addInvenFilter() {
if($("#minus").val() == "off"){
  $("#minus").val('on');
  AUIGrid.setFilterByValues(invenGrid, "status", ["X"]);
}else{
  $("#minus").val('off');
  AUIGrid.clearFilter(invenGrid,"status");
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
        <li><a href="/admin/dline"><img src="../img/sidebar_icon06.png" alt="" class="menu_icon">마감관리</a></li>
        <li><a href="/admin/inven" class="current"><img src="../img/sidebar_icon07.png" alt="" class="menu_icon">재고관리</a></li>
        <li><a href="/admin/sales"><img src="../img/sidebar_icon08.png" alt="" class="menu_icon">매출관리</a></li>
      </ul>
      <a href="/cust/food" class="admin_exit_btn">관리자모드 나가기</a>      
    </asdie>
    <div class="sub_cont_area admin07">
      <h1 class="sub_tit">재고관리</h1>
      <section class="section01">
        <div class="over_area">
          <div class="over_box">
            <p class="over_tit">대카테고리 수</p>
            <p class="over_txt" id="largeCnt"></p>
          </div>
          <div class="over_box">
            <p class="over_tit">중카테고리 수</p>
            <p class="over_txt" id="mediumCnt"></p>
          </div>
          <div class="over_box">
            <p class="over_tit">상품 수</p>
            <p class="over_txt" id="prodCnt"></p>
          </div>
        </div>
      </section>

      <div class="btn_area">
        <button type="button" class="excel_down" onclick="exportToLocal();">엑셀다운로드</button>
      </div>

      <section class="section02">
        <!-- 필터 영역 -->
        <div class="filter_area admin_filter">
          <form class="" action="" onsubmit="return false;"  method="post">
            <select id="cond">
              <option value="all">전체</option>
              <option value="ctgName">카테고리명</option>
              <option value="ctgCode">카테고리코드</option>
              <option value="prodName">상품명</option>
            </select>
            <div class="input_search_wrap" style="margin-right:18px;">
              <input type="text" name="search" id="search" value="" placeholder=", 콤마로 다중검색 가능" class="search">
              <button type="button" class="search_btn" onclick="searchInven()" >조회</button>
            </div>
      
            <input type="checkbox" name="minus" value="off" id="minus" class="chk" onclick="addInvenFilter();" /> 
            <label for="minus"><span class="check_span"></span>추가입고 필요항목만 보기</label>
              
          </form>
        </div>
        <!-- 필터 영역 끝 -->

        <!-- 보드 영역 -->
        <div class="dashboard_area">
          <div class="dash_bottom">
            <div class="btn_wrap">
              <div class="mark_area">
                <p class="possible">정상</p>
                <p class="impossible">추가입고필요</p>
              </div>
            </div>
              <div id="grid_inven"></div>
            <div class="btn_wrap bottom">
            </div>
        </div>
        <!-- 보드 영역 끝-->
      </section>

    </div>
  </div>


</body>
</html>
