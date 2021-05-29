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
  var unitGrid;
  var ctgGrid;
  jQuery(document).ready(function($) {
    //open popup
    getCtgCnt();
    $('.popup-trigger').on('click', function(event) {
      event.preventDefault();
      $.ajax({
        url : "<%=request.getContextPath()%>/admin/getProdUnit",
        async : true, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'json',
        success : function(data) {
          AUIGrid.setGridData("#grid_unit", data); 
        },
        error : function(request,status,error) {
        }
      });    
          $('.popup').addClass('is-visible');
    });
    //close popup
    $('.popup').on('click', function(event) {
      if ($(event.target).is('.popup_close') || $(event.target).is('.popup')) {
        event.preventDefault();
        $(this).removeClass('is-visible');
      }
    });
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event) {
      if (event.which == '27') {
        $('.popup').removeClass('is-visible');
      }
    });
    $(".row_add").on('click', function(event) {
      if($(this).attr("name") == 'addUnit'){
        var item = { "unit" : "단위", "remark" : "비고"};
         AUIGrid.addRow('#grid_unit', item, "last");
      }else{
        var item = { "largeCtgCode" : "대카테고리코드", "largeCtgName" : "대카테고리명", "mediumCtgCode" : "중카테고리코드" , "mediumCtgName" : "중카테고리명"};
         AUIGrid.addRow('#grid_ctg', item, "last");
      }
    });
    $(".row_del").on('click', function(event) {
      if($(this).attr("name") == 'delUnit'){
        AUIGrid.removeRow('#grid_unit', "selectedIndex");
      }else{
      }
    });
    $(".save_btn").on('click',function(event){
      var count = 0;
      if($(this).attr("name") == 'unitSave'){
        count = AUIGrid.getRowCount('#grid_unit');
          if(count > 0){
              for(var i =0; i< count; i++){
                  var params = {
                    unit : AUIGrid.getCellValue('#grid_unit',i,"unit"),
                    remark : AUIGrid.getCellValue('#grid_unit',i,"remark"),
                    user_id : "<%=(String)session.getAttribute("id")%>",
                    index : AUIGrid.getCellValue('#grid_unit',i,"index")
                  };
                  $.ajax({
                    url : "<%=request.getContextPath()%>/admin/addProdUnit",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    cache : false,
                    dataType : null,
                    data : params,
                    success : function(data) {
                    },
                     error : function(request,status,error) {
                       alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                     }
                  });    
              }
              alert('저장되었습니다.');
              removeStatus(unitGrid);
              getCtgCnt();
          }
      }else{
        count = AUIGrid.getRowCount('#grid_ctg');
          if(count > 0){
            var rowIdField = AUIGrid.getProp('#grid_ctg', "rowIdField");
              for(var i =0; i< count; i++){
                  if(AUIGrid.isAddedById('#grid_ctg', AUIGrid.getCellValue('#grid_ctg',i,rowIdField)) || AUIGrid.isEditedById('#grid_ctg', AUIGrid.getCellValue('#grid_ctg',i,rowIdField)) ){
                    if(AUIGrid.getCellValue('#grid_ctg',i,"largeCtgCode").length != 2 || AUIGrid.getCellValue('#grid_ctg',i,"mediumCtgCode").length != 2){
                      alert('카테고리코드를 확인해주세요.');
                      return false;
                    }
                    var params = {
                      largeCtgCode : AUIGrid.getCellValue('#grid_ctg',i,"largeCtgCode"),
                      largeCtgName : AUIGrid.getCellValue('#grid_ctg',i,"largeCtgName"),
                      mediumCtgCode : AUIGrid.getCellValue('#grid_ctg',i,"mediumCtgCode"),
                      mediumCtgName : AUIGrid.getCellValue('#grid_ctg',i,"mediumCtgName"),
                      user_id : "<%=(String)session.getAttribute("id")%>"
                    };
                    $.ajax({
                      url : "<%=request.getContextPath()%>/admin/addCtg",
                      async : false, // 비동기모드 : true, 동기식모드 : false
                      type : 'POST',
                      cache : false,
                      dataType : null,
                      data : params,
                      success : function(data) {
                      },
                      error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                      }
                    }); 
                    alert('저장되었습니다.');
                }   
              }
                
                removeStatus(ctgGrid);
                getCtgCnt();
                searchCtg();
          }
      }
    });
    //AUIGrid 칼럼 설정
  var ctgLayout = [{
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
    }}, {
      dataField : "largeCtgName",
      headerText : "대카테고리명",
      width : "20%",
      editable : true,
      dataType : "numeric",
      editRenderer : {
        type : "InputEditRenderer",
        onlyNumeric : false, // Input 에서 숫자만 가능케 설정
        // 에디팅 유효성 검사
       }
    }, {
      dataField : "largeCtgCode",
      headerText : "대카테고리코드",
      width : "20%",
      editRenderer:{
	        	type:"InputEditRenderer",
	        	onlyNumeric:true,
	        	maxlength:2
			}
    }, {
      dataField : "mediumCtgName",
      headerText : "중카테고리명",
      width : "20%",
      editable : true
    }, {
      dataField : "mediumCtgCode",
      headerText : "중카테고리코드",
      width : "20%",
      editRenderer:{
	        	type:"InputEditRenderer",
	        	onlyNumeric:true,
	        	maxlength:2
			}
    },  {
      dataField : "cretTime",
      headerText : "등록일",
      width : "15%",
      editable : true
    },  {
      dataField : "rowId",
      headerText : "pk",
      width : "15%",
      editable : true
    }];

     var unitLayout = [{
    dataField : "del",
    headerText : "삭제",
    width :"15%",
    renderer : {
      type : "CheckBoxEditRenderer",
      showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
      checkValue  : 'Y',
      unCheckValue  : 'N',
      editable : true, // 체크박스 편집 활성화  여부(기본값 : false)
      //사용자가 체크 상태를 변경하고자 할 때 변경을 허락할지 여부를 지정할 수 있는 함수 입니다.
    }}, {
      dataField : "unit",
      headerText : "단위",
      width : "30%",
      editable : true
    }, {
      dataField : "remark",
      headerText : "비고",
      width : "55%",
      editable : true
    },{
      dataField : "index",
      headerText : "인덱스",
      width : "55%",
      // visible : false
    }];

    function createAUIGrid() {
      //그리드 설정
      var unitProps = {};
      unitProps.editable = true;
      unitProps.enableSorting = true;
      //페이징 설정
      unitProps.usePaging = true;
      // singleRow 선택모드
      unitProps.selectionMode = "multipleCells";
      // 고정 칼럼 1개
      unitProps.fixedColumnCount = 1;
      // 줄번호 칼럼 렌더러 출력 
      unitProps.showRowNumColumn = true;
      // 체크박스 표시 렌더러 출력 안함
      unitProps.showRowCheckColumn = false;
      //그리드 가로세로 설정.
      // auiGridProps.width= 1550;
      unitProps.height= 500;
      unitProps.autoGridHeight = false;
      unitProps.enableRestore =false;
      //페이지 출력 행 개수
      unitProps.showPageRowSelect=true;
        unitProps.pageRowCount=100;
      unitProps.pageRowSelectValues=[20, 40, 60 , 80, 100];
      unitProps.pagingMode="simple";
      unitProps.enableMovingColumn=true;

      var ctgProps = {};
      ctgProps.editable = true;
      ctgProps.enableSorting = true;
      ctgProps.softRemoveRowMode = false;
      //페이징 설정
      ctgProps.usePaging = true;
      // singleRow 선택모드
      ctgProps.selectionMode = "multipleCells";
      // 고정 칼럼 1개
      ctgProps.fixedColumnCount = 1;
      // 줄번호 칼럼 렌더러 출력 
      ctgProps.showRowNumColumn = true;
      // 체크박스 표시 렌더러 출력 안함
      ctgProps.showRowCheckColumn = false;
      //그리드 가로세로 설정.
      // auiGridProps.width= 1550;
      ctgProps.height= 500;
      ctgProps.autoGridHeight = false;
      ctgProps.enableRestore =false;
      //페이지 출력 행 개수
      ctgProps.showPageRowSelect=true;
      ctgProps.pageRowCount=100;
      ctgProps.pageRowSelectValues=[20, 40, 60 , 80, 100];
      ctgProps.pagingMode="simple";
      ctgProps.enableMovingColumn=true;

      // 실제로 #grid_wrap 에 그리드 생성
      unitGrid = AUIGrid.create("#grid_unit", unitLayout, unitProps);
      ctgGrid  = AUIGrid.create("#grid_ctg",ctgLayout, ctgProps);
      // setDoubleCilckEvent("#grid_wrap");
    }

    createAUIGrid();

    setAddRowEvent(unitGrid);
    setCellEditEndEvent(unitGrid);
    setCilckEvent(unitGrid);
    setKeydownEvent(unitGrid);
    
    setCellEditEndEvent(ctgGrid);
    setCilckEvent(ctgGrid);
    setKeydownEvent(ctgGrid);
    
  });
  function checkHome(){
    if("<%=session.getAttribute("id")%>"==null){
        location.href = "/";
    }else{
        location.href="/admin/main";
    }
  }
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

