<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<% request.setCharacterEncoding("utf-8"); %>

<% 
	String id=(String)session.getAttribute("id");
	if(id==null) {
%>
	<script>
		location.href="/";
	</script>
<%
    }else{ 

	if(request.getAttribute("login_chk") != null && request.getAttribute("login_chk").toString().equals("on")){
		Cookie cookie = new Cookie("limefood_id", id);
		cookie.setMaxAge(60*60*24*7);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
%>
	<script>
		location.href="/cust/food";
	</script>    
        <%
    }
%>
