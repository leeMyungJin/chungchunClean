package com.chungchunClean.Service;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.StockVo;


public interface StockService {
    public List<StockVo> getStockList(HashMap<String,Object> params);
    public List<StockVo> getCategoryList();
    public void deleteCategory(List<StockVo> params);
    public void saveCategory(List<StockVo> params, String id);
    public List<StockVo> getLCategoryList();
    public List<StockVo> getMCategoryList();
    public String dupCheckItem(HashMap<String, String> params);
    public void addItem(StockVo params);
    public void deleteItem(List<StockVo> params);
    public String getTotalItemCnt();
    public Integer saveStock(List<StockVo> params, String id);
    public void saveQuantity(StockVo params);
    public HashMap<String, Object> getQuantityInfo();
    public Integer saveQuantityList(List<StockVo> params, String id);
    
    // 재고관리 - 입출관리 화면
    public List<StockVo> getStockCurrentList(HashMap<String,Object> params);
    public void deleteStockCurrent(List<StockVo> params);
    public void saveStockCurrent(List<StockVo> params, String id, String name);
    public void saveUpdateStockCurrent(List<StockVo> params, String id, String name);
    public void saveStockCurrentQuantity(List<StockVo> params, String id);
    public int getTodayStore();
	public int getTodayRelease();
    public int getTodayReturnStore();
	public int getTodayReturnRelease();
	public List<StockVo> getItemList();
	public List<CodeVo> getClassifiList();
	public List<CodeVo> getStockQrList(HashMap<String,Object> params);
}
