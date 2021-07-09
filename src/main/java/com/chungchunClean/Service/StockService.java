package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.StockVo;


public interface StockService {
    public List<StockVo> getStockList(HashMap<String,Object> params);
    public List<StockVo> getCategoryList();
    public void deleteCategory(List<StockVo> params);
    public void saveCategory(List<StockVo> params);
    public List<StockVo> getLCategoryList();
    public List<StockVo> getMCategoryList();
    public String dupCheckItem(HashMap<String, String> params);
    public void addItem(HashMap<String, String> params);
    public void deleteItem(List<StockVo> params);
    public String getTotalItemCnt();
    public void saveStock(List<StockVo> params);
    
    // 재고관리 - 입출관리 화면
    public List<StockVo> getStockCurrentList(HashMap<String,Object> params);
    public void deleteStockCurrent(List<StockVo> params);
    public void saveStockCurrent(List<StockVo> params);
    public int getTodayStore();
	public int getTodayRelease();
    public int getTodayReturnStore();
	public int getTodayReturnRelease();
}
