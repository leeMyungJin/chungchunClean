<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

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
var bldgDetailGrid;
var bldgDetailView;
var modifyDetailGrid;
var modifyDetailView;
var maxBldgCd;
var dupCheck = false;
var activeList = ['Y', 'N'];

function pageLoad(){
	$('#object').addClass("current");
	$('#building').addClass("current");
    maxBldgCd = parseInt("${fn:substring(maxBldgCd,1,11)}");
    loadGridStockList('init');
    getBuildingInfo();
}
function getError(item,prop){
        if( prop == "dongNum"){
            const curDong = item[prop];
            const src = bldgDetailView.sourceCollection;
            let allSameDong = src.filter((c)=>c.dongNum == curDong);
            if(allSameDong.length > 1){
                alert("동일한 동번호가 존재합니다.");
                return "동일한 동번호가 존재합니다.";
            }

            const modifyCurDong = item[prop];
            const modifySrc = modifyDetailView.sourceCollection;
            allSameDong = modifySrc.filter((c)=>c.dongNum == modifyCurDong);
            if(allSameDong.length > 1){
                alert("동일한 동번호가 존재합니다.");
                return "동일한 동번호가 존재합니다.";
            }
        }
        return "";
}
function getModifyError(item,prop){
        if( prop == "dongNum"){
            const curDong = item[prop];
            const src = modifyDetailView.sourceCollection;
            let allSameDong = src.filter((c)=>c.dongNum == curDong);
            if(allSameDong.length > 1){
                alert("동일한 동번호가 존재합니다.");
                return "동일한 동번호가 존재합니다.";
            }
        }
        return "";
}
//그리드 초기 셋팅
function loadGridStockList(type, result){
    
    if(type == "init"){
        $("#excelDiv").hide();
        $("#saveBtn").hide();
        bldgView = new wijmo.collections.CollectionView(result, {
            pageSize: 100
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
                { binding: 'areaNm', header: '지역명', isReadOnly: true, width: 60, visible: false, align:"center"},
                { binding: 'clientNm', header: '고객명', isReadOnly: true, width: 60, visible: false, align:"center"},
                { binding: 'conFromDt', header: '계약시작일', isReadOnly: true, width: 60, visible: false, align:"center"},
                { binding: 'conToDt', header: '계약종료일', isReadOnly: true, width: 60, visible: false, align:"center"},
                { binding: 'zone', header: '구역', isReadOnly: true, width: 60, visible: false, align:"center"},                
                { binding: 'dtlAddr', header: '상세주소', isReadOnly: true, width: 300, align:"center"},
                { binding: 'bldgCd', header: '건물코드', isReadOnly: true, width: 60, visible: false,align:"center"},
                { binding: 'bldgNm', header: '건물명', isReadOnly: true, width: 150, align:"center"},
                { binding: 'pnum', header: '전화번호', isReadOnly: true, width: 120, align:"center"},
                { binding: 'conCost', header: '계약금액', isReadOnly: true,  width: 150, align:"center"},
                { binding: 'conFromDt', header: '계약시작일', isReadOnly: true, width: 60, visible: false,align:"center"},
                { binding: 'conToDt', header: '계약종료일', isReadOnly: true, width: 60, visible: false,align:"center"},
                { binding: 'surtaxYn', header: '부가세여부', isReadOnly: true, width: 60, visible: false,align:"center"},
                { binding: 'surtax', header: '부가세', isReadOnly: true, visible: false, width: 150, align:"center"},
                { binding: 'dongNum', header: '동번호', isReadOnly: true, width: 60, align:"center"},
                { binding: 'memo', header: '메모', isReadOnly: true, width: 280, align:"center"  },
                { binding: 'activeYn', header: '활성화', isReadOnly: true, width: 80, align:"center"},
                { binding: 'cretDt', header: '계정생성일', isReadOnly: true, width: 175, align:"center"},
                { binding: 'edit', header: '정보수정', isReadOnly: true, width: "*", align:"center",
                    cellTemplate: wijmo.grid.cellmaker.CellMaker.makeButton({
                        text: '<b>수정</b>',
                        click: (e, ctx) => {
                            showPop('modify_building');
                        }
                        
                    })
                }
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
        // 건물추가 - 동 그리드 
        bldgDetailView = new wijmo.collections.CollectionView(result, {
            getError
        });
        bldgDetailColumns =  [
                { binding: 'bldgCd', header: '건물코드', isReadOnly: true, visible : false, width: 80, align:"center"},
                { binding: 'dongNum', header: '동번호', isReadOnly: false, width: "*", align:"center"},
                { binding: 'cleanCnt', header: '청소횟수', isReadOnly: false, width: "*", align:"center"},
                { binding: 'fromDt', header: '시작일', isReadOnly: false, width: "*", align:"center"},
                { binding: 'toDt', header: '종료일', isReadOnly: false, width: "*", align:"center"},
                { binding: 'dongQrUrl', header: 'QrUrl', isReadOnly: false, visible : false,width: "*", align:"center"}

            ]
        var fromDtEditor = new wijmo.input.InputDate(document.createElement("div"));
        var toDtEditor = new wijmo.input.InputDate(document.createElement("div"));
		// hostElement에 Wijmo의 FlexGir컬d 생성
        // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
        // autoGenerateColumns: false >> 럼 사용자 정의 
        bldgDetailGrid = new wijmo.grid.FlexGrid('#bldgDetailGrid', {
            autoGenerateColumns: false,
            alternatingRowStep: 0,
            columns : bldgDetailColumns,
            itemsSource: bldgDetailView,
            beginningEdit: function (s, e) {
                s.columns.getColumn("fromDt").editor = fromDtEditor;
                s.columns.getColumn("toDt").editor = toDtEditor;
                let col = e.getColumn();
                if (col.binding !== "to") {
                    return;
                }
                let fromDt = e.getRow().dataItem.fromDt;
                if (!fromDt) {
                    return;
                }
                let toDt = e.getRow().dataItem.toDt;
                if (!toDt) {
                    return;
                }
            },
            cellEditEnding: function (s, e) {
                var col = s.columns[e.col];
                var inven = s.columns[e.col - 1];
                if (col.binding == 'cleanCnt') {
                    var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
                    if( !wijmo.isNumber(value)){
                        e.cancel = true;
                        e.stayInEditMode = false;
                        alert('숫자로만 입력 가능합니다.');
                        return false;
                    }
                }else if(col.binding == "dongNum"){
                    e.getRow().dataItem.bldgCd = newBuildingForm.bldgCd.value;
                    e.getRow().dataItem.dongQrUrl = newBuildingForm.bldgCd.value + s.activeEditor.value;
                }else if(col.binding == "fromDt"){
                    e.getRow().dataItem.fromDt = s.activeEditor.value;
                }else if(col.binding == "toDt"){
                    e.getRow().dataItem.toDt = s.activeEditor.value;
                }
            }   
        });

        //행번호 표시하기
        bldgDetailGrid.itemFormatter = function (panel, r, c, cell) { 
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
            }
        };

        // 건물 수정 그리드
        // 건물추가 - 동 그리드 
        modifyDetailView = new wijmo.collections.CollectionView(result, {
            getError
        });
        modifyDetailColumns =  [
                { binding: 'bldgCd', header: '건물코드', isReadOnly: true, visible : false, width: 80, align:"center"},
                { binding: 'dongNum', header: '동번호', isReadOnly: false, width: "*", align:"center"},
                { binding: 'cleanCnt', header: '청소횟수', isReadOnly: false, width: "*", align:"center"},
                { binding: 'fromDt', header: '시작일', isReadOnly: false, width: "*", align:"center"},
                { binding: 'toDt', header: '종료일', isReadOnly: false, width: "*", align:"center"},
                { binding: 'cretDt', header: '생성일', isReadOnly: false, visible : false, width: "*", align:"center"},
                { binding: 'dongQrUrl', header: 'QrUrl', isReadOnly: false, visible : false,width: "*", align:"center"}

            ]
        var fromDtEditor = new wijmo.input.InputDate(document.createElement("div"));
        var toDtEditor = new wijmo.input.InputDate(document.createElement("div"));
		// hostElement에 Wijmo의 FlexGir컬d 생성
        // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
        // autoGenerateColumns: false >> 럼 사용자 정의 
        modifyDetailGrid = new wijmo.grid.FlexGrid('#modifyDetailGrid', {
            autoGenerateColumns: false,
            alternatingRowStep: 0,
            columns : modifyDetailColumns,
            itemsSource: modifyDetailView,
            beginningEdit: function (s, e) {
                s.columns.getColumn("fromDt").editor = fromDtEditor;
                s.columns.getColumn("toDt").editor = toDtEditor;
                let col = e.getColumn();
                var item = e.getRow().dataItem;
                var column = s.columns[e.col];
                if(item.cretDt != undefined){
                    if (column.binding == 'dongNum') {
                        e.cancel = true;
                        alert("동번호는 신규 행일때만 입력이 가능합니다.");
                        return false;
                    }
                }
                if (col.binding !== "to") {
                    return;
                }
                let fromDt = e.getRow().dataItem.fromDt;
                if (!fromDt) {
                    return;
                }
                let toDt = e.getRow().dataItem.toDt;
                if (!toDt) {
                    return;
                }
                
            },
            cellEditEnding: function (s, e) {
                var col = s.columns[e.col];
                var inven = s.columns[e.col - 1];
                if (col.binding == 'cleanCnt') {
                    var value = wijmo.changeType(s.activeEditor.value, wijmo.DataType.Number, col.format);
                    if( !wijmo.isNumber(value)){
                        e.cancel = true;
                        e.stayInEditMode = false;
                        alert('숫자로만 입력 가능합니다.');
                        return false;
                    }
                }else if(col.binding == "dongNum"){
                    e.getRow().dataItem.bldgCd = modifyBuildingForm.bldgCd.value;
                    e.getRow().dataItem.dongQrUrl = modifyBuildingForm.bldgCd.value + s.activeEditor.value;
                }else if(col.binding == "fromDt"){
                    e.getRow().dataItem.fromDt = s.activeEditor.value;
                }else if(col.binding == "toDt"){
                    e.getRow().dataItem.toDt = s.activeEditor.value;
                }
            }   
        });

        //행번호 표시하기
        modifyDetailGrid.itemFormatter = function (panel, r, c, cell) { 
            if (panel.cellType == wijmo.grid.CellType.RowHeader) {
                cell.textContent = (r + 1).toString();
            }
        };
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
            groupDescriptions: ['areaNm', 'bldgCd']
        });
        bldgGrid.columns[0].width = 50;
        bldgGridPager.cv = bldgView;
        bldgGrid.itemsSource = bldgView;
	  }
      refreshPaging(bldgGrid.collectionView.totalItemCount, 1, bldgGrid, 'bldgGrid');
}

