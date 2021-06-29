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

function pageLoad(){
	$('#daily').addClass("current");
	
	var today = _getFormatDate(new Date());
	$('#fromDate').val(today);
	$('#toDate').val(today);
	
	loadGridDailyList('init');
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
		  
		   dailyGrid = new wijmo.grid.FlexGrid('#dailyGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: [
			      { binding: 'onWorkDt', header: '출근시각', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'offWorkDt', header: '퇴근시각', isReadOnly: true, width: 100, align:"center"  },
			      { binding: 'managerNm', header: '담당자', isReadOnly: true, width: 60, align:"center" },
			      { binding: 'areaNm', header: '지역명', isReadOnly: true, width: 60, align:"center"  },
			      { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 120, align:"center"  },
			      { binding: 'cretDt', header: '업로드일자', isReadOnly: true, width: 100, align:"center"  },
			      { binding: 'memo', header: '비고', isReadOnly: true, width: '*', align:"center" },
			      { binding: 'siteMntrUrl', header: '현장점검 URL', isReadOnly: true, width: 200, align:"center" }
			    ],
			    itemsSource: dailyView
			  });
			  
		   	localStorage.setItem('dailyInitLayout', dailyGrid.columnLayout);
		   	_setUserGridLayout('dailyLayout');
			  
	  }else{		  
		   dailyView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		  dailyGridPager.cv = dailyView;
		  dailyGrid.itemsSource = dailyView;
	  }
	  
}

function getDailyList(){
	var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
		, fromDate : $('#fromDate').val()
		, toDate : $('#toDate').val()
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
}
</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        
        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">일일점검</h2>
                <div class="admin_utility">
                    <form action="#" method="post">
                        <label for>조회일</label>
                        <input type="date" id="fromDate" value="2021-06-02" onChange="_chFutureDate(this.value)">
                        -
                        <input type="date" id="toDate" value="2021-06-02"  onChange="_chFutureDate(this.value)">
                        <button type="button" class="admin_utility_btn" onClick="getDailyList();">조회</button>
                    </form>
                    <div class="admin_btn">
                        <button class="btn">엑셀 다운로드</button>
                    </div>
                </div>
                <div class="admin_content">
                    <!-- 필터 영역 admin_filter-->
                    <div class="admin_filter">
                        <form action="#" id="search_form" name="search_form">
                            <label for="con">검색조건</label>
                            <select name="con" id="con">
                                <option value="all" selected="selected">전체</option>
                                <option value="area">지역</option>
                                <option value="client">사업주명</option>
                                <option value="building">건물명</option>
                                <option value="officer">담당자명</option>
                            </select>
                            <label for="inq"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능">
                            <button type="button" onClick="getDailyList();">조회</button>
                        </form>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('dailyLayout');">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('dailyInitLayout', 'dailyLayout');">칼럼초기화</button>
                            <button type="button">URL복사</button>
                        </div>
                        <div class="grid_wrap" style="position:relative;">
                        <!--Grid 영역 -->
                        	<div id="dailyGrid"  style="height:500px;"></div>
                        	<div id="dailyGridPager"></div>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('dailyLayout');">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('dailyInitLayout', 'dailyLayout');">칼럼초기화</button>
                            <button type="button">URL복사</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</body>
</html>