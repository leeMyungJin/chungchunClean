<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
class RestrictedMergeManager extends wijmo.grid.MergeManager {
    getMergedRange(p, r, c, clip = true) {
        //
        //기본 셀 범위 생성
        var rng = null;
        //
        // 단일 셀로 시작
        rng = new wijmo.grid.CellRange(r, c);
        var pcol = c > 0 ? c - 1 : c;
        //
        // 병합에 사용할 참조 값 가져오기
        var val = p.getCellData(r, c, false);
        var pval = p.getCellData(r, pcol, false);
        //
        // 위로 확장
        while (rng.row > 0 &&
            p.getCellData(rng.row - 1, c, false) == val &&
            p.getCellData(rng.row - 1, pcol, false) == pval) {
            rng.row--;
        }
        //
        // 아래로 확장
        while (rng.row2 < p.rows.length - 1 &&
            p.getCellData(rng.row2 + 1, c, false) == val &&
            p.getCellData(rng.row2 + 1, pcol, false) == pval) {
            rng.row2++;
        }
        //
        //단일 셀 범위에는 무시
        if (rng.isSingleCell) {
            rng = null;
        }
        //
        // 마무리
        return rng;
    }
}

var incomeView;
var incomeGridPager;
var incomeGrid;
var incomeColumns;

function pageLoad(){
	$('#income').addClass("current");
	
	var today = _getFormatDate(new Date());
	$('#fromDate').val(today);
	$('#toDate').val(today);
	$('#fromDate').attr('max',today);
	$('#toDate').attr('max',today);
	
	loadGridIncomeList('init');
}

function enterkey() {
	if(window.event.keyCode == 13){
		getIncomeList();
	}
}

//그리드 초기 셋팅
function loadGridIncomeList(type, result){
	  if(type == "init"){ 
		  //월관리
		   incomeView = new wijmo.collections.CollectionView(result, {
			   pageSize: 100
		   });
		    
		   incomeGridPager = new wijmo.input.CollectionViewNavigator('#incomeGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: incomeView
		    });
		   
		   incomeColumns = [
			      { binding: 'depositDt', header: '일자', isReadOnly: true, width: 100, align:"center", allowMerging: true  },
			      { binding: 'type', header: '분야', isReadOnly: true, width: 100, align:"center", allowMerging: true },
			      { binding: 'areaNm', header: '지역', isReadOnly: true, width: 100, align:"center", allowMerging: true },
			      { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 150, align:"center", allowMerging: false  },
			      { binding: 'pnum', header: '전화번호', isReadOnly: true, width: 150, align:"center" , allowMerging: false  },
			      { binding: 'conCost', header: '계약금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum', allowMerging: false  },
			      { binding: 'addCost', header: '추가금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum', allowMerging: false   },
			      { binding: 'outCost', header: '미수금', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum', allowMerging: false  },
			      { binding: 'depositCost', header: '입금금액', isReadOnly: true, width: 150, align:"center", aggregate: 'Sum', allowMerging: false  }
			];
		    
		   incomeGrid = new wijmo.grid.FlexGrid('#incomeGrid', {
			    autoGenerateColumns: false,
			    allowMerging: 'Cells',
			    alternatingRowStep: 0,
			    columns: incomeColumns,
			    itemsSource: incomeView
			  });
			  
		   incomeGrid.columnFooters.rows.push(new wijmo.grid.GroupRow());
		   incomeGrid.bottomLeftCells.setCellData(0, 0, 'Σ');
		   
		   	_setUserGridLayout('incomeLayout', incomeGrid, incomeColumns);
		   	
		   	//행번호
		   	incomeGrid.itemFormatter = function (panel, r, c, cell) { 
	            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
	                cell.textContent = (r + 1).toString();
	            }
	        };
	        
	     // 사용자 지정 병합 매니저 적용
	        incomeGrid.mergeManager = new RestrictedMergeManager();
			  
	  }else{	
		  //월관리
		   incomeView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		  incomeGridPager.cv = incomeView;
		  incomeGrid.itemsSource = incomeView;
	  }
	  
	  refreshPaging(incomeGrid.collectionView.totalItemCount, 1, incomeGrid, 'incomeGrid');  // 페이징 초기 셋팅
}

