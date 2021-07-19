package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.CalculateVo;


public interface CalculateService {
	
	public List<CalculateVo> getMonList(HashMap<String,Object> params);
	public HashMap<String, Object> getMonTodayCost();
	public HashMap<String, Object> getMonlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getAddList(HashMap<String,Object> params);
	public HashMap<String, Object> getAddTodayCost();
	public HashMap<String, Object> getAddlableCost(HashMap<String,Object> params);
    
}