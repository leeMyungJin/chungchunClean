<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
response.setHeader("Pragma", "no-cache"); //HTTP 1.0
response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
response.setHeader("Cache-Control", "no-store"); //HTTP 1.1
response.setDateHeader("Expires", 0L); // Do not cache in proxy server
%>
<%@ include file="../include/header.jsp" %>
<script>
var prodGrid;
var checkCode = false;
var checkProdCode = false;
var checkCtgCode = false;
var unitList=${unitList};
   var prodLayout = [{
      dataField : "pk",
      headerText : "pk",
      width : "10%",
      editable : false,
      visible : false
    },{
      dataField : "check",
      headerText : "삭제",
      // headerRenderer : {
      //   type : "CheckBoxHeaderRenderer",
      //   // 헤더의 체크박스가 상호 의존적인 역할을 할지 여부(기본값:false)
      //   // dependentMode 는 renderer 의 type 으로 CheckBoxEditRenderer 를 정의할 때만 활성화됨.
      //   // true 설정했을 때 클릭하면 해당 열의 필드(데모 상은 isActive 필드)의 모든 데이터를 true, false 로 자동 바꿈
          dependentMode : true, 			
      //   position : "left" // 기본값 "bottom"
      // },    
      width :"5%",
      renderer : {
        type : "CheckBoxEditRenderer",
        showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
        checkValue  : 'Y',
        unCheckValue  : 'N',
        editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
      } 
    },{
      dataField : "deadLine",
      headerText : "마감일시",
      width : "12%",
      editable : true
    },{
      dataField : "prodCode",
      headerText : "상품코드",
      width : "12%",
      editable : false
      // visible : false
    },{
      dataField : "useFlag",
      headerText : "활성화",
      // headerRenderer : {
      //   type : "CheckBoxHeaderRenderer",
      //   // 헤더의 체크박스가 상호 의존적인 역할을 할지 여부(기본값:false)
      //   // dependentMode 는 renderer 의 type 으로 CheckBoxEditRenderer 를 정의할 때만 활성화됨.
      //   // true 설정했을 때 클릭하면 해당 열의 필드(데모 상은 isActive 필드)의 모든 데이터를 true, false 로 자동 바꿈
          dependentMode : true, 			
      //   position : "left" // 기본값 "bottom"
      // },    
      width :"5%",
      renderer : {
        type : "CheckBoxEditRenderer",
        showLabel : false, // 참, 거짓 텍스트 출력여부( 기본값 false )
        checkValue  : 'Y',
        unCheckValue  : 'N',
        editable : true, // 체크박스 편집 활성화 여부(기본값 : false)
      } 
    },{
      dataField : "prodName",
      headerText : "상품명",
      width : "30%",
      editable : true
    }, {
      dataField : "unit",
      headerText : "단위",
      width : "10 %",
      renderer : {
        type : "IconRenderer",
        iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
        iconHeight : 16,
        iconPosition : "aisleRight",
        iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
          "default" : "../AUIGrid/images/arrow-down-black-icon.png" // default
        },
        onClick : function(event) {
          AUIGrid.openInputer(event.pid);
        }
		  },
      editRenderer : {
        type : "DropDownListRenderer",
        showEditorBtn : false,
		  	showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
        list : unitList
        }
    }, {
      dataField : "origin",
      headerText : "원산지",
      width : "12%",
      editable : true
    }, {
      dataField : "vatYn",
      headerText : "과/면세",
      width : "8.9%",
      renderer : {
        type : "IconRenderer",
        iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
        iconHeight : 16,
        iconPosition : "aisleRight",
        iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
          "default" : "../AUIGrid/images/arrow-down-black-icon.png" // default
        },
        onClick : function(event) {
          // 아이콘을 클릭하면 수정으로 진입함.
          AUIGrid.openInputer(event.pid);
        }
		  },      
      editable : true,
        editRenderer : {
        type : "DropDownListRenderer",
        showEditorBtn : false,
			  showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
        list : ["과세", "면세"]
        }
    }, {
      dataField : "cost",
      headerText : "원가",
      width : "10%",
      dataType : "numeric",
      formatString : "#,##0",
      editable : true
    }];
    var prodProps = {};
      // prodProps.rowIdField = "pk";
      prodProps.editable = true;
      prodProps.enableSorting = true;
      prodProps.softRemoveRowMode = false;
      //페이징 설정
      prodProps.usePaging = true;
      // singleRow 선택모드
      prodProps.selectionMode = "multipleCells";
      // 줄번호 칼럼 렌더러 출력 
      prodProps.showRowNumColumn = true;
      // 체크박스 표시 렌더러 출력 안함
      prodProps.showRowCheckColumn = false;
      //그리드 가로세로 설정.
      prodProps.height= 500;
      //페이지 출력 행 개수
      prodProps.showPageRowSelect=true;
      prodProps.pageRowCount=100;
      prodProps.pageRowSelectValues=[20, 40, 60 , 80, 100];
      prodProps.enableMovingColumn=true;
      prodProps.displayTreeOpen = true;
      prodProps.noDataMessage = "조회 결과가 없습니다.";

 jQuery(document).ready(function($) {

    function createAUIGrid() {
      //그리드 설정
      prodGrid = AUIGrid.create("#grid_prod", prodLayout, prodProps);
    }

    createAUIGrid();
    setCellClickEvent(prodGrid);
    setKeydownEvent(prodGrid);

    $(".save_btn").on("click",function(event){
      var saveFlag = true;
        if(AUIGrid.getColumnLayout(prodGrid)[0].dataField == "pk"){
          if(gridValidation(prodGrid)){
            var count = AUIGrid.getRowCount('#grid_prod');
            var result = 0;
              var rowIdField = AUIGrid.getProp(prodGrid, "rowIdField");
            for(var i=0; i<count ; i++){
              if(AUIGrid.isAddedById(prodGrid, AUIGrid.getCellValue(prodGrid,i,rowIdField)) || AUIGrid.isEditedById(prodGrid, AUIGrid.getCellValue(prodGrid,i,rowIdField))){
                var params= {
                        deadLine : AUIGrid.getCellValue('#grid_prod',i,"deadLine").length > 1 ? AUIGrid.getCellValue('#grid_prod',i,"deadLine").substring(2,4) : '',
                        prodCode : AUIGrid.getCellValue('#grid_prod',i,"prodCode"),
                        prodName : AUIGrid.getCellValue('#grid_prod',i,"prodName"),
                        unit : AUIGrid.getCellValue('#grid_prod',i,"unit"),
                        origin : AUIGrid.getCellValue('#grid_prod',i,"origin"),
                        vatYn : AUIGrid.getCellValue('#grid_prod',i,"vatYn") == '과세' ? 'Y' : 'N',
                        cost : AUIGrid.getCellValue('#grid_prod',i,"cost"),
                        userId : "<%=(String)session.getAttribute("id")%>" ,
                        useFlag : AUIGrid.getCellValue('#grid_prod',i,"useFlag")
                }
                $.ajax({
                  url : "<%=request.getContextPath()%>/admin/saveProd",
                  async : false, // 비동기모드 : true, 동기식모드 : false
                  type : 'POST',
                  cache : false,
                  dataType : null,
                  data : params,
                  success : function(data) {
                  },
                  error : function(request,status,error) {
                  }
                }); 
              }
            }
            removeStatus(prodGrid);
          }else{
            saveFlag = false;
          }
        }else{
           if(gridValidation(prodGrid)){
            var count = AUIGrid.getRowCount(prodGrid);
            var result = 0;
            var excelCost;
            for(var i=0; i<count ; i++){
            if(AUIGrid.getCellValue(prodGrid,i,"6").length > 3)
              excelCost =AUIGrid.getCellValue(prodGrid,i,"6").replace(/,/gi,'');  
            else
            excelCost = AUIGrid.getCellValue(prodGrid,i,"6");
              var params= {
                    deadLine : AUIGrid.getCellValue(prodGrid,i,"0").length > 1 ? AUIGrid.getCellValue(prodGrid,i,"0").substring(2,4) : '',
                    prodCode : AUIGrid.getCellValue(prodGrid,i,"1"),
                    prodName : AUIGrid.getCellValue(prodGrid,i,"2"),
                    unit : AUIGrid.getCellValue(prodGrid,i,"3"),
                    origin : AUIGrid.getCellValue(prodGrid,i,"4"),
                    vatYn : AUIGrid.getCellValue(prodGrid,i,"5")  == '과세' ? 'Y' : 'N',
                    cost : excelCost,
                    useFlag : AUIGrid.getCellValue(prodGrid,i,"7").toUpperCase(),
                    userId : "<%=(String)session.getAttribute("id")%>" 
              }
              $.ajax({
                url : "<%=request.getContextPath()%>/admin/saveProd",
                async : false, // 비동기모드 : true, 동기식모드 : false
                type : 'POST',
                cache : false,
                dataType : null,
                data : params,
                success : function(data) {
                },
                error : function(request,status,error) {
                }
              }); 
            }
            removeStatus(prodGrid);
          }else{
            saveFlag = false;
          }
        }
        if(saveFlag)
          alert('저장되었습니다.');
    });

  var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";

    // HTML5 브라우저인지 체크 즉, FileReader 를 사용할 수 있는지 여부
    function checkHTML5Brower() {
      var isCompatible = false;
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
      }
      return isCompatible;
    };
    // 파일 선택하기
    $('#excelUp').on('click', function(evt) {
        evt.preventDefault();
        $("#fileSelector").val('');
        $("#fileSelector").click();
    });
   // 파일 선택하기
	$('#fileSelector').on('change', function(evt) {
      if (!checkHTML5Brower()) {
          alert("브라우저가 HTML5 를 지원하지 않습니다.\r\n서버로 업로드해서 해결하십시오.");
        return;
      } else {
          var data = null;
          var file = evt.target.files[0];
          if (typeof file == "undefined") {
          alert("파일 선택 시 오류 발생!!");
              return;
          }
          var reader = new FileReader();

        reader.onload = function(e) {
          var data = e.target.result;

          /* 엑셀 바이너리 읽기 */
          
          var workbook;

          if(rABS) { // 일반적인 바이너리 지원하는 경우
            workbook = XLSX.read(data, {type: 'binary'});
          } else { // IE 10, 11인 경우
            var arr = fixdata(data);
            workbook = XLSX.read(btoa(arr), {type: 'base64'});
          }

          var jsonObj = process_wb(workbook);

          //console.log(JSON.stringify(jsonObj.Sheet1, 2, 2));
          
          setExcelData( jsonObj[Object.keys(jsonObj)[0]]);
        };

        if(rABS) reader.readAsBinaryString(file);
        else reader.readAsArrayBuffer(file);
        
      }
  });
});
  // IE10, 11는 바이너리스트링 못읽기 때문에 ArrayBuffer 처리 하기 위함.