//추가 이벤트
  function setAddRowEvent(myGridID){
      AUIGrid.bind(myGridID, "addRowFinish", function( event ) {
          AUIGrid.setCellValue(myGridID, event.rowIndex, "index", event.rowIndex+1);
          removeStatus(myGridID);
      });
  }
// 변경 이벤트
function setCellEditEndEvent(grid){
        AUIGrid.bind(grid, "cellEditEnd", function(event) {
          if(grid == ctgGrid){
            if(!AUIGrid.isUniqueValue(grid,"rowId",event.item.largeCtgCode+event.item.mediumCtgCode)){
              if(event.columnIndex == 2){
                alert("이미 등록된 카테고리 코드값(" + event.item.largeCtgCode+event.item.mediumCtgCode + ")이  존재합니다.");
                AUIGrid.setCellValue(grid,event.rowIndex,"largeCtgCode","");
                return false;
              }else if(event.columnIndex == 4){
                alert("이미 등록된 카테고리 코드값(" + event.item.largeCtgCode+event.item.mediumCtgCode + ")이  존재합니다.");
                AUIGrid.setCellValue(grid,event.rowIndex,"mediumCtgCode","");
                return false;
              }
            }else{
              AUIGrid.setCellValue(grid,event.rowIndex,"rowId",event.item.largeCtgCode+event.item.mediumCtgCode);
            }
          }
            // removeStatus(grid);
      });          
}



