package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chungchunClean.Mappers.ObjectMapper;
import com.chungchunClean.Service.ObjectService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.StaffVo;
import com.chungchunClean.Mappers.LoginMapper;
import com.chungchunClean.Util.Encrypt;

@Service
public class ObjectServiceImpl implements ObjectService {

	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private LoginMapper login;
	
	@Override
	public int getTotalStaff() {
		return objectMapper.getTotalStaff();
	}

	@Override
	public int getTotalAdmin() {
		return objectMapper.getTotalAdmin();
	}

	
	@Override
	public List<StaffVo> getStaffList(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		                		
		List<StaffVo> staffList = objectMapper.getStaffList(params);
		return staffList;
	}
	
	@Override
	public String dupCheckId(HashMap<String, String> params) {
		return objectMapper.dupCheckId(params);
	}

	@Override
	public void saveNewStaff(StaffVo vo){
		objectMapper.saveNewStaff(vo);
	}
	
	@Override
	public void deleteStaff(HashMap<String, String> params) {
		objectMapper.deleteStaff(params);
		
	}
	
	@Override
	public void updateStaff(HashMap<String, String> params) {
		String id = params.get("id");
		String password = params.get("password");
		if(password != ""){
			StaffVo usr = new StaffVo();
			usr.setStaffId(id);
			usr = login.getPassword(usr);	
			String shaPwd = Encrypt.setSHA512(password, usr.getPasswordKey());
			params.replace("password", shaPwd);
		}
		objectMapper.updateStaff(params);
	}
	
}