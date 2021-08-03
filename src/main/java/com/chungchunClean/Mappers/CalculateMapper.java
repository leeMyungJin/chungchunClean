package com.chungchunClean.Mappers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.DailyVo;
import com.chungchunClean.vo.StaffVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CalculateMapper  {
	
	public List<CalculateVo> getMonList(HashMap<String,Object> params);
	public HashMap<String, Object> getMonTotalCost();
	public HashMap<String, Object> getMonlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getAddList(HashMap<String,Object> params);
	public HashMap<String, Object> getAddTotalCost();
	public HashMap<String, Object> getAddlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getClassifiList(HashMap<String,Object> params);
	public List<CalculateVo> getItemList(HashMap<String,Object> params);
	public List<CalculateVo> getBldgList(HashMap<String,Object> params);
	
    public void deleteAdd(CalculateVo params);
    public void deleteClassifi(CalculateVo params);
    public void deleteItem(CalculateVo params);
    
    public void saveMon(CalculateVo params);
    public void saveAdd(CalculateVo params);
    public void saveMonExcel(CalculateVo params);
    public void saveAddExcel(CalculateVo params);
    public void saveUpdateAdd(CalculateVo params);
    public void saveClassifi(CalculateVo params);
    public void saveItem(CalculateVo params);
    
    public List<CalculateVo> getPopSpecification(HashMap<String,Object> params);
}