function getBuildingList(){
    $("#excelDiv").hide();
    $("#bldgDiv").show();
    var params = {
            inq : $("#inq").val(),
            con : $("#con").val()
    	}
    	$.ajax({
            url : "/object/getBuildingList",
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

function dateFormat(date){
    var dateFormat = "";
    if(date != null)
        dateFormat = date.substring(0,4) + "-" + date.substring(4,6) + "-" + date.substring(6,8);
    return dateFormat;
}

function showPop(pop){
    $("#tax").hide();
    var form;
    if(pop == 'new_building'){
        dupCheck = false;
        form = newBuildingForm;
        bldgDetailView.items.clear;
        form.clientNm.value="";
        form.areaCd.value="";
        form.areaNm.value="";
        form.zone.value="";
        form.dtlAddr.value="";
        form.bldgNm.value="";
        form.bldgCd.value = "B" + _fillZero(10, String(maxBldgCd+1) );
        form.conCost.value="";
        form.memo.value="";
        form.conFromDt.value="";
        form.conToDt.value="";
        form.pnum.value="";
    }else if(pop == 'modify_building'){
         dupCheck = true;
        form = modifyBuildingForm;
        var bldgCd = bldgView.items[bldgView._idx].bldgCd
        form.bldgCd.value = bldgCd;
        var activeYn =  bldgView.items[bldgView._idx].activeYn;
        if(activeYn == 'Y'){
            form.activeYn.checked = true;
        }else{
            form.activeYn.checked = false;
        }
        form.bldgNm.value = bldgView.items[bldgView._idx].bldgNm;
        form.clientNm.value = bldgView.items[bldgView._idx].clientNm;
        form.areaCd.value = bldgView.items[bldgView._idx].areaCd;
        form.areaNm.value = bldgView.items[bldgView._idx].areaNm;
        form.zone.value = bldgView.items[bldgView._idx].zone;
        form.dtlAddr.value = bldgView.items[bldgView._idx].dtlAddr;
        form.bldgNm.value = bldgView.items[bldgView._idx].bldgNm;
        form.conCost.value = bldgView.items[bldgView._idx].conCost;
        form.conCost.value = form.conCost.value.replace(/[^0-9.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        form.memo.value = bldgView.items[bldgView._idx].memo;
        form.surtaxYn.value = bldgView.items[bldgView._idx].surtaxYn;
        if( form.surtaxYn.value == 'N'){
            $("[name=tax]").show();
            form.surtax.value = bldgView.items[bldgView._idx].surtax;  
            form.surtax.value = form.surtax.value.replace(/[^0-9.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }else{
            $("[name=tax]").hide();
        }
        form.conFromDt.value = bldgView.items[bldgView._idx].conFromDt;
        form.conToDt.value = bldgView.items[bldgView._idx].conToDt;
        form.pnum.value = bldgView.items[bldgView._idx].pnum;

        var params = {
            bldgCd : bldgCd
        };
        $.ajax({
            url : "/object/getDetailBuildingList",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            data : params,
            success : function(result) {
                modifyDetailView = new wijmo.collections.CollectionView(result, {
                    pageSize: 100,
                    trackChanges : true,
                    getError
                });
                modifyDetailGrid.cv = modifyDetailView;
                modifyDetailGrid.itemsSource = modifyDetailView;
            },
            error : function(request,status,error) {
             	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });

    }
    $('#'+pop).addClass('is-visible');
}

function closePop(){
	$('.popup').removeClass('is-visible');
}

function findAddr(){
    var pop = window.open("/object/p_addr","pop","width=570,height=420, scrollbars=yes, resizable=yes"); } 
    var jusoCallBack = function(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr,jibunAdddr,zipNo, admCd, rnMgtSn, bdMgtSn, detBdNmList, bdNm, bdKdcd, siNm, sggNm, emdNm, liNm, rn, udrtYn,buldMnnm, buldSlno, mtYn, lnbrMnnm, lnbrSlno, emdNo){ 
        $("#areaCd").val(admCd.substring(0,2));
        $("#areaNm").val(siNm);
        $("#dtlAddr").val(roadAddrPart1 + " " + addrDetail);
}
function popBuildingQrList(){
	var win = window.open("/object/getBuildingQrList?inq="+$("#inq").val()+"&con="+$("#con").val(), "PopupWin", "with=1000,height=600");
}

function popContract(){
    var idx = bldgView._idx;
    var bldgCd;
    if(idx == null || idx == undefined){
        alert('계약서를 볼 건물을 선택하세요.');
        return false;
    }else{
        if(bldgView.items[bldgView._idx] == undefined){
            alert("계약서를 출력할 건물을 선택하시기 바랍니다.");
            return false;
        }
        bldgCd = bldgView.items[bldgView._idx].bldgCd;
        

    }
	var win = window.open("/object/contract?bldgCd="+bldgCd, "pop", "with=1000,height=600");
}

function dupBuildingCheck(type){
    var form;
    if(type=="new"){
        form = newBuildingForm;
    }else if(type == 'modify'){
        form = modifyBuildingForm;
    }
    if(form.areaCd.value == "" ){
        alert("지역검색을 먼저 하시기 바랍니다.");
        return false;
    }else if(form.zone.value == "" ){
        alert("구역을 입력 하시기 바랍니다.");
        return false;
    }else if(form.dtlAddr.value == "" ){
        alert("상세주소를 입력 하시기 바랍니다.");
        return false;
    }
    var params = {
            areaCd : form.areaCd.value,
            zone : form.zone.value,
            dtlAddr : form.dtlAddr.value
    	}
    	$.ajax({
            url : "/object/dupCheckBuilding",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            data : params,
            success : function(result) {
        	    if(result == "true"){
                    alert("이미 존재하는 주소입니다.");
                    dupCheck = false;
                    return false;
                }else{
                    alert("등록 가능합니다.");
                    dupCheck = true;
                }
            },
            error : function(request,status,error) {
             	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
}

function addBuilding(){
    if(buildingValidation('new')){
        var form = newBuildingForm;
        var detailParams = [];
        //그리드 데이터 사전 체크
        for(var i=0 ; i < bldgDetailView.items.length ; i++){
            if(bldgDetailView.items[i].dongNum == "" || bldgDetailView.items[i].dongNum == undefined){
                alert("상세정보 " + (i+1) + "행 동번호를 입력하시기 바랍니다.");
                return false;
            }else if(bldgDetailView.items[i].cleanCnt == "" || bldgDetailView.items[i].cleanCnt == undefined){
                alert("상세정보 " + (i+1) + "행 청소횟수를 입력하시기 바랍니다.");
                return false;
            }else if(bldgDetailView.items[i].fromDt == "" || bldgDetailView.items[i].fromDt == undefined){
                alert("상세정보 " + (i+1) + "행 시작일을 지정하시기 바랍니다.");
                return false;
            }else if(bldgDetailView.items[i].toDt == "" || bldgDetailView.items[i].toDt == undefined){
                alert("상세정보 " + (i+1) + "행 종료일을 지정하시기 바랍니다.");
                return false;
            }else{
                detailParams.push(bldgDetailView.items[i]);
            }
        }
            var params = {
            clientNm    : form.clientNm.value,
            areaCd      : form.areaCd.value,
            areaNm      : form.areaNm.value,
            zone        : form.zone.value,
            bldgCd      : form.bldgCd.value,
            bldgNm      : form.bldgNm.value,
            dtlAddr     : form.dtlAddr.value,
            pnum        : form.pnum.value,
            activeYn    : 'Y',
            conCost     : form.conCost.value.split(",").join(""),
            surtax      : form.surtax.value,
            surtaxYn    : form.surtaxYn.value,
            memo        : form.memo.value,
            clientNm    : form.clientNm.value,
            conFromDt   : form.conFromDt.value,
            conToDt     : form.conToDt.value
        }
        // 기본정보 저장
        $.ajax({
            url : "/object/addBuildingBas",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            data : params,
            success : function(result) {
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
        //상세정보 저장
        $.ajax({
            url : "/object/addBuildingDetail",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            contentType: 'application/json',
            data: JSON.stringify(detailParams),
            success : function(result) {
                    alert("등록되었습니다.");
                    dupCheck = false;
                    maxBldgCd ++;
                    bldgDetailGrid.allowAddNew = false;
                    bldgDetailView.items.clear;
                    getBuildingInfo();
                    closePop();
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });
    }
}

function buildingValidation(type){
    var form;
    var grid;
    var view;
    if(type=="new"){
        form = newBuildingForm;
        grid = bldgDetailGrid;
        view = bldgDetailView;
    }else if(type=="modify"){
        form = modifyBuildingForm; 
        grid = modifyDetailGrid;
        view = modifyDetailView;
    }
    if(!dupCheck){
        alert("중복체크를 먼저 하시기 바랍니다.");
        return false;
    }
    if(form.clientNm.value == ""){
        alert("고객명을 하시기 바랍니다.");
        return false;
    }else if(form.areaCd.value == ""){
        alert("주소 검색을 하시기 바랍니다.");
        return false;
    }else if(form.zone.value == ""){
        alert("구역을 입력 하시기 바랍니다.");
        return false;
    }else if(form.dtlAddr.value == ""){
        alert("상세주소를 입력 하시기 바랍니다.");
        return false;
    }else if(form.bldgNm.value == ""){
        alert("건물명을 입력하시기 바랍니다.");
        return false;
    }else if(view.items.length == 0){
        alert("세부정보를 입력하시기 바랍니다.");
        return false;
    }else if(form.conFromDt.value == ""){
        alert("계약시작일을 입력하시기 바랍니다.");
        return false;
    }else if(form.conToDt.value == ""){
        alert("계약종료일을 입력하시기 바랍니다.");
        return false;
    }else if(form.conCost.value == ""){
        alert("계약금액을 입력하시기 바랍니다.");
        return false;
    }else if(form.surtaxYn.value == ""){
        alert("부가세여부를 선택하시기 바랍니다.");
        return false;
    }else if(form.surtaxYn.value == "N" && form.surtax.value == ""){
        alert("부가세 금액을 입력하시기 바랍니다.")    ;
        return false;
    }else{
        return true;
    }
}

function dupChceckFalse(){
    dupCheck = false;
}

function addDetailInfo(type){
    var grid;
    if(type == 'new'){
        grid = bldgDetailGrid;
    }else if(type == 'modify'){
        grid = modifyDetailGrid;
    }
    grid.allowAddNew = true;
    grid.allowDelete = true;
}

function deleteRow(type){
    if(type== 'new'){
        if(bldgDetailView.items.length == 0){
            bldgDetailGrid.allowAddNew = false;
        }else{
            bldgDetailView.removeAt(bldgDetailView._idx);
        }
    }else if(type == 'modify'){
        if(modifyDetailView.items.length == 0){
            modifyDetailGrid.allowAddNew = false;
        }else{
            modifyDetailView.removeAt(modifyDetailView._idx);
        }
    }
}

function closePop(){
	$('.popup').removeClass('is-visible');
}
function getBuildingInfo(){
    $.ajax({
        url : "/object/getBuildingInfo",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        success : function(result) {
            $("#totalBldgCnt").text(result.bas_cnt.toLocaleString('ko-KR') + "개");
            $("#totalBldgDongCnt").text(result.dtl_cnt.toLocaleString('ko-KR') + "개");
            
        },
        error : function(request,status,error) {
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });

}

function deleteBuilding(){
    if(confirm("삭제하시겠습니까?")){
        var params = {
            bldgCd : modifyBuildingForm.bldgCd.value
        }

        $.ajax({
            url : "/object/deleteBuilding",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            data: params,
            success : function(result) {
                alert("삭제되었습니다.");
                getBuildingInfo();
                closePop();
                getBuildingList();
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
        });

    }
}

function modifyBuilding(){
    if(confirm("수정하시겠습니까?")){
        if(buildingValidation('modify')){
            var form = modifyBuildingForm;
            var detailParams = [];
            var editItem = modifyDetailView.itemsEdited;
            var addItem  = modifyDetailView.itemsAdded;
            var delItem = modifyDetailView.itemsRemoved;
            var rows = [];
            var delRows = [];
            for(var i =0; i< editItem.length ; i++){
                rows.push(editItem[i]);
            }
            for(var i=0; i< addItem.length; i++){
                rows.push(addItem[i]);
            }
            for(var i=0 ; i<delItem.length; i++){
                delRows.push(delItem[i]);
            }

            if(delRows.length > 0){
                $.ajax({
                    url : "/object/deleteBuildingDetail",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(delRows),
                    success : function(result) {
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
            }
            //그리드 데이터 사전 체크
            for(var i=0 ; i < rows.length ; i++){
                if(rows[i].dongNum == "" || rows[i].dongNum == undefined){
                    alert("상세정보 " + (i+1) + "행 동번호를 입력하시기 바랍니다.");
                    return false;
                }else if(rows[i].cleanCnt == "" || rows[i].cleanCnt == undefined){
                    alert("상세정보 " + (i+1) + "행 청소횟수를 입력하시기 바랍니다.");
                    return false;
                }else if(rows[i].fromDt == "" || rows[i].fromDt == undefined){
                    alert("상세정보 " + (i+1) + "행 시작일을 지정하시기 바랍니다.");
                    return false;
                }else if(rows[i].toDt == "" || rows[i].toDt == undefined){
                    alert("상세정보 " + (i+1) + "행 종료일을 지정하시기 바랍니다.");
                    return false;
                }
            }
             var params = {
                clientNm    : form.clientNm.value,
                areaCd      : form.areaCd.value,
                areaNm      : form.areaNm.value,
                zone        : form.zone.value,
                bldgCd      : form.bldgCd.value,
                bldgNm      : form.bldgNm.value,
                dtlAddr     : form.dtlAddr.value,
                pnum        : form.pnum.value,
                activeYn    : form.activeYn.checked == true? 'Y' : 'N',
                conCost     : form.conCost.value.split(",").join(""),
                surtax      : form.surtax.value == '' ? 0 :form.surtax.value.split(",").join(""),
                surtaxYn    : form.surtaxYn.value,
                memo        : form.memo.value,
                clientNm    : form.clientNm.value,
                conFromDt   : form.conFromDt.value,
                conToDt     : form.conToDt.value
            }
            // 기본정보 저장
            $.ajax({
                url : "/object/modifyBuilding",
                async : false, // 비동기모드 : true, 동기식모드 : false
                type : 'POST',
                data : params,
                success : function(result) {
                },
                error : function(request,status,error) {
                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                }
            });

            if(delRows.length > 0){
                $.ajax({
                    url : "/object/deleteBuildingDetail",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(delRows),
                    success : function(result) {
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
            }
            if(rows.length > 0){
                //상세정보 저장
                $.ajax({
                    url : "/object/modifyBuildingDetail",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(rows),
                    success : function(result) {
                            
                    },
                    error : function(request,status,error) {
                        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                    }
                });
            }
            alert("수정되었습니다.");
            dupCheck = false;
            modifyDetailGrid.allowAddNew = false;
            modifyDetailView.items.clear;
            getBuildingInfo();
            closePop();
            getBuildingList();
        }
    }
}
// 이벤트 처리 
$(function(){
    $("[name=surtaxYn]").change(function(){
        if(this.value == "N"){
            $("[name=tax]").show();
        }else{
            $("[name=tax]").hide();
            $("[name=surtax]").val("");
        }
    });
});
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
                        <dd id="totalBldgCnt">00명</dd>
                    </dl>
                    <dl>
                        <dt>전체 단지수</dt>
                        <dd id="totalBldgDongCnt">00개</dd>
                    </dl>
                    <!-- 클릭시 건물추가 팝업창 띄움 -->
                    <a href="javascript:void(0);" onclick="showPop('new_building');">건물추가</a>
                </div>
                <div class="admin_utility">
                    <div class="admin_btn">
                        <button class="btn" onClick="popContract()">계약서 출력</button>
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
                            <button type="button" id="search" onClick="getBuildingList();">조회</button>
                        </form>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                        <div class="btn_wrap">
                            <button type="button" class="stroke" onClick="_getUserGridLayout('bldgLayout', bldgGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('bldgLayout', bldgGrid,bldgColumns);">칼럼초기화</button>
                            <button type="button" onClick="popBuildingQrList();">QR출력</button>
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
                            <button type="button" class="stroke" onClick="_getUserGridLayout('bldgLayout', bldgGrid);">칼럼위치저장</button>
                            <button type="button" class="stroke" onClick="_resetUserGridLayout('bldgLayout', bldgGrid,bldgColumns);">칼럼초기화</button>
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
    <div class="popup" id="new_building" >
        <div class="popup_container" style="max-height: calc(100% - 10px);">
            <div class="popup_head">
                <p class="popup_title">건물추가</p>
                <button type="button" class="popup_close" onClick="closePop();">>x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="newBuildingForm">
                    <div class="row">
                        <label for="clientNm">고객명<i>*</i></label>
                        <input type="text" id="clientNm" name="clientNm" required>
                    </div>
                    <div class="row">
                        <label for="areaNm">지역<i>*</i></label>
                        <input type="text" id="areaNm" name="areaNm" required readonly>
                        <button type="button" class="popup_btn att" onClick="findAddr();">검색</button>
                    </div>
                    <div class="row" style="display:none">
                        <label for="areaCd">지역코드<i>*</i></label>
                        <input type="text" id="areaCd" name="areaCd" required>
                    </div>
                    <div class="row">
                        <label for="zone">구역<i>*</i></label>
                        <input type="text" id="zone" name="zone" required>
                    </div>
                    <div class="row">
                        <label for="dtlAddr">상세주소<i>*</i></label>
                        <input type="text" id="dtlAddr" name="dtlAddr" required onChange="dupChceckFalse();">
                        <button type="button" class="popup_btn att" onClick="dupBuildingCheck('new');">중복확인</button>
                    </div>
                    <div class="row">
                        <label for="bldgNm">건물명<i>*</i></label>
                        <input type="text" id="bldgNm" name="bldgNm" required>
                    </div>
                    <div class="row">
                        <label for="bldgCd">건물번호<i>*</i></label>
                        <input type="text" id="bldgCd" name="bldgCd" onfocus="this.blur()" readonly>
                    </div>
                    <div class="row">
                        <label for="pnum">전화번호<i>*</i></label>
                        <input type="text" id="pnum" maxlength=11 name="pnum"  placeholder="숫자만 입력하세요" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                    </div>
                    <div class="row" style= "display: flex;">
                        <label for="codeNum">상세정보<i>*</i></label>
                        <div id="bldgDetailGrid"  style="height:120px; width:600px;"></div>
                        <div colspan="2">
                            <button type="button" style="width:80px; height:60px;"class="stroke" onClick="addDetailInfo('new');">추가</button><br>
                            <button type="button" style="width:80px; height:60px;"class="stroke" onClick="deleteRow('new');">삭제</button>
                        </div>
                    </div>
                    <div class="row">
                        <label for="contDate">계약기간<i>*</i></label>
                        <input type="date" id="conFromDt" name="conFromDt" required>
                        <input type="date" id="conToDt" name="conToDt" required>
                    </div>
                    <div class="row">
                        <label for="conCost">계약금액<i>*</i></label>
                        <input type="text" id="conCost" name="conCost" required placeholder="숫자만 입력하세요" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"> 
                    </div>
                    <div class="row">
                        <label for="surtaxYn">부가세 여부<i>*</i></label>
                        <select name="surtaxYn" id="surtaxYn">
                                <option value="" selected="selected">선택</option>
                                <option value="Y">포함</option>
                                <option value="N">불포함</option>
                        </select>
                    </div>
                    <div class="row"id="tax" style="display:none;">
                            <label for="surtax">부가세 금액<i>*</i></label>
                            <input type="text" name="surtax" id="surtax" required placeholder="숫자만 입력하세요" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');">
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn confirm" onClick="addBuilding();">생성</button>
                </div>
            </div>
        </div>
    </div>
    <!--건물추가 팝업 영역 끝-->
    <!-- 팝업 : 정보수정 -->
    <div class="popup" id="modify_building" >
        <div class="popup_container" style="max-height: calc(100% - 10px);" > 
            <div class="popup_head">
                <p class="popup_title">정보수정</p>
                <button type="button" class="popup_close" onClick = "closePop();">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="modifyBuildingForm" method="post">
                    <div class="row">
                        <label for="activeYn">활성화</label>
                        <input type="checkbox" id="activeYn" name="activeYn">체크 시, 활성화
                    </div>
                    <div class="row">
                        <label for="clientNm">고객명<i>*</i></label>
                        <input type="text" id="clientNm" name="clientNm" required>
                    </div>
                    <div class="row">
                        <label for="areaNm">지역<i>*</i></label>
                        <input type="text" id="areaNm" name="areaNm" required readonly>
                        <button type="button" class="popup_btn att" onClick="findAddr();">검색</button>
                    </div>
                    <div class="row" style="display:none">
                        <label for="areaCd">지역코드<i>*</i></label>
                        <input type="text" id="areaCd" name="areaCd" required>
                    </div>
                    <div class="row">
                        <label for="zone">구역<i>*</i></label>
                        <input type="text" id="zone" name="zone" required>
                    </div>
                    <div class="row">
                        <label for="dtlAddr">상세주소<i>*</i></label>
                        <input type="text" id="dtlAddr" name="dtlAddr" required onChange="dupChceckFalse();">
                        <button type="button" class="popup_btn att" onClick="dupBuildingCheck('modify');">중복확인</button>
                    </div>
                    <div class="row">
                        <label for="bldgNm">건물명<i>*</i></label>
                        <input type="text" id="bldgNm" name="bldgNm" required>
                    </div>
                    <div class="row">
                        <label for="bldgCd">건물번호<i>*</i></label>
                        <input type="text" id="bldgCd" name="bldgCd" onfocus="this.blur()" readonly>
                    </div>
                    <div class="row">
                        <label for="pnum">전화번호<i>*</i></label>
                        <input type="text" id="pnum" maxlength="11" name="pnum"  placeholder="숫자만 입력하세요" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                    </div>
                    <div class="row" style= "display: flex;">
                        <label for="codeNum">상세정보<i>*</i></label>
                        <div id="modifyDetailGrid"  style="height:120px; width:600px;"></div>
                        <div colspan="2">
                            <button type="button" style="width:80px; height:60px;"class="stroke" onClick="addDetailInfo('modify');">추가</button><br>
                            <button type="button" style="width:80px; height:60px;"class="stroke" onClick="deleteRow('modify');">삭제</button>
                        </div>
                    </div>
                    <div class="row">
                        <label for="contDate">계약기간<i>*</i></label>
                        <input type="date" id="conFromDt" name="conFromDt" required>
                        <input type="date" id="conToDt" name="conToDt" required>
                    </div>
                    <div class="row">
                        <label for="conCost">계약금액<i>*</i></label>
                        <input type="text" id="conCost" name="conCost" required placeholder="숫자만 입력하세요" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');"> 
                    </div>
                    <div class="row">
                        <label for="surtaxYn">부가세 여부<i>*</i></label>
                        <select name="surtaxYn" id="surtaxYn">
                                <option value="" selected="selected">선택</option>
                                <option value="Y">포함</option>
                                <option value="N">불포함</option>
                        </select>
                    </div>
                    <div class="row"id="tax" name="tax" style="display:none;">
                            <label for="surtax">부가세 금액<i>*</i></label>
                            <input type="text" name="surtax" id="surtax" required placeholder="숫자만 입력하세요" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');">
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn stroke" onClick="modifyBuilding();">수정</button>
                    <button type="button" class="popup_btn fill" onClick="deleteBuilding();">삭제</button>
                </div>
            </div>
        </div>
    </div>
    <!--정보수정 팝업 영역 끝-->
</body>
</html>