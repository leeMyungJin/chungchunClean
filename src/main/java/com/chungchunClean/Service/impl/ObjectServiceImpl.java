package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chungchunClean.Mappers.ObjectMapper;
import com.chungchunClean.Service.ObjectService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.StaffVo;

@Service
public class ObjectServiceImpl implements ObjectService {

	@Autowired
	private ObjectMapper objectMapper;
	
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
	
}