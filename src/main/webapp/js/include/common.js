/*
 *  공통 javaScript
 */

function logOut() {
    if (confirm("로그아웃 하시겠습니까??") == true) {
        location.href = "/login/logout";
    }
}