package com.chungchunClean.Service.impl;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.Mappers.StockMapper;
import com.chungchunClean.Service.StockService;
import com.chungchunClean.Util.Util;
import com.chungchunClean.vo.CodeVo;
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
	public void saveCategory(List<StockVo> params, String id) {
		for(StockVo vo : params){
			vo.setUpdtId(id);
			vo.setCretId(id);
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
	public void addItem(StockVo  params) {
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
	public Integer saveStock(List<StockVo> params, String id) {
		int cnt = 0;
		for(StockVo vo : params){
			vo.setUpdtId(id);
			
			if(vo.getItemCd().length() == 7 && stockMapper.checkCategory(vo) > 0){
				stockMapper.saveStock(vo);
				cnt++;
			}
		}
		return cnt;		
	}	

	@Override
	public void saveQuantity(StockVo params) {
		stockMapper.saveQuantity(params);
		
	}

	
	@Override
	public Integer saveQuantityList(List<StockVo> params, String id) {
		int cnt = 0;
		HashMap<String, String> item = new HashMap<String,String>();
		for(StockVo vo : params){
			vo.setUpdtId(id);
			
			item.clear();
			item.put("lCategyCd", vo.getlCategyCd());
			item.put("itemCd", vo.getItemCd());
			if(stockMapper.dupCheckItem(item) != null){
				stockMapper.saveQuantity(vo);
				cnt++;
			}
		}
		return cnt;
	}	
	
	@Override
	public HashMap<String, Object> getQuantityInfo() {
		return stockMapper.getQuantityInfo();
	}

	
    // 재고관리 - 입출관리 화면
	@Override
	public List<StockVo> getStockCurrentList(HashMap<String, Object> params) {
		if(params.get("inq") != null)
			params.replace("inq", Util.makeForeach((String)params.get("inq"), ","));
		return stockMapper.getStockCurrentList(params);
	}
	
	@Override
	public void deleteStockCurrent(List<StockVo> params) {
		for(StockVo vo : params) {
			stockMapper.deleteStockCurrent(vo);
			stockMapper.deleteStockCurrentQuantity(vo);
		}
		
	}
	
	@Override
	public void saveStockCurrent(List<StockVo> params, String id, String name) {
		for(StockVo vo : params){
			vo.setCretId(id);
			vo.setUpdtNm(name);
			stockMapper.saveStockCurrent(vo);
		}
		
	}	
	@Override
	public void saveUpdateStockCurrent(List<StockVo> params, String id, String name) {
		for(StockVo vo : params){
			vo.setUpdtId(id);
			vo.setUpdtNm(name);
			stockMapper.saveUpdateStockCurrent(vo);
		}	
	}
	
	@Override
	public void saveStockCurrentQuantity(List<StockVo> params, String id) {
		for(StockVo vo : params){
			vo.setUpdtId(id);
			stockMapper.saveStockCurrentQuantity(vo);
		}
		
	}
	
	@Override
	public int getTodayStore() {
		return stockMapper.getTodayStore();
	}

	@Override
	public int getTodayRelease() {
		return stockMapper.getTodayRelease();
	}

	@Override
	public int getTodayReturnStore() {
		return stockMapper.getTodayReturnStore();
	}

	@Override
	public int getTodayReturnRelease() {
		return stockMapper.getTodayReturnRelease();
	}
	
	@Override
	public List<StockVo> getItemList() {
		return stockMapper.getItemList();
	}	
	
	@Override
	public List<CodeVo> getClassifiList() {
		return stockMapper.getClassifiList();
	}
	
	@Override
	public List<CodeVo> getStockQrList(HashMap<String, Object> params) {
		if(params.get("selectStock") != null)
			params.replace("selectStock", Util.makeForeach((String)params.get("selectStock"), ","));
		return stockMapper.getStockQrList(params);
	}
	
}