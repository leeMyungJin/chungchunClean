package com.chungchunClean.Mappers;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.DailyVo;
import com.chungchunClean.vo.StaffVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CalculateMapper  {
	
	public List<CalculateVo> getMonList(HashMap<String,Object> params);
	public HashMap<String, Object> getMonTodayCost();
	public HashMap<String, Object> getMonlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getAddList(HashMap<String,Object> params);
	public HashMap<String, Object> getAddTodayCost();
	public HashMap<String, Object> getAddlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getClassifiList();
	
    public void deleteMonItem(CalculateVo vo);
    public void deleteAddItem(CalculateVo params);
    public void deleteClassifiItem(CalculateVo params);
    
    public void saveMon(CalculateVo params);
    public void saveAdd(CalculateVo params);
    public void saveClassifi(CalculateVo params);
    
    public String dupCheckClassifi(HashMap<String, String> params);
}