function fixdata(data) {
  var o = "", l = 0, w = 10240;
  for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
  o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
  return o;
};

// 파싱된 시트의 CDATA 제거 후 반환.
function process_wb(wb) {
  var output = "";
  output = JSON.stringify(to_json(wb));
  output = output.replace( /<!\[CDATA\[(.*?)\]\]>/g, '$1' );
  return JSON.parse(output);
};

// 엑셀 시트를 파싱하여 반환
function to_json(workbook) {
  var result = {};
  workbook.SheetNames.forEach(function(sheetName) {
    // JSON 으로 파싱
    //var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
    
    // CSV 로 파싱
    var roa = XLSX.utils.sheet_to_csv( workbook.Sheets[sheetName] );

    if(roa.length > 0){
      result[sheetName] = roa;
    }
  });
  return result;
}
  function setCellClickEvent(grid){
      AUIGrid.bind(grid, "cellClick", function(event) {
            if(event.columnIndex == "1"){
              if(confirm("삭제하시겠습니까?")){
                var params = {
                  prodCode   : event.item.prodCode,
                  userId : "<%=(String)session.getAttribute("id")%>"
                }
                $.ajax({
                  url : "<%=request.getContextPath()%>/admin/delProd",
                    async : false, // 비동기모드 : true, 동기식모드 : false
                    type : 'POST',
                    cache : false,
                    dataType : 'json',
                    data : params,
                    success : function(data) {
                      alert('삭제되었습니다.');
                    },
                    error : function(request,status,error) {
                      }
                  }); 
                AUIGrid.removeRow(prodGrid, event.rowIndex);
                removeStatus(grid);
              }else{
                AUIGrid.setCellValue(prodGrid,event.rowIndex,"check","N");
                removeStatus(prodGrid);
              }

            }
          });          
  }
