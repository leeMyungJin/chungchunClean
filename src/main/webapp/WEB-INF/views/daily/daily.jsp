<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">

var dailyView;
var dailyGridPager;
var dailyGrid;
var dailyColumns;

var staffId = "<%=session.getAttribute("staffId")%>";

function pageLoad(){
	sessionCheck(staffId);
	
	$('#daily').addClass("current");
	
	var today = _getFormatDate(new Date());
	$('#fromDate').val(today);
	$('#toDate').val(today);
	$('#fromDate').attr('max',today);
	$('#toDate').attr('max',today);
	
	
	loadGridDailyList('init');
	
	getDailyList();
}

function enterkey() {
    if (window.event.keyCode == 13) {
    	getDailyList();
    }
}

//그리드 초기 셋팅
function loadGridDailyList(type, result){
	  if(type == "init"){
		   dailyView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		    
		   dailyGridPager = new wijmo.input.CollectionViewNavigator('#dailyGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: dailyView
		    });
		   
		   dailyColumns = [
			      { binding: 'onWorkDt', header: '출근시각', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'offWorkDt', header: '퇴근시각', isReadOnly: true, width: 100, align:"center"  },
			      { binding: 'officerNm', header: '담당자', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'areaNm', header: '지역명', isReadOnly: true, width: 150, align:"center"  },
			      { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 150, align:"center"  },
			      { binding: 'dongNum', header: '동번호', isReadOnly: true, width: 100, align:"center"  },
			      { binding: 'cretDt', header: '업로드일자', isReadOnly: true, width: 120, align:"center"  },
			      { binding: 'memo', header: '근태특이사항', isReadOnly: true, width: '*', align:"center" },
			      { binding: 'siteMntrUrl', header: '현장점검 URL', isReadOnly: true, width: 200, align:"center" },
			      { binding: 'dmemo', header: '점검특이사항', isReadOnly: true, width: '*', align:"center" },
			      { binding: 'postLocNm', header: '근태위치', isReadOnly: true, width: 200, align:"center" }
			];
		  
		   dailyGrid = new wijmo.grid.FlexGrid('#dailyGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: dailyColumns,
			    itemsSource: dailyView
			  });
		   
		   dailyGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        }; 
			  
		   	_setUserGridLayout('dailyLayout', dailyGrid, dailyColumns);
			  
	  }else{		  
		   dailyView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		  dailyGridPager.cv = dailyView;
		  dailyGrid.itemsSource = dailyView;
	  }
	  
	  new wijmo.grid.filter.FlexGridFilter(dailyGrid);
	  refreshPaging(dailyGrid.collectionView.totalItemCount, 1, dailyGrid, 'dailyGrid');  // 페이징 초기 셋팅
	  
}

function getDailyList(){
	var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
		, fromDate : $('#fromDate').val()
		, toDate : $('#toDate').val()
		, subcon : $('#subcon').val()
	};
	
	$.ajax({
        type : 'POST',
        url : '/daily/getDailyList',
        dataType : null,
        data : param,
        success : function(result) {
        	console.log("getDailyList success");
        	loadGridDailyList('search', result);
        },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

        }
    });
	
	$.ajax({
	      type : 'POST',
	      url : '/daily/getDailylable',
	      async : false, // 비동기모드 : true, 동기식모드 : false
	      dataType : null,
	      data : param,
	      success : function(result) {
	      	console.log(result);
	        $("#lableWorkDay").text(result.workday+ "일");
	        $("#lableWorkTime").text(result.worktime+ "시간");
	        $("#lableWorkBldg").text(result.workbldg+ "개");

	      },
	      error: function(request, status, error) {
	      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

	      }
	  });
}

function exportExcel(){
	var gridView = dailyGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

    //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
    dailyGrid.beginUpdate();
    dailyView.pageSize = 0;

    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(dailyGrid, {includeCellStyles: true, includeColumnHeaders: true}, 'dailyMonitoringList.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	dailyGrid.endUpdate();
	      }, null
	 );
}

function copyUrl(){
	if(dailyGrid.rows.length > 0){
		if(dailyGrid.collectionView.currentItem["siteMntrUrl"] != null){
			var tempElem = document.createElement('textarea');
			tempElem.value = dailyGrid.collectionView.currentItem["siteMntrUrl"];
			document.body.appendChild(tempElem);
			
			tempElem.select();
			document.execCommand('copy');
			document.body.removeChild(tempElem);	
			alert("현장점검 URL이 복사되었습니다.");
			
		}else{
			alert("현장점검 URL이 존재하지 않습니다.");
		}
		
	}else{
		alert("조회된 데이터가 없습니다.");
	}
}

</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        
        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">일일점검</h2>
                <div class="admin_utility">
                    <form action="#" method="post" onsubmit="return false;">
                        <label for>조회일</label>
                        <input type="date" id="fromDate" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey();">
                        -
                        <input type="date" id="toDate" onfocusout="_fnisDate(this.value, this.id)" onkeyup="enterkey();">
                        <button type="button" class="admin_utility_btn" onClick="getDailyList();">조회</button>
                    </form>
                    <div class="admin_btn">
                        <button class="btn" onClick="exportExcel();">엑셀 다운로드</button>
                    </div>
                </div>
                <div class="admin_content">
                    <!-- 필터 영역 admin_filter-->
                    <div class="admin_filter">
                        <form action="#" id="search_form" name="search_form" onsubmit="return false;">
                            <label for="con">검색조건</label>
                            <select name="con" id="con">
                                <option value="all" selected="selected">전체</option>
                                <option value="area">지역</option>
                                <option value="client">사업주명</option>
                                <option value="building">건물명</option>
                                <option value="officer">담당자명</option>
                            </select>
                            <label for="inq" onkeyup="enterkey();"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능" onkeyup="enterkey();">
                            <button type="button" onClick="getDailyList();">조회</button>
                        </form>
                        <div class="summary">
                            <dl>
                                <dt>근로일수</dt>
                                <dd id="lableWorkDay">0일</dd>
                            </dl>
                            <dl>
                                <dt>근로시간</dt>
                                <dd id="lableWorkTime">0시간</dd>
                            </dl>
                            <dl>
                                <dt>관리업체수</dt>
                                <dd id="lableWorkBldg">0개</dd>
                            </dl>
                        </div>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                    	<select name="subcon" id="subcon" class="left">
                            <option value="all" selected="selected">전체</option>
                            <option value="work">근태</option>
                            <option value="mntr">점검</option>
                        </select>
                        <button type="button" class="att left" onClick="getDailyList();">보기</button>
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('dailyLayout', dailyGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('dailyLayout', dailyGrid, dailyColumns);">칼럼초기화</button>
                            <button type="button" onClick="copyUrl();">URL복사</button>
                        </div>
                        <div class="grid_wrap" style="position:relative;">
                        <!--Grid 영역 -->
                        	<div id="dailyGrid"  style="height:500px;"></div>
                        	<div id="dailyGridPager" class="pager"></div>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('dailyLayout', dailyGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('dailyLayout', dailyGrid, dailyColumns);">칼럼초기화</button>
                            <button type="button">URL복사</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</body>
</html>