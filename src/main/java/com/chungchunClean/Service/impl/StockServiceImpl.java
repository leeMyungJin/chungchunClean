package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.Mappers.StockMapper;
import com.chungchunClean.Service.StockService;
import com.chungchunClean.Util.Util;
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
	public void deleteCategory(HashMap<String,String> params) {
		stockMapper.deleteCategory(params);
	}
	
}