function getIncomeList(){
	var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
		, fromDate : $('#fromDate').val()
		, toDate : $('#toDate').val()
	};
	
	$.ajax({
      type : 'POST',
      url : '/income/getIncomeList',
      dataType : null,
      data : param,
      success : function(result) {
      	console.log("getIncomeList success");
      	loadGridIncomeList('search', result);
      },
      error: function(request, status, error) {
      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

      }
  });
	
	$.ajax({
	      type : 'POST',
	      url : '/income/getIncomelableCost',
	      dataType : null,
	      data : param,
	      success : function(result) {
	      	console.log(result);
	        $("#lableAddCost").text(result.addcost+ "원");
	        $("#lableDepositCost").text(result.depositcost+ "원");
	        $("#lableOutCost").text(result.outcost+ "원");
	        $("#labelConCost").text(result.concost+ "원");

	      },
	      error: function(request, status, error) {
	      	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

	      }
	  });
}

function exportExcel(){
	var gridView = incomeGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

  //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
  incomeGrid.beginUpdate();
  incomeView.pageSize = 0;

  wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(incomeGrid, {includeCellStyles: true, includeColumnHeaders: true}, '월관리청소.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	incomeGrid.endUpdate();
	      }, null
	 );
}

</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        

        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">매출관리</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>금년 매출액(부가세포함)</dt>
                        <dd>${totalCost.concost}원</dd>
                    </dl>
                    <dl>
                        <dt>금년 입금금액</dt>
                        <dd>${totalCost.depositcost}원</dd>
                    </dl>
                    <dl>
                        <dt>금년 미수금</dt>
                        <dd>${totalCost.outcost}원</dd>
                    </dl>
                    <dl>
                        <dt>금년 추가금</dt>
                        <dd>${totalCost.addcost}원</dd>
                    </dl>
                </div>
                <div class="admin_utility">
                    <form action="#" method="post">
                        <label for>조회월</label>
                        <input type="month" id="fromDate" onfocusout="_fnisMonth(this.value, this.id)" onkeyup="enterkey();">
                     	   	-
                       	<input type="month" id="toDate" onfocusout="_fnisMonth(this.value, this.id)" onkeyup="enterkey();">
                        <button type="button" class="admin_utility_btn" onClick="getIncomeList();">조회</button>
                    </form>
                    <div class="admin_btn">
                        <button class="btn"  onClick="exportExcel();">엑셀 다운로드</button>
                    </div>
                </div>
                <div class="admin_content">
                    <!-- 필터 영역 admin_filter-->
                    <div class="admin_filter">
                        <form action="#" id="search_form" name="search_form">
                            <label for="con">검색조건</label>
                            <select name="con" id="con">
                                <option value="all" selected="selected">전체</option>
                                <option value="site">지역</option>
                                <option value="building">건물명</option>
                                <option value="depositor">입금자명</option>
                            </select>
                            <label for="inq" onkeyup="enterkey();"></label>
                            <input  id="inq" type="text" placeholder=",로 다중검색 가능"  onkeyup="enterkey();">
                            <button type="button" onClick="getIncomeList();">조회</button>
                        </form>
                        <div class="summary">
                            <dl>
                                <dt>매출액</dt>
                                <dd id="labelConCost">0원</dd>
                            </dl>
                            <dl>
                                <dt>미수금</dt>
                                <dd id="lableOutCost">0원</dd>
                            </dl>
                            <dl>
                                <dt>입금금액</dt>
                                <dd  id="lableDepositCost">0원</dd>
                            </dl>
                            <dl>
                                <dt>추가금</dt>
                                <dd  id="lableAddCost">0원</dd>
                            </dl>
                        </div>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                        <div class="btn_wrap">
                            <button type="button" class="stroke"  onClick="_getUserGridLayout('incomeLayout', incomeGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke"  onClick="_resetUserGridLayout('incomeLayout', incomeGrid, incomeColumns);">칼럼초기화</button>
                        </div>
                        <div class="grid_wrap">
                        	<div id="incomeGrid"  style="height:500px;"></div>
                        	<div id="incomeGridPager" class="pager"></div>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke"  onClick="_getUserGridLayout('incomeLayout', incomeGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke"  onClick="_resetUserGridLayout('incomeLayout', incomeGrid, incomeColumns);">칼럼초기화</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</body>
</html>