<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <%@ include file="../include/header.jsp" %>
</head>

<script type="text/javascript">
var staffId = "<%=session.getAttribute("staffId")%>";

function pageLoad(){
	sessionCheck(staffId);
	
	$('#statistics').addClass("current");
	
	getStatisticsTotal();
	loadChart();
}

function loadChart(){
	  let data = getStatisticsTotalPercent();
	  let sum = data.map(c => c.sales).reduce((sum, cur) => sum + cur);
	  let pie = new wijmo.chart.FlexPie('#percentChart', {
	    bindingName: 'type',
	    binding: 'value',
	    dataLabel: {
	      content: (ht) => {
	        return `${ht.name} ${wijmo.Globalize.format(ht.value / sum, 'p2')}`;
	      }
	    },
	    itemsSource: data,
	    palette: [
	    	'rgba(255,201,98,1)', 'rgba(52,152,219,1)', 'rgba(243,156,18,1)', 'rgba(108,193,190,1)', 'rgba(153,165,73,1)',
            'rgba(143,84,181,1)', 'rgba(231,76,60,1)', 'rgba(138,152,153,1)', 'rgba(44,62,80,1)'
	    ]
	  }); 
	  
	  
	let monthChart = new wijmo.chart.FlexChart('#monthChart', {
	    legend: { position: wijmo.chart.Position.Bottom},
	    bindingX: 'type',
	    series: [{
	      binding: 'value'
	    }],
	    tooltip: {content: ''},
	    dataLabel: {content: '{y}'},
	    itemsSource: getStatisticsTotal3Month(),
	    palette: ['rgba(255,201,98,1)', 'rgba(52,152,219,1)', 'rgba(243,156,18,1)', 'rgba(108,193,190,1)', 'rgba(153,165,73,1)',
	              'rgba(143,84,181,1)', 'rgba(231,76,60,1)', 'rgba(138,152,153,1)', 'rgba(44,62,80,1)']
	  });

	  new wijmo.chart.animation.ChartAnimation(monthChart);
	  
	let totalCostChart = new wijmo.chart.FlexChart('#totalCostChart', {
	    legend: { position: wijmo.chart.Position.Bottom},
	    bindingX: 'type',
	    series: [{
	      binding: 'value'
	    }],
	    tooltip: {content: ''},
	    dataLabel: {content: '{y}'},
	    itemsSource: getStatisticsTotalCost(),
	    palette: ['rgba(255,201,98,1)', 'rgba(52,152,219,1)', 'rgba(243,156,18,1)', 'rgba(108,193,190,1)', 'rgba(153,165,73,1)',
	              'rgba(143,84,181,1)', 'rgba(231,76,60,1)', 'rgba(138,152,153,1)', 'rgba(44,62,80,1)']
	  });

	  new wijmo.chart.animation.ChartAnimation(totalCostChart);
	  
	  
	let addSubCostChart = new wijmo.chart.FlexChart('#addSubCostChart', {
	   // header: '매출비율',
	    legend: { position: wijmo.chart.Position.Bottom},
	    bindingX: 'type',
	    series: [{
	      binding: 'value'
	    }],
	    tooltip: {content: ''},
	    dataLabel: {content: '{y}'},
	    itemsSource: getStatisticsAddSubCost(),
	    palette: ['rgba(255,201,98,1)', 'rgba(255,201,98,1)', 'rgba(255,201,98,1)', 'rgba(108,193,190,1)', 'rgba(153,165,73,1)',
	              'rgba(143,84,181,1)', 'rgba(231,76,60,1)', 'rgba(138,152,153,1)', 'rgba(44,62,80,1)']
	  });

	  new wijmo.chart.animation.ChartAnimation(addSubCostChart);
}


function getStatisticsTotal() {
    $.ajax({
            url : "/statistics/getStatisticsTotal",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
                if(result.length > 0){
                	$("#totalConCost").text(Number(result[0].conCost).toLocaleString('ko-KR')+ "원");
                	$("#totalOutCost").text(Number(result[0].outCost).toLocaleString('ko-KR')+ "원");
                	$("#totalDepositCost").text(Number(result[0].depositCost).toLocaleString('ko-KR')+ "원");
                }
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
}

function getStatisticsTotalPercent() {
	var returnVal;
	
    $.ajax({
            url : "/statistics/getStatisticsTotalPercent",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
                if(result.length > 0){
                	var item = [];
                	item[0] = { type: '월관리', value: Number(result[0].ammPercent)};	
                	item[1] = { type: '부가수익', value: Number(result[0].aaPercent)};	

                	returnVal = item;
                	console.log(returnVal);
                }
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
    
    return returnVal;
}

function getStatisticsTotal3Month() {
	var returnVal;
	
    $.ajax({
            url : "/statistics/getStatisticsTotal3Month",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
                if(result.length > 0){
                	var item = [];
                	
                	for(var i =0; i<result.length; i++){
                		item[i] = { 'type': result[i].monMt, 'value': Number(result[i].conCost) };	
                	}
                	returnVal = item;
                	console.log(returnVal);
                }
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
    
    return returnVal;
}


function getStatisticsTotalCost() {
	var returnVal;
	
    $.ajax({
            url : "/statistics/getStatisticsTotalCost",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
            	if(result.length > 0){
                	var item = [];
                	item[0] = { type: '월관리', value: Number(result[1].conCost)};	
                	item[1] = { type: '부가수익', value: Number(result[0].conCost)};

                	returnVal = item;
                	console.log(returnVal);
                }
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
    
    return returnVal;
}


function getStatisticsAddSubCost() {
	var returnVal;
	
    $.ajax({
            url : "/statistics/getStatisticsAddSubCost",
            async : false, // 비동기모드 : true, 동기식모드 : false
            type : 'POST',
            success : function(result) {
            	if(result.length > 0){
                	var item = [];
                	
                	for(var i =0; i<result.length; i++){
                		item[i] = { 'type': result[i].classifiNm, 'value': Number(result[i].conCost) };	
                	}
                	returnVal = item;
                	console.log(returnVal);
                }
            },
            error : function(request,status,error) {
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }
    });
    
    return returnVal;
}
</script>

<body onload="pageLoad()">
    <div class="admin_wrap">
        <%@ include file="../include/nav.jsp" %>
        
        <div class="admin_container">
            <div class="admin_section">
                <h2 class="admin_title">매출통계</h2>
                <div class="admin_summary">
                    <dl>
                        <dt>금년 매출액</dt>
                        <dd id="totalConCost">0원</dd>
                    </dl>
                    <dl>
                        <dt>누적 미수금</dt>
                        <dd id="totalOutCost">0원</d>
                    </dl>
                    <dl>
                        <dt>금년 입금금액</dt>
                        <dd id="totalDepositCost">0원</dd>
                    </dl>
                </div>
                <div class="admin_box">
                    <section style = "width:45%">
                        <h3 class="title">매출비율</h3>
                        <div class="content">
                          <div id="percentChart"></div>
						</div>
                    </section>
                    <section style = "width:45%">
                        <h3 class="title">3개월간 매출통계</h3>
                        <div class="content">
	                        <div id="monthChart"></div>
						</div>
                    </section>
                    <section style = "width:45%">
                        <h3 class="title">분야별 매출</h3>
                        <div class="content">
                        	<div id="totalCostChart"></div>
                        </div>
                    </section>
                    <section style = "width:45%">
                        <h3 class="title">부가수익 세부매출</h3>
                        <div class="content">
                        	<div id="addSubCostChart"></div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</body>
</html>