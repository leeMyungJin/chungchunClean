/*
 *  공통 javaScript
 */

//import { QrCode } from 'wijmo.barcode.common';

function _logOut() {
    if (confirm("로그아웃 하시겠습니까??") == true) {
        location.href = "/login/logout";
    }
}

//그리드 레이아웃 저장
function _getUserGridLayout(layoutId, grid) {
    localStorage.setItem(layoutId, grid.columnLayout);
    alert("컬럼위치를 저장하였습니다.");
}

//그리드 레이아웃 복원
function _setUserGridLayout(layoutId, grid, initColumns) {
    /*  // 주석 소스처럼 진행하여도 컬럼위치는 복원되나, cellTemplate 설정이 저장되지않음. 
    	var layout = localStorage.getItem(layoutId);
        if (layout) {
        	grid.columnLayout = layout;
        }
    */

    if (window.localStorage[layoutId]) {
        let columnsArr = JSON.parse(window.localStorage[layoutId]).columns;

        grid.columns.clear();
        columnsArr.forEach((col) => {
            initColumns.forEach((col2) => {
                if (col.binding == col2.binding) {
                    grid.columns.push(new wijmo.grid.Column(col2));
                }
            });
        });
    }
}

//그리드 초기 레이아웃 복원
function _resetUserGridLayout(layoutId, grid, initColumns) {

    grid.columns.clear();
    initColumns.forEach((col) => {
        grid.columns.push(new wijmo.grid.Column(col));
    });

    localStorage.setItem(layoutId, grid.columnLayout);
    alert("컬컴위치를 초기화하였습니다.");
    _setUserGridLayout(layoutId, grid, initColumns);
}

function _fnisMonth(vMonth, id) {
	var vValue = vMonth;
    var vValue_Num = vValue.replace(/[^0-9]/g, ""); //숫자를 제외한 나머지는 예외처리
    var curtDate = new Date();
    var flag = true;

    if (_fnToNull(vValue_Num) == "") {
        alert("날짜를 입력 해 주세요.");
        flag = false;
    }

    //8자리가 아닌 경우 false
    if (vValue_Num.length != 6) {
        alert("날짜를 2020. 01 형식으로 입력 해 주세요.");
        flag = false;
    }

    //6자리의 yyyymm를 원본 , 4자리 , 2자리로 변경해 주기 위한 패턴생성
    var rxDatePattern = /^(\d{4})(\d{1,2})$/;
    var dtArray = vValue_Num.match(rxDatePattern);

    if (dtArray == null) {
        flag = false;
    }

    //0번째는 원본 , 1번째는 yyyy(년) , 2번재는 mm(월)
    dtYear = dtArray[1];
    dtMonth = dtArray[2];
    
    //yyyymm 체크
    if (dtMonth < 1 || dtMonth > 12) {
        alert("존재하지 않은 월을 입력하셨습니다. \n다시 한번 확인 해주세요");
        flag = false;
    }

    //미래날짜 체크 
    var curtYYYYMM = curtDate.getFullYear() +''+ ( curtDate.getMonth() + 1 <= 9 ? '0' + (curtDate.getMonth() + 1) : (curtDate.getMonth() + 1));
    console.log(vValue_Num);
    console.log(curtYYYYMM);
    console.log(vValue > curtYYYYMM);
    if (vValue_Num > curtYYYYMM) {
        alert("미래월을 입력하셨습니다. \n미래월은 조회가 불가능합니다.");
        flag = false;
    }

    if (flag) {
        return true;

    } else {
        $('#' + id).val(curtYYYYMM);
        return false;
    }
}

function _fnisDate(vDate, id) {
    var vValue = vDate;
    var vValue_Num = vValue.replace(/[^0-9]/g, ""); //숫자를 제외한 나머지는 예외처리
    var curtDate = new Date();
    var flag = true;

    if (_fnToNull(vValue_Num) == "") {
        alert("날짜를 입력 해 주세요.");
        flag = false;
    }

    //8자리가 아닌 경우 false
    if (vValue_Num.length != 8) {
        alert("날짜를 2020. 01. 01 형식으로 입력 해 주세요.");
        flag = false;
    }

    //8자리의 yyyymmdd를 원본 , 4자리 , 2자리 , 2자리로 변경해 주기 위한 패턴생성
    var rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/;
    var dtArray = vValue_Num.match(rxDatePattern);

    if (dtArray == null) {
        flag = false;
    }

    //0번째는 원본 , 1번째는 yyyy(년) , 2번재는 mm(월) , 3번재는 dd(일)
    dtYear = dtArray[1];
    dtMonth = dtArray[2];
    dtDay = dtArray[3];

    //yyyymmdd 체크
    if (dtMonth < 1 || dtMonth > 12) {
        alert("존재하지 않은 월을 입력하셨습니다. \n다시 한번 확인 해주세요");
        flag = false;
    } else if (dtDay < 1 || dtDay > 31) {
        alert("존재하지 않은 일을 입력하셨습니다. \n다시 한번 확인 해주세요");
        flag = false;
    } else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) {
        alert("존재하지 않은 일을 입력하셨습니다. \n다시 한번 확인 해주세요");
        flag = false;
    } else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap)) {
            alert("존재하지 않은 일을 입력하셨습니다. \n다시 한번 확인 해주세요");
            flag = false;
        }
    }

    //미래날짜 체크 
    var inputDate = new Date(vDate);
    curtDate.setDate(curtDate.getDate() + 1);
    if (curtDate < inputDate) {
        alert("미래일자를 입력하셨습니다. \n미래일자는 조회가 불가능합니다.");
        flag = false;
    }

    if (flag) {
        return true;

    } else {
        $('#' + id).val(_getFormatDate(curtDate));
        return false;
    }
}

