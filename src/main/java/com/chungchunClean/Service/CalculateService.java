package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.StockVo;


public interface CalculateService {
	
	public List<CalculateVo> getMonList(HashMap<String,Object> params);
	public HashMap<String, Object> getMonTodayCost();
	public HashMap<String, Object> getMonlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getAddList(HashMap<String,Object> params);
	public HashMap<String, Object> getAddTodayCost();
	public HashMap<String, Object> getAddlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getClassifiList();
	
    public void deleteMonItem(List<CalculateVo> params);
    public void deleteAddItem(List<CalculateVo> params);
    public void deleteClassifiItem(List<CalculateVo> params);
    
    public void saveMon(List<CalculateVo> params);
    public void saveAdd(List<CalculateVo> params);
    public void saveClassifi(List<CalculateVo> params);
    
    public String dupCheckClassifi(HashMap<String, String> params);
    
}