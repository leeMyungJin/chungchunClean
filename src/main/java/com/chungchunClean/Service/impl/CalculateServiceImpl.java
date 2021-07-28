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
	public HashMap<String, Object> getMonTotalCost(){
		return calculateMapper.getMonTotalCost();
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
	public HashMap<String, Object> getAddTotalCost(){
		return calculateMapper.getAddTotalCost();
	}
	
	@Override
	public HashMap<String, Object> getAddlableCost(HashMap<String,Object> params){
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		
		return calculateMapper.getAddlableCost(params);
	}
	
	
	@Override
	public List<CalculateVo> getClassifiList(HashMap<String,Object> params){

		List<CalculateVo> calculateList = calculateMapper.getClassifiList(params);
		return calculateList;
	}
	
	
	@Override
	public List<CalculateVo> getItemList(HashMap<String,Object> params){

		List<CalculateVo> calculateList = calculateMapper.getItemList(params);
		return calculateList;
	}
	
	@Override
	public List<CalculateVo> getBldgList(HashMap<String,Object> params){

		List<CalculateVo> calculateList = calculateMapper.getBldgList(params);
		return calculateList;
	}
	
	@Override
	public void deleteAdd(List<CalculateVo> params) {
		for(CalculateVo vo : params)
			calculateMapper.deleteAdd(vo);
	}
	
	@Override
	public void deleteClassifi(List<CalculateVo> params) {
		for(CalculateVo vo : params) {
			vo.setUpdtId("testId");
			calculateMapper.deleteClassifi(vo);
		}
	}
	
	@Override
	public void deleteItem(List<CalculateVo> params) {
		for(CalculateVo vo : params) {
			vo.setUpdtId("testId");
			calculateMapper.deleteItem(vo);
		}
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
	public void saveUpdateAdd(List<CalculateVo> params) {
		for(CalculateVo vo : params){
			vo.setUpdtId("testId");
			calculateMapper.saveUpdateAdd(vo);
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
	public void saveItem(List<CalculateVo> params) {
		for(CalculateVo vo : params){
			vo.setUpdtId("testId");
			vo.setCretId("testId");
			calculateMapper.saveItem(vo);
		}
	}
	
	@Override
	public List<CalculateVo> getPopSpecification(String bldgNm){

		List<CalculateVo> calculateList = calculateMapper.getPopSpecification(bldgNm);
		return calculateList;
	}

}