function setKeydownEvent(grid){
  AUIGrid.bind(grid,"keyDown",	function(event) {
      if(event.keyCode == 45) { // Insert  키
        return false; // 기본 행위 안함.
      }
      return true; // 기본 행위 유지
    });
}

// 엑셀 파일 시트에서 파싱한 JSON 데이터 기반으로 그리드 동적 생성
function setExcelData(csvStr) {
  var jsonData = parseCsv(csvStr);
  var excelUpLayout = [{
      dataField : "0",
      headerText : "마감일시",
      width : "12%",
      editable : true
    },{
      dataField : "1",
      headerText : "상품코드",
      width : "12%",
      editRenderer:{
	        	type:"InputEditRenderer",
	        	onlyNumeric:true,
	        	maxlength:7
			}
      // visible : false
    },{
      dataField : "2",
      headerText : "상품명",
      width : "25%",
      editable : true
    }, {
      dataField : "3",
      headerText : "단위",
      width : "7%",
      renderer : {
        type : "IconRenderer",
        iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
        iconHeight : 16,
        iconPosition : "aisleRight",
        iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
          "default" : "../AUIGrid/images/arrow-down-black-icon.png" // default
        },
        onClick : function(event) {
          AUIGrid.openInputer(event.pid);
        }
		  },
      editRenderer : {
        type : "DropDownListRenderer",
        showEditorBtn : false,
		  	showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
        list : unitList
        }
    }, {
      dataField : "4",
      headerText : "원산지",
      width : "15%",
      editable : true
    }, {
      dataField : "5",
      headerText : "과/면세",
      width : "10%",
       renderer : {
        type : "IconRenderer",
        iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
        iconHeight : 16,
        iconPosition : "aisleRight",
        iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
          "default" : "../AUIGrid/images/arrow-down-black-icon.png" // default
        },
        onClick : function(event) {
          // 아이콘을 클릭하면 수정으로 진입함.
          AUIGrid.openInputer(event.pid);
        }
		  },      
      editable : true,
        editRenderer : {
        type : "DropDownListRenderer",
        showEditorBtn : false,
			  showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
        list : ["과세", "면세"]
        }
    }, {
      dataField : "6",
      headerText : "원가",
      width : "10%",
      dataType : "numeric",
      formatString : "#,##0",
      editable : true
    }, {
      dataField : "7",
      headerText : "활성화",
      width : "8.8%",
      renderer : {
        type : "IconRenderer",
        iconWidth : 16, // icon 사이즈, 지정하지 않으면 rowHeight에 맞게 기본값 적용됨
        iconHeight : 16,
        iconPosition : "aisleRight",
        iconTableRef :  { // icon 값 참조할 테이블 레퍼런스
          "default" : "../AUIGrid/images/arrow-down-black-icon.png" // default
        },
        onClick : function(event) {
          // 아이콘을 클릭하면 수정으로 진입함.
          AUIGrid.openInputer(event.pid);
        }
		  },    
      editable : true,
        editRenderer : {
        type : "DropDownListRenderer",
        showEditorBtn : false,
			  showEditorBtnOver : false, // 마우스 오버 시 에디터버턴 보이기
        list : ["Y", "N"]
        }
    }];
  
  // 현재 엑셀 파일의 0번째 행을 기준으로 컬럼을 작성함.
  // 만약 상단에 문서 제목과 같이 있는 경우
  // 조정 필요.
  var firstRow = jsonData[0];

  if(typeof firstRow == "undefined") {
    alert("데이터가 없습니다.\n엑셀 파일을 확인하시기 바랍니다.");
    return;
  }
  if(AUIGrid.isCreated(prodGrid)) {
    AUIGrid.destroy(prodGrid);
    prodGrid = null;
  }
  // 그리드 생성
  prodGrid = AUIGrid.create("#grid_prod", excelUpLayout, prodProps);
  
  // 그리드에 CSV 데이터 삽입
   if(csvStr.substring(csvStr.length - 1, csvStr.length) == "\n") // 마지막 캐리지리턴이 있는 지 검사
    csvStr = csvStr.substring(0, csvStr.length-1); // 잘라내기
  AUIGrid.setCsvGridData(prodGrid, csvStr, false);
}
function parseCsv(value) {
  if(!value){
    return false;
  }
  var rows = value.split("\n");
  var pData = [];
      for(var i=0, len=rows.length-1; i<len; i++) {
        pData[i] =  rows[i].split(",");
      }
      return pData;
}
  function checkHome(){
    if("<%=session.getAttribute("id")%>"==null){
        location.href = "/";
    }else{
        location.href="/admin/main";
    }
  }
  function searchList(){
    if(AUIGrid.getColumnLayout(prodGrid)[0].dataField != "pk"){
      AUIGrid.destroy(prodGrid);
      prodGrid = AUIGrid.create("#grid_prod", prodLayout, prodProps);
      setCellClickEvent(prodGrid);
    }
    var params = {
      cond   : $("#cond").val(),
      search : $("#search").val()
    }
    $.ajax({
        url : "<%=request.getContextPath()%>/admin/getProdList",
        async : true, // 비동기모드 : true, 동기식모드 : false
        type : 'POST',
        cache : false,
        dataType : 'json',
        data : params,
        success : function(data) {
          AUIGrid.setGridData('#grid_prod', data); 
        },
        error : function(request,status,error) {
        }
      }); 
  }

  function applyPrice(){
    var count = AUIGrid.getRowCount('#grid_prod');
    for(var i=0; i<count ; i++){
        if(AUIGrid.getCellValue(prodGrid,i,'check')== 'Y')
          AUIGrid.setCellValue('#grid_prod', i, "price", (AUIGrid.getCellValue('#grid_prod',i,"price") +  AUIGrid.getCellValue('#grid_prod',i,"price") * ($("#priceModify").val()/100)));
    }
    
  }
   window.onresize = function() {
	// 크기가 변경되었을 때 AUIGrid.resize() 함수 호출 
    AUIGrid.resize(prodGrid);
  };

  function exportExcel(){
    // if(AUIGrid.getRowCount(prodGrid) == 0){
    //   alert('조회된 데이터가 없습니다.');
    //   return ;
    // }
    var excelProps = {
      sheetName : "상품관리",
      exceptColumnFields : ["pk","check"], // 이름, 제품, 컬러는 아예 엑셀로 내보내기 안하기.
      showRowNumColumn : true
    };
    AUIGrid.exportToXlsx(prodGrid, excelProps);
  }

  function enterKey(){
    if (window.event.keyCode == '13') {
      searchList();
      return ;
    }
  }

  function downTemplate(){
      var url = "<%=request.getContextPath()%>/" + "template/excelTemplate.xlsx";
      location.href=url;
   }

   function addValidation(){
     if($("#prodCode").val() == ""){
       alert("상품코드를 입력하시기 바랍니다.예)1001001");
       return false;
     }else if($("#prodName").val()==""){
       alert("상품명을 입력하시기 바랍니다.예)오이");
       return false;
     }
    //  else if($("#deadLine").val()==""){
    //    alert("마감기한을 입력하시기 바랍니다.");
    //    return false;
    //  }
     else if($("#cost").val()==""){
       alert("원가를 입력하시기 바랍니다.예)1000");
       return false;
     }else if($("#unit").val()==""){
       alert("단위를 선택하시기 바랍니다.");
       return false;
     }else if($("#origin").val()==""){
       alert("원산지를 입력하시기 바랍니다.");
       return false;
     }else{
       return true;
     }
   }

   function gridValidation(grid){
    var count = AUIGrid.getRowCount(grid);
    var prodCodeRule = /\d{7}$/;
    var prodCode;
    var prodName;
    var unit;
    var origin;
    var vatYn;
    var cost;
    var usFlag;
    for(var i=0; i<count; i++){
      if(AUIGrid.getColumnLayout(grid)[0].dataField == "pk"){
        prodCode = AUIGrid.getCellValue(grid,i,"prodCode");
        prodName = AUIGrid.getCellValue(grid,i,"prodName");
        unit = AUIGrid.getCellValue(grid,i,"unit");
        origin = AUIGrid.getCellValue(grid,i,"origin");
        vatYn = AUIGrid.getCellValue(grid,i,"vatYn");
        cost = AUIGrid.getCellValue(grid,i,"cost");
        useFlag = AUIGrid.getCellValue(grid,i,"useFlag");
      }else{
        prodCode = AUIGrid.getCellValue(grid,i,"1");
        prodName = AUIGrid.getCellValue(grid,i,"2");
        unit = AUIGrid.getCellValue(grid,i,"3");
        origin = AUIGrid.getCellValue(grid,i,"4");
        vatYn = AUIGrid.getCellValue(grid,i,"5");
        useFlag = AUIGrid.getCellValue(grid,i,"7").toUpperCase();
        var execelCost = AUIGrid.getCellValue(grid,i,"6");
        if(execelCost.length > 3)
          cost =  execelCost.replace(/,/gi,'');
        else
          cost = execelCost;
      }
      if(prodCode == ""){
        alert("상품코드를 입력하세요.예)1001001");
        return false;
      }else if(!prodCodeRule.test(prodCode)){
        alert("상품코드는 숫자만 가능합니다." + i);
        return false;
      }else if(prodCode.length != 7){
        alert("상품코드 자릿수는 7자리 입니다. 예)1001001")  ;
        return false;
      }else if(prodName == ""){
        alert((i +1) +" 행 상품명을 입력하세요.");
        return false;
      }else if(unit == ""){
        alert((i +1) +" 행 단위를 입력하세요.");
        return false;
      }else if(unitList.indexOf(unit) == -1){
        alert((i +1) +" 행 단위를 확인하세요");
        return false;
      }else if(origin == ""){
        alert((i +1) +" 행 원산지를 입력하세요.");
        return false;
      }else if(vatYn == ""){
        alert((i +1) +" 행 과세여부를 입력하세요.");
        return false;
      }else if(vatYn != '과세' && vatYn != '면세'){
        alert((i +1) +" 행 과세여부를 확인하세요.예)과세/면세");
        return false;
      }else if(cost == ""){
        alert((i +1) +" 행 원가를 입력하세요.");
        return false;
      }else if(!(useFlag == 'Y' || useFlag == 'N' || useFlag == null)){
        alert(i+1 + " 행 활성화를 확인하세요. 예) Y/N ");
        return false;
      }
    }
    if(prodCodeValidation())
      return true;
    else 
      return false;
   }

   function prodCodeValidation(){
     var checkValidation = true;
     var params = {};
      var rowIdField = AUIGrid.getProp(prodGrid, "rowIdField");
     for(var i = 0  ; i < AUIGrid.getRowCount(prodGrid); i++){
       if(AUIGrid.isEditedById(prodGrid,AUIGrid.getCellValue(prodGrid,i,rowIdField))){
        if(AUIGrid.getColumnLayout(prodGrid)[0].dataField == "pk"){
          params.prodCode = AUIGrid.getCellValue(prodGrid,i,"prodCode");
        }else{
          params.prodCode = AUIGrid.getCellValue(prodGrid,i,"1");
           $.ajax({
            url : "<%=request.getContextPath()%>/admin/checkProdCode",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : null,
            data : params,
            success : function(data) {
              if(data != ""){
                checkProdCode = false;
              }else{
                checkProdCode = true;
              }
            },
            error : function(request,status,error) {
            }
          }); 
          //  if(!checkProdCode){
          //   alert( (i +1) +  '행 상품은 이미 등록된 상품코드 입니다.');
          //   checkValidation = false;
          //   break;
          // }
        }
          $.ajax({
            url : "<%=request.getContextPath()%>/admin/checkCtgCode",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : null,
            data : params,
            success : function(data) {
              if(data != ""){
                checkCtgCode = true;
              }else{
                checkCtgCode = false;
              }
            },
            error : function(request,status,error) {
            }
          }); 
         if(!checkCtgCode){
            alert((i+1) +' 행은 해당 카테고리가 존재하지 않습니다. 카테고리를 먼저 추가해주세요.');
            checkValidation = false;
            break;
        }
     }
    }
        return checkValidation;
   }
