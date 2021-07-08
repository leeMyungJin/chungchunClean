package com.chungchunClean.Mappers;

import java.util.HashMap;
import java.util.List;

import com.chungchunClean.vo.StockVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StockMapper  {
	public List<StockVo> getStockList(HashMap<String, Object> params);
	public List<StockVo> getCategoryList();
	public void deleteCategory(StockVo params); 
	public void saveCategory(StockVo params); 
	public List<StockVo> getLCategoryList();
	public List<StockVo> getMCategoryList();
    public String dupCheckItem(HashMap<String, String> params);
    public void addItem(HashMap<String, String> params);
    public void deleteItem(StockVo vo);
    public String getTotalItemCnt();
    public void saveStock(StockVo params);
    
 // 재고관리 - 입출관리 화면
    public List<StockVo> getStockCurrentList(HashMap<String,Object> params);
    public void deleteStockCurrent(StockVo params);
    public void saveStockCurrent(StockVo params);
}
