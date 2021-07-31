package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.StockVo;


public interface CalculateService {
	
	public List<CalculateVo> getMonList(HashMap<String,Object> params);
	public HashMap<String, Object> getMonTotalCost();
	public HashMap<String, Object> getMonlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getAddList(HashMap<String,Object> params);
	public HashMap<String, Object> getAddTotalCost();
	public HashMap<String, Object> getAddlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getClassifiList(HashMap<String,Object> params);
	public List<CalculateVo> getItemList(HashMap<String,Object> params);
	public List<CalculateVo> getBldgList(HashMap<String,Object> params);
	
    public void deleteAdd(List<CalculateVo> params);
    public void deleteClassifi(List<CalculateVo> params);
    public void deleteItem(List<CalculateVo> params);
    
    public void saveMon(List<CalculateVo> params);
    public void saveAdd(List<CalculateVo> params);
    public void saveMonExcel(CalculateVo params);
    public void saveAddExcel(CalculateVo params);
    public void saveUpdateAdd(List<CalculateVo> params);
    public void saveClassifi(List<CalculateVo> params);
    public void saveItem(List<CalculateVo> params);
    
    public List<CalculateVo> getPopSpecification(String bldgNm);
    
}