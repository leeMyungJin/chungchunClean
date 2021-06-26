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
			      { binding: 'staffName', header: '이름', isReadOnly: false, width: 100 },
			      { binding: 'staffId', header: 'ID', isReadOnly: false, width: 100  },
			      { binding: 'adminYn', header: '관리자여부', isReadOnly: false, width: 100 },
			      { binding: 'activeYn', header: '활성화', isReadOnly: false, width: 100  },
			      { binding: 'staffPnum', header: '전화번호', isReadOnly: false, width: 100  },
			      { binding: 'staffEmail', header: '이메일', isReadOnly: false, width: 100  },
			      { binding: 'memo', header: '메모', isReadOnly: false, width: 100  },
			      { binding: 'lateassDt', header: '최근접속일', isReadOnly: false, width: 100  },
			      { binding: 'cretDt', header: '계정생성일', isReadOnly: false, width: 100  },
			      { binding: 'edit', header: '정보수정', width: 100, 
			    	  cellTemplate: wijmo.grid.cellmaker.CellMaker.makeButton({
			              text: '<b>수정</b>',
			              click: (e, ctx) => alert('Clicked Button 수정')
			              
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
		
		$("#id").val("");
		$("#password").val("");
		$("#name").val("");
		$("#telPhone").val("");
		$("#mail").val("");
		$("#memo").val("");
		
		$('#'+pop).addClass('is-visible');
	}
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
    		id 		:	$("#id").val()
    		,password:	$("#password").val()
    		,name	:	$("#name").val()
    		,telPhone:	$("#telPhone").val()
    		,mail	:	$("#mail").val()
    		,memo	:	$("#memo").val()
    	}
    	
    	alert("??");
    	
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
                        <dd>00명</dd>
                    </dl>
                    <dl>
                        <dt>관리자 수</dt>
                        <dd>00명</dd>
                    </dl>
                    <!-- 클릭시 직원추가 팝업창 띄움 -->
                    <a href="javascript:void(0);" onclick="showPop('new_staff');">직원추가</a>
                </div>
                <div class="admin_utility">
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
                        <label for="admin">관리자</label>
                        <input type="checkbox" id="admin" name="admin" checked>체크 시, 관리자모드 접속 가능
                    </div>
                    <div class="row">
                        <label for="id">ID</label>
                        <input type="text" id="id" name="id" required>
                    </div>
                    <div class="row">
                        <label for="password">PW<i>*</i></label>
                        <input type="text" id="password" name="password" required>
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
                    <button type="button" class="popup_btn stroke">수정</button>
                    <button type="button" class="popup_btn fill">삭제</button>
                </div>
            </div>
        </div>
    </div>
        <!--정보수정 팝업 영역 끝-->
    </div>
</body>
</html>