// 그리드 클릭 이벤트 추가
function setCilckEvent(grid){
  AUIGrid.bind(grid, "cellClick", function(event) {
    if(event.columnIndex == 0){
      switch(event.value){
        case "Y" :
          if(confirm("삭제하시겠습니까?")){
              if(grid == unitGrid){
                var params = {
                  unit : AUIGrid.getCellValue(grid,event.rowIndex,"unit"),
                remark : AUIGrid.getCellValue(grid,event.rowIndex,"remark"),
                user_id : "<%=(String)session.getAttribute("id")%>",
                index : AUIGrid.getCellValue(grid,event.rowIndex,"index")
                };
                $.ajax({
                    url : "<%=request.getContextPath()%>/admin/delProdUnit",
                  async : false, // 비동기모드 : true, 동기식모드 : false
                  type : 'POST',
                  cache : false,
                  dataType : null,
                  data : params,
                  success : function(data) {
                      alert('삭제되었습니다.');
                      getCtgCnt();
                  },
                  error : function(request,status,error) {
                      alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                  }
                }); 
                AUIGrid.removeRow(grid,event.rowIndex);
                removeStatus(grid);
              }else {
                var params = {
                largeCtgCode : AUIGrid.getCellValue(grid,event.rowIndex,"largeCtgCode"),
                mediumCtgCode : AUIGrid.getCellValue(grid,event.rowIndex,"mediumCtgCode"),
                };
                $.ajax({
                  url : "<%=request.getContextPath()%>/admin/delCtg",
                  async : false, // 비동기모드 : true, 동기식모드 : false
                  type : 'POST',
                  cache : false,
                  dataType : null,
                  data : params,
                  success : function(data) {
                    alert('삭제되었습니다.');
                    getCtgCnt();
                  },
                  error : function(request,status,error) {
                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                  }
                });
                AUIGrid.removeRow(grid,event.rowIndex);
                removeStatus(grid);
              }     
          }else{
            AUIGrid.setCellValue(grid,event.rowIndex, "del", "N" );
            removeStatus(grid);
          }
          break;
      }

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
function searchCtg(){
  var params = {
    search : $("#ctgText").val()
  };
  $.ajax({
    url : "<%=request.getContextPath()%>/admin/getCtg",
    async : false, // 비동기모드 : true, 동기식모드 : false
    type : 'POST',
    cache : false,
    dataType : null,
    data : params,
    success : function(data) {
      AUIGrid.setGridData("#grid_ctg", data); 
    },
      error : function(request,status,error) {
        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
      }
  }); 
} 

function enterKey(){
  if (window.event.keyCode == '13') {
    searchCtg();
    return ;
  }
}

function exportExcel(){
    // if(AUIGrid.getRowCount(ctgGrid) == 0){
    //   alert('조회된 데이터가 없습니다.');
    //   return ;
    // }
  	var excelProps = {
		sheetName : "카테고리",
    exceptColumnFields : ["del", "rowId"], // 이름, 제품, 컬러는 아예 엑셀로 내보내기 안하기.
    showRowNumColumn : true
	};
	AUIGrid.exportToXlsx(ctgGrid, excelProps);
}

 window.onresize = function() {
	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
    AUIGrid.resize(ctgGrid);
};
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
            <li><a href="/admin/ctg" class="current">카테고리</a></li>
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
    <div class="sub_cont_area admin04_01">
      <h1 class="sub_tit">카테고리관리</h1>
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
            <a href="#" class="over_btn popup-trigger"><span>상품단위등록</span> <img src="../img/plus_icon.png" alt=""></a>
          </div>
        </div>
      </section>

      <div class="btn_area">
        <button type="button" class="excel_down" onclick = "exportExcel()">엑셀다운로드</button>
      </div>

      <section class="section02">
        <!-- 필터 영역 -->
        <div class="filter_area admin_filter">
          <form class="" action="" onsubmit="return false">
            <label for="">조회</label>
            <div class="input_search_wrap">
              <input type="text" name="ctgText" id="ctgText" value="" placeholder="카테고리 또는 코드 검색" class="search" onkeypress="enterKey()">
              <button type="button" class="search_btn" onclick="searchCtg()" >조회</button>
            </div>
          </form>
        </div>
        <!-- 필터 영역 끝 -->

        <!-- 보드 영역 -->
        <div class="dashboard_area">
          <div class="dash_bottom">
            <div class="btn_wrap">
              <div>
                <button type="button" class="row_add" name = "addCtg" id = "addCtg"><span>+</span>카테고리추가</button>
                <%-- <button type="button" class="row_del" name = "delCtg" id = "delCtg"><span>-</span>행삭제</button> --%>
              </div>
              <button type="button" class="save_btn btn">저장</button>
            </div>
            <div id="grid_ctg"></div>
            <div class="btn_wrap bottom">
              <button type="button" class="save_btn btn">저장</button>
            </div>
          </div>

        </div>
        <!-- 보드 영역 끝-->
      </section>

      <!-- 팝업 - 상품단위등록 -->
      <div class="popup" role="">
        <div class="popup_container">
          <div class="popup_head">
            <p class="popup_tit">상품단위등록</p>
            <a href="#0" class="popup_close"></a>
          </div>
          <div class="inner">
            <div class="dashboard_area">
              <div class="dash_bottom">
                <div class="btn_wrap">
                  <div>
                    <button type="button" class="row_add" name = "addUnit" id = "addUnit"><span>+</span>행추가</button>
                    <%-- <button type="button" class="row_del" name = "delUnit" id = "delUnit"><span>-</span>행삭제</button> --%>
                  </div>
                  <button type="button" class="save_btn btn" name ="unitSave">저장</button>
                </div>
                <div id="grid_unit"></div>
                <div class="btn_wrap bottom">
                  <div>
                    <button type="button" class="row_add" name = "addUnit"><span>+</span>행추가</button>
                    <%-- <button type="button" class="row_del" name = "delUnit"><span>-</span>행삭제</button> --%>
                  </div>
                  <button type="button" class="save_btn btn" name = "unitSave">저장</button>
                </div>
              </div>
            </div>
          </div>
        </div> <!-- popup_container -->
      </div> <!-- popup -->
    </div>
  </div>
</body>
</html>
