package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chungchunClean.Mappers.CalculateMapper;
import com.chungchunClean.Mappers.IncomeMapper;
import com.chungchunClean.Service.CalculateService;
import com.chungchunClean.Service.IncomeService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.CalculateVo;

@Service
public class IncomeServiceImpl implements IncomeService{

	@Autowired
	private IncomeMapper incomeMapper;
	
	@Override
	public List<CalculateVo> getIncomeList(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		                		
		List<CalculateVo> calculateList = incomeMapper.getIncomeList(params);
		return calculateList;
	}

	@Override
	public HashMap<String, Object> getIncomeTodayCost(){
		return incomeMapper.getIncomeTodayCost();
	}
	
	@Override
	public HashMap<String, Object> getIncomelableCost(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		
		return incomeMapper.getIncomelableCost(params);
	}
	
}