//undefined 혹은 null일 경우 빈칸으로 넘기는 공통 함수
function _fnToNull(data) {
    // undifined나 null을 null string으로 변환하는 함수. 
    if (String(data) == 'undefined' || String(data) == 'null') {
        return ''
    } else {
        return data
    }
}

//미래일자 확인
//input : String (Ex. 2021-01-01)
function _chFutureDate(date) {
    var inputDate = new Date(date);
    var curtDate = new Date();

    curtDate.setDate(curtDate.getDate() + 1)
    if (curtDate < inputDate) {
        alert("미래일자를 입력하셨습니다. \n미래일자는 조회가 불가능합니다.");
        return false;
    }

    return true;
}

//날짜포맷 yyyy-MM-dd 변환
//input : date 포맷 
function _getFormatDate(date, type) {
	if(type == 'm'){
		var year = date.getFullYear();
	    var month = ("0" + (1 + date.getMonth())).slice(-2);

	    return year + "-" + month;
	}else{
		var year = date.getFullYear();
	    var month = ("0" + (1 + date.getMonth())).slice(-2);
	    var day = ("0" + date.getDate()).slice(-2);

	    return year + "-" + month + "-" + day;
	}
}

//페이지 클릭이벤트 
function clickPager(idx, grid, gridId) {
    grid.collectionView.moveToPage(idx - 1); // 그리드 0부터 시작
    refreshPaging(grid.collectionView.totalItemCount, idx, grid, gridId); // 그리드의 전체 아이템 수, 클릭한 인덱스 값 넘겨주기
}

//페이징 html 셋팅
function refreshPaging(totalData, currentPage, grid, gridId) {
    //페이지 사이즈
    const dataPerPage = grid.collectionView.pageSize; // 그리드의 한 페이지당 보여지는 행의 개수
    // 페이지 숫자 목록
    const pageCount = 5;
    //전체 페이지
    const totalPage = Math.ceil(totalData / dataPerPage);
    //페이지그룹 
    const pageGroup = Math.ceil(currentPage / pageCount);

    let last = pageGroup * pageCount; // 가장 마지막 인덱스

    if (last > totalPage) {
        last = totalPage;
    }

    let first = last - (pageCount - 1);

    const next = last + 1; // 다음
    var prev = first - 1; // 이전

    if (totalPage < 1) {
        first = last;
    }

    const pages = $('#' + gridId + 'Pager');
    pages.empty();

    // <<  < 
    pages.append('<span onClick="clickPager(1, ' + gridId + ', ' + "'" + gridId + "'" + ')" > << </span>');
    if (first > pageCount) {
        pages.append('<span onClick="clickPager(' + prev + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + '<' + ' </span>');
    } else {
        pages.append('<span onClick="clickPager(1, ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + '<' + ' </span>');
    }

    // 현재 페이지 인덱스 만큼 append
    for (let j = first; j <= last; j++) {
        if (currentPage === j) {
            pages.append('<span class="selectPage" id="' + gridId + 'paging_' + j + '" onClick="clickPager(' + j + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + j + ' </span>');

        } else if (j > 0) {
            pages.append('<span id="' + gridId + 'paging_' + j + '" onClick="clickPager(' + j + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > ' + j + ' </span>');

        }
    }

    // >  >>
    if (next > pageCount && next < totalPage) {
        pages.append('<span onClick="clickPager(' + next + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" >  ' + '>' + ' </span>');
    } else {
        pages.append('<span onClick="clickPager(' + totalPage + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" >  ' + '>' + ' </span>');
    }
    pages.append('<span onClick="clickPager(' + totalPage + ', ' + gridId + ', ' + "'" + gridId + "'" + ')" > >> </span>');


    $(".pager").removeClass('wj-control wj-content wj-pager wj-collectionview-navigator wj-state-empty wj-state-readonly');
}

/**
 *  0으로 채우기
 * @param  width  : 자릿수
 * @param  str    : 문자
 * @returns 
 */
function _fillZero(width, str) {
    return str.length >= width ? str : new Array(width - str.length + 1).join('0') + str;
}

function sessionCheck(staffId){
    if(staffId=="null"){
        alert("세션이 종료되어 로그인화면으로 이동합니다.");
        location.href = "/";
        return false;
        
    }else{
    	return true;
    	
    }
}

//엑셀 업로드
function bindImportedDataIntoModel() {
    const newData = (getImportedCVData());
    excelGrid.columns.clear();
    data = new wijmo.collections.CollectionView(newData);
    excelGrid.autoGenerateColumns = true;
    excelGrid.itemsSource = data;
}

function getImportedCVData() {
    const arr = [];
    let nullRow = true;
    for (let row = 0; row < excelGrid.rows.length; row++) {
        const item = {};
        for (let column = 0; column < excelGrid.columns.length; column++) {
            const cellValue = excelGrid.getCellData(row, column, false);
            //병합된 헤더 처리 
            // let header = grid.columns[column].header ? grid.columns[column].header : grid.columns[column - 1].header + '-2';
        // 만약 열 헤더가 있으면
            if (excelGrid.columns[column].header){
            var header =  excelGrid.columns[column].header
            } else{
    //           만약 열 헤더가 없으면 본래 병합된 값으로 판단
                for(var i = column-1; i >= 0; i--){
                    if (excelGrid.columns[i].header){
                        var header =  excelGrid.columns[i].header + " - "+column+" index"
                        break;
                    }
                }
            }
        var binding = _convertHeaderToBinding(header);
        item[binding] = cellValue;
        }
      arr.push(item);
    }
    return arr;
}

function _convertHeaderToBinding(header) {
    return header.replace(/\s/, '').toLowerCase();
}