package com.chungchunClean.Mappers;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.CodeVo;
import com.chungchunClean.vo.StockVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StockMapper  {
	public List<StockVo> getStockList(HashMap<String, Object> params);
	public List<StockVo> getCategoryList();
    public List<StockVo> getUnitList(String lCategyCd);
	public void deleteCategory(StockVo params); 
	public void saveCategory(StockVo params);
    public void saveUnit(StockVo params);
    public void deleteUnit(StockVo params);
    public List<StockVo> getLCategoryList();
	public List<StockVo> getMCategoryList();
    public String dupCheckItem(HashMap<String, String> params);
    public void addItem(StockVo params);
    public void deleteItem(StockVo vo);
    public Integer checkCategory(StockVo vo);
    public String getTotalItemCnt();
    public void saveStock(StockVo params);
    public void saveQuantity(StockVo params);
    public HashMap<String, Object> getQuantityInfo();
 // 재고관리 - 입출관리 화면
    public List<StockVo> getStockCurrentList(HashMap<String,Object> params);
    public void deleteStockCurrent(StockVo params);
    public void deleteStockCurrentQuantity(StockVo params);
    public void saveStockCurrent(StockVo params);
    public void saveUpdateStockCurrent(StockVo params);
    public void saveStockCurrentQuantity(StockVo params);
    public int getTodayStore();
	public int getTodayRelease();
    public int getTodayReturnStore();
	public int getTodayReturnRelease();
	public List<StockVo> getItemList();
	public List<CodeVo> getClassifiList();
	public List<CodeVo> getStockQrList(HashMap<String, Object> params);

}
