package com.limefood.Service.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.limefood.Mappers.CustInfoMapper;
import com.limefood.Mappers.LoginMapper;
import com.limefood.Service.LoginService;
import com.limefood.Util.Encrypt;
import com.limefood.vo.CustInfoVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService{

	@Autowired
	LoginMapper loginMapper;

	@Autowired
	CustInfoMapper custInfoMapper;


	@Override
	public String logIn() {
		return "login";
	}
	@Override
	public String getPasswordCheck(CustInfoVO vo, HttpServletRequest request) {

		HttpSession session = request.getSession();
		CustInfoVO regCust = loginMapper.getPassword(vo);
		String url = null;

		if(regCust == null){
			url = "login_fail";
		}else{
			String sha512Pwd = Encrypt.setSHA512(vo.getPassword(), regCust.getPasswordKey());
			if(!regCust.getId().equals(null) && sha512Pwd.equals(regCust.getPassword())){ // 비밀번호 일치 하는 경우

				regCust = custInfoMapper.getCustInfo(vo);
				
				session.setAttribute("id", regCust.getId());
				session.setAttribute("name", regCust.getName());
				session.setAttribute("celPhone", regCust.getCelPhone());
				session.setAttribute("telPhone", regCust.getTelPhone());
				session.setAttribute("email", regCust.getEmail());
				session.setAttribute("corpName", regCust.getCorpName());
				session.setAttribute("corpNum", regCust.getCorpNum());
				session.setAttribute("basAddr", regCust.getBasAddr());
				session.setAttribute("dtlAddr", regCust.getDtlAddr());
				session.setAttribute("adminFlag", regCust.getAdminFlag());
				session.setAttribute("lastLogin", regCust.getLastLogin());
				session.setAttribute("password", regCust.getPassword());

				if(regCust.getLockFlag().equals("Y")){
					url = "lock";
					session.invalidate();
				}else if(regCust.getLastLogin() == null ){
					url = "firstLogin";
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
	public String  logOut(HttpServletRequest request) {
		HttpSession session = request.getSession();
		System.out.println("session invalidate!!");
		session.invalidate();
		return "/intro";
		
	}
	
	@Override
	public void updateLoginTime(CustInfoVO vo){
		SimpleDateFormat timeFormat = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");		
		Date time = new Date();
		String loginTime = timeFormat.format(time);
		vo.setLastLogin(loginTime);
		loginMapper.updateLoginTime(vo);
	}
	@Override
	public void autoLogin(String id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		CustInfoVO custInfoVO = new CustInfoVO();
		custInfoVO.setId(id);
		custInfoVO = custInfoMapper.getCustInfo(custInfoVO);
		if(custInfoVO != null ){

			session.setAttribute("id", custInfoVO.getId());
			session.setAttribute("name", custInfoVO.getName());
			session.setAttribute("celPhone", custInfoVO.getCelPhone());
			session.setAttribute("telPhone", custInfoVO.getTelPhone());
			session.setAttribute("email", custInfoVO.getEmail());
			session.setAttribute("corpName", custInfoVO.getCorpName());
			session.setAttribute("corpNum", custInfoVO.getCorpNum());
			session.setAttribute("basAddr", custInfoVO.getBasAddr());
			session.setAttribute("dtlAddr", custInfoVO.getDtlAddr());
			session.setAttribute("adminFlag", custInfoVO.getAdminFlag());
			session.setAttribute("lastLogin", custInfoVO.getLastLogin());
			session.setAttribute("password", custInfoVO.getPassword());
		}
			
	}
}