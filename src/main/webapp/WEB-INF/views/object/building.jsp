<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
var bldgView;
var bldgGridPager;
var bldgGrid;
var bldgColumns;
var bldgSelector;
var excelGrid;
var excelView;
var excelSelector;
function pageLoad(){
	$('#object').addClass("current");
	$('#building').addClass("current");

    loadGridStockList('init');
}

//그리드 초기 셋팅
function loadGridStockList(type, result){
    if(type == "init"){     
        $("#excelDiv").hide();
        $("#saveBtn").hide();
        bldgView = new wijmo.collections.CollectionView(result, {
            pageSize: 100,
            groupDescriptions: ['lCategyNm']
        });
		// 페이지 이동
        bldgGridPager = new wijmo.input.CollectionViewNavigator('#bldgGridPager', {
            byPage: true,
            headerFormat: '{currentPage:n0} / {pageCount:n0}',
            cv: bldgView
        });

        bldgColumns =  [
                { isReadOnly: true, width: 50, align:"center"},
                { binding: 'areaCd', header: '지역코드', isReadOnly: true, width: 60, visible: false, align:"center"},
                { binding: 'areaNm', header: '지역', isReadOnly: true, width: 100, align:"center"},
                { binding: 'dtlAddr', header: '상세주소', isReadOnly: true, width: 300, align:"center"},
                { binding: 'bldgCd', header: '건물코드', isReadOnly: true, width: 60, visible: false,align:"center"},
                { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 150, align:"center"},
                { binding: 'pnum', header: '전화번호', isReadOnly: true, width: 150, align:"center"},
                { binding: 'conCost', header: '계약금액', isReadOnly: true,  width: 150, align:"center"},
                { binding: 'dongNum', header: '동번호', isReadOnly: true, width: 60, align:"center"},
                { binding: 'memo', header: '메모', isReadOnly: true, width: 280, align:"center"  },
                { binding: 'activeYn', header: '활성화', isReadOnly: true, width: 80, align:"center"},
                { binding: 'cretDt', header: '계정생성일', isReadOnly: true, width: 175, align:"center"},
                { binding: 'edit', header: '정보수정', isReadOnly: true, width: "*", align:"center"}
            ]
		  
		// hostElement에 Wijmo의 FlexGird 생성
        // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
        // autoGenerateColumns: false >> 컬럼 사용자 정의 
        bldgGrid = new wijmo.grid.FlexGrid('#bldgGrid', {
            autoGenerateColumns: false,
            alternatingRowStep: 0,
            columns : bldgColumns,
            itemsSource: bldgView,
            cellEditEnding: function (s, e) {
                var col = s.columns[e.col];
                var inven = s.columns[e.col - 1];
                if (col.binding == 'add') {
                    var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
                    if( !wijmo.isNumber(value)){
                        e.cancel = true;
                        e.stayInEditMode = false;
                        alert('숫자로만 입력 가능합니다.');
                        return false;
                    }else{
                        e.getRow().dataItem.quantity += value;// 입력값 재고수량에 계산
                        if(e.getRow().dataItem.quantity > 10){
                            e.getRow().dataItem.status = 'O';
                        }else{
                            e.getRow().dataItem.status = 'X';
                        }
                    //    bldgView.items[e.row -1].quantity += value ; 
                       var params = {
                            lCategyCd   : e.getRow().dataItem.lCategyCd,
                            itemCd      : e.getRow().dataItem.itemCd,
                            quantity    : e.getRow().dataItem.quantity ,
                        }
                         $.ajax({
                            url : "/stock/saveQuantity",
                            async : false, // 비동기모드 : true, 동기식모드 : false
                            type : 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify(params),
                            success : function(result) {
                                getQuantityInfo();
                            },
                            error : function(request,status,error) {
                                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                            }
                        });
                       s.activeEditor.value = 0; // 입력값 0으로 초기화

                    }

                }
            }
        });

        _setUserGridLayout('bldgLayout', bldgGrid, bldgColumns );

        //행번호 표시하기
        bldgGrid.itemFormatter = function (panel, r, c, cell) { 
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
            }
        };

        bldgGrid.formatItem.addHandler(function (s, e) {
            // 열 헤더에 대한 중앙 정렬 
            if (e.panel == s.columnHeaders) {
            e.cell.innerHTML = '<div class="v-center">' +
                e.cell.innerHTML + '</div>';
            }
            //  "status" 열에 대한 커스텀 렌더링
            if (e.panel == s.cells) {
            var col = s.columns[e.col];
            var status = s.getCellData(e.row, e.col);
                if (col.binding == 'status' && (status == 'O' || status == 'X')) {
                    //셀 서식
                    var html = '<div class="mark_{status}"/>';
                    if(status == 'O') {
                        html = html.replace('{status}', 'enough');
                    }else if(status == 'X') {
                        html = html.replace('{status}', 'short');
                    }
                    e.cell.innerHTML = html;                    
                }
            }
        });

		// hostElement에 Wijmo의 FlexGird 생성
        // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
        // autoGenerateColumns: false >> 컬럼 사용자 정의 
        excelGrid = new wijmo.grid.FlexGrid('#excelGrid', {
            autoGenerateColumns: false,
            alternatingRowStep: 0,
            columns : bldgColumns,
            itemsSource: excelView
        });

        //행번호 표시하기
        excelGrid.itemFormatter = function (panel, r, c, cell) { 
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
            }
        };
        // 체크박스 생성
        bldgSelector = new wijmo.grid.selector.Selector(bldgGrid);
        bldgSelector.column = bldgGrid.columns[0];
    }else{
        bldgView = new wijmo.collections.CollectionView(result, {
            pageSize: 100,
            groupDescriptions: ['areaNm', 'bldgNm', 'dongNum']
        });
        bldgGrid.columns[0].width = 50;
        bldgGridPager.cv = bldgView;
        bldgGrid.itemsSource = bldgView;
	  }
      refreshPaging(bldgGrid.collectionView.totalItemCount, 1, bldgGrid, 'bldgGrid');
}

