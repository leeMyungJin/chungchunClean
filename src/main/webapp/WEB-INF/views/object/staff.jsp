<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">

var staffView;
var staffGridPager;
var staffGrid;
var dupCheckIdFlag = false;

//onload
function pageLoad(){
	$('#object').addClass("current");
	$('#staff').addClass("current");
	
	loadGridStaffList('init');
}

//그리드 초기 셋팅
function loadGridStaffList(type, result){
	  if(type == "init"){
		    //페이지당 6개의 데이터 항목이 포함된 CollectionView 페이지 생성
		   staffView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		    
		// 페이지 이동
		   staffGridPager = new wijmo.input.CollectionViewNavigator('#staffGridPager', {
		        byPage: true,
		        headerFormat: '{currentPage:n0} / {pageCount:n0}',
		        cv: staffView
		    });
		  
		// hostElement에 Wijmo의 FlexGird 생성
			  // itemsSource: data - CollectionView로 데이터를 그리드에 바인딩
			  // autoGenerateColumns: false >> 컬럼 사용자 정의 
		   staffGrid = new wijmo.grid.FlexGrid('#staffGrid', {
			    autoGenerateColumns: false,
			    alternatingRowStep: 0,
			    columns: [
			      { binding: 'staffName', header: '이름', isReadOnly: true, width: 100, align:"center" },
			      { binding: 'staffId', header: 'ID', isReadOnly: true, width: 100, align:"center"  },
			      { binding: 'adminYn', header: '관리자', isReadOnly: true, width: 60, align:"center" },
			      { binding: 'activeYn', header: '활성화', isReadOnly: true, width: 60, align:"center"  },
			      { binding: 'staffPnum', header: '전화번호', isReadOnly: true, width: 120, align:"center"  },
			      { binding: 'staffEmail', header: '이메일', isReadOnly: true, width: 200, align:"center"  },
			      { binding: 'memo', header: '메모', isReadOnly: true, width: '*', align:"center" },
			      { binding: 'lateassDt', header: '최근접속일', isReadOnly: true, width: 100 , align:"center" },
			      { binding: 'cretDt', header: '계정생성일', isReadOnly: true, width: 100 , align:"center" },
			      { binding: 'edit', header: '정보수정', width: 100, align:"center",
			    	  cellTemplate: wijmo.grid.cellmaker.CellMaker.makeButton({
			              text: '<b>수정</b>',
			              click: (e, ctx) => {
			            	  showPop('modify_staff');
			              }
			              
			    	  })
			      }
			    ],
			    itemsSource: staffView
			  });
			  
	  }else{
		  
		  console.log(result);
		  
		   staffView = new wijmo.collections.CollectionView(result, {
		       pageSize: 100
		   });
		  staffGridPager.cv = staffView;
		  staffGrid.itemsSource = staffView;
	//	  wijmo.Control.getControl("#staffGrid").itemsSource.refresh(true);
	//	  wijmo.input.CollectionViewNavigator('#staffGridPager').itemsSource.refresh(true);
	  }
	  
}

//스테프 리스트 조회
function getStaffList(){
	var param = {
		con 	: $('#con').val()
		, inq 	: $('#inq').val()
	};
	
	$.ajax({
        type : 'POST',
        url : '/object/getStaffList',
        dataType : null,
        data : param,
        success : function(result) {
        	console.log("getStaffList success");
        	loadGridStaffList('search', result);
        },
        error: function(request, status, error) {
        	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);

        }
    }); 
}

//팝업 오픈
function showPop(pop){
	if(pop == "new_staff"){
		dupCheckIdFlag = false;
		
		newStaffForm.id.value = "";
		newStaffForm.password.value = "";
		newStaffForm.name.value = "";
		newStaffForm.telPhone.value = "";
		newStaffForm.mail.value = "";
		newStaffForm.memo.value = "";
		
	}else if(pop == "modify_staff"){
		
		updateStaffForm.active.checked = (staffGrid.collectionView.currentItem["activeYn"] == 'Y' ? true : false );
		updateStaffForm.admin.checked = (staffGrid.collectionView.currentItem["adminYn"] == 'Y' ? true : false );
		updateStaffForm.id.value = staffGrid.collectionView.currentItem["staffId"];
		updateStaffForm.password.value = "";
		updateStaffForm.name.value = staffGrid.collectionView.currentItem["staffName"];
		updateStaffForm.telPhone.value = staffGrid.collectionView.currentItem["staffPnum"];
		updateStaffForm.mail.value = staffGrid.collectionView.currentItem["staffEmail"];
		updateStaffForm.memo.value = staffGrid.collectionView.currentItem["memo"];
		
	}
	
	$('#'+pop).addClass('is-visible');
}

