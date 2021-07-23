package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chungchunClean.Mappers.CalculateMapper;
import com.chungchunClean.Service.CalculateService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.StockVo;

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
	
	
	@Override
	public List<CalculateVo> getClassifiList(){

		List<CalculateVo> calculateList = calculateMapper.getClassifiList();
		return calculateList;
	}
	
	@Override
	public void deleteMonItem(List<CalculateVo> params) {
		for(CalculateVo vo : params)
			calculateMapper.deleteMonItem(vo);
	}
	
	@Override
	public void deleteAddItem(List<CalculateVo> params) {
		for(CalculateVo vo : params)
			calculateMapper.deleteAddItem(vo);
	}
	
	@Override
	public void deleteClassifiItem(List<CalculateVo> params) {
		for(CalculateVo vo : params)
			calculateMapper.deleteClassifiItem(vo);
	}
	
	@Override
	public void saveMon(List<CalculateVo> params) {
		for(CalculateVo vo : params){
			vo.setUpdtId("testId");
			vo.setCretId("testId");
			calculateMapper.saveMon(vo);
		}
	}	
	
	@Override
	public void saveAdd(List<CalculateVo> params) {
		for(CalculateVo vo : params){
			vo.setUpdtId("testId");
			vo.setCretId("testId");
			calculateMapper.saveAdd(vo);
		}
	}	
	
	@Override
	public void saveClassifi(List<CalculateVo> params) {
		for(CalculateVo vo : params){
			vo.setUpdtId("testId");
			vo.setCretId("testId");
			calculateMapper.saveClassifi(vo);
		}
	}	
	
	@Override
	public String dupCheckClassifi(HashMap<String, String> params) {
		return calculateMapper.dupCheckClassifi(params);
	}

}