</script>
<body>


  <!-- 서브 sub -->
  <!-- 관리자용 admin -->
  <div id="admin" class="admin">

    <asdie class="sidebar">
      <a href="javascript:checkHome()" class="header_logo"><img src="../img/header_logo.png" alt="라임푸드 로고" /></a>
      <ul class="nav">
        <li><a href="/admin/main"><img src="../img/sidebar_icon01.png" alt="" class="menu_icon">홈화면&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
        <li><a href="/admin/cust"><img src="../img/sidebar_icon02.png" alt="" class="menu_icon">회원관리</a></li>
        <li><a href="/admin/popup"><img src="../img/sidebar_icon03.png" alt="" class="menu_icon">팝업공지</a></li>
        <li><a href="/admin/ctg" class="current"><img src="../img/sidebar_icon04.png" alt="" class="menu_icon">상품관리</a>
          <ul class="nav_dept2">
            <li><a href="/admin/ctg">카테고리</a></li>
            <li><a href="/admin/prod" class="current">상품관리</a></li>
            <li><a href="/admin/price" >단가관리</a></li>
          </ul>
        </li>
        <li><a href="/admin/order"><img src="../img/sidebar_icon05.png" alt="" class="menu_icon">주문관리</a></li>
        <li><a href="/admin/dline"><img src="../img/sidebar_icon06.png" alt="" class="menu_icon">마감관리</a></li>
        <li><a href="/admin/inven"><img src="../img/sidebar_icon07.png" alt="" class="menu_icon">재고관리</a></li>
        <li><a href="/admin/sales"><img src="../img/sidebar_icon08.png" alt="" class="menu_icon">매출관리</a></li>
      </ul>
      <a href="/cust/food" class="admin_exit_btn">관리자모드 나가기</a>      
    </asdie>
    <div class="sub_cont_area admin04_02">
      <h1 class="sub_tit">상품관리</h1>
      <div class="btn_area">
        <button type="button" class="excel_templete" onclick="downTemplate()">엑셀템플릿</button>
        <button  type="file" class="excel_upload" id="excelUp"  >엑셀업로드</button>
        <input type="file" name="files" id="fileSelector" accept=".xlsx" style="display:none">
        <button type="button" class="excel_down" id="excel_down" name="excel_down" onclick="exportExcel()">엑셀다운로드</button>
      </div>

      <section class="section01">
        <!-- 필터 영역 -->
        <div class="filter_area admin_filter">
          <form class="" action="" method="post" onsubmit="return false">
              <label for="">검색조건</label>
              <select id="cond" title="" class="">
                <option value="all" selected="selected">전체</option>
                <option value="prodName">상품명</option>
                <option value="prodCode">상품코드</option>
              </select> 
            <label for="" style="margin-left:36px;">조회</label>
            <div class="input_search_wrap">
              <input type="text" name="search" id = "search" value="" placeholder="상품명/상품코드" class="search" onkeypress="enterKey()">
              <button type="button" class="search_btn" onclick="searchList()" >조회</button>
            </div>
          </form>
        </div>
        <!-- 필터 영역 끝 -->

        <!-- 보드 영역 -->
        <div class="dashboard_area">
          <div class="dash_bottom">
            <div class="btn_wrap">
              <div>
                <button type="button" class="row_add"><span>+</span>상품추가</button>
                <%-- <button type="button" class="row_del"><span>-</span>상품삭제</button> --%>
              </div>
              <button type="button" name = "save" class="save_btn btn">저장</button>
            </div>
            <div id="grid_prod"></div>
            <div class="btn_wrap bottom">
              <button type="button" class="save_btn btn">저장</button>
            </div>
          </div>
        </div>
        <!-- 보드 영역 끝-->
      </section>
    </div>
  </div>

   <!-- 팝업 - 상품추가 -->
  <div class="popup pro_add" role="">
    <div class="popup_container">
      <div class="popup_head">
        <p class="popup_tit">상품 추가</p>
        <a href="#0" class="popup_close"></a>
      </div>
      <div class="inner">
        <form class="" name="addProd" id="addProd" action="<%=request.getContextPath()%>/admin/saveProd" method="post">
          <span class="essential essential_tit">* 필수항목</span>
          <table class="table_style01">
            <tbody>
              <tr>
                <th>상품코드 <span class="essential">*</span></th>
                <td>
                  <input type="text" id="prodCode" name="prodCode" value="" maxlength="7" placeholder="1001001"   oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');" required>
                  <button type="button" id="checkProdCode" class="btn_overlap" >중복확인</button>            
                </td>
                
              </tr>
              <tr>
                <th>상품명 <span class="essential">*</span></th>
                <td><input type="text" id="prodName" name="prodName" value="" maxlength="30" placeholder="실고추 1키로" required></td>
              </tr>
              <tr>
                <th>마감기한 <span class="essential"></span></th>
                <td>D-  <input type="text" id="deadLine" name="deadLine" style="width:50px" maxlength="2" value="" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');" placeholder="1"></td>
              </tr>
              <tr>
                <th>원가 <span class="essential">*</span></th>
                <td><input type="text" id="cost" name="cost" value="" maxlength="11" placeholder="5000" required></td>
              </tr>
              <tr>
                <th>단위 <span class="essential">*</span></th>
                <td>
                  <select id="unit" name="unit" value="" required> 
                      <option value="">선택</option>
                  </select>
                </td>
              </tr>              
              <tr>
                <th>원산지 <span class="essential">*</span></th>
                <td><input type="email" id="origin" name="origin" value="" placeholder="국산" required></td>
              </tr>
              <tr>
                <th>과/면세 <span class="essential">*</span></th>
                <td>
                  <select id="vatYn" name="vatYn" required>
                    <option value="Y">과세</option>
                    <option value="N">면세</option>
                  </select> 
                </td>
              </tr>
            </tbody>
          </table>
          <div class="btn_wrap" style="margin-top:18px;">
            <button type="button" class="btn_cancel" >취소</button>
            <button type="button" class="btn_confirm" id="addBtn" >상품추가</button>
          </div>
        </form>
      </div>
    </div>
  </div> <!-- popup -->

  <script>
    jQuery(document).ready(function($) {
      //open popup
      $('.row_add').on('click', function(event) {
        $("#prodCode").val("");
        $("#prodName").val("");
        $("#deadLine").val("");
        $("#cost").val("");
        $("#origin").val("");
        $("#unit").val("");
        event.preventDefault();
          $.ajax({
            url : "<%=request.getContextPath()%>/admin/getProdUnit",
            async : true, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            cache : false,
            dataType : 'json',
            success : function(data) {
              for(var i=0; i<data.length; i++)
                $("#unit").append('<option value="' + data[i].unit + '">' + data[i].unit + '('+data[i].remark + ')' + '</option>');
            },
            error : function(request,status,error) {
            }
            });
            checkCode = false;
        $('.pro_add').addClass('is-visible');
      });

      //close popup
      $('.pro_add').on('click', function(event) {
        if ($(event.target).is('.popup_close') || $(event.target).is('.pro_add')) {
          event.preventDefault();
          $(this).removeClass('is-visible');
        }
      });
      //close popup when clicking the esc keyboard button
      $(document).keyup(function(event) {
        if (event.which == '27') {
          $('.pro_search').removeClass('is-visible');
        }
      });
      $('#addBtn').on('click',function(event){
        if(!checkCode){
          alert('상품코드 중복확인을 먼저하시기 바랍니다.');
          return false;
        }

        if(addValidation()){
          var params= {
                        deadLine : $("#deadLine").val(),
                        prodCode : $("#prodCode").val(),
                        prodName : $("#prodName").val(),
                        unit : $("#unit").val(),
                        origin : $("#origin").val(),
                        vatYn : $("#vatYn").val(),
                        cost : $("#cost").val() ,
                        userId : "<%=(String)session.getAttribute("id")%>" 
                }
                $.ajax({
                  url : "<%=request.getContextPath()%>/admin/saveProd",
                  async : false, // 비동기모드 : true, 동기식모드 : false
                  type : 'POST',
                  cache : false,
                  dataType : null,
                  data : params,
                  success : function(data) {
                  },
                  error : function(request,status,error) {
                  }
                }); 
                alert('상품이 추가되었습니다.');
                 $('.pro_add').trigger('click');
                 searchList();
        }
      });

      $("#checkProdCode").on('click',function(){
        checkCode = true;
        if($("#prodCode").val().length != 7){
          alert('상품코드를 확인하시길 바랍니다. 예)1001001');
          return false;
        }
        var params= {
                        prodCode : $("#prodCode").val()
        }
        $.ajax({
          url : "<%=request.getContextPath()%>/admin/checkProdCode",
          async : false, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : null,
          data : params,
          success : function(data) {
            if(data != ""){
              checkProdCode = false;
            }else{
              checkProdCode = true;
            }
          },
          error : function(request,status,error) {
          }
        }); 
        $.ajax({
          url : "<%=request.getContextPath()%>/admin/checkCtgCode",
          async : false, // 비동기모드 : true, 동기식모드 : false
          type : 'POST',
          cache : false,
          dataType : null,
          data : params,
          success : function(data) {
            if(data != ""){
              checkCtgCode = true;
            }else{
              checkCtgCode = false;
            }
          },
          error : function(request,status,error) {
          }
        }); 

        if(checkCtgCode && checkProdCode){
          alert('등록 가능한 상품코드 입니다.');
          return true;
        }else if(!checkProdCode){
          alert('이미 등록된 상품코드 입니다.');
          return false;
        }else if(!checkCtgCode){
          alert('해당 카테고리가 존재하지 않습니다. 카테고리를 먼저 추가해주세요.');
          return false;
        }
      });
      $(".btn_cancel").on('click',function(){
         $('.pro_add').trigger('click');
      });
    });
  </script>
</body>
</html>
