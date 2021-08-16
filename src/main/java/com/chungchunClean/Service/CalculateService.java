package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.StockVo;


public interface CalculateService {
	
	public List<CalculateVo> getMonList(HashMap<String,Object> params);
	public List<CalculateVo> getMonErrorList(HashMap<String,Object> params);
	public HashMap<String, Object> getMonTotalCost();
	public HashMap<String, Object> getMonlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getAddList(HashMap<String,Object> params);
	public HashMap<String, Object> getAddTotalCost();
	public HashMap<String, Object> getAddlableCost(HashMap<String,Object> params);
	
	public List<CalculateVo> getClassifiList(HashMap<String,Object> params);
	public List<CalculateVo> getItemList(HashMap<String,Object> params);
	public List<CalculateVo> getBldgList(HashMap<String,Object> params);
	
	public void deleteMonError(List<CalculateVo> params, String id);
    public void deleteAdd(List<CalculateVo> params, String id);
    public void deleteClassifi(List<CalculateVo> params, String id);
    public void deleteItem(List<CalculateVo> params, String id);
    
    public void saveMon(List<CalculateVo> params, String id);
    public void saveAdd(List<CalculateVo> params, String id);
    public void saveMonExcel(CalculateVo params);
    public void saveMonErrorExcel(CalculateVo params);
    public void saveAddExcel(CalculateVo params);
    public void saveUpdateMonError(List<CalculateVo> params, String id);
    public void saveUpdateAdd(List<CalculateVo> params, String id);
    public void saveClassifi(List<CalculateVo> params, String id);
    public void saveItem(List<CalculateVo> params, String id);
    
    public List<CalculateVo> getPopSpecification(String bldgNm, String addMt);
    public List<CodeVo> getMsgTemplate();
    public void saveMsgTemplate(HashMap<String,Object> params, String id);
}