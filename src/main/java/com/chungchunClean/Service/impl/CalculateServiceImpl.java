package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chungchunClean.Mappers.CalculateMapper;
import com.chungchunClean.Service.CalculateService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.CalculateVo;
import com.chungchunClean.vo.CodeVo;
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
	public void deleteAdd(List<CalculateVo> params, String id) {
		for(CalculateVo vo : params)
			calculateMapper.deleteAdd(vo);
	}
	
	@Override
	public void deleteClassifi(List<CalculateVo> params, String id) {
		for(CalculateVo vo : params) {
			vo.setUpdtId(id);
			calculateMapper.deleteClassifi(vo);
		}
	}
	
	@Override
	public void deleteItem(List<CalculateVo> params, String id) {
		for(CalculateVo vo : params) {
			vo.setUpdtId(id);
			calculateMapper.deleteItem(vo);
		}
	}
	
	@Override
	public void saveMon(List<CalculateVo> params, String id) {
		for(CalculateVo vo : params){
			vo.setUpdtId(id);
			vo.setCretId(id);
			calculateMapper.saveMon(vo);
		}
	}	
	
	@Override
	public void saveAdd(List<CalculateVo> params, String id) {
		for(CalculateVo vo : params){
			vo.setUpdtId(id);
			vo.setCretId(id);
			calculateMapper.saveAdd(vo);
		}
	}	
	
	
	@Override
	public void saveMonExcel(CalculateVo params) {
		calculateMapper.saveMonExcel(params);
	}	
	
	@Override
	public void saveAddExcel(CalculateVo params) {
		calculateMapper.saveAddExcel(params);
	}	
	
	
	@Override
	public void saveUpdateAdd(List<CalculateVo> params, String id) {
		for(CalculateVo vo : params){
			vo.setUpdtId(id);
			calculateMapper.saveUpdateAdd(vo);
		}	
	}
	
	@Override
	public void saveClassifi(List<CalculateVo> params, String id) {
		for(CalculateVo vo : params){
			vo.setUpdtId(id);
			vo.setCretId(id);
			calculateMapper.saveClassifi(vo);
		}
	}	
	
	@Override
	public void saveItem(List<CalculateVo> params, String id) {
		for(CalculateVo vo : params){
			vo.setUpdtId(id);
			vo.setCretId(id);
			calculateMapper.saveItem(vo);
		}
	}
	
	@Override
	public List<CalculateVo> getPopSpecification(String bldgNm, String addMt){
		
		HashMap<String,Object> params = new HashMap<String,Object>();
		
		params.put("bldgNm", bldgNm);
		params.put("addMt", addMt);

		List<CalculateVo> calculateList = calculateMapper.getPopSpecification(params);
		return calculateList;
	}
	
	@Override
	public List<CodeVo> getMsgTemplate() {
		return calculateMapper.getMsgTemplate();
	}
	
	public void saveMsgTemplate(HashMap<String,Object> params, String id) {
		params.put("updtId", id);
		calculateMapper.saveMsgTemplate(params);
	}
	

}