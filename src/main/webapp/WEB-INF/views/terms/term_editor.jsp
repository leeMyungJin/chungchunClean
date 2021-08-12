<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
    <script src="/ckeditor5/build/ckeditor.js"></script>
    <link rel="stylesheet" type="text/css" href="/ckeditor5/sample/styles.css">
    <style type="text/css">
        .ck-content {height: 80vh;}
    </style>
</head>
<script>
    var termSerContent;
    var termPriContent;
    var staffId = "<%=session.getAttribute("staffId")%>";

    //이용약관추가 
    var saveSerTerm = function(){
        //필수값 체크
        if(editor1.getData() == ""){
            alert("내용을 입력해주세요.");
            return false;
        }
        
        var params = {
            content :editor1.getData()
        }
            
        $.ajax({
            url : "/terms/saveTermService",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : 'text',
            data : params,
            success : function(data) {
                alert("이용약관 작성이 완료되었습니다.");
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
            });
    }

    //이용약관 가져오기
    var getSerTerm  = function(){
    $.ajax({
		url : "/terms/getTermService",
		async : false, // 비동기모드 : true, 동기식모드 : false
		type : 'POST',
		cache : false,
		dataType : 'text',
		data : null,
		success : function(data) {
            termSerContent = data;
		},
		error : function(request,status,error) {
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
		});
    }

    //개인정보수집약관 추가 
    function savePriTerm(){
        //필수값 체크
        if(editor3.getData() == ""){
            alert("내용을 입력해주세요.");
            return false;
        }
        
        var params = {
            content :editor3.getData()
        }
            
        $.ajax({
            url : "/terms/saveTermPrivacy",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : 'text',
            data : params,
            success : function(data) {
                alert("개인정보수집약관 작성이 완료되었습니다.");
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
            });
    }

    //개인정보수집약관 가져오기
    var getPriTerm  = function(){
        $.ajax({
            url : "/terms/getTermPrivacy",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : 'text',
            data : null,
            success : function(data) {
                termPriContent = data;
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
            });
    }

</script>
<body>
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        <div class="admin_container">
                <div id="theTabPanel">
                    <div>
                        <a>이용약관</a>
                        <section class="main_section">
                            <!-- 탭 패널 : 이용약관 .terms1-->
                            <div class="admin_utility" style="margin-top:10px;">
                                <div class="admin_btn">
                                    <button class="btn" onClick="saveSerTerm();">저장</button>
                                </div>
                            </div>
                            <div class="edt">
                                <textarea name="service" id="service"></textarea>
                            </div>
                        </section>
                    </div>
                    <div>
                        <a>개인정보수집약관</a>
                        <section class="main_section">
                        <!-- 탭 패널 : 개인정보수집약관 .terms2-->
                        <div class="admin_utility" style="margin-top:10px;">
                            <div class="admin_btn">
                                <button class="btn" onClick="savePriTerm();">저장</button>
                            </div>
                        </div>
                        <div class="edt">
                            <textarea name="privacy" id="privacy"></textarea>
                        </div>
                        </section>
                    </div>
                </div>
        </div>
    </div>
</body>
<script>
        $(document.body).ready(function() {  
            new wijmo.nav.TabPanel("#theTabPanel"); 
            $('#terms').addClass("current");
            sessionCheck(staffId);
	        getSerTerm();
	        getPriTerm(); 
            ClassicEditor
				.create( document.querySelector( '#service' ), {
					
				toolbar: {
					items: [
						'heading',
						'|',
						'bold',
						'italic',
						'link',
						'bulletedList',
						'numberedList',
						'|',
						'outdent',
						'indent',
						'|',
						'blockQuote',
						'insertTable',
						'undo',
						'redo',
						'fontColor',
						'fontBackgroundColor',
						'fontSize',
						'underline',
						'specialCharacters',
						'horizontalLine',
						'htmlEmbed'
					]
				},
				language: 'ko',
				image: {
					toolbar: [
						'imageTextAlternative',
						'imageStyle:inline',
						'imageStyle:block',
						'imageStyle:side'
					]
				},
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells'
					]
				},
					licenseKey: '',
					
					
					
				} )
				.then( editor => {
					editor1 = editor;
					editor1.setData(termSerContent);
					
					
					
				} )
				.catch( error => {
					console.error( 'Oops, something went wrong!' );
					console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
					console.warn( 'Build id: eed83e2ex4oz-pejoxvy7ffif' );
					console.error( error );
				} );
            ClassicEditor
				.create( document.querySelector( '#privacy' ), {
					
				toolbar: {
					items: [
						'heading',
						'|',
						'bold',
						'italic',
						'link',
						'bulletedList',
						'numberedList',
						'|',
						'outdent',
						'indent',
						'|',
						'blockQuote',
						'insertTable',
						'undo',
						'redo',
						'fontColor',
						'fontBackgroundColor',
						'fontSize',
						'underline',
						'specialCharacters',
						'horizontalLine',
						'htmlEmbed'
					]
				},
				language: 'ko',
				image: {
					toolbar: [
						'imageTextAlternative',
						'imageStyle:inline',
						'imageStyle:block',
						'imageStyle:side'
					]
				},
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells'
					]
				},
					licenseKey: '',
					
					
					
				} )
				.then( editor => {
					editor3 = editor;
					editor3.setData(termPriContent);
					
					
					
				} )
				.catch( error => {
					console.error( 'Oops, something went wrong!' );
					console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
					console.warn( 'Build id: eed83e2ex4oz-pejoxvy7ffif' );
					console.error( error );
				} );
        })
</script>
</html>