//팝업 종료
function closePop(){
	$('.popup').removeClass('is-visible');
}

//직원추가 
function saveNewStaff(){
	//필수값 체크
	if(newStaffForm.id.value == ""){
        alert("ID를 입력해주세요.");
        newStaffForm.id.focus();
        return false;
        
    }else if(newStaffForm.password.value == ""){
    	alert("PW를 입력해주세요.");
        newStaffForm.password.focus();
        return false;
        
    }else if(newStaffForm.name.value == ""){
    	alert("이름을 입력해주세요.");
        newStaffForm.name.focus();
        return false;
        
    }else if(newStaffForm.telPhone.value == ""){
    	alert("전화번호를 입력해주세요.");
        newStaffForm.telPhone.focus();
        return false;
        
    }else if(newStaffForm.mail.value == ""){
    	alert("이메일을 입력해주세요.");
        newStaffForm.mail.focus();
        return false;
    }
	
	//벨리데이션 체크 
	var pwdRule1  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    var pwdRule2  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
    var pwdRule3  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var telRule   = /^[0-9]{11}$/;
    
    if(!pwdRule1.test(newStaffForm.password.value) && !pwdRule2.test(newStaffForm.password.value) && !pwdRule3.test(newStaffForm.password.value)){
    	alert("비밀번호를 확인하시기 바랍니다.\n비밀번호는 영문자(대,소문자), 숫자를 포함하여 최소 10자 이상이어야 합니다.");
    	newStaffForm.password.focus();
    	return false;
    }else if(!emailRule.test(newStaffForm.mail.value)){ //이메일
    	alert("이메일을 확인하시기 바랍니다.");
    	newStaffForm.mail.focus();
        return false;
    }else if(!telRule.test(newStaffForm.telPhone.value)){  // 전화번호
    	alert("전화번호를 올바르게 입력하시기 바랍니다. \n전화번호는 '-'없이 숫자 11자리이어야 합니다.' \n예)01012341234");
    	newStaffForm.telPhone.focus();
        return false;
    }
    
    //중복확인 
    if(!dupCheckIdFlag){
    	alert('중복확인을 해주세요.');
    	return false;
    	
    }else{
    	var params = {
    		id 		:	newStaffForm.id.value
    		,password:	newStaffForm.password.value
    		,name	:	newStaffForm.name.value
    		,telPhone:	newStaffForm.telPhone.value
    		,mail	:	newStaffForm.mail.value
    		,memo	:	newStaffForm.memo.value
    	}
    	
    	$.ajax({
            url : "/object/saveNewStaff",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : 'text',
            data : params,
            success : function(data) {
                alert("직원 생성이 완료되었습니다.");
                closePop();
                getStaffList();
            },
            error : function(request,status,error) {
             	alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
          });
    }
}

// 아이디 중복확인 dupCheckIdFlag
function dupCheckId(){
	
	console.log(newStaffForm.id.value);
	
	if(newStaffForm.id.value == ""){
      alert("아이디를 입력하세요.");
      return false;
    }
	
	var param = {
			id : newStaffForm.id.value
	}
	
	$.ajax({
        url : "/object/dupCheckId",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'text',
        data : param,
        success : function(data) {
            if(data != ""){
              alert('이미 존재하는 아이디입니다.');
              dupCheckIdFlag = false;
            }else{
              alert('사용가능한 아이디입니다.');
              dupCheckIdFlag = true;
            }
        },
        error : function(request,status,error) {
         alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
      });
}

function deleteStaff(){
	if(confirm("삭제하시겠습니까?")){
		var params = {
          	id : updateStaffForm.id.value
      	};
		
		$.ajax({
            url : '/object/deleteStaff',
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : null,
            data : params,
            success : function(data) {
            	alert('정상적으로 삭제되었습니다.');
            	closePop();
            	getStaffList();
            },
            error : function(request,status,error) {
              alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
      });
	}
}

function updateStaff(){
	//필수값 체크
	if(updateStaffForm.name.value == ""){
    	alert("이름을 입력해주세요.");
    	updateStaffForm.name.focus();
        return false;
        
    }else if(updateStaffForm.telPhone.value == ""){
    	alert("전화번호를 입력해주세요.");
    	updateStaffForm.telPhone.focus();
        return false;
        
    }
	
	//벨리데이션 체크 
	var pwdRule1  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;
    var pwdRule2  = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
    var pwdRule3  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var telRule   = /^[0-9]{11}$/;
    
    if(updateStaffForm.password.value != '' && !pwdRule1.test(updateStaffForm.password.value) && !pwdRule2.test(updateStaffForm.password.value) && !pwdRule3.test(updateStaffForm.password.value)){
    	alert("비밀번호를 확인하시기 바랍니다.\n비밀번호는 영문자(대,소문자), 숫자를 포함하여 최소 10자 이상이어야 합니다.");
    	updateStaffForm.password.focus();
    	return false;
    }else if(!emailRule.test(updateStaffForm.mail.value)){ //이메일
    	alert("이메일을 확인하시기 바랍니다.");
    	updateStaffForm.mail.focus();
        return false;
    }else if(!telRule.test(updateStaffForm.telPhone.value)){  // 전화번호
    	alert("전화번호를 올바르게 입력하시기 바랍니다. \n전화번호는 '-'없이 숫자 11자리이어야 합니다.' \n예)01012341234");
    	updateStaffForm.telPhone.focus();
        return false;
    }
    
    var params = {
   		active 		: (updateStaffForm.active.checked ? 'Y' : 'N' )
       	, admin 	: (updateStaffForm.admin.checked ? 'Y' : 'N' )
       	, id 		: updateStaffForm.id.value
       	, password 	: updateStaffForm.password.value
       	, name 		: updateStaffForm.name.value
       	, telPhone 	: updateStaffForm.telPhone.value	
       	, mail 		: updateStaffForm.mail.value	
       	, memo 		: updateStaffForm.memo.value	
    }
    
    $.ajax({
        url : "/object/updateStaff",
        async : false, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'text',
        data : params,
        success : function(data) {
        	alert('정상적으로 수정되었습니다.');
        	closePop();
        	getStaffList();
        },
        error : function(request,status,error) {
         alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
      });
}

function exportExcel(){
	
	var gridView = staffGrid.collectionView;
	var oldPgSize = gridView.pageSize;
	var oldPgIndex = gridView.pageIndex;

    //전체 데이터를 엑셀다운받기 위해서는 페이징 제거 > 엑셀 다운 > 페이징 재적용 하여야 함.
    staffGrid.beginUpdate();
    staffView.pageSize = 0;

    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(staffGrid, {includeCellStyles: true, includeColumnHeaders: true}, 'StaffList.xlsx',
	      saved => {
	    	gridView.pageSize = oldPgSize;
	    	gridView.moveToPage(oldPgIndex);
	    	staffGrid.endUpdate();
	      }, null
	 );
}

</script>

<body onload="pageLoad();">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        

        <div class="admin_container">
            <section class="admin_section">
                <h2 class="admin_title">직원관리</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>전체 직원수</dt>
                        <dd id="totalStaff"><%=request.getAttribute("totalStaff")%>명</dd>
                    </dl>
                    <dl>
                        <dt>관리자 수</dt>
                        <dd id="totalAdmin"><%=request.getAttribute("totalAdmin")%>명</dd>
                    </dl>
                    <!-- 클릭시 직원추가 팝업창 띄움 -->
                    <a href="javascript:void(0);" onclick="showPop('new_staff');">직원추가</a>
                </div>
                <div class="admin_utility">
                    <div class="admin_btn">
                        <button class="btn" onClick="exportExcel();">엑셀 다운로드</button>
                    </div>
                </div>
                <div class="admin_content">
                    <!-- 필터 영역 admin_filter-->
                    <div class="admin_filter">
                        <form action="#" id="search_form" name="search_form">
                            <label for="con">검색조건</label>
                            <select name="con" id="con">
                                <option value="all" selected="selected">전체</option>
                                <option value="name">이름</option>
                                <option value="id">ID</option>
                                <option value="mail">이메일</option>
                            </select>
                            <label for="inq"></label>
                            <input type="text" id="inq" placeholder=",로 다중검색 가능">
                            <button type="button" onClick="getStaffList();">조회</button>
                        </form>
                    </div>
                    <!-- 보드 영역 admin_dashboard-->
                    <div class="admin_dashboard">
                        <div class="btn_wrap">
                            <button type="button" class="stroke">칼럼위치저장</button>
                            <button type="button" class="stroke">칼럼초기화</button>
                        </div>
                        <div class="grid_wrap" style="position:relative;">
                        <!--Grid 영역 -->
                        	<div id="staffGrid"  style="height:500px;"></div>
                        	<div id="staffGridPager"></div>
                        </div>
                        <div class="btn_wrap">
                            <button type="button" class="stroke">칼럼위치저장</button>
                            <button type="button" class="stroke">칼럼초기화</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    <!-- 팝업 -->
    <!-- 팝업 : 직원추가 -->
    <div class="popup" id="new_staff">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">직원추가</p>
                <button type="button" class="popup_close" onClick="closePop();">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="newStaffForm">
                    <div class="row">
                        <label for="id">ID<i>*</i></label>
                        <input type="text" id="id" name="id" required onchange="dupCheckIdFlag = false;">
                        <button type="button" class="popup_btn att" onClick="dupCheckId();">중복확인</button>
                    </div>
                    <div class="row">
                        <label for="password">PW<i>*</i></label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <div class="row">
                        <label for="name">이름<i>*</i></label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="row">
                        <label for="telPhone">전화번호<i>*</i></label>
                        <input type="text" id="telPhone" name="telPhone" required>
                    </div>
                    <div class="row">
                        <label for="mail">이메일<i>*</i></label>
                        <input type="text" id="mail" name="downPay" required>
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn confirm" onClick="saveNewStaff();">생성</button>
                </div>
            </div>
        </div>
    </div>
    <!-- 직원추가 팝업 영역 끝-->
    <!-- 팝업 : 직원 정보 수정 -->
    <div class="popup" id="modify_staff">
        <div class="popup_container">
            <div class="popup_head">
                <p class="popup_title">정보수정</p>
                <button type="button" class="popup_close" onClick="closePop()">x</button>
            </div>
            <div class="popup_inner">
                <dfn>필수항목 *</dfn>
                <form id="updateStaffForm">
                    <div class="row">
                        <label for="active">활성화</label>
                        <input type="checkbox" id="active" name="active">체크 시, 활성화
                    </div>
                    <div class="row">
                        <label for="admin">관리자</label>
                        <input type="checkbox" id="admin" name="admin">체크 시, 관리자모드 접속 가능
                    </div>
                    <div class="row">
                        <label for="id">ID</label>
                        <input type="text" id="id" name="id" readonly/>
                    </div>
                    <div class="row">
                        <label for="password">PW<i>*</i></label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <div class="row">
                        <label for="name">이름<i>*</i></label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="row">
                        <label for="telPhone">전화번호<i>*</i></label>
                        <input type="text" id="telPhone" name="telPhone" required>
                    </div>
                    <div class="row">
                        <label for="mail">이메일</label>
                        <input type="text" id="mail" name="downPay" required>
                    </div>
                    <div class="row">
                        <label for="memo" style="vertical-align:top;">메모</label>
                        <textarea name="memo" id="memo" cols="30" rows="10"></textarea>
                    </div>
                </form>
                <div class="popup_btn_area">
                    <button type="button" class="popup_btn stroke" onClick="updateStaff();">수정</button>
                    <button type="button" class="popup_btn fill" onClick="deleteStaff();">삭제</button>
                </div>
            </div>
        </div>
    </div>
        <!--정보수정 팝업 영역 끝-->
    </div>
</body>
</html>