function getBldgList(){
    $("#excelDiv").hide();
    $("#bldgDiv").show();
    var params = {
            inq : $("#inq").val(),
            con : $("#con").val()
    	}
    	$.ajax({
            url : "/object/getBldgList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            data : params,
            success : function(result) {
        	    loadGridStockList('search', result);
            },
            error : function(request,status,error) {
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
                <h2 class="admin_title">건물관리</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>전체 건물수</dt>
                        <dd>00명</dd>
                    </dl>
                    <dl>
                        <dt>전체 단지수</dt>
                        <dd>00개</dd>
                    </dl>
                    <!-- 클릭시 건물추가 팝업창 띄움 -->
                    <a href="#new_building">건물추가</a>
                </div>
                <div class="admin_utility">
                    <div class="admin_btn">
                        <button class="btn">계약서 출력</button>
                        <button class="btn">엑셀 템플릿</button>
                        <button class="btn">엑셀 업로드</button>
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
                                <option value="client">고객명</option>
                                <option value="building">건물명</option>
                            </select>
                            <label for="inq"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능">
                            <button type="button" id="search" onClick="getBldgList();">조회</button>
                        </form>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="click();">칼럼위치저장</button>
                            <button type="button" class="stroke">칼럼초기화</button>
                            <button type="button">QR출력</button>
                            <button type="button">저장</button>
                        </div>
                        <div class="grid_wrap" id="bldgDiv" style="position:relative;">
                        	<div id="bldgGrid"  style="height:500px;"></div>
                        	<div id="bldgGridPager" class="pager"></div>
                        </div>
                        <div class="grid_wrap" id="excelDiv" style="position:relative;">
                        	<div id="excelGrid"  style="height:500px;"></div>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke">칼럼위치저장</button>
                            <button type="button" class="stroke">칼럼초기화</button>
                            <button type="button">QR출력</button>
                            <button type="button">저장</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <!-- 팝업 -->
    <!-- 팝업 : 건물추가-->
    <div class="popup" id="new_building" style="display:none;">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">건물추가</p>
                <button type="button" class="popup_close">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form action="#" method="post">
                    <div class="row">
                        <label for="region">지역<i>*</i></label>
                        <input type="text" id="region" name="region" required>
                        <button type="button" class="popup_btn att">검색</button>
                    </div>
                    <div class="row">
                        <label for="dtlAddr">상세주소<i>*</i></label>
                        <input type="text" id="dtlAddr" name="dtlAddr" required>
                        <button type="button" class="popup_btn att">중복확인</button>
                    </div>
                    <div class="row">
                        <label for="builName">건물명<i>*</i></label>
                        <input type="text" id="builName" name="builName" required>
                    </div>
                    <div class="row">
                        <label for="builNum">건물번호<i>*</i></label>
                        <input type="text" id="builNum" name="builNum" onfocus="this.blur()" readonly>
                    </div>
                    <div class="row">
                        <label for="codeNum">동 번호<i>*</i></label>
                        <input type="text" id="codeNum" name="codeNum" required>
                        <button type="button" class="popup_btn att">추가</button>
                    </div>
                    <div class="row">
                        <label for="downPay">계약금액<i>*</i></label>
                        <input type="text" id="downPay" name="downPay" required>
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn confirm">생성</button>
                </div>
            </div>
        </div>
    </div>
    <!--건물추가 팝업 영역 끝-->
    <!-- 팝업 : 정보수정 -->
    <div class="popup" id="modify_building"  style="display:none;">
        <div class="popup_container"> 
            <div class="popup_head">
                <p class="popup_title">정보수정</p>
                <button type="button" class="popup_close">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form action="#" method="post">
                    <div class="row">
                        <label for="active">활성화</label>
                        <input type="checkbox" id="active" name="active" checked>체크 시, 활성화
                    </div>
                    <div class="row">
                        <label for="region">지역<i>*</i></label>
                        <input type="text" id="region" name="region" required>
                        <button type="button" class="popup_btn att">검색</button>
                    </div>
                    <div class="row">
                        <label for="dtlAddr">상세주소<i>*</i></label>
                        <input type="text" id="dtlAddr" name="dtlAddr" required>
                        <button type="button" class="popup_btn att">중복확인</button>
                    </div>
                    <div class="row">
                        <label for="builName">건물명<i>*</i></label>
                        <input type="text" id="builName" name="builName" required>
                    </div>
                    <div class="row">
                        <label for="builNum">건물번호<i>*</i></label>
                        <input type="text" id="builNum" name="builNum" onfocus="this.blur()" readonly>
                    </div>
                    <div class="row">
                        <label for="codeNum">동 번호<i>*</i></label>
                        <input type="text" id="codeNum" name="codeNum" required>
                        <input type="text" id="codeNum" name="codeNum" required>
                        <input type="text" id="codeNum" name="codeNum" required>
                        <button type="button" class="popup_btn att">추가</button>
                    </div>
                    <div class="row">
                        <label for="downPay">계약금액<i>*</i></label>
                        <input type="text" id="downPay" name="downPay" required>
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn stroke">수정</button>
                    <button type="button" class="popup_btn fill">삭제</button>
                </div>
            </div>
        </div>
    </div>
    <!--정보수정 팝업 영역 끝-->
</body>
</html>