package com.chungchunClean.Service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chungchunClean.Mappers.ObjectMapper;
import com.chungchunClean.Service.LoginService;
import com.chungchunClean.vo.StaffVo;
import com.chungchunClean.Mappers.LoginMapper;
import com.chungchunClean.Util.Encrypt;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginMapper loginMapper;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Override
	public String getPasswordCheck(StaffVo vo, HttpServletRequest request) {

		HttpSession session = request.getSession();
		StaffVo regStaff = loginMapper.getPassword(vo);
		String url = null;

		if(regStaff == null){
			url = "login_fail";
		}else{
			String sha512Pwd = Encrypt.setSHA512(vo.getStaffPass(), regStaff.getPasswordKey());
			if(!regStaff.getStaffId().equals(null) && sha512Pwd.equals(regStaff.getStaffPass())){ // 비밀번호 일치 하는 경우

				regStaff = objectMapper.getStaffInfo(vo);
				
				session.setAttribute("staffId", regStaff.getStaffId());
				session.setAttribute("staffPass", regStaff.getStaffPass());
				session.setAttribute("staffName", regStaff.getStaffName());
				session.setAttribute("staffPnum", regStaff.getStaffPnum());
				session.setAttribute("staffEmail", regStaff.getStaffEmail());
				session.setAttribute("activeYn", regStaff.getActiveYn());
				session.setAttribute("adminYn", regStaff.getAdminYn());
				session.setAttribute("lateassDt", regStaff.getLateassDt());

				if( !regStaff.getActiveYn().equals("Y") || !regStaff.getAdminYn().equals("Y") ){
					url = "login_auth_fail";
					session.invalidate();
				}else{
					url = "login";
				}
					
			}else{  // 비밀번호 불일치
				 session.invalidate();
					url = "login_fail";
			}
		}
		return url;
	}
	
	
	@Override
	public void updateLoginTime(StaffVo vo){
		SimpleDateFormat timeFormat = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");		
		Date time = new Date();
		String loginTime = timeFormat.format(time);
		vo.setLateassDt(loginTime);
		loginMapper.updateLoginTime(vo);
	}
	
	@Override
	public void autoLogin(String id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		StaffVo staffVo = new StaffVo();
		staffVo.setStaffId(id);
		staffVo = objectMapper.getStaffInfo(staffVo);
		
		if(staffVo != null ){
			session.setAttribute("staffId", staffVo.getStaffId());
			session.setAttribute("staffPass", staffVo.getStaffPass());
			session.setAttribute("staffName", staffVo.getStaffName());
			session.setAttribute("staffPnum", staffVo.getStaffPnum());
			session.setAttribute("staffEmail", staffVo.getStaffEmail());
			session.setAttribute("activeYn", staffVo.getActiveYn());
			session.setAttribute("adminYn", staffVo.getAdminYn());
			session.setAttribute("lateassDt", staffVo.getLateassDt());
		}
			
	}
	
	@Override
	public String logOut(HttpServletRequest request) {
		HttpSession session = request.getSession();
		System.out.println("session invalidate!!");
		session.invalidate();
		return "/";
		
	}
	
}