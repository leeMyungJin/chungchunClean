package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.Mappers.StockMapper;
import com.chungchunClean.Service.StockService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.StockCurrentVo;
import com.chungchunClean.vo.StockVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockServiceImpl implements StockService {

	@Autowired
	private StockMapper stockMapper;
	
	@Override
	public List<StockVo> getStockList(HashMap<String, Object> params) {
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		return stockMapper.getStockList(params);
	}

	@Override
	public List<StockVo> getCategoryList() {
		return stockMapper.getCategoryList();
	}

	@Override
	public void deleteCategory(List<StockVo> params) {
		for(StockVo vo : params)
			stockMapper.deleteCategory(vo);
	}

	@Override
	public void saveCategory(List<StockVo> params) {
		for(StockVo vo : params){
			// 임시로 testid로 셋팅. 추후 session에서 가져오도록 변경
			vo.setCret_id("testid");
			vo.setUpdt_id("testid");
			stockMapper.saveCategory(vo);
		}
	}

	@Override
	public List<StockVo> getLCategoryList() {
		return stockMapper.getLCategoryList();
	}	
	@Override
	public List<StockVo> getMCategoryList() {
		return stockMapper.getMCategoryList();
	}

	@Override
	public String dupCheckItem(HashMap<String, String> params) {
		return stockMapper.dupCheckItem(params);
	}

	@Override
	public void addItem(HashMap<String, String> params) {
		stockMapper.addItem(params);
	}

	@Override
	public void deleteItem(List<StockVo> params) {
		for(StockVo vo : params)
			stockMapper.deleteItem(vo);
		
	}

	@Override
	public String getTotalItemCnt() {
		return stockMapper.getTotalItemCnt();
	}

	@Override
	public void saveStock(List<StockVo> params) {
		for(StockVo vo : params){
			vo.setUpdt_id("testId");
			vo.setCret_id("testId");
			stockMapper.saveStock(vo);
		}
		
	}	
	
	
    // 재고관리 - 입출관리 화면
	@Override
	public List<StockCurrentVo> getStockCurrentList(HashMap<String, Object> params) {
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		return stockMapper.getStockCurrentList(params);
	}

	
}