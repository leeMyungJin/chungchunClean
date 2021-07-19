package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chungchunClean.Mappers.CalculateMapper;
import com.chungchunClean.Service.CalculateService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.CalculateVo;

@Service
public class CalculateServiceImpl implements CalculateService{

	@Autowired
	private CalculateMapper calculateMapper;
	
	@Override
	public List<CalculateVo> getMonList(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		                		
		List<CalculateVo> calculateList = calculateMapper.getMonList(params);
		return calculateList;
	}

	@Override
	public HashMap<String, Object> getMonTodayCost(){
		return calculateMapper.getMonTodayCost();
	}
	
	@Override
	public HashMap<String, Object> getMonlableCost(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		
		return calculateMapper.getMonlableCost(params);
	}
	
	@Override
	public List<CalculateVo> getAddList(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		                		
		List<CalculateVo> calculateList = calculateMapper.getAddList(params);
		return calculateList;
	}

	@Override
	public HashMap<String, Object> getAddTodayCost(){
		return calculateMapper.getAddTodayCost();
	}
	
	@Override
	public HashMap<String, Object> getAddlableCost(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		
		return calculateMapper.getAddlableCost(params);
	}
}