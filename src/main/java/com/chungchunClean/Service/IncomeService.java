package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.CalculateVo;


public interface IncomeService {
	
	public List<CalculateVo> getIncomeList(HashMap<String,Object> params);
	public HashMap<String, Object> getIncomeTodayCost();
	public HashMap<String, Object> getIncomelableCost(HashMap<String,Object> params);
    
}