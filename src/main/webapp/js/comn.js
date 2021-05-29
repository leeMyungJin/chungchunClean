function numberComma(num) {
    if (num != null)
        return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else
        return '0';
}

function removeStatus(grid) {
    AUIGrid.removeSoftRows(grid); // 삭제 표시된 행(소프트 삭제) 그리드에서 제거
    AUIGrid.resetUpdatedItems(grid); // 현재 수정 정보 초기화    
}

function logOut() {
    if (confirm("로그아웃 하시겠습니까??") == true) {
        location.href = "/login/logout";
    }
}

// 로딩바
function loadingBarStart() {
    $('.loading_bar_wrap').addClass('active');
}

function loadingBarEnd() {
    $('.loading_bar_wrap').removeClass('active');
}