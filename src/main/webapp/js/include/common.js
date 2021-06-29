/*
 *  공통 javaScript
 */

function _logOut() {
    if (confirm("로그아웃 하시겠습니까??") == true) {
        location.href = "/login/logout";
    }
}

//그리드 레이아웃 저장
function _getUserGridLayout(layoutId){
	localStorage.setItem(layoutId, staffGrid.columnLayout);
}

//그리드 레이아웃 복원
function _setUserGridLayout(layoutId){
	var layout = localStorage.getItem(layoutId);
    if (layout) {
    	staffGrid.columnLayout = layout;
    }
}

//그리드 초기 레이아웃 복원
function _resetUserGridLayout(initLayoutId, layoutId){
	var layout = localStorage.getItem(initLayoutId);
    if (layout) {
    	staffGrid.columnLayout = layout;
    }
    
    localStorage.setItem(layoutId, staffGrid.columnLayout);
}


function _fnisDate(vDate) {
	var vValue = vDate;
	var vValue_Num = vValue.replace(/[^0-9]/g, ""); //숫자를 제외한 나머지는 예외처리
	 
	if (_fnToNull(vValue_Num) == "") {
		alert("날짜를 입력 해 주세요.");
		return false;
	}

	//8자리가 아닌 경우 false
	if (vValue_Num.length != 8) {
		alert("날짜를 20200101 or 2020-01-01 형식으로 입력 해 주세요.");
		return false;
	}
	
    //8자리의 yyyymmdd를 원본 , 4자리 , 2자리 , 2자리로 변경해 주기 위한 패턴생성
	var rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/; 
	var dtArray = vValue_Num.match(rxDatePattern); 

	if (dtArray == null) {
		return false;
	}

	//0번째는 원본 , 1번째는 yyyy(년) , 2번재는 mm(월) , 3번재는 dd(일)
	dtYear = dtArray[1];
	dtMonth = dtArray[2];
	dtDay = dtArray[3];

	//yyyymmdd 체크
	if (dtMonth < 1 || dtMonth > 12) {
		alert("존재하지 않은 월을 입력하셨습니다. 다시 한번 확인 해주세요");
		return false;
	}
	else if (dtDay < 1 || dtDay > 31) {
		alert("존재하지 않은 일을 입력하셨습니다. 다시 한번 확인 해주세요");
		return false;
	}
	else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31) {
		alert("존재하지 않은 일을 입력하셨습니다. 다시 한번 확인 해주세요");
		return false;
	}
	else if (dtMonth == 2) {
		var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
		if (dtDay > 29 || (dtDay == 29 && !isleap)) {
			alert("존재하지 않은 일을 입력하셨습니다. 다시 한번 확인 해주세요");
			return false;
		}
	}

	return true;
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
function _chFutureDate(date){
	var inputDate = new Date(date);
	var curtDate = new Date();
	
	if(curtDate >= date){
		alert("미래일자를 입력하셨습니다. 미래일자는 조회가 불가능합니다.");
		return false;
	}
	
	return true; 
}

//날짜포맷 yyyy-MM-dd 변환
//input : date 포맷 
function _getFormatDate(date){
	var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}
